

export class Algorithm{
    static generateSMS(length: number) {
        const max = Math.pow(10, length)
        const min = Math.pow(10, length - 1)
        return Math.floor(Math.random() * (max - min) + min)
    }
}