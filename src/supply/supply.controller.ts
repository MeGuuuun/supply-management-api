import { Controller, Get, Post, Body } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { SupplyRequestDto } from "./supply.dto";
import { Supply } from "./supply.entity";

@Controller('supplies')  // URL 경로 접두사
export class SupplyController {
    constructor(private readonly supplyService: SupplyService) {}

    @Post()
    async addSupply(@Body() supplyRequestDto: SupplyRequestDto): Promise<Supply> {
        return this.supplyService.addSupply(supplyRequestDto);
    }
}