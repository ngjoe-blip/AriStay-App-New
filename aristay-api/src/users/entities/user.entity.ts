import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

export enum UserRole {
  ADMIN = 'Admin',
  CLEANING = 'Cleaning',
  MAINTENANCE = 'Maintenance',
  LAUNDRY = 'Laundry',
  LAWNPOOL = 'LawnPool',
}

export enum UserStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password_hash: string;

  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLEANING })
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ type: 'varchar', nullable: true })
  avatar_url: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
