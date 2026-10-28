import { NotFoundException } from "@nestjs/common";
import { CrearNotaDto } from "./dto/crear-nota.dto";
import { Nota } from "./nota.interface";
import { NotasRepository } from "./notas.repository";
import { NotasService } from "./notas.service";

describe("NotasService", () => {
  let service: NotasService;
  let repository: jest.Mocked<NotasRepository>;

  beforeEach(() => {
    repository = {
      buscarTodas: jest.fn(),
      guardar: jest.fn(),
      eliminar: jest.fn(),
    } as unknown as jest.Mocked<NotasRepository>;
    service = new NotasService(repository);
  });

  it("devuelve todas las notas", async () => {
    const notas: Nota[] = [];
    repository.buscarTodas.mockResolvedValue(notas);

    expect(await service.buscarTodas()).toBe(notas);
  });

  it("crea una nota usando el repositorio", async () => {
    const datos: CrearNotaDto = {
      titulo: "Tarea",
      contenido: "Estudiar Nest",
      color: "#fff3a6",
      minutos: 30,
    };
    repository.guardar.mockImplementation(async (nota) => nota);

    const resultado = await service.crear(datos);

    expect(resultado).toMatchObject(datos);
    expect(repository.guardar).toHaveBeenCalledWith(resultado);
  });

  it("lanza un error si no se puede borrar la nota", async () => {
    repository.eliminar.mockResolvedValue(false);

    await expect(service.eliminar(10)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
