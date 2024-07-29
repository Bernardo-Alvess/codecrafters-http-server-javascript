[![progress-banner](https://backend.codecrafters.io/progress/http-server/4494a47b-119b-4c20-9702-9587ca39be87)](https://app.codecrafters.io/users/codecrafters-bot?r=2qF)

# ["Build Your Own HTTP server" Challenge](https://app.codecrafters.io/courses/http-server/overview)

[HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) is the
protocol that powers the web. In this challenge, you'll build a HTTP/1.1 server
that is capable of serving multiple clients.

## How It Works
The server uses Node.js's built-in http module to create a simple HTTP server that listens for incoming connections. It parses incoming requests, handles them accordingly, and sends back the appropriate HTTP responses. Static files are served from the public directory.

## Key Concepts
- Request Handling: The server listens for HTTP requests and parses the request line to determine the HTTP method and requested resource.
- Static File Serving: When a GET request is received, the server attempts to find the requested file in the public directory and sends it back to the client.

[codecrafters.io](https://codecrafters.io)

