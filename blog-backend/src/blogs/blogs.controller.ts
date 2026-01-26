import { Body, Controller, Post, Get, Request, UseGuards, Patch, Param, Delete } from '@nestjs/common';
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

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blogsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBlogDto: any, @Request() req) {
        return this.blogsService.update(id, updateBlogDto, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        return this.blogsService.delete(id, req.user.userId);
    }
}
