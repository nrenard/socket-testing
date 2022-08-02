import crypto from 'crypto';

const MAGIC_WEBSOCKET_STRING = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'

const createSocketAccept = (id) => {
  const shaum = crypto.createHash('sha1');
  shaum.update(id + MAGIC_WEBSOCKET_STRING)

  return shaum.digest('base64');
}

const prepareHandShakeHeaders = (id) => {
  const acceptKey = createSocketAccept(id);

  const headers = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${acceptKey}`,
    ''
  ].map(line => line.concat('\r\n')).join('');

  return headers;
}

export default {
  prepareHandShakeHeaders
}