export default class base64 {
   static encode(string: string): string {
        let base64String

        if (!string) string = ''

        base64String = Buffer.from(string).toString('base64')

        return base64String
    }

    static decode(base64String: string): string {
        let clearString

        if (!base64String) base64String = ''

        clearString = Buffer.from(base64String, 'base64').toString('utf8')

        return clearString
    }
}
