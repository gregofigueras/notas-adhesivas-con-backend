import { Module } from "@nestjs/common";
import { NotasController } from "./notas.controller";
import { NotasRepository } from "./notas.repository";
import { NotasService } from "./notas.service";

@Module({
  controllers: [NotasController],
  providers: [NotasService, NotasRepository],
})
export class NotasModule {}
