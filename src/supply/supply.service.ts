import {Inject, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
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

    // 새 비품 등록
    async addSupply(supplyRequestDto: SupplyRequestDto): Promise<Supply> {
        const newSupply = this.supplyRepository.create(supplyRequestDto); // 엔티티 인스턴스 생성

        return await this.supplyRepository.save(newSupply); // DB에 저장
    }

    // 비품 목록 전체 조회
    async findAll(pagination: { page: number; limit: number }): Promise<{ data: Supply[]; total: number; page: number; limit: number }> {
        const { page, limit } = pagination;

        const cacheKey = `supply_all`;
        const cached = await this.cacheManager.get<string>(cacheKey);

        if (cached) {
            console.log('캐시에서 불러옴');
            return JSON.parse(cached);
        }

        try {
            const [supplies, total] = await this.supplyRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
            });

            if (!supplies || supplies.length === 0) {
                // 데이터가 없을 경우 예외 던지기
                throw new NotFoundException('비품을 찾을 수 없습니다.');
            }

            const result = {
                data: supplies,
                total,
                page,
                limit,
            };

            // 캐시 저장
            await this.cacheManager.set(cacheKey, JSON.stringify(result), 60000); // TTL 60초
            console.log('DB에서 불러와 캐시 저장');

            return result;
        }catch(error) {
            // DB 조회 중 오류가 발생하면 InternalServerErrorException 던지기
            console.error('데이터베이스 조회 중 오류 발생:', error);
            throw new InternalServerErrorException('데이터베이스 조회 중 오류가 발생했습니다.');
        }
    }

    // 카테고리 별 비품 목록 조회
    async getSuppliesByCategory(id:string, pagination: {page:number; limit:number}): Promise<{data: SupplyResponseDto[]; total: number; page: number; limit:number}> {
        const {page, limit } = pagination;

        try {
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

            if (!supplies || supplies.length === 0) {
                // 데이터가 없을 경우 예외 던지기
                throw new NotFoundException('비품을 찾을 수 없습니다.');
            }

            const data : SupplyResponseDto[] = supplies.map(supply=> new SupplyResponseDto(supply));

            return {
                data,
                total,
                page,
                limit
            }
        }catch(error) {
            console.error('데이터베이스 조회 중 오류 발생:', error);
            throw new InternalServerErrorException('데이터베이스 조회 중 오류가 발생했습니다.');
        }
    }

    // 비품 상세 정보 조회
    async getSupplyInfo(id: string): Promise<SupplyResponseDto>{
        try{
            const supply = await this.supplyRepository.findOne({
                where: {
                    category: {
                        category_id: id
                    }
                },
                relations: ['category']
            });

            if(!supply){
                throw new NotFoundException(`비품 ID :  ${id}의 정보를 찾을 수 없습니다. `);
            }
            return new SupplyResponseDto(supply);
        }catch(error){
            console.error("InternalServerErrorException 발생")
            throw new InternalServerErrorException('비품 정보 조회에 에러가 발생했습니다.');
        }

    }

    // 비품 정보 갱신
    async updateSupply(id:string, supplyRequestDto: SupplyRequestDto):Promise<Supply>{
        try {
            const supply = await this.supplyRepository.findOneBy({supply_id:id});

            if(!supply){
                throw new NotFoundException('갱신하려는 비품을 찾을 수 없습니다.');
            }

            Object.assign(supply, supplyRequestDto);
            return await this.supplyRepository.save(supply)
        }catch(error){
            console.error("InternalServerErrorException 발생")
            throw new InternalServerErrorException('비품 갱신에 에러가 발생했습니다.');
        }



    }
}