import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { UnitStatus } from '../entities/unit.entity';

export class CreateUnitDto {
  @IsString()
  unit_number: string;

  @IsOptional()
  @IsNumber()
  floor?: number;

  @IsOptional()
  @IsNumber()
  bedrooms?: number;

  @IsOptional()
  @IsNumber()
  bathrooms?: number;

  @IsOptional()
  @IsEnum(UnitStatus)
  status?: UnitStatus;
}
