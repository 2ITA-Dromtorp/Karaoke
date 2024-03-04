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
  
    let dataToSend = imgExport[0]

        console.log(dataToSend)
        axios.post("/creator", {"data": dataToSend})
        .then(async (res) => {

          console.log(res.data);

        })
        .catch(error => {
          console.error('Error sending the POST request:', error);
        });

    };
  
    return (
        <div>
          <div id='waveform'> </div>
          <button onClick={() => handleclick()}>Sende spektrogramm</button>  
        </div>
    );
    }

export default Mp3Creator