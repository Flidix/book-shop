import {
  Body,
  Controller,
  Get, Param,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';

import { BooksService } from './books.service';

import { CreateBookDto } from './dtos/create-book.dto';
import {FileFieldsInterceptor, FileInterceptor} from '@nestjs/platform-express';
import {RoleGuard} from "../auth/guards/role.guard";
import {JwtAuthGuard} from "../auth/guards/auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get(':id')
  getBookById(@Param('id') id: number) {
    return this.booksService.getBookById(id);
  }
  @UseGuards(RoleGuard)
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  create(
      @Body() dto: CreateBookDto,
      @UploadedFile() files: { avatar?: Express.Multer.File[] },
  ) {
    return this.booksService.createBook(dto, files);
  }

  @Get('search/by')
  search(@Query('query') query: string) {
    return this.booksService.searchBooks(query);
  }

  @Get()
  getAllBooks() {
    return this.booksService.getAllBooks();
  }
}
