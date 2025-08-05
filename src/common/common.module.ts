import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeedService } from "./seed.service";
import { Category } from "../category/category.entity";
import { Supply } from "../supply/supply.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category, Supply])],
    providers: [SeedService]
})

export class CommonModule {}
