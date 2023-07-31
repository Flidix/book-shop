import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { BooksService } from '../books/books.service';
import { UserService } from '../user/user.service';
import { DatabaseService } from '@shared/database/services/database.service';

@Injectable()
export class BasketService extends DatabaseService {
  constructor(
    @InjectDataSource() datasource: DataSource,
    private readonly userService: UserService,
    private readonly bookService: BooksService,
  ) {
    super(datasource);
  }

  async addToBasket(userId: number, bookId: number) {
    const user = await this.userService.findOneById(userId);
    const book = await this.bookService.getBookById(bookId);

    const existingBookIndex = user.basket.findIndex((bookInBasket) => bookInBasket.id === book.id);
    if (existingBookIndex !== -1) user.basket.splice(existingBookIndex, 1);
    else user.basket.unshift(book);

    await this.database.users.save(user);
    return !(!existingBookIndex)
  }
}
