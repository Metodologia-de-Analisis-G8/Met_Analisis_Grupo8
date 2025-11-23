import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ComparadorService } from './comparador.service';
import { CreateComparacionDto } from './dto/create-comparacion.dto';
import { FilterComparacionesDto } from './dto/filter-comparaciones.dto';

@Controller('comparador')
export class ComparadorController {
  constructor(private readonly comparadorService: ComparadorService) {}

  @Post()
  crear(@Body() dto: CreateComparacionDto) {
    return this.comparadorService.crearComparacion(dto);
  }

  @Get()
  obtenerTodas(@Query() filters: FilterComparacionesDto) {
    if (Object.keys(filters).length > 0) {
      return this.comparadorService.filtrarComparaciones(filters);
    }
    return this.comparadorService.obtenerTodas();
  }
}
