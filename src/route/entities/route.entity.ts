import { Bus } from 'src/bus/entities/bus.entity';
import { District } from 'src/districts/entities/district.entity';
import { RouteBus } from 'src/route-bus/entities/route-bus.entity';
import { RouteStop } from 'src/route-stops/entities/route-stop.entity';
import { Trip } from 'src/trips/entities/trip.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_distance: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => RouteStop, (routeStop) => routeStop.route)
  routeStop: RouteStop[];

  @ManyToOne(() => District, (district) => district.routes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'district_id' })
  district: District;

  @OneToMany(() => RouteBus, (routeBus) => routeBus.route)
  routeBus: RouteBus[];

  @OneToMany(() => Trip, (trip) => trip.route)
  trips: Trip[];
}
