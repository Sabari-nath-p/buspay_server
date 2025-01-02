import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateTripInterface } from './interface/create-trip.interface';
import { TripTicket } from './entities/trip-tickets.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
    @InjectRepository(TripTicket)
    private readonly tripTicketsRepository: Repository<TripTicket>,
  ) {}
  async create(createTripInterface: CreateTripInterface) {
    const newTrip = this.tripRepository.create(createTripInterface);
    return await this.tripRepository.save(newTrip);
  }

  async findAll(filter: any) {
    let where: any = {};
    return await this.tripRepository.find({ where });
  }

  async findOne(id: number) {
    return await this.tripRepository.findOne({ where: { id } });
  }

  async verifyTrip(trip: Trip, ticket: Ticket) {
    const tripTicket =await this.tripTicketsRepository.create({ trip, ticket });
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return `This action updates a #${id} trip`;
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }
}
