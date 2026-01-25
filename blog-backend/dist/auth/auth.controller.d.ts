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
}
