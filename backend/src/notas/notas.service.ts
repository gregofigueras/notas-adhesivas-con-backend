import { Injectable, NotFoundException } from "@nestjs/common";
import { CrearNotaDto } from "./dto/crear-nota.dto";
import { Nota } from "./nota.interface";
import { NotasRepository } from "./notas.repository";

@Injectable()
export class NotasService {
  constructor(private readonly notasRepository: NotasRepository) {}

  async buscarTodas(): Promise<Nota[]> {
    return this.notasRepository.buscarTodas();
  }

  async crear(datos: CrearNotaDto): Promise<Nota> {
    const nota: Nota = {
      id: Date.now(),
      ...datos,
    };

    return this.notasRepository.guardar(nota);
  }

  async eliminar(id: number): Promise<void> {
    const eliminada = await this.notasRepository.eliminar(id);

    if (!eliminada) {
      throw new NotFoundException("No se encontró la nota.");
    }
  }
}
