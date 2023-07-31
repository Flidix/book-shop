import {Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import {JwtAuthGuard} from "../auth/guards/auth.guard";
import {RoleGuard} from "../auth/guards/role.guard";
import {CurrentUser} from "../auth/decorators/curentUser";

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  getOneById(@CurrentUser('id') id: number) {
    return this.userService.findOneById(id);
  }

  @Get('basket')
  getOneBasketById(@CurrentUser('id') id: number) {
    return this.userService.findOneBasketById(id);
  }

  @UseGuards(RoleGuard)
  @Put('role/:id')
  async changeRole(@Param('id') id: number) {
    return await this.userService.changeRole(id);
  }


}
