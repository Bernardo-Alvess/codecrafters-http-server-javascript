const calculateContentLength = (content) => {
    let len = 0
    const type = typeof content
    if (type === 'string'
        || type === 'number'
        || type === 'boolean'
        || type === 'bigint'
    ) {
        len = Buffer.byteLength(content.toString(), 'utf-8')

    } else if (
        type === 'undefined'
        || type === 'symbol'
        || type === 'function'
    ) {
        len = 0
    } else {
        switch (typeof content) {
            case 'object':
                if (content === null) {
                    contentLength = 0;
                } else if (Array.isArray(content) || Buffer.isBuffer(content)) {
                    contentLength = Buffer.byteLength(JSON.stringify(content), 'utf8');
                } else {
                    contentLength = Buffer.byteLength(JSON.stringify(content), 'utf8');
                }
                break;
            case 'undefined':
                contentLength = 0;
                break;
            case 'symbol':
                contentLength = 0;
                break;
            case 'function':
                contentLength = 0;
                break;
            default:
                contentLength = 0;
        }
    }

    return `Content-Length: ${len}`
}

const defineContentType = (content) => {
    let contentType = '';

    const type = typeof content

    if (
        type === 'string'
        || type === 'number'
        || type === 'boolean'
        || type === 'bigint'
        || type === 'symbol'
        || type === 'function'
    ) {
        contentType = 'text/plain';
    } else {
        switch (type) {
            case 'object':
                if (content === null) {
                    contentType = 'application/octet-stream'; // Default binary
                } else if (Array.isArray(content)) {
                    contentType = 'application/json'; // Arrays as JSON
                } else if (Buffer.isBuffer(content)) {
                    contentType = 'application/octet-stream'; // Binary data
                } else {
                    contentType = 'application/json'; // JSON objects
                }
                break;
            case 'undefined':
                contentType = 'application/octet-stream'; // Default binary for undefined
                break;
            default:
                contentType = 'text/plain'; // Default binary for unknown types
        }
    }

    return `Content-Type: ${contentType}`;
}

const mountHeader = (content) => {
    const contentType = defineContentType(content)
    const contentLength = calculateContentLength(content)

    const header = `${contentType}\r\n${contentLength}\r\n`
    return header
};



module.exports = { mountHeader }