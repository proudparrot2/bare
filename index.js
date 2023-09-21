/* eslint-disable @typescript-eslint/no-var-requires */
const http = require('node:http');
const { createBareServer } = require('@tomphttp/bare-server-node');
require("colors");

const httpServer = http.createServer();

const bareServer = createBareServer('/');
const port = process.env.PORT || 3000

httpServer.on('request', (req, res) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeRequest(req, res);
	} else {
		res.writeHead(400);
		res.end('Not found.');
	}
});

httpServer.on('upgrade', (req, socket, head) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

httpServer.on('listening', () => {
    console.log(`${' Bare '.bold.cyan.inverse} Bare server listening on port ${port.toString().green}`);
});

httpServer.listen({
	port: port,
});
