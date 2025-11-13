import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ForeignKey } from 'typeorm';
import { Property } from './property.entity';

export enum UnitStatus {
  READY = 'Ready',
  OCCUPIED = 'Occupied',
  MAINTENANCE = 'Maintenance',
  BLOCKED = 'Blocked',
}

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ForeignKey(() => Property)
  @Column({ type: 'uuid' })
  property_id: string;

  @ManyToOne(() => Property, { onDelete: 'CASCADE' })
  property: Property;

  @Column({ type: 'varchar' })
  unit_number: string;

  @Column({ type: 'integer', nullable: true })
  floor: number;

  @Column({ type: 'integer', nullable: true })
  bedrooms: number;

  @Column({ type: 'integer', nullable: true })
  bathrooms: number;

  @Column({ type: 'enum', enum: UnitStatus, default: UnitStatus.READY })
  status: UnitStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
