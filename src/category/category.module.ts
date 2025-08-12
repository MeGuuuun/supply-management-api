import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from "./category.entity";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import {SupplyModule} from "../supply/supply.module";
import {Supply} from "../supply/supply.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category, Supply]), SupplyModule],
    providers: [CategoryService],
    controllers: [CategoryController],
})
export class CategoryModule {}