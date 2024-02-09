const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://chenalexanderfuglestad:8mM18XRvxzkXj3Vu@cluster0.bjn32lb.mongodb.net/?retryWrites=true&w=majority";
const fs = require('fs');
const { computeSSIM } = require('image-ssim');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// KODEN UNDER DENNE KOMMENTAREN FUNKER IKKE!
// LA KODEN VÆRE KOMMENTERT UT!

// //Bare at istedenfior å reade png-er tar du heller å comparer spektrogrammene laget av wavesurfer.js
// const img1 = fs.readFileSync('./test.png');
// const img2 = fs.readFileSync('./test.png');
// computeSSIM(img1, img2, (err, score) => {
//   if (err) {
//     console.error('Error computing SSIM:', err);
//     return;
//   }

//   console.log('SSIM:', score);

//   const threshold = 0.9; //Hvor anderledes de er fra hverandre, Andreas
//   if (score >= threshold) {
//     console.log('Spectrograms are alike.');
//   } else {
//     console.log('Spectrograms are different.');
//   }
// });

// //express.json({limit: '20mb'})