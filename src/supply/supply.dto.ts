import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class SupplyRequestDto {
    @ApiProperty({ example: '연필', description: '비품 이름'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 10 , description: '비품 수량'})
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    quantity: number;

    @ApiProperty({ example: 'uid', description: '카테고리 id'})
    category_id: string;
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
    category_id: string;

    constructor(supply: Partial<SupplyResponseDto>) {
        this.supply_id = supply.supply_id;
        this.name = supply.name;
        this.quantity = supply.quantity;
        this.status = supply.status;
        this.category_id = supply.category_id;
    }
}

export class RentRequestDto {
    @ApiProperty({ example: 'uuid' , description: '비품 ID'})
    @IsNotEmpty()
    supply_id: string;

    @ApiProperty({ example: 'uuid' , description: '사용자 ID'})
    @IsNotEmpty()
    user_id:string;

    @ApiProperty({ example: 2 , description: '대여할 비품의 수량'})
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;

    @ApiProperty({ example: "대여 중", description: '대여할 비품의 상태'})
    @IsNotEmpty()
    status:string;
}

export class ReturnRequestDto {
    @ApiProperty({ example: "uuid", description: '대여 ID'})
    @IsNotEmpty()
    rent_id: string;
}