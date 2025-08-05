import { ApiProperty } from '@nestjs/swagger';

export class SupplyRequestDto {
    @ApiProperty({ example: '연필', description: '비품 이름'})
    name: string;

    @ApiProperty({ example: 10 , description: '비품 수량'})
    quantity: number;

    @ApiProperty({ example: 'uid', description: '카테고리 id'})
    categoryId: string;
}

export class SupplyResponseDto {
    @ApiProperty({ example: 'uid', description: '비품 id'})
    supply_id: string;

    @ApiProperty({ example: '연필', description: '비품 이름'})
    name: string;

    @ApiProperty({ example: 10 , description: '비품 수량'})
    quantity: number;

    @ApiProperty({ example: '사용 가능', description: '비품 상태'})
    status: string;

    @ApiProperty({ example: 'uid', description: '카테고리 id'})
    categoryId: string;

    constructor(supply: Partial<SupplyResponseDto>) {
        this.supply_id = supply.supply_id;
        this.name = supply.name;
        this.quantity = supply.quantity;
        this.status = supply.status;
        this.categoryId = supply.categoryId;
    }
}