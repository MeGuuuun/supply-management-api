import {Controller, Get, Post, Body, Param, Query, Patch} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

import { SupplyService } from './supply.service';
import {SupplyRequestDto, SupplyResponseDto} from "./supply.dto";
import { Supply } from "./supply.entity";

@ApiTags("비품 API")
@Controller('supplies')  // URL 경로 접두사
export class SupplyController {
    constructor(private readonly supplyService: SupplyService) {}

    // 새 비품 등록
    @ApiOperation({ summary: '새 비품 등록' })
    @Post()
    async addSupply(@Body() supplyRequestDto: SupplyRequestDto): Promise<Supply> {
        return this.supplyService.addSupply(supplyRequestDto);
    }

    // 전체 비품 목록 조회(Redis 사용)
    @ApiOperation({ summary: '전체 비품 조회' })
    @ApiQuery({ name: 'page', description: '페이지 번호' })
    @ApiQuery({ name: 'limit', description: '한 페이지에 보여줄 항목 수' })
    @Get()
    async getAllSupplies(
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return this.supplyService.findAll({page, limit});
    }

    // 특정 카테고리에 속한 비품 조회
    @ApiParam({name: 'categoryId', description: '카테고리 id'})
    @ApiQuery({ name: 'page', description: '페이지 번호' })
    @ApiQuery({ name: 'limit', description: '한 페이지에 보여줄 항목 수' })
    @ApiOperation({ summary: '특정 카테고리에 속한 비품 조회' })
    @Get('/by-category/:categoryId')
    async getSuppliesByCategory(
        @Param('categoryId') id: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return this.supplyService.getSuppliesByCategory(id, { page, limit});
    }

    // 특정 비품 상세 조회
    @ApiParam({name: 'supplyId', description:'비품 id'})
    @ApiOperation({summary: '특정 비품 상세 조회'})
    @Get(':supplyId')
    async getSupplyInfo(
        @Param('supplyId') id: string
    ) {
        return this.supplyService.getSupplyInfo(id);
    }

    // 특정 비품 정보 수정
    @ApiParam({name: 'supplyId', description:'비품 id'})
    @ApiOperation({summary: '특정 비품 정보 수정'})
    @Patch(':supplyId')
    async updateSupply(
        @Param('supplyId') id:string,
        @Body() supplyRequestDto: SupplyRequestDto
    ){
        return this.supplyService.updateSupply(id, supplyRequestDto);
    }

}