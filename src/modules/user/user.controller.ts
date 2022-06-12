import {
  CacheInterceptor, Controller, UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard'

@Controller('user')
@UseInterceptors(CacheInterceptor)
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class UserController {
  
}
