import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
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

    // 새 카테고리 등록
    async addCategory(categoryRequestDto: CategoryRequestDto): Promise<Category> {
        const newCategory = this.categoryRepository.create({name: categoryRequestDto.name});
        console.log("service - ", categoryRequestDto.name)
        return await this.categoryRepository.save(newCategory);
    }

    // 카테고리 전체 조회
    async findAll(pagination: { page: number; limit: number }): Promise<{ data: CategoryResponseDto[]; total: number; page: number; limit: number }> {
        try {
            const { page, limit } = pagination;
            // findAndCount 조건에 맞는 데이터 조회 후 개수도 반환
            const [categories, total] = await this.categoryRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
            });

            if (!categories || categories.length === 0) {
                // 데이터가 없을 경우 예외 던지기
                throw new NotFoundException('카테고리를 찾을 수 없습니다.');
            }

            const data = categories.map(category => new CategoryResponseDto(category));

            return {
                data,
                total,
                page,
                limit,
            };
        }catch(error){
            console.error('데이터베이스 조회 중 오류 발생:', error);
            throw new InternalServerErrorException('데이터베이스 조회 중 오류가 발생했습니다.');
        }
    }

    // 카테고리 정보 갱신
    async updateCategory(id: string, categoryRequestDto: CategoryRequestDto): Promise<Category> {
        try {
            // 수정하려는 id의 카테고리 조회
            const category = await this.categoryRepository.findOneBy({category_id: id});
            // 없을 시 예외 처리
            if(!category){
                throw new NotFoundException('갱신하려는 카테고리를 찾을 수 없습니다.');
            }

            // dto로 전달된 값들만 기존 엔티티에 덮어쓰기
            Object.assign(category, categoryRequestDto);

            // 수정된 엔티티 다시 db에 저장
            return await this.categoryRepository.save(category);
        }catch(error){
            throw new InternalServerErrorException('카테고리 갱신에 에러가 발생했습니다.');
        }
    }

    // 카테고리 삭제
    async deleteCategory(id: string): Promise<boolean> {
        const result = await this.categoryRepository.delete({category_id:id});
        // affected : 필드가 삭제된 레코드 수
        return result.affected > 0 // 삭제된 행이 1개 이상이면 true, 없다면 false
    }

}