import { Role } from 'src/role/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserType {
  SUPER_ADMIN = 'super_admin',
  BUS_OWNER = 'bus_owner',
  END_USER = 'end_user',
  CONDUCTOR = 'conductor',
}

export enum UserStatus {
  ACTIVE = 'active',
  OFFLINE = 'offline',
  DEACTIVATED = 'deactivated',
  SUSPENDED = 'suspended',
}

export function encodedPassword(rawPassword: string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT);
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string | null;

  @Column({
    type: 'enum',
    enum: UserType,
    enumName: 'UserTypeEnum',
  })
  user_type: UserType;

  @Column({
    type: 'enum',
    enum: UserStatus,
    enumName: 'UserStatusEnum',
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ type: 'varchar', nullable: true })
  email: string | null;

  @Column()
  password: string;
  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await encodedPassword(this.password);
    }
  }

  @Column({ type: 'varchar', nullable: true })
  lattitude: string | null;

  @Column({ type: 'varchar', nullable: true })
  longitude: string | null;

  @Column({ type: 'varchar', nullable: true })
  profile_image: string | null;

  @Column({ type: 'timestamp', nullable: true })
  otp_timestamp: Date | null;

  @Column({ type: 'varchar', nullable: true })
  otp_secret: string | null;

  @Column({ type: 'int', nullable: true })
  created_by: number | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  creator: User | null;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles: Role[];
}
