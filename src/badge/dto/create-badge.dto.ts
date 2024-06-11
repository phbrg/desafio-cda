import { IsString } from "class-validator";

export class CreateBadgeDTO {
  @IsString()
  slug: string;

  @IsString()
  name: string;

  @IsString()
  image: string;
}