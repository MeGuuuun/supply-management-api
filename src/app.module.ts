import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import {AppService} from "./app.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-ioredis';
import { CacheModule } from '@nestjs/cache-manager';

import { CategoryModule } from "./category/category.module";
import { SupplyModule } from "./supply/supply.module";
import { UserModule} from "./user/user.module";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          cache: true
      }),
      CacheModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          isGlobal: true,
          useFactory: async (config: ConfigService) => ({
              store: redisStore as any,
              host: config.get('REDIS_HOST'),
              port: config.get<number>('REDIS_PORT'),
              ttl: config.get<number>('REDIS_TTL')
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
      UserModule,
      SupplyModule,
      CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
