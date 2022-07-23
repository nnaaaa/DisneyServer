"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceName = exports.Service = void 0;
const microservices_1 = require("@nestjs/microservices");
class Service {
    static messageFactory(configService) {
        const messageBrokerUrl = `${configService.get('MESSAGE_BROKER_HOST')}:${configService.get('MESSAGE_BROKER_PORT')}`;
        return {
            transport: microservices_1.Transport.KAFKA,
            options: {
                client: {
                    brokers: [messageBrokerUrl],
                },
                consumer: {
                    groupId: 'message-consumer',
                },
            },
        };
    }
}
exports.Service = Service;
var ServiceName;
(function (ServiceName) {
    ServiceName["MESSAGE"] = "MESSAGE_SERVICE";
})(ServiceName = exports.ServiceName || (exports.ServiceName = {}));
//# sourceMappingURL=services.js.map