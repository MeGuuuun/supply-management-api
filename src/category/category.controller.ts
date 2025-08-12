import {Controller, Get, Post, Body, Query, Patch, Param, Delete} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

import { CategoryService} from "./category.service";
import { Category } from "./category.entity";
import {CategoryRequestDto, CategoryResponseDto} from "./category.dto";

@ApiTags("카테고리 API")
@Controller('categories')  // URL 경로 접두사
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    // 새 카테고리 등록
    @ApiOperation({ summary: '새 카테고리 생성' })
    @Post()
    async addCategory(@Body() categoryRequestDto: CategoryRequestDto): Promise<Category> {
        console.log("controller - ", categoryRequestDto.name)
        return this.categoryService.addCategory(categoryRequestDto);
    }

    // 전체 카테고리 목록 조회(10개씩 조회)
    @ApiQuery({ name: 'page', description: '페이지 번호' })
    @ApiQuery({ name: 'limit', description: '한 페이지에 보여줄 항목 수' })
    @ApiOperation({ summary: '전체 카테고리 목록 조회' })
    @Get()
    async getAllCategories(
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return this.categoryService.findAll({page, limit});
    }

    // 카테고리 갱신
    @ApiParam({ name: 'categoryId', description: '갱신할 카테고리 ID' })
    @ApiOperation({ summary: '카테고리 갱신' })
    @Patch()
    async updateCategory(
        @Query('categoryId') id: string,
        @Body() categoryRequestDto: CategoryRequestDto
    ){
        return this.categoryService.updateCategory(id, categoryRequestDto);
    }

    // 카테고리 삭제
    @ApiParam({ name: 'categoryId', description: '삭제할 카테고리 ID' })
    @ApiOperation({ summary: '카테고리 삭제' })
    @Delete()
    async deleteCategory(@Query('categoryId') id: string){
        return this.categoryService.deleteCategory(id);
    }

}