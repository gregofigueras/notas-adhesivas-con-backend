import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle("API de notas")
    .setDescription("API para guardar notas adhesivas")
    .setVersion("1.0")
    .build(),);

  SwaggerModule.setup("docs", app, document);

  await app.listen(3002);
}

bootstrap();
