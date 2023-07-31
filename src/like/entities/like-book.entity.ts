import {Entity, ManyToOne} from "typeorm";
import {databaseTables} from "@shared/database/constants";
import {BaseEntity} from "@shared/database/entities/base.entity";
import {UserEntity} from "../../user/entities/user.entity";
import {BookEntity} from "../../books/entities/book.entity";
import {BooksService} from "../../books/books.service";

@Entity({ name: databaseTables.likes })
export class LikeBookEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, (user) => user.favoriteBooks)
    fromUser: UserEntity;

    @ManyToOne(() => BookEntity, { eager: true })
    toBook: BookEntity
}
