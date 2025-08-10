import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { SupplyModule } from "./supply/supply.module";
import { CategoryModule } from "./category/category.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {AppService} from "./app.service";

import * as redisStore from 'cache-manager-ioredis';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          cache: true
      }),
      CacheModule.registerAsync({
          isGlobal: true,
          useFactory: async () => ({
              store: redisStore as any,
              host: 'redis',
              port: 6379,
              ttl: 60
          })
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
              type: 'postgres',
              host: config.get('DB_HOST'),
              port: config.get<number>('DB_PORT'),
              username: config.get('DB_USER'),
              password: config.get('DB_PASSWORD'),
              database: config.get('DB_NAME'),
              entities: [__dirname + '/../**/*.entity{.ts,.js}'],
              synchronize: false,
          }),
      }),
      SupplyModule,
      CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
