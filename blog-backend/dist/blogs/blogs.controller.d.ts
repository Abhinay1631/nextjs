import { BlogsService } from './blogs.service';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    create(createBlogDto: any, req: any): Promise<import("mongoose").Document<unknown, {}, import("./blog.schema").BlogDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./blog.schema").Blog & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAllByUser(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./blog.schema").BlogDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./blog.schema").Blog & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findAllDebug(): Promise<(import("mongoose").Document<unknown, {}, import("./blog.schema").BlogDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./blog.schema").Blog & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./blog.schema").BlogDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./blog.schema").Blog & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateBlogDto: any, req: any): Promise<(import("mongoose").Document<unknown, {}, import("./blog.schema").BlogDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./blog.schema").Blog & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string, req: any): Promise<(import("mongoose").Document<unknown, {}, import("./blog.schema").BlogDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./blog.schema").Blog & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
