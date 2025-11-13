import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ForeignKey } from 'typeorm';
import { Unit } from '../../properties/entities/unit.entity';
import { User } from '../../users/entities/user.entity';

export enum TaskType {
  CLEANING = 'Cleaning',
  MAINTENANCE = 'Maintenance',
  LAUNDRY = 'Laundry',
  LAWNPOOL = 'LawnPool',
  TODO = 'ToDo',
}

export enum TaskStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'InProgress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  OVERDUE = 'Overdue',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ForeignKey(() => Unit)
  @Column({ type: 'uuid', nullable: true })
  unit_id: string;

  @ManyToOne(() => Unit, { onDelete: 'SET NULL' })
  unit: Unit;

  @ForeignKey(() => User)
  @Column({ type: 'uuid', nullable: true })
  assignee_id: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  assignee: User;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: TaskType })
  type: TaskType;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: 'timestamp', nullable: true })
  due_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
