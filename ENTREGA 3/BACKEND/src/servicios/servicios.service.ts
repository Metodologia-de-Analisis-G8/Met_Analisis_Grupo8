import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Servicio } from './schemas/servicio.schema';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { FilterServiciosDto } from './dto/filter-servicios.dto';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectModel(Servicio.name)
    private servicioModel: Model<Servicio>,
  ) {}

  async create(dto: CreateServicioDto) {
    const nuevo = new this.servicioModel(dto);
    return nuevo.save();
  }

  async findAll() {
    return this.servicioModel.find();
  }

  async findWithFilters(filters: FilterServiciosDto) {
    const query: any = {};

    if (filters.nombre)
      query.nombre = { $regex: filters.nombre, $options: 'i' };

    if (filters.categoria)
      query.categoria = filters.categoria;

    if (filters.ubicacion)
      query.ubicacion = { $regex: filters.ubicacion, $options: 'i' };

    return this.servicioModel.find(query);
  }

  async findOne(id: string) {
    const servicio = await this.servicioModel.findById(id);
    if (!servicio) throw new NotFoundException('Servicio no encontrado');
    return servicio;
  }

  async update(id: string, dto: UpdateServicioDto) {
    const actualizado = await this.servicioModel.findByIdAndUpdate(
      id,
      dto,
      { new: true },
    );
    if (!actualizado)
      throw new NotFoundException('Servicio no encontrado');

    return actualizado;
  }

  async remove(id: string) {
    const eliminado = await this.servicioModel.findByIdAndDelete(id);
    if (!eliminado)
      throw new NotFoundException('Servicio no encontrado');

    return eliminado;
  }
}
