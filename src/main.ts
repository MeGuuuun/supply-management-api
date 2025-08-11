import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/exception.fiilter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Supply Management API')
        .setDescription('API 문서 예제')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);// Swagger UI를 /api 경로에 띄움

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,            // DTO에 정의되지 않은 필드는 자동으로 제거
            forbidNonWhitelisted: true, // DTO에 정의되지 않은 필드가 있으면 에러를 반환
            transform: true,            // 요청 데이터를 DTO 객체로 변환
        })
    );

    // 전역 예외 필터 등록
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(3000, '0.0.0.0');
}
bootstrap();
