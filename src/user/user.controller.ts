import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get('/:method?/:data?')
  async getUser(@Param() param: { method: string, data: string }) {
    return this.userService.getUser(param);
  }
}