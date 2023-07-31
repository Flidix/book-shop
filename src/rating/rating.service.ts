import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { FileService } from '../file/file.service';
import { UserService } from '../user/user.service';
import { DatabaseService } from '@shared/database/services/database.service';

import { CreateRatingDto } from './dtos/create-rating.dto';
import {yellow} from "@nestjs/common/utils/cli-colors.util";

@Injectable()
export class RatingService extends DatabaseService {

  async createRating(dto: CreateRatingDto, userId: number) {
    const toBook = await this.database.books.findOneOrFail({ where: { id: dto.bookId } });
    const fromUser = await this.database.users.findOneOrFail({ where: { id: userId } });
    return await this.database.ratings.create({ ...dto, fromUser, toBook });
  }
}
