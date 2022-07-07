export declare const AuthUser: (
    ...dataOrPipes: (
        | string
        | import('@nestjs/common').PipeTransform<any, any>
        | import('@nestjs/common').Type<import('@nestjs/common').PipeTransform<any, any>>
    )[]
) => ParameterDecorator
export declare const AuthWSUser: (
    ...dataOrPipes: (
        | string
        | import('@nestjs/common').PipeTransform<any, any>
        | import('@nestjs/common').Type<import('@nestjs/common').PipeTransform<any, any>>
    )[]
) => ParameterDecorator
