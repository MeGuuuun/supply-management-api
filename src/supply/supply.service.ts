import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supply } from './supply.entity';
import { SupplyRequestDto } from "./supply.dto";
import { SupplyResponseDto } from "./supply.dto";

@Injectable()
export class SupplyService {
    constructor(
        @InjectRepository(Supply)
        private readonly supplyRepository: Repository<Supply>,
    ) {}

    async addSupply(supplyRequestDto: SupplyRequestDto): Promise<Supply> {
        const newSupply = this.supplyRepository.create(supplyRequestDto); // 엔티티 인스턴스 생성
        return await this.supplyRepository.save(newSupply); // DB에 저장
    }

    async getSuppliesByCategory(id:string, pagination: {page:number; limit:number}): Promise<{data: SupplyResponseDto[]; total: number; page: number; limit:number}> {
        const {page, limit } = pagination;

        const [supplies, total ] = await this.supplyRepository.findAndCount({
            where: {
                categoryId: id
            },
            skip: (page -1 ) * limit,
            take: limit
        });

        // 예외 처리 잡기
        const data : SupplyResponseDto[] = supplies.map(supply=> new SupplyResponseDto(supply));

        return {
            data,
            total,
            page,
            limit
        }
    }
}