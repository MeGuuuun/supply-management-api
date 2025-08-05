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
        const newCategory = this.categoryRepository.create({name: categoryRequestDto.name});
        console.log("service - ", categoryRequestDto.name)
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

    async updateCategory(id: string, categoryRequestDto: CategoryRequestDto): Promise<Category> {
        // 수정하려는 id의 카테고리 조회
        const category = await this.categoryRepository.findOneBy({category_id: id});
        // 없을 시 예외 처리
        if(!category){
            console.log("찾으려는 카테고리 없음");
        }

        // dto로 전달된 값들만 기존 엔티티에 덮어쓰기
        Object.assign(category, categoryRequestDto);

        // 수정된 엔티티 다시 db에 저장
        return await this.categoryRepository.save(category);
    }

    async deleteCategory(id: string): Promise<boolean> {
        const result = await this.categoryRepository.delete({category_id:id});
        // affected : 필드가 삭제된 레코드 수
        return result.affected > 0 // 삭제된 행이 1개 이상이면 true, 없다면 false
    }

}