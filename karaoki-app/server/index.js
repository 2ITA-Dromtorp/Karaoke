const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://chenalexanderfuglestad:8mM18XRvxzkXj3Vu@cluster0.bjn32lb.mongodb.net/?retryWrites=true&w=majority";
const fs = require('fs');
const { computeSSIM, compare, score } = require('image-ssim');
const { ssim, load } = require('ssim.js');
const ImageSSIM = require('image-ssim');
// const { default: App } = require('../src/App');
const app = express();
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

app.use(cors());
app.use(express.static('build'));

// app.use(express.json());
app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));
const testimg = './testimg.png';

// app.use((req, res, next) => {
//   let data = '';
//   req.on('data', chunk => {
//     data += chunk;
//   });
//   req.on('end', () => {
//     console.log('Request payload size:', data.length);
//     next();
//   });
// });


console.log("aefipafpu")
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log("aefipafpu")
});

app.post('/tester', async (req, res) => {
  console.log("running")
  // const b = req.body;
  // console.log(data);


  try {

    // const b = req.body;
   
    const img = req.body.data;
    console.log(img);
    fs.writeFileSync("testimg.jpg", img.split(";base64,").pop(), {encoding: 'base64'});
    console.log(req.body.data)
    if (req = true) {
      console.log("lang")
      
    }
    const b = req;
    // console.log(b) 
    // res.status(200).json({ message: 'Success' });
    res.send("Ja det funker");
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    // releaseDbConnection(req, res);
  }
});


const port = process.env.PORT || 6969;
app.listen(port, () => console.log(`Server started on port ${port}`));




// KODEN UNDER DENNE KOMMENTAREN FUNKER IKKE!
// LA KODEN VÆRE KOMMENTERT UT!

//Bare at istedenfior å reade png-er tar du heller å comparer spektrogrammene laget av wavesurfer.js

app.get('/test', (req, res) => {
// const img1 = fs.readFileSync("./testimg.jpg");
// const img2 = fs.readFileSync("./testimg2.jpg");
const img1 = PNG.sync.read(fs.readFileSync('./testimg.jpg'));
const img2 = PNG.sync.read(fs.readFileSync('./testimg2.jpg'));

const {width, height} = img1;
const diff = new PNG({width, height});

pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});

fs.writeFileSync('diff.png', PNG.sync.write(diff));

// let score = 0;
// let k1 = 0
// let k2 = 0
// let windowSize = 8


// import ssim from 'ssim.js';

// try {
//   const out = ssim('./test.jpg', './img2.jpg')
//   console.log(`SSIM: ${out.mssim} (${out.performance}ms)`)
// } catch (err) {
//   console.error('Error generating SSIM', err);
// }

// const ssimIndex = ssim(img1, img2);

// return ssimIndex;

// console.log(score)


// ssim(img1, img2)
// .then(out => console.log(out.mssim))
// .catch(err => console.error('Error generating SSIM', err));




    // it('should compare same images', function(done) {
    //     load('./test/images/wheel-pixelized.png', './test/images/wheel-pixelized.png', function(images){
    //         var ssim = SSIM.compare(images[0], images[1]);
    //         assert(ssim.ssim === 1);
    //         done();
    //     });
    // });
// });

// compare()



// compare(img1, img2,(err, score, k1, k2, windowSize) => {
//   // console.log("kjører")
//   console.log(ImageSSIM.IResult);
//   // console.log('SSIM:', score);

//   if (err) {
//     console.error('Error comparing images:', err);
//   }
// return;
// })
// console.log(IResult)
// computeSSIM(img1, img2, (err, score) => {
//   if (err) {
//     console.error('Error computing SSIM:', err);
//     res.send('Error computing SSIM: ' + err);
//     return;
//   }


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


