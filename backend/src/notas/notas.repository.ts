import { Injectable } from "@nestjs/common";
import { promises as fs } from "fs";
import * as path from "path";
import { Nota } from "./nota.interface";

@Injectable()
export class NotasRepository {
  private readonly archivo = path.join(process.cwd(), "data", "notas.json");

  async buscarTodas(): Promise<Nota[]> {
    const contenido = await fs.readFile(this.archivo, "utf8");
    return JSON.parse(contenido) as Nota[];
  }

  async guardar(nota: Nota): Promise<Nota> {
    const notas = await this.buscarTodas();
    notas.push(nota);
    await this.guardarTodas(notas);
    return nota;
  }

  async eliminar(id: number): Promise<boolean> {
    const notas = await this.buscarTodas();
    const notasNuevas = notas.filter((nota) => nota.id !== id);

    if (notas.length === notasNuevas.length) {
      return false;
    }

    await this.guardarTodas(notasNuevas);
    return true;
  }

  private async guardarTodas(notas: Nota[]) {
    await fs.writeFile(this.archivo, JSON.stringify(notas, null, 2));
  }
}
