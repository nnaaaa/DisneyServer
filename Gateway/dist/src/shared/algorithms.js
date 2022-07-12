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
        let args = []
        const matchedArgs = command.match(Algorithm.argsFuncRegex)
        if (matchedArgs) {
            args = matchedArgs[1].split(/[\s,]+/)
        }
        const botName = command.split('.')[0]
        const name = command.match(Algorithm.funcNameRegex)[1]
        return { args, botName, name }
    }
}
exports.Algorithm = Algorithm
Algorithm.commandRegex = new RegExp(/(\w+)\.(\w+)\((((\w|\s)+,)*)+((\w|\s)+)\)/)
Algorithm.argsFuncRegex = new RegExp(/(?:\()(.+)+(?:\))/)
Algorithm.funcNameRegex = new RegExp(/(?:\.)(\w+)/)
//# sourceMappingURL=algorithms.js.map
