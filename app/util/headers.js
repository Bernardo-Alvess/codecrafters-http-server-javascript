const calculatelen = (content) => {
    let len = 0
    const type = typeof content
    if (type === 'string'
        || type === 'number'
        || type === 'boolean'
        || type === 'bigint'
    ) {
        content = content.toString().trim()
        len = Buffer.byteLength(content, 'utf-8')

    } else if (
        type === 'undefined'
        || type === 'symbol'
        || type === 'function'
    ) {
        len = 0
    } else {
        switch (type) {
            case 'object':
                if (content === null) {
                    len = 0;
                } else if (Array.isArray(content) || Buffer.isBuffer(content)) {
                    len = Buffer.byteLength(content, 'utf8');
                } else {
                    len = Buffer.byteLength(JSON.stringify(content), 'utf8');
                }
                break;
            case 'undefined':
                len = 0;
                break;
            case 'symbol':
                len = 0;
                break;
            case 'function':
                len = 0;
                break;
            default:
                len = 0;
        }
    }

    return `Content-Length: ${len}`
}

const defineContentType = (content) => {
    let contentType = '';
    console.log(typeof content)
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
    }else {
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
            case 'Buffer':
                contentType = 'application/octet-stream'
            default:
                contentType = 'application/octet-stream'; // Default binary for unknown types
        }
    }

    return `Content-Type: ${contentType}`;
}

const mountHeader = (content) => {
    const contentType = defineContentType(content)
    const len = calculatelen(content)

    const header = `${contentType}\r\n${len}\r\n`
    return header
};



module.exports = { mountHeader }