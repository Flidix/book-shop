import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { RatingService } from './rating.service';
import {CurrentUser} from "../auth/decorators/curentUser";
import {CreateRatingDto} from "./dtos/create-rating.dto";
import {JwtAuthGuard} from "../auth/guards/auth.guard";
@UseGuards(JwtAuthGuard)
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  createRating(@CurrentUser('id') userId: number, @Body() dto: CreateRatingDto) {
    return this.ratingService.createRating(dto, userId);

  }
}
