import { BusType } from 'src/bus-type/entities/bus-type.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { RouteStop } from 'src/route-stops/entities/route-stop.entity';
import { Stop } from 'src/stop/entities/stop.entity';
import { TripTicket } from 'src/trips/entities/trip-tickets.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BusType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bus_type_id' })
  busType: BusType;

  @Column()
  bus_type_id: number;

  @ManyToOne(() => RouteStop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boarding_route_stop_id' })
  boardingRouteStop: RouteStop;

  @Column()
  boarding_route_stop_id: number;

  @ManyToOne(() => RouteStop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'destination_route_stop_id' })
  destinationRouteStop: RouteStop;

  @Column()
  destination_route_stop_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  rate: number;

  @ManyToOne(() => Coupon, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'coupon_code_id' })
  coupon: Coupon;

  @Column({ nullable: true })
  coupon_code_id: number;

  @Column({ type: 'varchar', length: 255 })
  device_id: string;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'PAID', 'FAILED'],
    default: 'PENDING',
  })
  payment_status: 'PENDING' | 'PAID' | 'FAILED';

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => TripTicket, (tripTicket) => tripTicket.ticket)
  tripTickets: TripTicket[];
}
