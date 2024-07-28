// const net = require("net")
// const fs = require('fs')
// const { mountHeader } = require("./util/headers")
// const responseOk = 'HTTP/1.1 200 OK'
// const responseNotFound = 'HTTP/1.1 404 Not Found'


// // Uncomment this to pass the first stage
// const server = net.createServer((socket) => {

//     socket.on('data', (data) => {
//         const request = data.toString()
//         const [requestLine, ...headerLines] = request.split('\n')
//         const [method, url] = requestLine.split(' ')

//         console.log(`Request Line: ${requestLine}`)
//         console.log(`Method: ${method}`)
//         console.log(`URL: ${url}`)

//         if (method === 'GET') {
//             if (url === '/') {
//                 socket.write(`${responseOk}\r\n\r\n`)

//             } else if (url.includes('/echo/')) {
//                 const content = url.split('/echo/')[1]
//                 const header = mountHeader(content)
//                 const response = `${responseOk}\r\n${header}\r\n${content}`

//                 socket.write(response)

//             } else if (url === '/user-agent') {
//                 const body = headerLines[1].split(' ')[1]
//                 const header = mountHeader(body)
//                 const response = `${responseOk}\r\n${header}\r\n${body}`

//                 socket.write(response)

//             } else if (url.startsWith("/files/")) {
//                 try{
//                     const directory = process.argv[3] || '/tmp/'
//                     const filename = url.split("/files/")[1]
//                     const isFileValid = fs.existsSync(`${directory}/${filename}`)

//                     if (!isFileValid) {
//                         socket.write("HTTP/1.1 404 Not Found\r\n\r\n")
//                         socket.end()
//                     }

//                     const content = fs.readFileSync(`${directory}/${filename}`)
//                     const header = mountHeader(content)
//                     const response = `${responseOk}\r\n${header}\r\n${content.toString()}`

//                     socket.write(response)
//                 }catch(e){
//                     socket.write("HTTP/1.1 404 Not Found\r\n\r\n")
//                 }
                

//             } else {
//                 socket.write(`${responseNotFound}\r\n\r\n`)
//             }
//         }

//         socket.end()
//     })

//     socket.on("close", () => {
//         server.close()
//     })

//     socket.on('end', () => {
//         console.log('Client disconnected')
//     })
// })

// server.listen(4221, "localhost")

// server.on('error', (err) => {
//     console.error(err)
// })

const net = require("net")
const fs = require('fs')
const { mountHeader } = require("./util/headers")
const responseOk = 'HTTP/1.1 200 OK'
const responseNotFound = 'HTTP/1.1 404 Not Found'

const server = net.createServer((socket) => {
    let buffer = '';

    socket.on('data', (data) => {
        buffer += data.toString();

        const request = buffer.split('\r\n\r\n')[0];
        if (request) {
            const [requestLine,...headerLines] = request.split('\n')
            const [method, url] = requestLine.split(' ')

            console.log(`Request Line: ${requestLine}`)
            console.log(`Method: ${method}`)
            console.log(`URL: ${url}`)

            if (method === 'GET') {
                if (url === '/') {
                    socket.write(`${responseOk}\r\n\r\n`)

                } else if (url.includes('/echo/')) {
                    const content = url.split('/echo/')[1]
                    const header = mountHeader(content)
                    const response = `${responseOk}\r\n${header}\r\n${content}`

                    socket.write(response)

                } else if (url === '/user-agent') {
                    const body = headerLines[1].split(' ')[1]
                    const header = mountHeader(body)
                    const response = `${responseOk}\r\n${header}\r\n${body}`

                    socket.write(response)

                } else if (url.startsWith("/files/")) {
                    try{
                        const directory = process.argv[3] || '/tmp/'
                        const filename = url.split("/files/")[1]
                        const isFileValid = fs.existsSync(`${directory}/${filename}`)

                        if (!isFileValid) {
                            socket.write("HTTP/1.1 404 Not Found\r\n\r\n")
                        } else {
                            const content = fs.readFileSync(`${directory}/${filename}`)
                            const header = mountHeader(content)
                            const response = `${responseOk}\r\n${header}\r\n${content.toString()}`

                            socket.write(response)
                        }
                    }catch(e){
                        socket.write("HTTP/1.1 404 Not Found\r\n\r\n")
                    }
                } else {
                    socket.write(`${responseNotFound}\r\n\r\n`)
                }
            }
        }
    })

    socket.on("close", () => {
        console.log('Client disconnected')
    })

    socket.on('end', () => {
        console.log('Client disconnected')
    })
})

server.listen(4221, "localhost")

server.on('error', (err) => {
    console.error(err)
})