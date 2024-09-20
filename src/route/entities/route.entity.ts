import { Bus } from 'src/bus/entities/bus.entity';
import { RouteStop } from 'src/route-stops/entities/route-stop.entity';
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

  @OneToMany(() => Bus, (bus) => bus.routes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bus_id' })
  bus: Bus[];

  @Column({ type: 'varchar', length: 255 })
  timings: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => RouteStop, (routeStop) => routeStop.route)
  routeStop: RouteStop[];
}
