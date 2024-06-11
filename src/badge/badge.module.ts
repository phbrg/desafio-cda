import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { BadgeController } from "./badge.controller";
import { BadgeService } from "./badge.service";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [
    PrismaModule,
    UserModule
  ],
  controllers: [BadgeController],
  providers: [BadgeService],
  exports: [BadgeService]
})
export class BadgeModule {}