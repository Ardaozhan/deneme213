const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Yeni bağlantı geldi.');

  // Her 3 saniyede bir rastgele veri gönder
  setInterval(() => {
    const raceUpdate = {
      id: Math.floor(Math.random() * 10),
      position: Math.random() * 1000,  // Pozisyon
      speed: Math.random() * 100,      // Hız
    };
    ws.send(JSON.stringify(raceUpdate));  // Veriyi gönder
  }, 3000);

  ws.on('close', () => {
    console.log('Bağlantı kapatıldı.');
  });
});
