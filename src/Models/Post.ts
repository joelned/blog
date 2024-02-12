import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import {Category} from "./Category"
@Entity()
export class Post{
 @PrimaryGeneratedColumn()
postId: Number

@Column({type: 'varchar'})
postName: String 


@Column({type: 'varchar'})
title: String 

@Column({type: "varchar"})
content: String 

@Column({type: 'datetime'})
publicationDate: Date
 
@ManyToOne(()=> Category, (category)=> category.post)
category: Number

}
