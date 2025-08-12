import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from 'typeorm';
import { Supply } from "../supply/supply.entity";

@Entity({ name: 'category'})
export class Category {
    @PrimaryGeneratedColumn('uuid')
    category_id: string;

    @Column('varchar')
    name: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
}