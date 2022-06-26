"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Algorithm = void 0;
class Algorithm {
    static generateDigit(length) {
        const max = Math.pow(10, length);
        const min = Math.pow(10, length - 1);
        return Math.floor(Math.random() * (max - min) + min);
    }
}
exports.Algorithm = Algorithm;
//# sourceMappingURL=algorithms.js.map