import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = 'VERY_SECRET_KEY'; // <- replace this with your secret key

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly usersService: UsersService) {}

  async validateOAuthLogin(profile): Promise<string> {
    const thirdPartyId = profile.id;
    const provider = profile.provider;

    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      let user = await this.usersService.findOneByThirdPartyId(
        thirdPartyId,
        provider,
      );

      if (!user) user = await this.usersService.registerOAuthUser(profile);

      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
