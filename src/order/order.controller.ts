import {Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import { OrderService } from './order.service';
import {JwtAuthGuard} from "../auth/guards/auth.guard";
import {CurrentUser} from "../auth/decorators/curentUser";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@CurrentUser('id') userId: number) {
    return this.orderService.creteOrder(userId);
  }

  @Get(':id/user/:userId')
  CompleteOrder(@Param('id') orderId: number, @Param('userId') userId: number) {
    return this.orderService.completeOrder(orderId, userId);
  }

}
