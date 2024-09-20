import { Bus } from 'src/bus/entities/bus.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'districts' })
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Bus, (bus) => bus.district)
  buses: Bus[];
}
