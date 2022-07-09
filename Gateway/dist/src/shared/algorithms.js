'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Algorithm = void 0
class Algorithm {
    static generateDigit(length) {
        const max = Math.pow(10, length)
        const min = Math.pow(10, length - 1)
        return Math.floor(Math.random() * (max - min) + min)
    }
    static inspectCommand(command) {
        const match = command.match(Algorithm.commandRegex)
        if (!match || match[0] !== command) return false
        const args = command.match(Algorithm.argsFuncRegex)[1].split(/[\s,]+/)
        const botName = command.split('.')[0]
        const commandName = command.match(Algorithm.funcNameRegex)[1]
        return { args, botName, commandName }
    }
}
exports.Algorithm = Algorithm
Algorithm.commandRegex = new RegExp(/(\w+)\.(\w+)\((((\w)+,)*)+(\w+)\)/)
Algorithm.argsFuncRegex = new RegExp(/(?:\()(.+)+(?:\))/)
Algorithm.funcNameRegex = new RegExp(/(?:\.)(\w+)/)
//# sourceMappingURL=algorithms.js.map
