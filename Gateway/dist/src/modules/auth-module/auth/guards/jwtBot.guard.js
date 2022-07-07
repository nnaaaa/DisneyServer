'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.JwtBotGuard = void 0
const passport_1 = require('@nestjs/passport')
class JwtBotGuard extends (0, passport_1.AuthGuard)('botJwt') {}
exports.JwtBotGuard = JwtBotGuard
//# sourceMappingURL=jwtBot.guard.js.map
