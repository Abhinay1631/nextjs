import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './user.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  create(data: Partial<User>) {
    return this.userModel.create(data)
  }

  findByEmailOrUsername(identifier: string) {
    return this.userModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    })
  }

  findById(id: string) {
    return this.userModel.findById(id).select('-password')
  }
}
