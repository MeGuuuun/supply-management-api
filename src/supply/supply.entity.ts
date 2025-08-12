import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne} from 'typeorm';

@Entity({ name: 'supply'})
export class Supply {
    @PrimaryGeneratedColumn('uuid')
    supply_id: string;

    @Column('varchar')
    name: string;

    @Column('integer')
    quantity: number;

    @Column('varchar')
    status: string;

    @CreateDateColumn({ type: 'timestamp' , name: 'created_at'})
    createdAt: Date;

    @Column({name: 'category_id'})
    category_id: string;
}