import {Column, Entity, ManyToOne} from "typeorm";
import {databaseTables} from "@shared/database/constants";
import {BaseEntity} from "@shared/database/entities/base.entity";
import {UserEntity} from "../../user/entities/user.entity";
import {BookEntity} from "../../books/entities/book.entity";
import {BooksService} from "../../books/books.service";

@Entity({ name: databaseTables.ratings })
export class RatingEntity extends BaseEntity {
    @ManyToOne(() => UserEntity)
    fromUser: UserEntity;

    @Column()
    stars: number;

    @Column()
    comment: string;

    @ManyToOne(() => BookEntity, (book) => book.ratings)
    toBook: BookEntity;
}
