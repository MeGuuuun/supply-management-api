import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupplyModule } from "./supply/supply.module";
import { CategoryModule } from "./category/category.module";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',         // or your DB host
          port: 5432,
          username: 'jiminpark',
          password: '1234',
          database: 'supply_management',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: true,     // 쿼리 로그 확인용
      }),
      SupplyModule,
      CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
