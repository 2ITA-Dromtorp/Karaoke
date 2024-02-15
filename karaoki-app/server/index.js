const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://chenalexanderfuglestad:8mM18XRvxzkXj3Vu@cluster0.bjn32lb.mongodb.net/";
const client = new MongoClient(uri);  
const fs = require('fs');
const { computeSSIM, compare, score } = require('image-ssim');
const { ssim, load } = require('ssim.js');
const ImageSSIM = require('image-ssim');
const app = express();
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const textTest = require('./content.json');

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

app.get('/test', (req, res) => {
const img1 = PNG.sync.read(fs.readFileSync('./testimg.jpg'));
const img2 = PNG.sync.read(fs.readFileSync('./testimg2.jpg'));

const {width, height} = img1;
const diff = new PNG({width, height});

pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});

fs.writeFileSync('diff.png', PNG.sync.write(diff));


console.log("soffjsoh")
  const threshold = 0.9; //Hvor anderledes de er fra hverandre, Andreas
  if (score >= threshold) {
    console.log('Spectrograms are alike.');
    res.send('Spectrograms are alike.');
  } else {
    console.log('Spectrograms are different.');
    res.send('Spectrograms are different.');
  }
  
;

})


