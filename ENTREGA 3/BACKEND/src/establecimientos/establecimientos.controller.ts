import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EstablecimientosService } from './establecimientos.service';
import { CreateEstablecimientoDto } from './dto/create-establecimiento.dto';
import { UpdateEstablecimientoDto } from './dto/update-establecimiento.dto';
import { FilterEstablecimientosDto } from './dto/filter-establecimientos.dto';

@Controller('establecimientos')
export class EstablecimientosController {
  constructor(
    private readonly establecimientosService: EstablecimientosService,
  ) {}

  @Post()
  create(@Body() dto: CreateEstablecimientoDto) {
    return this.establecimientosService.create(dto);
  }

  @Get()
  findAllOrFilter(@Query() filters: FilterEstablecimientosDto) {
    if (Object.keys(filters).length > 0) {
      return this.establecimientosService.findWithFilters(filters);
    }
    return this.establecimientosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.establecimientosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEstablecimientoDto,
  ) {
    return this.establecimientosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.establecimientosService.remove(id);
  }
}
