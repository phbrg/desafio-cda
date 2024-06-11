import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBadgeDTO } from "./dto/create-badge.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class BadgeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService
  ) {}

  async createBadge({ name, slug, image }: CreateBadgeDTO) {
    // REAL APP: add admin validation (guard)
    const badgeAlredyRegistered = await this.prisma.badge.findUnique({ where: { slug } }) || null;
    if(badgeAlredyRegistered) throw new BadRequestException('Badge slug alredy registered.');

    return this.prisma.badge.create({
      data: {
        name,
        slug,
        image
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true
      }
    })
  }

  async getBadge(param: { method: string; data: string }) {
    let res = null;
  
    switch (param.method) {
      case 'id':
        if (!param.data) throw new BadRequestException('Invalid search.');
        res = await this.prisma.badge.findUnique({
          where: { id: parseFloat(param.data) },
        });
        break;
      case 'slug':
        if (!param.data || param.data === '') throw new BadRequestException('Invalid search.');
        res = await this.prisma.badge.findUnique({
          where: { slug: param.data },
        });
        break;
      case 'name':
        if (!param.data || param.data === '') throw new BadRequestException('Empty search for badge name');
        res = await this.prisma.badge.findMany({
          where: { name: { contains: param.data } },
        });
        break;
      case undefined: // get all
        res = await this.prisma.badge.findMany();
        break;
      default:
        throw new BadRequestException('Invalid search.');
    }
  
    if (!res) {
      throw new NotFoundException('Badge not found.');
    } else {
      return res;
    }
  }

  async reedemBadge(param: { slug: string }, req: any, body: { discordId: string, inGameId: string }) {
    const badge = await this.getBadge({ method: 'slug', data: param.slug });
    if(!badge) throw new BadRequestException('Inavlid badge.');

    let user = null;
    try {
      const userIsAlredyRegistered = await this.userService.getUser({ method: 'ip', data: req.ip || req.connection.remoteAddress });
      
      if(userIsAlredyRegistered) {
        user = userIsAlredyRegistered;

        for(let forBadge of userIsAlredyRegistered.badges) {
          if(forBadge.id == badge.id) throw new BadRequestException("You can't reedem this badge.")
        }
      }
    } catch(e) {
      if(e.response.message == "You can't reedem this badge.") return e.response
    }

    if(user) { 
      await this.userService.addBadgeUser(user.id, badge);
      return { message: 'You have successfully reedemed your badge.', badges: [...user.badges, badge] }
    }
    
    return this.userService.createUser(
      {
        discordId: body.discordId,
        inGameId: body.inGameId
      },
      req,
      badge
    );
  }
}