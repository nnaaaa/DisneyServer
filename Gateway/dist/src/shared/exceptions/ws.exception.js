"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
let WebsocketExceptionsFilter = class WebsocketExceptionsFilter extends websockets_1.BaseWsExceptionFilter {
    catch(exception, host) {
        const client = host.switchToWs().getClient();
        const data = host.switchToWs().getData();
        const error = exception instanceof websockets_1.WsException
            ? exception.getError()
            : exception.getResponse();
        const details = error instanceof Object ? Object.assign({}, error) : { message: error };
        return JSON.stringify({
            error: details.message,
        });
    }
};
WebsocketExceptionsFilter = __decorate([
    (0, common_1.Catch)(websockets_1.WsException)
], WebsocketExceptionsFilter);
exports.WebsocketExceptionsFilter = WebsocketExceptionsFilter;
//# sourceMappingURL=ws.exception.js.map