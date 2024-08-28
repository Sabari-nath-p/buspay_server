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

  @ManyToOne(() => Route, (route) => route.routeStop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'route_id' })
  route: Route;

  @Column({ type: 'int' })
  route_order: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
