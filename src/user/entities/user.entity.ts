import { Role } from 'src/role/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Bus } from 'src/bus/entities/bus.entity';
import { Trip } from 'src/trips/entities/trip.entity';

export enum UserStatusEnum {
  ACTIVE = 'active',
  OFFLINE = 'offline',
  DEACTIVATED = 'deactivated',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export function encodedPassword(rawPassword: string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT);
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string | null;

  @ManyToOne(() => Role, (role) => role.users, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.ACTIVE,
  })
  status: UserStatusEnum;

  @Column({ type: 'varchar', nullable: true })
  email: string | null;

  @Column({ type: 'varchar', nullable: true })
  password: string | null;
  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await encodedPassword(this.password);
    }
  }

  @Column({ type: 'varchar', nullable: true })
  district: string | null;

  @Column({ type: 'varchar', nullable: true })
  pincode: string | null;

  @Column({ type: 'varchar', nullable: true })
  address: string | null;

  @Column({ type: 'varchar', nullable: true })
  profile_image: string | null;

  @Column({ type: 'timestamp', nullable: true })
  otp_timestamp: Date | null;

  @Column({ type: 'varchar', nullable: true })
  otp_secret: string | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User | null;

  @Column({ type: 'int', nullable: true })
  created_by: number;

  @OneToMany(() => Bus, (bus) => bus.owner)
  buses: Bus[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToMany(() => Bus, (bus) => bus.conductors)
  bus: Bus[];

  @OneToMany(() => Trip, (trip) => trip.conductor)
  trips: Trip[];
}
