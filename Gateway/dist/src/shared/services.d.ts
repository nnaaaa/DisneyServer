import { ConfigService } from "@nestjs/config";
import { ClientProvider } from "@nestjs/microservices";
export declare class Service {
    static messageFactory(configService: ConfigService): ClientProvider;
}
export declare enum ServiceName {
    MESSAGE = "MESSAGE_SERVICE"
}
