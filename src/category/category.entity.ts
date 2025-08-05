import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'category'})
export class Category {
    @PrimaryGeneratedColumn('uuid')
    category_id: string;

    @Column('varchar')
    name: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}