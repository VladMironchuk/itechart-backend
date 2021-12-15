import ws from 'ws';

export const wsServer = new ws.Server(
  {
    port: 5000,
  },
  () => console.log('Server started on port 5000')
);

wsServer.on('connection', (ws) => {
  ws.send('you are connected')
});
