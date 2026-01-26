import { Model, Types } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
export declare class BlogsService {
    private blogModel;
    constructor(blogModel: Model<BlogDocument>);
    private isValidObjectId;
    create(createBlogDto: any, userId: string): Promise<import("mongoose").Document<unknown, {}, BlogDocument, {}, import("mongoose").DefaultSchemaOptions> & Blog & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAllByUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, BlogDocument, {}, import("mongoose").DefaultSchemaOptions> & Blog & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findAllDebug(): Promise<(import("mongoose").Document<unknown, {}, BlogDocument, {}, import("mongoose").DefaultSchemaOptions> & Blog & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
