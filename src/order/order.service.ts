import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import Stripe from 'stripe';
import { DataSource } from 'typeorm';

import { Environment } from '@shared/variables/environment';

import { UserService } from '../user/user.service';
import { DatabaseService } from '@shared/database/services/database.service';

@Injectable()
export class OrderService extends DatabaseService {
  constructor(
    @InjectDataSource() datasource: DataSource,
    private readonly userService: UserService,
  ) {
    super(datasource);
  }

  async creteOrder(userId: number) {
    const stripe = new Stripe(Environment.STRIPE_SECRET, {
      apiVersion: '2022-11-15',
    });

    const order = await this.userService.findOneBasketById(userId);
    const user = await this.userService.findOneById(userId);

    const createdOrder = await this.database.orders.create({ user: user, price: order.total });

    const pay = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Example Product',
            },
            unit_amount: order.total * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:8000/api/order/${createdOrder.id}/user/${user.id}`,
      cancel_url: 'http://localhost:3000/cancel',
    });
    return pay.url;
  }

  async completeOrder(orderId: number, userId: number) {
    await this.userService.clearBasket(userId);
    const order = await this.database.orders.findOneOrFail({where: {id: orderId}});
    if (order?.isPaid === true) throw new HttpException('not found', HttpStatus.NOT_FOUND);
    await this.database.orders.update({id: orderId}, { isPaid: true });
    return true
  }
}
