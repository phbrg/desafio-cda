import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { BadgeService } from "./badge.service";
import { CreateBadgeDTO } from "./dto/create-badge.dto";
import { CreateUserDTO } from "src/user/dto/create-user.dto";

@Controller('badge')
export class BadgeController {
  constructor(
    private readonly badgeService: BadgeService
  ) {}

  @Post('create')
  async createBadge(@Body() body: CreateBadgeDTO) {
    return this.badgeService.createBadge(body);
  }

  @Get(':method?/:data?')
  async getBadge(@Param() param: { method: string, data: string }) {
    return this.badgeService.getBadge(param);
  }

  @Post('reedem/:slug')
  async reedemBadge(@Body() body: CreateUserDTO, @Param() param: { slug: string }, @Req() req: Request) {
    return this.badgeService.reedemBadge(param, req, body);
  }
}