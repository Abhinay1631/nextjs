import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(dto: any) {
    const hashed = await bcrypt.hash(dto.password, 10)
    const user = await this.usersService.create({
      ...dto,
      password: hashed,
    })
    return user
  }

  async login(identifier: string, password: string) {
    const user = await this.usersService.findByEmailOrUsername(identifier)
    if (!user) {
      console.log(`Login failed: User not found for identifier ${identifier}`);
      throw new UnauthorizedException('User not found')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      console.log(`Login failed: Password mismatch for user ${identifier}`);
      throw new UnauthorizedException('Password mismatch')
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
    }

    return {
      token: this.jwtService.sign(payload),
    }
  }
}
