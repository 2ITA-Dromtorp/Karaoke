const express = require('express');
const cors = require('cors'); 
const fs = require('fs');
const { computeSSIM, compare, score } = require('image-ssim');
const { ssim, loadImage } = require('ssim.js');
const ImageSSIM = require('image-ssim');
const app = express();
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const textTest = require('./content.json');
const sharp = require('sharp');
const path = require('path');
const Jimp = require("jimp");
// import ssim from "ssim.js";
 


app.use(cors());
app.use(express.static('build'));
app.use(express.json({ limit: '50mb' }));
const testimg = './testimg.png';




console.log("aefipafpu")

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log("aefipafpu")
});

app.post('/tester', async (req, res) => {
  console.log("running")

  try {
    const img = req.body.data;
    console.log(img);
    fs.writeFileSync("testimg.jpg", img.split(";base64,").pop(), {encoding: 'base64'});
    console.log(req.body.data)
    if (req = true) {
      console.log("lang")
      
    }
    const b = req;
    res.send("Ja det funker");
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
  }
});

app.get('/getText', (req, res) => {
  res.send(textTest);
  console.log(textTest)
})

app.get('/song', (req, res) => {
  res.send(textTest);
  console.log("aefipafpu");
});

app.get('/LIZHONGREN', (req, res) => {
  res.send(textTest);
  console.log("aefipafpu");
});



const port = process.env.PORT || 6969;
app.listen(port, () => console.log(`Server started on port ${port}`));




// KODEN UNDER DENNE KOMMENTAREN FUNKER IKKE!
// LA KODEN VÆRE KOMMENTERT UT!

//Bare at istedenfior å reade png-er tar du heller å comparer spektrogrammene laget av wavesurfer.js

app.get('/test', async (req, res) => {
  try {
    const img1 = await Jimp.read("./testimg.jpg");
    await img1.writeAsync("ferdig1.png"); // save

    const img2 = await Jimp.read("./testimg2.jpg");
    await img2.writeAsync("ferdig2.png"); // save

    const img1Buffer = await fs.promises.readFile(path.join(__dirname, 'ferdig1.png'));
    const img2Buffer = await fs.promises.readFile(path.join(__dirname, 'ferdig2.png'));

    const img1Data = PNG.sync.read(img1Buffer);
    const img2Data = PNG.sync.read(img2Buffer);
    console.log('Image 1 Buffer Length:', img1Buffer.length);
    console.log('Image 2 Buffer Length:', img2Buffer.length);
    const { mssim, performance } = ssim(img1Data, img2Data);

    res.send(`SSIM: ${mssim} (${performance}ms)`);

  } catch (error) {
    console.error('Error processing images:', error.message);
    res.status(500).send('Internal Server Error');
  }
});