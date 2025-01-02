import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Trip } from './trip.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Entity('trip_tickets')
export class TripTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trip_id: number;

  @Column()
  ticket_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  fare: number;

  @ManyToOne(() => Trip, (trip) => trip.tripTickets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trip_id' })
  trip: Trip;

  @ManyToOne(() => Ticket, (ticket) => ticket.tripTickets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;
}
