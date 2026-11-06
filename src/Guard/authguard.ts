import { ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard {

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const [Bearer, token] = request.headers['authorization']?.split(' ');

        if (token && Bearer === 'Bearer') {
            try {
                const decodedToken = await this.jwtService.verifyAsync(token, {
                    secret: this.configService.get<string>('JWT_SECRET'),
                });
                request.user = decodedToken;
                return true;
            } catch (error) {
                return false;
            }
        }else {
            return false;
        }
    
        return true;
    }
}