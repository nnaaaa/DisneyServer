export class Algorithm {
    static commandRegex = new RegExp(/(\w+)\.(\w+)\((((\w)+,)*)+(\w+)\)/)
    static argsFuncRegex = new RegExp(/(?:\()(.+)+(?:\))/)
    static funcNameRegex = new RegExp(/(?:\.)(\w+)/)

    static generateDigit(length: number) {
        const max = Math.pow(10, length)
        const min = Math.pow(10, length - 1)
        return Math.floor(Math.random() * (max - min) + min)
    }

    static inspectCommand(command: string) {
        const match = command.match(Algorithm.commandRegex)

        if (!match || match[0] !== command) return false

        const args = command.match(Algorithm.argsFuncRegex)[1].split(/[\s,]+/)
        const botName = command.split('.')[0]
        const commandName = command.match(Algorithm.funcNameRegex)[1]

        return { args, botName, commandName }
    }
}
