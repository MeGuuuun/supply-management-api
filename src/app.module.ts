import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupplyModule } from "./supply/supply.module";
import { CategoryModule } from "./category/category.module";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
              type: 'postgres',
              host: config.get<string>('DB_HOST'),
              port: config.get<number>('DB_PORT'),
              username: config.get<string>('DB_USER'),
              password: config.get<string>('DB_PASSWORD'),
              database: config.get<string>('DB_NAME'),
              entities: [__dirname + '/../**/*.entity{.ts,.js}'],
              synchronize: true,
          }),
      }),
      SupplyModule,
      CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
