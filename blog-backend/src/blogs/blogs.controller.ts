import { Body, Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createBlogDto: any, @Request() req) {
        return this.blogsService.create(createBlogDto, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('my-blogs')
    findAllByUser(@Request() req) {
        return this.blogsService.findAllByUser(req.user.userId);
    }

    @Get('all-debug')
    findAllDebug() {
        return this.blogsService.findAllDebug();
    }
}
