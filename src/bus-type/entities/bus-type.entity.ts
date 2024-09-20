import { Bus } from 'src/bus/entities/bus.entity';
import { Stop } from 'src/stop/entities/stop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('bus_types')
export class BusType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  minimum_fare: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  minimum_kilometer: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  fare_per_kilometer: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Bus, (bus) => bus.busType)
  buses: Bus[];

  @ManyToMany(() => Stop, (stop) => stop.busTypes)
  @JoinTable({
    name: 'bus_type_stops',
    joinColumn: {
      name: 'bus_type_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'stop_id',
      referencedColumnName: 'id',
    },
  })
  stops: Stop[];
}
