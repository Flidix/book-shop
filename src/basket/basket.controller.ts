import {Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import { BasketService } from './basket.service';
import {JwtAuthGuard} from "../auth/guards/auth.guard";
import {CurrentUser} from "../auth/decorators/curentUser";

@UseGuards(JwtAuthGuard)
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post(':id')
  async addToBasket(@CurrentUser('id') userId: number, @Param('id') id: number) {
      return await this.basketService.addToBasket(userId, id);
  }
}
