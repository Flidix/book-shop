import { DatabaseRepository } from '../repositories/database.repository';
import {UserEntity} from "../../../user/entities/user.entity";
import {BookEntity} from "../../../books/entities/book.entity";
import {LikeBookEntity} from "../../../like/entities/like-book.entity";
import {OrderEntity} from "../../../order/entities/order.entity";
import {RatingEntity} from "../../../rating/entities/rating.entity";
export type DatabaseEntitiesType = {
  users: UserEntity,
  books: BookEntity,
  likes: LikeBookEntity,
  orders: OrderEntity,
  ratings: RatingEntity
};

export type DatabaseRepositories = {
  [table in keyof DatabaseEntitiesType]: DatabaseRepository<DatabaseEntitiesType[table]>;
};
