import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createUser(user: CreateUserDTO, req: any, badge: object) {
    const discordAlredyRegistered = await this.prisma.user.findUnique({ where: { discordId: user.discordId } });
    if(discordAlredyRegistered) throw new BadRequestException('Discord ID alredy registered.');

    const inGameIdAlredyRegistered = await this.prisma.user.findUnique({ where: { inGameId: user.inGameId } });
    if(inGameIdAlredyRegistered) throw new BadRequestException('ID alredy registered.');

    const userIp = req.ip || req.connection.remoteAddress || null;
    if(!userIp) throw new InternalServerErrorException('Try again later.');

    const ipAlredyRegistered = await this.prisma.user.findUnique({ where: { ip: userIp } });
    if(ipAlredyRegistered) throw new BadRequestException('IP alredy registered.');

    return this.prisma.user.create({
      data: {
        ip: userIp,
        discordId: user.discordId,
        inGameId: user.inGameId,
        badges: [badge]
      }
    })
  }

  async getUser(param: { method: string, data: string }) {
    let res = null;

    switch(param.method) {
      case 'id':
        if (!param.data) throw new BadRequestException('Invalid search.');
        res = await this.prisma.user.findUnique({
          where: { id: param.data },
        });
        break;
      case 'ip':
        if (!param.data) throw new BadRequestException('Invalid search.');
        res = await this.prisma.user.findUnique({
          where: { ip: param.data },
        });
        break;
      case 'discordId':
        if (!param.data) throw new BadRequestException('Invalid search.');
        res = await this.prisma.user.findUnique({
          where: { discordId: param.data },
        });
      case 'inGameId':
        if (!param.data) throw new BadRequestException('Invalid search.');
        res = await this.prisma.user.findUnique({
          where: { inGameId: param.data },
        });
        break;
      case undefined: // get all
        res = await this.prisma.user.findMany();
        break;
      default:
        throw new BadRequestException('Invalid search.');
    }

    console.log(param, res)

    if (!res) { 
      throw new NotFoundException('User not found.');
    } else {
      return res;
    }
  }

  async addBadgeUser(userId: string, badge: object) {
    const userExist = await this.prisma.user.findUnique({ where: { id: userId } });
    if(!userExist) throw new BadRequestException('Invalid user.');

    try {
      await this.prisma.user.update({
        data: { badges: [...userExist.badges, badge] },
        where: { id: userId }
      });
    } catch(e) {
      return e.response;
    }
  }
}