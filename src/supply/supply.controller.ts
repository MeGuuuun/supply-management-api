import {Controller, Get, Post, Body, Param, Query} from '@nestjs/common';
import { SupplyService } from './supply.service';
import { SupplyRequestDto } from "./supply.dto";
import { Supply } from "./supply.entity";

@Controller('supplies')  // URL 경로 접두사
export class SupplyController {
    constructor(private readonly supplyService: SupplyService) {}

    // 새 비품 등록
    @Post()
    async addSupply(@Body() supplyRequestDto: SupplyRequestDto): Promise<Supply> {
        return this.supplyService.addSupply(supplyRequestDto);
    }

    // 전체 비품 목록 조회(Redis 사용)

    // 특정 카테고리에 속한 비품 조회
    @Get(':categoryId')
    async getSuppliesByCategory(
        @Param('categoryId') id: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return this.supplyService.getSuppliesByCategory(id, { page, limit});
    }

    // 특정 비품 상세 조회

    // 특정 비품 정보 수정
}