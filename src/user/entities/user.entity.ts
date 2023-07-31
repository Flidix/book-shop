import {BaseEntity} from "@shared/database/entities/base.entity";
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {databaseTables} from "@shared/database/constants";
import {LikeBookEntity} from "../../like/entities/like-book.entity";
import {BookEntity} from "../../books/entities/book.entity";
import {OrderEntity} from "../../order/entities/order.entity";


@Entity({name: databaseTables.users})
export class UserEntity extends BaseEntity{
    @Column()
    email: string


    @Column({ select: false })
    password: string

    @Column({ default: false })
    isAdmin: boolean

    @OneToMany(() => LikeBookEntity, (like) => like.fromUser)
    favoriteBooks: LikeBookEntity[]

    @OneToMany(() => BookEntity, (book) => book.basket)
    basket: BookEntity[]

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[]
}
