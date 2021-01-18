import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
// import { Connection } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  findOneByThirdPartyId(TPI, provider): Promise<User> {
    console.log(`findingbyTPI`)
    return this.usersRepository.findOne({
      where: { thirdPartyId: `${TPI}`, provider: `${provider}` },
    });
  }

  registerOAuthUser(profile) {
    console.log(`registering a new user`);

    const user = new User();
    user.firstName = profile.name.givenName;
    user.lastName = profile.name.familyName;
    user.isActive = true;
    user.thirdPartyId = profile.id;
    user.provider = profile.provider;
    return this.usersRepository.save(user);
  }

}
