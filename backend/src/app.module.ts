import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
import { NotasModule } from "./notas/notas.module";

@Module({
  imports: [NotasModule],
  controllers: [HealthController],
})
export class AppModule {}
