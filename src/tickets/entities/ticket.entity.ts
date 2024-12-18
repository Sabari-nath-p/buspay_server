import { BusType } from 'src/bus-type/entities/bus-type.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { Stop } from 'src/stop/entities/stop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
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

  @ManyToOne(() => Stop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boarding_stop_id' })
  boardingStop: Stop;

  @Column()
  boarding_stop_id: number;

  @ManyToOne(() => Stop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'destination_stop_id' })
  destinationStop: Stop;

  @Column()
  destination_stop_id: number;

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
}
