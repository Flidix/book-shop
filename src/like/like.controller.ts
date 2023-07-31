import {Controller, Param, Post, UseGuards} from '@nestjs/common';
import { LikeService } from './like.service';
import {CurrentUser} from "../auth/decorators/curentUser";
import {JwtAuthGuard} from "../auth/guards/auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':id')
  async addLikeToBook(@CurrentUser('id') userId: number, @Param('id') bookId: number) {
      return await this.likeService.createLikeToTrack(userId, bookId);
  }
}
