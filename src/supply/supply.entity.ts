import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'supply'})
export class Supply {
    @PrimaryGeneratedColumn('uuid')
    supply_id: string;

    @Column('varchar')
    name: string;

    @Column('bigint')
    quantity: number;

    @Column('varchar')
    status: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}