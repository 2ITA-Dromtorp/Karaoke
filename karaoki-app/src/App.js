import Melvin from './images/placeholder_melvin.jpg';
import './App.css';
import Test from './components/test';
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js'
import Scoreboard from './components/scoreboard'

function App() {

  const waveref = useRef(null);
  let wavesurfer = null;
  let [imgExport, setImgExport] = useState("");


    console.log("FOAFIUAOFUAOFIU")



  useEffect(() => {
      wavesurfer = WaveSurfer.create({
        container: '#waveform',
          waveColor: '#4F4A85',
          progressColor: 'orange',
          sampleRate: 6000,
          url: './audio/tested.mp3'
      });

      wavesurfer.load('./audio/HURHRUHURHURHRU.mp3');
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
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
  
      // Compress the image data
      canvas.toBlob((blob) => {
        // Log the size of the compressed image
        console.log('Compressed payload size:', blob.size, 'bytes');
      
        // Send the compressed image to the backend
        const dataToSend = new FormData();
        dataToSend.append('imgExport', blob, 'image.jpeg');
      
        fetch('http://localhost:3009/tester', {
          method: 'POST',
          body: dataToSend,
        })
        .then(async (res) => {
          if (res.status === 404) {
            console.error('Endpoint not found. Check server configuration.');
            // Handle the 404 error appropriately
          } else if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          console.log(data);
        });
      }, 'image/jpeg', 0.2); // Use the appropriate image format and quality
    };
  };

  return (
    <>
    <div className='vibeCheck'>
      <h1>VENNLIGST SNU ENHETEN DIN SÅNN AT DEN ER I PORTRETT MODUS!!!</h1>
    </div>
    <div className="karaokeWrapper">
      <div className='songWrapper'>
        <div className='karaokeSongs'>
          <div className='karaokeCard'>
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
          </div>

          <Test/>
          <p>Hello World</p>
          <div className='tester'>
        {/* <div ref={waveref}/> */}
        <div>
          
        <div id='waveform'> </div>
        <button onClick={() => handleclick()}>Play</button>  
        <h1>test</h1>
        </div>
        <Scoreboard />
      </div>
    </div>
    </div>
    </div>
</>
  );
}

export default App;