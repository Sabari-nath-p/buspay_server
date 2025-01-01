import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserService } from 'src/user/user.service';
import { ValidationError } from 'class-validator';
import { BusService } from 'src/bus/bus.service';
import { RouteService } from 'src/route/route.service';
import { User } from 'src/user/entities/user.entity';
import { filter } from 'rxjs';
import { VerifyTripDto } from './dto/verify-ticket.dto';
import { TicketsService } from 'src/tickets/tickets.service';

@Controller('trips')
export class TripsController {
  constructor(
    private readonly tripsService: TripsService,
    private readonly usersService: UserService,
    private readonly busService: BusService,
    private readonly routeService: RouteService,
    private readonly ticketService: TicketsService,
  ) {}

  // @UseGuards(AuthGuard, RolesGuard)
  // // @Roles('conductor')
  // @Post()
  // async create(@Body() createTripDto: CreateTripDto, @Request() req) {
  //   const user = await this.usersService.findUserById(req.user.sub);
  //   let conductor: User;
  //   if ((user.role.name = 'conductor')) {
  //     createTripDto.conductor_id = user.id;
  //     conductor = user;
  //   } else if (!createTripDto.conductor_id) {
  //     throw new BadRequestException('please provice conductor_id');
  //   } else {
  //     conductor = await this.usersService.findUserById(
  //       createTripDto.conductor_id,
  //     );
  //   }
  //   const bus = await this.busService.findOne(createTripDto.bus_id);
  //   const route = await this.routeService.findOne(createTripDto.route_id);
  //   return this.tripsService.create({
  //     conductor,
  //     bus,
  //     route,
  //   });
  // }

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles('conductor')
  @Post()
  async startTrip(@Body() createTripDto: CreateTripDto, @Request() req) {
    const user = await this.usersService.findUserById(req.user.sub);
    let conductor: User;
    if ((user.role.name = 'conductor')) {
      createTripDto.conductor_id = user.id;
      conductor = user;
    } else if (!createTripDto.conductor_id) {
      throw new BadRequestException('please provice conductor_id');
    } else {
      conductor = await this.usersService.findUserById(
        createTripDto.conductor_id,
      );
    }
    const bus = await this.busService.findOne(createTripDto.bus_id);
    const route = await this.routeService.findOne(createTripDto.route_id);
    return this.tripsService.create({
      conductor,
      bus,
      route,
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('conductor')
  @Post()
  async verifyTicket(@Request() req, @Body() verifyTicketDto: VerifyTripDto) {
    const trip = await this.tripsService.findOne(verifyTicketDto.trip_id);
    const ticket = await this.ticketService.findOne(verifyTicketDto.ticket_id);
    if (trip.conductor.id !== req.user.id) {
      throw new UnauthorizedException('you are not the conductor of this trip');
    }
    if (trip.status === 'COMPLETED') {
      throw new BadRequestException('this trip is completed');
    }
    //return await this.tripsService.verifyTrip(trip);
  }

  @Get()
  async findAll(@Query() filter, @Request() req) {
    const user = await this.usersService.findUserById(req.user.sub);
    const listData = await this.tripsService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(+id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripsService.remove(+id);
  }
}
