const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// JSON dosyasının yolu
const racesFile = './races.json';

// JSON body parsing middleware
app.use(express.json());

// Yarış eklemek için POST isteği
app.post('/add-race', (req, res) => {
  const newRace = req.body;

  // races.json dosyasını oku
  fs.readFile(racesFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Yarış verileri okunamadı.');
    }

    let races = JSON.parse(data); // JSON verisini JavaScript objesine çevir
    races.push(newRace); // Yeni yarışı listeye ekle

    // Güncellenmiş veriyi races.json dosyasına kaydet
    fs.writeFile(racesFile, JSON.stringify(races, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Yarış verileri kaydedilemedi.');
      }
      res.status(200).send('Yarış başarıyla eklendi!');
    });
  });
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
