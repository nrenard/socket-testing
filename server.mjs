import { createServer } from 'http';

import utilsSocket from './utilsSocket.mjs';

const PORT = 1337;

const server = createServer((request, response) => {
  response.writeHead(200);
  response.end('End')
});

server.listen(PORT, () => console.log(`server listen on: ${PORT}`));

function onSocketUpgrade(req, socket) {
  const { 'sec-websocket-key': clientKey } = req.headers;
  const headers = utilsSocket.prepareHandShakeHeaders(clientKey);

  socket.write(headers)
}

server.on('upgrade', onSocketUpgrade)

const processErrors = [
  "uncaughtException",
  "unhandledRejection",
];

processErrors.forEach((errorEvent) => {
  process.on(errorEvent, (err) => {
    console.error(`Error event: ${errorEvent}, msg: ${err.stack || err}`);
  })
})

