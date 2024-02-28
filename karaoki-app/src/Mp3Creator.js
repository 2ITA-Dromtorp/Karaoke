import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js'
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function Mp3Creator() {
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
            sampleRate: 20000,
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
    return (
        <div>
          <div id='waveform'> </div>
          <button onClick={() => handleclick()}>Sende spektrogramm</button>  
        </div>
    );
}

export default Mp3Creator