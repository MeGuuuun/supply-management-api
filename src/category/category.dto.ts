import { ApiProperty } from '@nestjs/swagger';

export class CategoryRequestDto {
    @ApiProperty({ example: '학용품', description: '카테고리 이름'})
    name: string;
}

export class CategoryResponseDto {
    @ApiProperty({ example: 'uuid', description: '카테고리 id'})
    category_id: string;

    @ApiProperty({ example: '학용품', description: '카테고리 이름'})
    name: string;

    // Partial<T> 사용하면 전달받는 객체에 필드 별 값이 없어도 에러가 나지 않음
    constructor(category: Partial<CategoryResponseDto>) {
        this.category_id = category.category_id;
        this.name = category.name;
    }
}