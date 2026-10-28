import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CrearNotaDto {
  @ApiProperty({ example: "Comprar ingredientes" })
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @ApiProperty({ example: "Comprar leche y pan" })
  @IsString()
  @IsNotEmpty()
  contenido!: string;

  @ApiProperty({ example: "#fff3a6" })
  @IsString()
  @IsNotEmpty()
  color!: string;

  @ApiProperty({ example: 30 })
  @IsInt()
  @Min(1)
  minutos!: number;
}
