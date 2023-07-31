import { Injectable, UseGuards } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { FileService, FileTypes } from '../file/file.service';
import { DatabaseService } from '@shared/database/services/database.service';

import { JwtAuthGuard } from '../auth/guards/auth.guard';

import { CreateBookDto } from './dtos/create-book.dto';

@UseGuards(JwtAuthGuard)
@Injectable()
export class BooksService extends DatabaseService {
  constructor(
    @InjectDataSource() datasource: DataSource,
    private readonly fileService: FileService,
  ) {
    super(datasource);
  }

  async getBookById(id: number) {
    console.log(id);
    const book = await this.database.books.findOneOrFail({
      where: { id },
      relations: {
        ratings: {
          fromUser: true,
        },
      },
    });
    if (book.ratings.length !== 0) {
      // Обмеження масиву ratings до 100 елементів
      book.ratings = book.ratings.slice(0, 100);

      const averageRating =
        Math.floor(
          book.ratings.reduce((sum, rating) => sum + rating.stars, 0) / book.ratings.length,
        ) + 1;
      book.stars = averageRating;
      await this.database.books.save(book);
    }

    return book;
  }
  async getAllBooks() {
    return await this.database.books.findAll({ order: { stars: 'DESC' } });
  }

  async createBook(dto: CreateBookDto, avatar) {
    const avatarPath = this.fileService.createFile(FileTypes.AVATAR, avatar);
    return await this.database.books.create({ ...dto, avatar: avatarPath, stars: 0 });
  }

  async searchBooks(query: string) {
    return await this.database.books
      .createQueryBuilder('books')
      .where('LOWER(books.title) LIKE :title', { title: `%${query.toLowerCase()}%` })
      .orWhere('LOWER(books.author) LIKE :author', { author: `%${query.toLowerCase()}%` })
      .orderBy('stars', 'DESC')
      .getMany();
  }
}
