import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Post} from "./Post";

@Entity()
export class Category{
@PrimaryGeneratedColumn()
categoryId: Number

@Column({type: 'varchar'})
categoryName: String 

@OneToMany(()=> Post, (post)=> post.category)
post: Post[]




}
