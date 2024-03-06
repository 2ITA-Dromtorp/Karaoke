# Karaoke App - technical documention
 
## Content:
 
 
* [Install](#install)
* [Wavesurfer](#wavesurfer)
* [Index.js](#index-js)


 ***
### Install
Download dependencies:
```shell
npm i
```

***
### Wavesurfer

Wavesurfer configuration:

```js
import WaveSurfer from 'wavesurfer.js';


    wavesurfer = WaveSurfer.create({
    container: '#mic',
    waveColor: '#FFFF00',
    progressColor: 'orange',
    sampleRate: 5000,
})
```
   * **wavesurfer** = WaveSurfer.create({}) gives the variable wavesurfer a waveform value. This changes according to the paramethers set in the function above.
   * **container** is telling where the waveform is supposed to go
   * **waveColor** decides which color the waveform gets (rgb or hex)
   * **progressColor** decides the color you want the waveform to have, according to your progress through the waveform. Think of it as a progressbar like on YouTube.
   * **sampleRate** the difference between high or low value of the sampleRate doesn't give much effect from what I've tested.

```js
           const updateProgress = async(time, vareArray) => {
        // time will be in milliseconds, convert it to mm:ss format
        const formattedTime = [
            Math.floor((time % 3600000) / 60000), // minutes
            Math.floor((time % 60000) / 1000), // seconds
        ]
            .map((v) => (v < 10 ? '0' + v : v))
            .join(':')
            /* Super fancy måte å formatere tid på. Dette gjøres sånn at vi kan skrive sangvarighet i JSON på en enkel måte. Altså "08:37" istedet for å måle i sekunder eller milisekunder. */
        progress.textContent = formattedTime
        console.log(songArray)
        console.log(formattedTime)
        if (formattedTime == songArray) {
            /* Hvis det har gått like mye tid under opptaket som verdien til lengde i JSON, så */
            record.stopRecording()
                const imgExport = await wavesurfer.exportImage('image/jpeg'); // Export the image data          
                let dataToSend = imgExport[0]
                    axios.post("/test", {"data": dataToSend})
                    .catch(error => {
                      console.error('Error sending the POST request:', error);
                    });
                
        }
        }
```

***
### Index js
#### Dependencies in index.js
* [express](https://www.npmjs.com/package/express)
* [cors](https://www.npmjs.com/package/cors) 
* [fs](https://nodejs.org/api/fs.html) 
* [ssim](https://www.npmjs.com/package/ssim.js/v/3.4.0)
* [pngjs](https://www.npmjs.com/package/pngjs)
* [path](https://nodejs.org/docs/latest/api/path.html)
* [jimp](https://www.npmjs.com/package/jimp)
*** 
#### Covert **base64** to jpg
```js
app.post('/creator', async (req, res) => {

  try {
    const img = req.body.data;
    fs.writeFileSync("testimg.jpg", img.split(";base64,").pop(), {encoding: 'base64'});
    if (req = true) {
      
    }
    const b = req;
    res.send("Ja det funker");
  } catch (err) {
    res.status(500).send('Internal Server Error');
  } finally {
  }
});
```
***
#### Sends data from content.json to frontend
```js
app.get('/getText', (req, res) => {
  res.send(textTest);
})
```
***
#### Converts jpg to png and compares the similarity between the new picture and the original using the **ssim** method

```js
app.post('/ssim', async (req, res) => {
  try {
    const img = req.body.data;
    fs.writeFileSync("testimg.jpg", img.split(";base64,").pop(), {encoding: 'base64'});
    const img1 = await Jimp.read("./testimg.jpg");
    const img2 = await Jimp.read("./heraldOfDarknessVocals.jpg");
    img1.resize(img2.bitmap.width, img2.bitmap.height); // Resize img1 to match img2 dimensions
    await img1.writeAsync("ferdig1.png"); // save
    await img2.writeAsync("ferdig2.png"); // save

    const img1Buffer = await fs.promises.readFile(path.join(__dirname, 'ferdig1.png'));
    const img2Buffer = await fs.promises.readFile(path.join(__dirname, 'ferdig2.png'));

    const img1Data = PNG.sync.read(img1Buffer);
    const img2Data = PNG.sync.read(img2Buffer);
    const { mssim, performance } = ssim(img1Data, img2Data);

    res.send(`SSIM: ${mssim} (${performance}ms)`);

  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});
```

