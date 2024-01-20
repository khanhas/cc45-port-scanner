
import net from "net"

function parseArguments(args: string[]) {
    const hosts: string[] = []
    const ports: number[] = []

    for (const arg of args) {
        const [name, value] = arg.split("=")
        switch (name) {
            case "port":
                ports.push(...value.split(",").map(Number))
                break
            case "host":
                hosts.push(...value.split(","))
                break
            default:
                break
        }
    }

    return { hosts, ports }
}


function isConnectable(host: string, port: number): Promise<boolean> {
    const client = new net.Socket();
    return new Promise((resolve) => {
        client.connect({ host, port })

        client.on('connect', () => finish(true))

        client.on('error', () => finish(false))
        client.setTimeout(500, () => finish(false))

        function finish(result: boolean) {
            resolve(result)
            client.destroy()
        }
    })
}

async function main() {
    const { hosts, ports } = parseArguments(process.argv.slice(2))
    
    if (hosts.length === 0) {
        hosts.push("127.0.0.1") // Local host scan only
    }
    if (ports.length === 0) {
        ports.push(...new Array(65535).fill(0).map((_, idx) => 1 + idx)) // 1 -> 65535 ports scan
    }

    for (const host of hosts) {
        process.stdout.write(`HOST: ${host}\n`)
        for (const port of ports) {
            process.stdout.write(`  PORT: ${port}`)
            if (await isConnectable(host, port)) {
                process.stdout.write(" is open\n")
            } else {
                process.stdout.clearLine(0);
                process.stdout.cursorTo(0);
            }
        }
    }
}


main()