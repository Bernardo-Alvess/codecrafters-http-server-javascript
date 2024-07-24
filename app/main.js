const net = require("net");
const {mountHeader} = require("./util/headers")
const responseOk = 'HTTP/1.1 200 OK\r\n\r\n'
const responseNotFound = 'HTTP/1.1 404 Not Found\r\n\r\n'

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {

    socket.on('data', (data) => {
        const request = data.toString()
        const [requestLine] = request.split('\n')
        const [method, path] = requestLine.split(' ')

        // console.log(`Full Request:\n${request}`);
        // console.log(`Request Line: ${requestLine}`);
        // console.log(`Method: ${method}`);
        // console.log(`Path: ${path}`);

        if(method === 'GET'){

            if(path === '/'){
                socket.write(responseOk)
            }else if(path.includes('/echo/')){
                // const content = path.split('/echo/')[1]
                // const header = mountHeader(content)
                // const response = `${responseOk}${header}${content}`
                // console.log(`Resposta: {${response}}`)
                // socket.write(response)
                const content = path.split('/echo/')[1];
                socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${content.length}\r\n\r\n${content}`);
            }else{
                socket.write(responseNotFound)
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
