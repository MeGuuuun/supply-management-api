import {Controller, Get, Post, Body, Query, Put, Patch, Param, Delete} from '@nestjs/common';
import { CategoryService} from "./category.service";
import { Category } from "./category.entity";
import {CategoryRequestDto, CategoryResponseDto} from "./category.dto";

@Controller('categories')  // URL 경로 접두사
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    // 새 카테고리 등록
    @Post()
    async addCategory(@Body() categoryRequestDto: CategoryRequestDto): Promise<Category> {
        console.log("controller - ", categoryRequestDto.name)
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
    @Patch(':categoryId')
    async updateCategory(
        @Param('categoryId') id: string,
        @Body() categoryRequestDto: CategoryRequestDto
    ){
        return this.categoryService.updateCategory(id, categoryRequestDto);
    }

    // 카테고리 삭제
    @Delete(':categoryId')
    async deleteCategory(@Param('categoryId') id: string){
        return this.categoryService.deleteCategory(id);
    }

}