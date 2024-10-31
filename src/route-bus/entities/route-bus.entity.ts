import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Route } from 'src/route/entities/route.entity';
import { Bus } from 'src/bus/entities/bus.entity';

@Entity('route_bus')
export class RouteBus {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Route, (route) => route.routeBus, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'route_id' })
  route: Route;

  @ManyToOne(() => Bus, (bus) => bus.routeBus, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bus_id' })
  bus: Bus;

  @Column({ type: 'int', nullable: true })
  bus_id: number;

  @Column({ type: 'int', nullable: true })
  route_id: number;

  @Column({ type: 'time', nullable: true })
  start_timing: string;

  @Column({ type: 'json', default: [] })
  days_of_week: string[]; // JSON array to store days like ['Monday', 'Wednesday']

  @Column({ type: 'time', nullable: true })
  finish_timing: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
