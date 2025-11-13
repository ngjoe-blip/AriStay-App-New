import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('properties')
@UseGuards(JwtAuthGuard)
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async createProperty(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.createProperty(createPropertyDto);
  }

  @Get()
  async findAllProperties() {
    return this.propertiesService.findAllProperties();
  }

  @Get(':id')
  async findPropertyById(@Param('id') id: string) {
    return this.propertiesService.findPropertyById(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateProperty(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.updateProperty(id, updatePropertyDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteProperty(@Param('id') id: string) {
    return this.propertiesService.deleteProperty(id);
  }

  @Get(':propertyId/units')
  async findUnitsByProperty(@Param('propertyId') propertyId: string) {
    return this.propertiesService.findUnitsByProperty(propertyId);
  }

  @Get('units/:id')
  async findUnitById(@Param('id') id: string) {
    return this.propertiesService.findUnitById(id);
  }
}
