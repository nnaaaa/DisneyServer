'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.JwtUserGuard = void 0
const passport_1 = require('@nestjs/passport')
class JwtUserGuard extends (0, passport_1.AuthGuard)('userJwt') {}
exports.JwtUserGuard = JwtUserGuard
//# sourceMappingURL=jwtUser.guard.js.map
