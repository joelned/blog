import { OneToMany, ManyToOne, Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User{

@PrimaryGeneratedColumn()
userId: Number

@Column({type: "varchar"})
username: String 

@Column({type: "varchar"})
password: String 

}


