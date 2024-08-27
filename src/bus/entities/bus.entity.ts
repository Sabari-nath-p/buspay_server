import { Route } from 'src/route/entities/route.entity';
import { User } from 'src/user/entities/user.entity';
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

@Entity('bus')
export class Bus {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  bus_no: string | null;

  @Column({ type: 'int', nullable: true })
  owner_id: number | null;

  @ManyToOne(() => User, (user) => user.buses, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: User | null;

  @OneToMany(() => Route, (route) => route.bus)
  routes: Route[];

  @Column({ type: 'int' })
  no_trips_per_day: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
