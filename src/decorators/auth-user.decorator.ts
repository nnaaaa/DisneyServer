import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const AuthUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user

    return data ? user?.[data] : user
})

export const AuthWSUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const client = ctx.switchToWs().getClient()
    const user = client.user

    return data ? user?.[data] : user
})
