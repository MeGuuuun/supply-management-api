import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:'member'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    member_id: string;

    @Column('varchar')
    name: string;

    @CreateDateColumn({ type: 'timestamp' , name: 'created_at'})
    createdAt: Date;

}