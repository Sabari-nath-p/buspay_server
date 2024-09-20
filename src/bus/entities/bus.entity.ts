import { BusType } from 'src/bus-type/entities/bus-type.entity';
import { District } from 'src/districts/entities/district.entity';
import { Preference } from 'src/preference/entities/preference.entity';
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
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('buses')
export class Bus {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  bus_no: string | null;

  @Column({ type: 'int', nullable: true })
  owner_id: number | null;

  @Column({ type: 'int', nullable: true })
  bus_type_id: number;

  @ManyToOne(() => BusType, (busType) => busType.buses, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'bus_type_id' })
  busType: BusType;

  @ManyToOne(() => User, (user) => user.buses, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: User | null;

  @Column({ type: 'int' })
  no_seats: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToMany(() => Preference, (preference) => preference.buses)
  @JoinTable({
    name: 'bus_preference', // This is the join table name
    joinColumn: { name: 'bus_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'preference_id', referencedColumnName: 'id' },
  })
  preferences: Preference[];

  @ManyToOne(() => District, (district) => district.buses, {
    onDelete: 'CASCADE',
  })
  district: District;

  @ManyToMany(() => User, (user) => user.buses)
  @JoinTable({
    name: 'bus_conductors', 
    joinColumn: { name: 'bus_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  conductors: User[];
}
