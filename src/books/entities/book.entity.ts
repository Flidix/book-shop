import {BaseEntity} from "@shared/database/entities/base.entity";
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {databaseTables} from "@shared/database/constants";
    import {UserEntity} from "../../user/entities/user.entity";
import {RatingEntity} from "../../rating/entities/rating.entity";

@Entity({name: databaseTables.books})
export class BookEntity extends BaseEntity{

    @Column()
    avatar: string

    @Column()
    title: string

    @Column({default: 0})
    stars: number

    @Column()
    author: string

    @Column({default: 0})
    price: number

    @ManyToOne(() => UserEntity)
    basket: UserEntity

    @OneToMany(() => RatingEntity, (rating) => rating.toBook)
    ratings: RatingEntity[]

}
