export class CategoryRequestDto {
    name: string;
}

export class CategoryResponseDto {
    category_id: string;
    name: string;

    // Partial<T> 사용하면 전달받는 객체에 필드 별 값이 없어도 에러가 나지 않음
    constructor(category: Partial<CategoryResponseDto>) {
        this.category_id = category.category_id;
        this.name = category.name;
    }
}