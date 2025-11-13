import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { Unit } from './entities/unit.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
  ) {}

  async createProperty(createPropertyDto: CreatePropertyDto) {
    const property = this.propertyRepository.create(createPropertyDto);
    return this.propertyRepository.save(property);
  }

  async findAllProperties() {
    return this.propertyRepository.find();
  }

  async findPropertyById(id: string) {
    const property = await this.propertyRepository.findOneBy({ id });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return property;
  }

  async updateProperty(id: string, updatePropertyDto: UpdatePropertyDto) {
    await this.findPropertyById(id);
    await this.propertyRepository.update(id, updatePropertyDto);
    return this.findPropertyById(id);
  }

  async deleteProperty(id: string) {
    const property = await this.findPropertyById(id);
    await this.propertyRepository.delete(id);
    return property;
  }

  async findUnitsByProperty(propertyId: string) {
    await this.findPropertyById(propertyId);
    return this.unitRepository.findBy({ property_id: propertyId });
  }

  async findUnitById(id: string) {
    const unit = await this.unitRepository.findOneBy({ id });
    if (!unit) {
      throw new NotFoundException('Unit not found');
    }
    return unit;
  }
}
