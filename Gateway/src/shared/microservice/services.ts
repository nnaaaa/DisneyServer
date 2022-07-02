import { ConfigService } from '@nestjs/config'
import { ClientProvider, Transport } from '@nestjs/microservices'

export class Service {
    static messageFactory(configService: ConfigService): ClientProvider {
        const messageBrokerUrl = `${configService.get(
            'MESSAGE_BROKER_HOST'
        )}:${configService.get('MESSAGE_BROKER_PORT')}`

        return {
            transport: Transport.KAFKA,
            options: {
                client: {
                    brokers: [messageBrokerUrl],
                },
                consumer: {
                    groupId: 'message-consumer',
                },
            },
        }
    }
}

export enum ServiceName {
    MESSAGE = 'MESSAGE_SERVICE',
}
