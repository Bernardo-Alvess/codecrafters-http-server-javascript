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
                socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 3\r\n\r\nabc`)
            }else if(path === '/user-agent'){
                const response = 'HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 12\r\n\r\nfoobar/1.2.3'
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
