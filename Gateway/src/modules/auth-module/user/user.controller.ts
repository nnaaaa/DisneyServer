import {
    CacheInterceptor,
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthUser } from 'src/shared/decorators/auth-user.decorator'
import { UserEntity } from 'src/entities/user.entity'
import { JwtUserGuard } from 'src/modules/auth-module/auth/guards/jwtUser.guard'
import { UserService } from './user.service'

@ApiTags('user')
@Controller('user')
@UseInterceptors(CacheInterceptor)
@ApiBearerAuth()
@UseGuards(JwtUserGuard)
export class UserController {
    constructor(private userService: UserService) {}

    @Get('getProfile')
    async getUser(@AuthUser() authUser: UserEntity) {
        return authUser
    }
}
