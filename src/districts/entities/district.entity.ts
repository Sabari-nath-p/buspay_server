import { Bus } from 'src/bus/entities/bus.entity';
import { Route } from 'src/route/entities/route.entity';
import { State } from 'src/states/entities/state.entity';
import { Stop } from 'src/stop/entities/stop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'districts' })
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  state_id: string;

  @OneToMany(() => Bus, (bus) => bus.district)
  buses: Bus[];

  @OneToMany(() => Stop, (stop) => stop.district)
  stops: Stop[];

  @OneToMany(() => Route, (route) => route.district)
  routes: Route[];

  @ManyToOne(() => State, (state) => state.districts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'state_id' })
  state: State;
}
