import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { BlogsModule } from './blogs/blogs.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/blog_db'),
    AuthModule,
    UsersModule,
    BlogsModule,
  ],
})
export class AppModule { }
