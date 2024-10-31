import { Route } from 'src/route/entities/route.entity';
import { Stop } from 'src/stop/entities/stop.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('route_stops')
export class RouteStop {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Stop, (stop) => stop.routeStop, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'stop_id' })
  stop: Stop;

  @Column({ type: 'int', nullable: true })
  stop_id: number;

  @Column({ type: 'int', nullable: true })
  route_id: number;

  @ManyToOne(() => Route, (route) => route.routeStop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'route_id' })
  route: Route;

  @Column({ type: 'decimal', precision: 10, scale: 0, nullable: false })
  distance_from_start: number;

  @Column({ type: 'time', nullable: true })
  time_from_start: string;

  @Column({ type: 'bool', nullable: true })
  is_starting_point: boolean;

  @Column({ type: 'bool', nullable: true })
  is_destination: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
