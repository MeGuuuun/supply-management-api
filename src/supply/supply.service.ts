import {BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supply } from './supply.entity';
import {RentRequestDto, SupplyRequestDto} from "./supply.dto";
import { SupplyResponseDto } from "./supply.dto";

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import {Rent} from "./rent.entity";
import {SupplyStatus} from "./supply-status.constants";

@Injectable()
export class SupplyService {
    constructor(
        @InjectRepository(Supply)
        private readonly supplyRepository: Repository<Supply>,

        @InjectRepository(Rent)
        private readonly rentRepository: Repository<Rent>,

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
                    supply_id:id
            }});

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

    // 비품 대여
    async rentSupply(rentRequestDto: RentRequestDto){
        try {
            // 대여할 아이템 존재 확인
            const s_id = rentRequestDto.supply_id;
            const supply = await this.supplyRepository.findOne({
                where: {
                    supply_id:s_id
                }
            });

            if(!supply){
                throw new NotFoundException('대여하려는 비품을 찾을 수 없습니다.');
            }

            // 갯수 비교를 통해 대여할 수 있는지 확인
            if(supply.quantity < rentRequestDto.quantity){
                throw new BadRequestException('대여하려는 비품의 갯수가 초과합니다.');
            }

            // 비품 개수 차감 및 상태 변경
            supply.quantity -= rentRequestDto.quantity;
            rentRequestDto.status = SupplyStatus.RENTED;

            await this.supplyRepository.save(supply);

            // 대여 기록 저장
            const rent = this.rentRepository.create(rentRequestDto);
            return await this.rentRepository.save(rent);
        }catch(error){
            console.error("InternalServerErrorException 발생")
            throw new InternalServerErrorException('비품 대여에 에러가 발생했습니다.');
        }
    }

    // 비품 반납
    async returnSupply(id:string){
        try {
            // 반납하려는 비품의 대여 기록 확인
            const rent = await this.rentRepository.findOne({
                where: {
                    rent_id:id
                }
            })

            if(!rent){
                throw new NotFoundException('반납하려는 비품의 대여 기록을 찾을 수 없습니다.');
            }

            // 대여 개수 원상복귀
            const supply = await this.supplyRepository.findOne({
                where: {
                    supply_id: rent.supply_id
                }
            })

            if(!supply){
                throw new NotFoundException('반납 하려는 비품을 찾을 수 없습니다.');
            }

            supply.quantity += rent.quantity;
            await this.supplyRepository.save(supply);

            rent.status = SupplyStatus.RETURNED;
            await this.rentRepository.save(rent);

            return rent;


        }catch(error){
            console.error("InternalServerErrorException 발생")
            throw new InternalServerErrorException('비품 반납에 에러가 발생했습니다.');
        }

    }
}