const net = require("net");
const fs = require('fs');
const path = require('path');
const { mountHeader } = require("./util/headers");
const responseOk = 'HTTP/1.1 200 OK';
const responseNotFound = 'HTTP/1.1 404 Not Found';

// Set the base directory for file storage
const baseDirectory = __dirname; // This should match the directory used for testing

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const request = data.toString();
        const [requestLine, ...headerLines] = request.split('\n');
        const [method, url] = requestLine.split(' ');

        console.log(`Request Line: ${requestLine}`);
        console.log(`Method: ${method}`);
        console.log(`URL: ${url}`);

        if (method === 'GET') {
            if (url === '/') {
                socket.write(`${responseOk}\r\n\r\n`);
            } else if (url.includes('/echo/')) {
                const content = url.split('/echo/')[1];
                const header = mountHeader(content);
                const response = `${responseOk}\r\n${header}\r\n${content}`;
                socket.write(response);
            } else if (url === '/user-agent') {
                const body = headerLines[1].split(' ')[1];
                const header = mountHeader(body);
                const response = `${responseOk}\r\n${header}\r\n${body}`;
                socket.write(response);
            } else if (url.includes('/files/')) {
                const fileName = url.split('/files/')[1]; // Extract filename
                const filePath = path.join(baseDirectory, 'files/', fileName); // Construct full file path
                console.log(`Checking file path: ${filePath}`);

                if (fs.existsSync(filePath)) {
                    console.log('File exists, sending response');
                    const fileContent = fs.readFileSync(filePath); // Read file contents
                    const contentLength = fileContent.length;
                    const header = `Content-Type: application/octet-stream\r\nContent-Length: ${contentLength}`;

                    // Send the response with file content
                    const response = `${responseOk}\r\n${header}\r\n\r\n${fileContent}`;
                    socket.write(response);
                } else {
                    console.log('File not found, sending 404');
                    socket.write(`${responseNotFound}\r\n\r\n`);
                }
            } else {
                socket.write(`${responseNotFound}\r\n\r\n`);
            }
        }

        socket.end();
    });

    socket.on("close", () => {
        socket.end();
        server.close();
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(4221, "localhost");

server.on('error', (err) => {
    console.error(err);
});
