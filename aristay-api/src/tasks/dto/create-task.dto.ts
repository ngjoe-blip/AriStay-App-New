import { IsString, IsOptional, IsEnum, IsUUID, IsDateString } from 'class-validator';
import { TaskType } from '../entities/task.entity';

export class CreateTaskDto {
  @IsOptional()
  @IsUUID()
  unit_id?: string;

  @IsOptional()
  @IsUUID()
  assignee_id?: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TaskType)
  type: TaskType;

  @IsOptional()
  @IsDateString()
  due_date?: string;
}
