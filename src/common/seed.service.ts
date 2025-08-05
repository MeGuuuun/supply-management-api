import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supply } from "../supply/supply.entity";
import { Category } from "../category/category.entity";
import {SupplyStatus} from "../supply/supply-status.enum";

// NestJS 실행 시 초기 데이터 삽입
@Injectable()
export class SeedService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Supply)
        private readonly supplyRepository: Repository<Supply>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {
    }

    // 이미 더미 데이터가 삽입되어있는지 아닌지 확인
    async onApplicationBootstrap() {
        const categoryCount = await this.categoryRepository.count();
        const supplyCount = await this.supplyRepository.count();

        if(categoryCount === 0 && supplyCount === 0) {
            // 카테고리 먼저 생성
            const stationary = this.categoryRepository.create({name: '학용품'});
            const electronics = this.categoryRepository.create({name: '전자용품'});

            await this.categoryRepository.save([stationary, electronics]);

            // 생성된 카테고리 id 사용하여 supply 삽입
            const supplies = [
                {name: '연필', quantity: 5, status: SupplyStatus.AVAILABLE, categoryId: stationary.category_id},
                {name: '공책', quantity: 10, status: SupplyStatus.AVAILABLE, categoryId: stationary.category_id},
                {name: '헤드셋', quantity: 15, status: SupplyStatus.AVAILABLE, categoryId: electronics.category_id},
                {name: '키보드', quantity: 25, status: SupplyStatus.AVAILABLE, categoryId: electronics.category_id}
            ];

            await this.supplyRepository.save(supplies);

            console.log("초기 데이터 삽입 완료");
        }
    }
}