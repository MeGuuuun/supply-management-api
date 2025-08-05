import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne} from 'typeorm';
import { SupplyStatus } from "./supply-status.enum";
import { Category } from "../category/category.entity";

@Entity({ name: 'supply'})
export class Supply {
    @PrimaryGeneratedColumn('uuid')
    supply_id: string;

    @Column('varchar')
    name: string;

    @Column('bigint')
    quantity: number;

    @Column({
        type: 'enum',
        enum: SupplyStatus,
        default: SupplyStatus.AVAILABLE
    })
    status: SupplyStatus;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    // 여러개의 비품이 하나의 카테고리 안에 속함
    @ManyToOne(() => Category, category => category.supply, {eager: true})
    @JoinColumn({name: 'category_id'})
    category: Category;

    // FK 설정
    @Column('uuid')
    categoryId: string;
}