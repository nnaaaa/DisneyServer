import { CacheInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AuthUser } from 'src/decorators/auth-user.decorator'
import { UserEntity } from 'src/entities/user.entity'
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard'
import { UserService } from './user.service'

@Controller('user')
@UseInterceptors(CacheInterceptor)
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class UserController {
    constructor(private userService: UserService) { }
    
    @Get('getProfile')
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @UseInterceptors(CacheInterceptor)
    async getUser(@AuthUser() authUser: UserEntity) {
        return authUser
    }
}
