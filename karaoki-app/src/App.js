import Melvin from './images/placeholder_melvin.jpg';
import './App.css';
import Test from './components/test';
import React, { useEffect, useRef, useState, useNavigate } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js'
import Scoreboard from './components/scoreboard'
import axios from 'axios';
import SongCard from './SongCard';

function App() {

  const waveref = useRef(null);
  let wavesurfer = null;
  let [imgExport, setImgExport] = useState("");
  let [text, setText] = useState("");
  const [songArray, setSongArray] = useState([]);

    console.log("FOAFIUAOFUAOFIU")



  useEffect(() => {
      wavesurfer = WaveSurfer.create({
        container: '#waveform',
          waveColor: '#4F4A85',
          progressColor: 'orange',
          sampleRate: 6000,
          url: './audio/tested.mp3'
      });

      wavesurfer.load('./audio/heraldOfDarknessInstrumental.mp3');
      return () => {
          wavesurfer.destroy();
      };
  }, []);
  
const handleclick = async () => {
  const imgExport = await wavesurfer.exportImage('image/jpeg'); // Export the image data
  console.log(imgExport);

  // Create a new canvas and draw the image on it
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = imgExport;
  // let dataToSend = {
  //   imgExport: imgExport[0],
  // };
  let dataToSend = imgExport[0]

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Compress the image data
    canvas.toBlob((blob) => {
      // Log the size of the compressed image
      console.log('Compressed payload size:', blob.size, 'bytes');

      // Construct the data to send
// Add the compressed image blob to the dataToSend object

      // fetch('http://localhost:6969/tester', {
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": "text/html; charset=utf-8"
      //   },
      //   body: JSON.stringify(dataToSend) // Stringify the entire dataToSend object once
      // })
      console.log(dataToSend)
      axios.post("/tester", {"data": dataToSend})
      .then(async (res) => {
        // if (res.status === 404) {
        //   console.error('Endpoint not found. Check server configuration.');
        //   // Handle the 404 error appropriately
        // } else if (!res.ok) {
        //   throw new Error(`HTTP error! Status: ${res.status}`);
        // }
        console.log(res.data);
        // console.log(dataToSend)
      })
      .catch(error => {
        console.error('Error sending the POST request:', error);
      });
    }, 'image/jpeg', 0.2); // Use the appropriate image format and quality
  };
};

const getTester = async () => {
  await axios
    .get("/test")
    .then(response => {
      console.log(response)
    })
    .catch(error => console.log(error));
};

const getText = async () => {
  await axios
    .get("/getText")
    .then(response => {
      console.log(response)
      // setText(response.data.frontTest.headerText)
      let vareArray = response.data;
      console.log(vareArray)
      setSongArray(response.data);
      console.log(songArray)

      // for (let i = 0; i < vareArray.length; i++) {
      //   const wrapperDiv = document.createElement("div");
      //   wrapperDiv.classList.add("karaokeCard");
      
      //   const h1Tag = document.createElement("h1");
      //   const h1Text = document.createTextNode(vareArray[i].vareNavn);
      //   h1Tag.appendChild(h1Text);
      
      //   // const pTag = document.createElement("p");
      //   // const pText = document.createTextNode(vareArray[i].lengde);
      //   // pTag.appendChild(pText);
      

      
      //   const imgTag = document.createElement("img");
      //   imgTag.src = vareArray[i].bilde
      //   imgTag.classList.add("bilde")
      
      //   wrapperDiv.appendChild(h1Tag);
      //   wrapperDiv.appendChild(imgTag)
      //   // wrapperDiv.appendChild(pTag);

      
      //   const gridElementfromhtml = document.getElementById("karaokeSongs")
      //   gridElementfromhtml.appendChild(wrapperDiv)
      //   console.log("sang "+[i + 1]+" er lagt til")
      // }
    })
    
    .catch(error => console.log(error));
};
useEffect(() => {
  getText()
}, [onloadstart])


  return (
    <>

    <div className="karaokeWrapper">
      <div className='songWrapper'>
        <div className='karaokeSongs' id='karaokeSongs'>
          {/* <div className='karaokeCard'>
            <img src={Melvin} alt='bilde'/>
          </div>
          <div className='karaokeCard'>
            <img src={Melvin} alt='bilde'/> 
          </div>
          <div className='karaokeCard'>
            <img src={Melvin} alt='bilde'/>
          </div>
          <div className='karaokeCard'>
            <img src={Melvin} alt='bilde'/>
          </div> */}

          {songArray.length > 0 &&songArray.map((sang, index) => (
              <SongCard name={sang.vareNavn} sangNavn={sang.vareNavn} key={index} index={index} lengde={sang.lengde} bilde={sang.bilde} beskrivelse={sang.beskrivelse}/>
          ))}

          </div>
          <Test/>
          <p>Hello World</p>
          <div className='tester'>
        {/* <div ref={waveref}/> */}
        <div>
          
        <div id='waveform'> </div>
        <button onClick={() => handleclick()}>Sende spektrogramm</button>  
        <button onClick={() => getTester()}>Sammenlikne spektrogrammene</button>  
        <button onClick={() => getText()}>Hent tekst</button>
        
        <p>{text}</p> 
        <h1>test</h1>
        <div id='gridElement'></div>
        </div>
        <Scoreboard />
      </div>
    </div>
    </div>

</>
  );
}

export default App;