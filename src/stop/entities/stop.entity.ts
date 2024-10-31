import { BusType } from 'src/bus-type/entities/bus-type.entity';
import { District } from 'src/districts/entities/district.entity';
import { RouteStop } from 'src/route-stops/entities/route-stop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

@Entity('stops')
export class Stop {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  latitude: string;

  @Column({ type: 'varchar', nullable: true })
  longitude: string;

  @Column({ type: 'int', nullable: true })
  district_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => RouteStop, (stopRoutes) => stopRoutes.stop)
  routeStop: RouteStop[];

  @ManyToOne(() => District, (district) => district.stops, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'district_id' })
  district: District;

  @ManyToMany(() => BusType, (busType) => busType.stops)
  busTypes: BusType[];
}
