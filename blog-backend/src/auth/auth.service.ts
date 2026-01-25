import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new UnauthorizedException('Invalid credentials')

    const payload = {
      sub: user._id.toString(),
      email: user.email,
    }

    return {
      token: this.jwtService.sign(payload),
    }
  }
}
