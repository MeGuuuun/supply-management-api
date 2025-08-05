import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supply } from './supply.entity';
import { SupplyRequestDto } from "./supply.dto";

@Injectable()
export class SupplyService {
    constructor(
        @InjectRepository(Supply)
        private readonly supplyRepository: Repository<Supply>,
    ) {}

    async addSupply(supplyRequestDto: SupplyRequestDto): Promise<Supply> {
        const newSupply = this.supplyRepository.create(supplyRequestDto); // 엔티티 인스턴스 생성
        console.log("Saving new supply:", newSupply);  // 저장 전에 찍기
        const savedSupply = await this.supplyRepository.save(newSupply); // DB에 저장
        console.log("Saved supply:", savedSupply);  // 저장 후 찍기
        return savedSupply;
    }
}