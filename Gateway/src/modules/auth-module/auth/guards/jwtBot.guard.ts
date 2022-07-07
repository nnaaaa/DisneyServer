import { AuthGuard } from '@nestjs/passport'

export class JwtBotGuard extends AuthGuard('botJwt') {}
