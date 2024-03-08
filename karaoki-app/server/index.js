const express = require('express');
const cors = require('cors'); 
const fs = require('fs');
const { ssim } = require('ssim.js');
const app = express();
const PNG = require('pngjs').PNG;
const textTest = require('./content.json');
const path = require('path');
const Jimp = require("jimp");


app.use(cors());
app.use(express.static("build"));
app.use(express.json({ limit: '50mb' }));


app.post('/creator', async (req, res) => { // gjør om base64 til adminExport.jpg og sjekker om det funker

  try {
    const img = req.body.data;
    fs.writeFileSync("adminExport.jpg", img.split(";base64,").pop(), {encoding: 'base64'});
    if (req = true) {
      
    }
    const b = req;
    res.send("Ja det funker");
  } catch (err) {
    res.status(500).send('Internal Server Error');
  } finally {
  }
});

app.get('/getText', (req, res) => {
  res.send(textTest);
})





const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));




app.post('/ssim', async (req, res) => { 
  try {
    const img = req.body.data;
    const songId = req.body.id
    console.log(songId)
    fs.writeFileSync("testimg.jpg", img.split(";base64,").pop(), {encoding: 'base64'});
    const img1 = await Jimp.read("./testimg.jpg");
    const img2 = await Jimp.read(textTest[songId].vokalPath);
    img1.resize(img2.bitmap.width, img2.bitmap.height); // Resize img1 to match img2 dimensions
    await img1.writeAsync("ferdig1.png"); // save
    await img2.writeAsync("ferdig2.png"); // save

    const img1Buffer = await fs.promises.readFile(path.join(__dirname, 'ferdig1.png'));
    const img2Buffer = await fs.promises.readFile(path.join(__dirname, 'ferdig2.png'));

    const img1Data = PNG.sync.read(img1Buffer);
    const img2Data = PNG.sync.read(img2Buffer);
    const { mssim, performance } = ssim(img1Data, img2Data);

    res.send(`${Math.floor(mssim * 10000)} Poeng`);

  } catch (error) {
    res.status(500).send('Internal Server Error');
    console.log(error)
  }
});


