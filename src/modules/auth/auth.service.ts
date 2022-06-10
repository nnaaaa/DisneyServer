import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { UserRegisterDto } from './dtos/userRegister.dto'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async getAccessToken(userId: string) {
    return this.jwtService.sign({ userId }, { expiresIn: '1d' })
  }
  async getRefreshToken(userId: string) {
    return this.jwtService.sign({ userId }, { expiresIn: '30d' })
  }

  async createAuthUser(userRegisterDto: UserRegisterDto) {
    const user = await this.userService.findOne({
      account: userRegisterDto.account,
    })
    if (user) throw new BadRequestException()
    return await this.userService.create(userRegisterDto)
  }

  async storeRefreshToken(userId: string, refreshToken: string) {
    await this.userService.updateOne({ userId }, { refreshToken })
  }
}
