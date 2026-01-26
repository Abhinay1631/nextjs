"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_schema_1 = require("./blog.schema");
let BlogsService = class BlogsService {
    blogModel;
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    isValidObjectId(id) {
        return mongoose_2.Types.ObjectId.isValid(id);
    }
    async create(createBlogDto, userId) {
        console.log(`Creating blog for user: ${userId}`);
        if (!this.isValidObjectId(userId)) {
            console.error(`Invalid userId: ${userId}`);
            throw new Error('Invalid User ID');
        }
        const newBlog = new this.blogModel({
            ...createBlogDto,
            author: new mongoose_2.Types.ObjectId(userId),
        });
        return newBlog.save();
    }
    async findAllByUser(userId) {
        console.log(`Fetching blogs for user: ${userId}`);
        if (!this.isValidObjectId(userId)) {
            console.error(`Invalid userId: ${userId}`);
            return [];
        }
        const blogs = await this.blogModel.find({ author: new mongoose_2.Types.ObjectId(userId) }).exec();
        console.log(`Found ${blogs.length} blogs`);
        return blogs;
    }
    async findAllDebug() {
        return this.blogModel.find().exec();
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map