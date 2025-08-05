import {Controller, Get, Post, Body, Query, Put} from '@nestjs/common';
import { CategoryService} from "./category.service";
import { Category } from "./category.entity";
import {CategoryRequestDto } from "./category.dto";

@Controller('categories')  // URL 경로 접두사
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    // 새 카테고리 등록
    @Post()
    async addCategory(@Body() categoryRequestDto: CategoryRequestDto): Promise<Category> {
        return this.categoryService.addCategory(categoryRequestDto);
    }

    // 전체 카테고리 목록 조회(10개씩 조회)
    @Get()
    async getAllCategories(
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return this.categoryService.findAll({page, limit});
    }

    // 카테고리 갱신


    // 카테고리 삭제

}