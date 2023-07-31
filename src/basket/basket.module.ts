import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getJwtConfig} from "../config/jwtr.config";
import {JwtModule} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {BooksService} from "../books/books.service";
import {FileService} from "../file/file.service";

@Module({
  controllers: [BasketController],
  providers: [BasketService, UserService, BooksService, FileService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class BasketModule {}
