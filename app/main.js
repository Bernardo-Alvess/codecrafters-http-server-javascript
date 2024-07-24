const net = require("net");
const responseOk = 'HTTP/1.1 200 OK\r\n\r\n'
const responseNotFound = 'HTTP/1.1 404 Not Found\r\n\r\n'

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
    socket.write(responseOk)

    socket.on('data', (data) => {
        const request = data.toString()
        const [requestLine] = request.split('\n')
        const [method, path] = request.split(' ')

        if(method === 'GET'){
            if(path === '/'){
                socket.write(responseOk)
            }

            socket.write(responseNotFound)
        }

        socket.end()
    })

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");

server.on('error', (err) => {
    console.error(err)
})
