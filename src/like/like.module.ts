import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import {UserService} from "../user/user.service";
import {BooksService} from "../books/books.service";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getJwtConfig} from "../config/jwtr.config";
import {JwtModule} from "@nestjs/jwt";
import {FileService} from "../file/file.service";

@Module({
  controllers: [LikeController],
  providers: [LikeService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class LikeModule {}
