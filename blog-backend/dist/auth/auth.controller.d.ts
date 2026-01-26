import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        identifier: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
    register(body: any): Promise<import("mongoose").Document<unknown, {}, import("../users/user.schema").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../users/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
