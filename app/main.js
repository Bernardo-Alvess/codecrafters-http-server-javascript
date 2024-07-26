const net = require("net");
const {mountHeader} = require("./util/headers")
const responseOk = 'HTTP/1.1 200 OK'
const responseNotFound = 'HTTP/1.1 404 Not Found'

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {

    socket.on('data', (data) => {
        const request = data.toString()
        const [requestLine, ...headerLines] = request.split('\n')
        const [method, path] = requestLine.split(' ')

        // console.log(`Full Request:\n${request}`);
        // console.log(`Request Line: ${requestLine}`);
        // console.log(`Method: ${method}`);
        // console.log(`Path: ${path}`);

        if(method === 'GET'){

            if(path === '/'){
                socket.write(`${responseOk}\r\n\r\n`)

            }else if(path.includes('/echo/')){
                console.log('echo')
                const content = path.split('/echo/')[1]
                const header = mountHeader(content)
                const response = `${responseOk}\r\n${header}\r\n${content}`
                socket.write(response)
            }else if(path === '/user-agent'){
                console.log('/user-agent')
                console.log(`headerlines = ` + headerLines[1].split(' ')[1])
                const body = headerLines[1].split(' ')[1]
                console.log('body: ' + body)
                const header = mountHeader(body)
                const response = `${responseOk}\r\n${header}\r\n${body}`
                console.log(response);
                socket.write(response)
            }else{
                socket.write(`${responseNotFound}\r\n\r\n`)
            }
        }

        socket.end()
    })

    socket.on("close", () => {
        socket.end();
    });

    socket.on('end', () => {
        console.log('Client disconnected')
    })
});

server.listen(4221, "localhost");

server.on('error', (err) => {
    console.error(err)
})
