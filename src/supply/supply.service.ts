import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supply } from './supply.entity';
import { SupplyRequestDto } from "./supply.dto";
import { SupplyResponseDto } from "./supply.dto";

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class SupplyService {
    constructor(
        @InjectRepository(Supply)
        private readonly supplyRepository: Repository<Supply>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,

    ) {}

    async addSupply(supplyRequestDto: SupplyRequestDto): Promise<Supply> {
        const newSupply = this.supplyRepository.create(supplyRequestDto); // 엔티티 인스턴스 생성
        return await this.supplyRepository.save(newSupply); // DB에 저장
    }

    async findAll(pagination: { page: number; limit: number }): Promise<{ data: Supply[]; total: number; page: number; limit: number }> {
        const { page, limit } = pagination;

        const cacheKey = `supply_all_page_${page}_limit_${limit}`;
        const cached = await this.cacheManager.get<string>(cacheKey);

        if (cached) {
            console.log('캐시에서 불러옴');
            return JSON.parse(cached);
        }

        const [supplies, total] = await this.supplyRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });

        const result = {
            data: supplies,
            total,
            page,
            limit,
        };

        await this.cacheManager.set(cacheKey, JSON.stringify(result), 60); // TTL 60초

        console.log('DB에서 불러와 캐시 저장');
        return result;
    }


    async getSuppliesByCategory(id:string, pagination: {page:number; limit:number}): Promise<{data: SupplyResponseDto[]; total: number; page: number; limit:number}> {
        const {page, limit } = pagination;

        const [supplies, total ] = await this.supplyRepository.findAndCount({
            where: {
                category: {
                    category_id: id
                }
            },
            relations: ['category'],
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

    async getSupplyInfo(id: string): Promise<SupplyResponseDto>{
        const supply = await this.supplyRepository.findOne({
            where: {
                category: {
                    category_id: id
                }
            },
            relations: ['category']
        });

        return new SupplyResponseDto(supply);

    }

    async updateSupply(id:string, supplyRequestDto: SupplyRequestDto):Promise<Supply>{
        const supply = await this.supplyRepository.findOneBy({supply_id:id});

        // 예외 처리
        if(!supply){
            console.log("찾으려는 비품 없음");
        }

        Object.assign(supply, supplyRequestDto);

        return await this.supplyRepository.save(supply)
    }
}