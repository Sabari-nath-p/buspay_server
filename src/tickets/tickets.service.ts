import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { RazorpayService } from '../razorpay/razorpay.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdatePaymentDto } from './dto/update-ticket.dto';
import { BusTypeService } from 'src/bus-type/bus-type.service';
import { StopService } from 'src/stop/stop.service';
import { ResponseService } from 'src/common/response/response.service';
import { Stop } from 'src/stop/entities/stop.entity';
import { BusType } from 'src/bus-type/entities/bus-type.entity';
import { RouteStopsService } from 'src/route-stops/route-stops.service';
import { RouteStop } from 'src/route-stops/entities/route-stop.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly razorpayService: RazorpayService,
    private readonly busTypeService: BusTypeService,
    private readonly routeStopService: RouteStopsService,
    private readonly responseService: ResponseService,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto) {
    // Create ticket entity
    const ticket = this.ticketRepository.create(createTicketDto);

    const boarding_stop = await this.routeStopService.findOne(
      createTicketDto.boarding_route_stop_id,
    );
    const destination_stop = await this.routeStopService.findOne(
      createTicketDto.destination_route_stop_id,
    );
    const bus_type = await this.busTypeService.findOne(
      createTicketDto.bus_type_id,
    );
    if (!boarding_stop) {
      throw new NotFoundException('Boarding stop not found');
    }
    if (!destination_stop) {
      throw new NotFoundException('Destination stop not found');
    }

    // Calculate rate based on bus type and stops
    ticket.rate = await this.calculateRate(
      bus_type,
      boarding_stop,
      destination_stop,
    );

    // Apply coupon if provided
    if (createTicketDto.coupon_code_id) {
      ticket.rate = await this.applyCoupon(
        ticket.rate,
        createTicketDto.coupon_code_id,
      );
    }

    // Save ticket
    await this.ticketRepository.save(ticket);

    // Create Razorpay order
    const order = await this.razorpayService.createOrder(ticket.rate);

    return {
      ticket_id: ticket.id,
      amount: ticket.rate,
      order_id: order.id,
      key: process.env.RAZORPAY_KEY_ID,
    };
  }

  async updatePaymentStatus(
    ticketId: number,
    updatePaymentDto: UpdatePaymentDto,
  ) {
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    // Verify payment signature
    const isValid = await this.razorpayService.verifyPayment(
      updatePaymentDto.razorpay_order_id,
      updatePaymentDto.razorpay_payment_id,
      updatePaymentDto.razorpay_signature,
    );

    if (!isValid) {
      throw new BadRequestException('Invalid payment signature');
    }

    // Update ticket status
    ticket.payment_status = 'PAID';
    ticket.is_verified = true;
    await this.ticketRepository.save(ticket);

    return ticket;
  }

  async findAll(page = 1, limit = 10) {
    const [tickets, total] = await this.ticketRepository.findAndCount({
      relations: ['busType', 'boardingStop', 'destinationStop', 'coupon'],
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
    });

    return {
      data: tickets,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: [
        'busType',
        'boardingStop',
        'destinationStop',
        'coupon',
        'tripTickets',
      ],
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return ticket;
  }

  private async calculateRate(
    busType: BusType,
    boardingStop: RouteStop,
    destinationStop: RouteStop,
  ): Promise<number> {
    let rate = 0;
    const distanceTraveled =
      Number(destinationStop.distance_from_start) -
      Number(boardingStop.distance_from_start);
    if (busType.minimum_kilometer > distanceTraveled) {
      rate = busType.minimum_fare;
    } else {
      rate = Number(distanceTraveled) * Number(busType.fare_per_kilometer);
    }
    return rate;
  }

  private async applyCoupon(rate: number, couponId: number): Promise<number> {
    // Implement your coupon application logic here
    return rate; // Replace with actual coupon calculation
  }
}
