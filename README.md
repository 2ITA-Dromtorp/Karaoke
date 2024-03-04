# Karaoke App
 
## Innhold:
 
 
* Innstallasjon
* Wavesurfer
* Homepage.js
 
### Innstallasjon
Lag ett nytt react prosjekt:
```shell
npx create-react-app my-app
```
Innstaler React-router-dom i react prosjektet:
```shell
npm i react-router-dom
```
Innstaler Node i react prosjektet:
```shell
npm i -g n
```
Innstaler Axios i react prosjektet:
```shell
npm install axios
```
Innstaller Assert i react prosjektet:
```shell
npm install assert
```
Innstaller Cors i react prosjektet:
```shell
npm install cors
```
Innstaller Express i react prosjektet:
```shell
npm install express
```
Innstaller Ssim i react prosjektet:
```shell
npm install --save img-ssim
```
Innstaller Jimp i react prosjektet:
```shell
npm install --save jimp
```
Innstaller Pixelmatch i react prosjektet:
```shell
npm install pixelmatch
```
Innstaller Pngjs i react prosjektet:
```shell
npm install pngjs --save
```
Innstaller Sharp i react prosjektet:
```shell
npm install sharp
```
Innstaller Ssim.js i react prosjektet:
```shell
npm install ssim.js
```




### Wavesurfer

Wavesurfer konfigurasjon:

```js
import WaveSurfer from 'wavesurfer.js';


    wavesurfer = WaveSurfer.create({
    container: '#mic',
    waveColor: '#FFFF00',
    progressColor: 'orange',
    sampleRate: 5000,
})
```
   * **wavesurfer** = WaveSurfer.create({}) gir variabelen wavesurfer da en waveform som verdi. Denne endres på med parameterne du ser ovenfor.
   * **container** sier bare hvor waveformen skal gå
   * **waveColor** angir du fargen waveformen skal ha, i enten rgb eller hex.
   * **progressColor** angir du fargen waveformen skal ha, til venstre for der den er i lydfilen. 
   * **sampleRate** er kvaliteten på opptaket. Ut ifra det jeg har testet har det veldig lite å si hvor høy/lav den er.

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


### Homepage.js
#### Innhold på siden:
```js
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongCard from './SongCard';
```
***
#### Funksjon - Lag en funksjon som heter **Homepage** inne i Homepage.js
```js
 const [songArray, setSongArray] = useState([]);
    let [text, setText] = useState("");

    /*Variabler*/

  useEffect(() => {
    getText()
  }, [onloadstart])

      return (
      <div className="karaokeWrapper">
        <div className='songWrapper'>
          <div className='karaokeSongs' id='karaokeSongs'>  
            {songArray.length > 0 &&songArray.map((sang, index) => (
                <SongCard name={sang.vareNavn} sangNavn={sang.vareNavn} key={index} index={index} lengde={sang.lengde} bilde={sang.bilde} beskrivelse={sang.beskrivelse}/>
            ))}
          </div> 
          <div>
            <button onClick={() => getTester()}>Sammenlikne spektrogrammene</button>  
            <button onClick={() => getText()}>Hent tekst</button>
            <p>{text}</p> 
            <div id='gridElement'></div>
          </div>
        </div>
      </div>
    );


export default HomePage;

```
* **SongCard** blir renderet gjennom 
```js
{songArray.length > 0 &&songArray.map((sang, index) => (/*...*/) ) }
```
* Dette betyr at for hvert element i **songArray** blir **SpngCard** renderet med de tilsvarende egenskaper sendt som attributter.
***
#### Variabler 
```js

  const getText = async () => {
    await axios
      .get("/getText")
      .then(response => {
        console.log(response)
        let vareArray = response.data;
        console.log(vareArray)
        setSongArray(response.data);
        console.log(songArray)
      })
      
      .catch(error => console.log(error));
  };

``` 
1. Lag variabelen **getText**
* På samme måte som **getTester** er **getText** en async funksjon lager en **get**-request til **/getText**. 
* Så gir den **vareArray** verdien av responsen og i **.catch()** så vil den fortelle at det er en error er hvis det er en error. 