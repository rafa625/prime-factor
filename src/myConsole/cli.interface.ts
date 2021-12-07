export default interface CliInterface {
    info: (args: string) => void
    ask: (args: string) => string
}
