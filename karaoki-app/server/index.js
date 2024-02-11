const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://chenalexanderfuglestad:8mM18XRvxzkXj3Vu@cluster0.bjn32lb.mongodb.net/?retryWrites=true&w=majority";
const fs = require('fs');
const { computeSSIM } = require('image-ssim');
// const { default: App } = require('../src/App');
const app = express();
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({ limit: '500mb' }));
const testimg = './testimg.png';

app.use((req, res, next) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    console.log('Request payload size:', data.length);
    next();
  });
});


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
    console.log(req.body);
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

// app.get('/test', async (req, res) => {
//   try {
//       res.send("Ja det funker");
//   } catch (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//   }
// });


// const PORT = 3009;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
//   app.get("*", (req, res) => {
//     console.log("aefipafpu")
//   })
// });
const port = process.env.PORT || 6969;
app.listen(port, () => console.log(`Server started on port ${port}`));




// KODEN UNDER DENNE KOMMENTAREN FUNKER IKKE!
// LA KODEN VÆRE KOMMENTERT UT!

//Bare at istedenfior å reade png-er tar du heller å comparer spektrogrammene laget av wavesurfer.js

app.get('/test', (req, res) => {
const img1 = fs.readFileSync(testimg);
const img2 = fs.readFileSync(testimg);
app
computeSSIM(img1, img2, (err, score) => {
  if (err) {
    console.error('Error computing SSIM:', err);
    res.send('Error computing SSIM: ' + err);
    return;
  }

  console.log('SSIM:', score);

  const threshold = 0.9; //Hvor anderledes de er fra hverandre, Andreas
  if (score >= threshold) {
    console.log('Spectrograms are alike.');
    res.send('Spectrograms are alike.');
  } else {
    console.log('Spectrograms are different.');
    res.send('Spectrograms are different.');
  }
});

})


