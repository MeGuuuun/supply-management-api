import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne} from 'typeorm';

@Entity({ name: 'rent'})
export class Rent {
    @PrimaryGeneratedColumn('uuid')
    rent_id:string;

    @Column('uuid')
    member_id: string;

    @Column('uuid')
    supply_id: string;

    @Column('integer')
    quantity: number;

    @Column('varchar')
    status: string;

    @CreateDateColumn({ type: 'timestamp' , name: 'created_at'})
    createdAt: Date;

}