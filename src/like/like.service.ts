import { Injectable } from '@nestjs/common';
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {UserService} from "../user/user.service";
import {BooksService} from "../books/books.service";
import {DatabaseService} from "@shared/database/services/database.service";

@Injectable()
export class LikeService extends DatabaseService {
    constructor(@InjectDataSource() datasource: DataSource) {
        super(datasource)
    }
  async createLikeToTrack(userId: number, bookId: number) {
    const data = { fromUser: { id: userId }, toBook: { id: bookId } };
    const isLiked = await this.database.likes.findOne({ where: { ...data } });

    if (isLiked) {
      await this.database.likes.delete({ id: isLiked.id });
    } else {
      await this.database.likes.create({ ...data });
    }

    return !isLiked;
  }
}
