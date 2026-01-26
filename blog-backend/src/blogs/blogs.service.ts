import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';

@Injectable()
export class BlogsService {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) { }

    private isValidObjectId(id: string): boolean {
        return Types.ObjectId.isValid(id);
    }

    async create(createBlogDto: any, userId: string) {
        console.log(`Creating blog for user: ${userId}`);
        if (!this.isValidObjectId(userId)) {
            console.error(`Invalid userId: ${userId}`);
            throw new Error('Invalid User ID');
        }
        const newBlog = new this.blogModel({
            ...createBlogDto,
            author: new Types.ObjectId(userId),
        });
        return newBlog.save();
    }

    async findAllByUser(userId: string) {
        console.log(`Fetching blogs for user: ${userId}`);
        if (!this.isValidObjectId(userId)) {
            console.error(`Invalid userId: ${userId}`);
            return [];
        }
        const blogs = await this.blogModel.find({ author: new Types.ObjectId(userId) } as any).exec();
        console.log(`Found ${blogs.length} blogs`);
        return blogs;
    }

    async findAllDebug() {
        return this.blogModel.find().exec();
    }

    async findOne(id: string) {
        if (!this.isValidObjectId(id)) {
            throw new Error('Invalid ID');
        }
        return this.blogModel.findById(id).exec();
    }

    async update(id: string, updateBlogDto: any, userId: string) {
        if (!this.isValidObjectId(id) || !this.isValidObjectId(userId)) {
            throw new Error('Invalid ID');
        }
        return this.blogModel.findOneAndUpdate(
            { _id: new Types.ObjectId(id), author: new Types.ObjectId(userId) } as any,
            { $set: updateBlogDto },
            { new: true }
        ).exec();
    }

    async delete(id: string, userId: string) {
        if (!this.isValidObjectId(id) || !this.isValidObjectId(userId)) {
            throw new Error('Invalid ID');
        }
        return this.blogModel.findOneAndDelete({ _id: new Types.ObjectId(id), author: new Types.ObjectId(userId) } as any).exec();
    }
}
