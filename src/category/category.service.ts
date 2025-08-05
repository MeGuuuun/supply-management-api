import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from "./category.entity";
import { CategoryRequestDto } from "./category.dto";
import { CategoryResponseDto } from "./category.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async addCategory(categoryRequestDto: CategoryRequestDto): Promise<Category> {
        const newCategory = this.categoryRepository.create(categoryRequestDto);
        return await this.categoryRepository.save(newCategory);
    }

    async findAll(pagination: { page: number; limit: number }): Promise<{ data: CategoryResponseDto[]; total: number; page: number; limit: number }> {
        const { page, limit } = pagination;
        // findAndCount 조건에 맞는 데이터 조회 후 개수도 반환
        const [categories, total] = await this.categoryRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });

        const data = categories.map(category => new CategoryResponseDto(category));

        return {
            data,
            total,
            page,
            limit,
        };
    }

}