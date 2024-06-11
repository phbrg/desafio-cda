import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { BadgeModule } from './badge/badge.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BadgeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
