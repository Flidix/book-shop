import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { BasketModule } from './basket/basket.module';
import { BooksModule } from './books/books.module';
import { LikeModule } from './like/like.module';
import { OrderModule } from './order/order.module';
import { RatingModule } from './rating/rating.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from '@shared/database/database.module';
import * as path from "path";
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    BooksModule,
    LikeModule,
    BasketModule,
    OrderModule,
    RatingModule,
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static'), }),

  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class RootModule {}
