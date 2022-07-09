export declare class Algorithm {
    static commandRegex: RegExp
    static argsFuncRegex: RegExp
    static funcNameRegex: RegExp
    static generateDigit(length: number): number
    static inspectCommand(command: string):
        | false
        | {
              args: string[]
              botName: string
              commandName: string
          }
}
