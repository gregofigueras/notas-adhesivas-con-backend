import {Body, Controller, Delete, Get,  Param,  ParseIntPipe,  Post,} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CrearNotaDto } from "./dto/crear-nota.dto";
import { NotasService } from "./notas.service";

@ApiTags("notas")
@Controller("notas")
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Get()
  buscarTodas() {
    return this.notasService.buscarTodas();
  }

  @Post()
  crear(@Body() datos: CrearNotaDto) {
    return this.notasService.crear(datos);
  }

  @Delete(":id")
  eliminar(@Param("id", ParseIntPipe) id: number) {
    return this.notasService.eliminar(id);
  }
}
