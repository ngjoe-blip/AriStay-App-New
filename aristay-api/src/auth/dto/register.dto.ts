import { IsEmail, IsString, MinLength, MaxLength, IsEnum } from 'class-validator';
import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  full_name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(15)
  phone: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.CLEANING;
}
