import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { DatabaseService } from '@shared/database/services/database.service';

@Injectable()
export class UserService extends DatabaseService {
  constructor(@InjectDataSource() datasource: DataSource) {
    super(datasource);
  }

  async findOneById(id: number) {
    return await this.database.users.findOneOrFail({
      where: { id },
      relations: {
        favoriteBooks: true,
        basket: true,
        orders: true,
      },
    });
  }
  async findOneBasketById(id: number) {
    const user = await this.database.users.findOneOrFail({
      where: { id },
      relations: {
        basket: true,
      },
    });
    const many = user.basket.reduce((total, price) => (total += price.price), 0);
    return { user, total: many };
  }

  async changeRole(id: number) {
    const user = await this.findOneById(id);
    user.isAdmin = !user.isAdmin;
    await this.database.users.save(user);
    return !user.isAdmin;
  }

  async clearBasket(id: number) {
    const user = await this.findOneById(id);
    user.basket = [];
    return await this.database.users.save(user);
  }
}
