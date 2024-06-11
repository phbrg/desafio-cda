import { IsString, MaxLength } from "class-validator";

export class CreateUserDTO {
  @IsString()
  @MaxLength(18)
  discordId: string;

  @IsString()
  inGameId: string;
}