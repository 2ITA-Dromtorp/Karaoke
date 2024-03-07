import WaveSurfer from 'wavesurfer.js';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function Mp3Creator() {
    const waveref = useRef(null);
    let wavesurfer = null;

  
    useEffect(() => {  //definerer visualiseringen av spektogrammet
        wavesurfer = WaveSurfer.create({
          container: '#waveform',
            waveColor: '#4F4A85',
            progressColor: 'orange',
            sampleRate: 20000,
            url: './music/fazbear.mp3'
        }); 
  
        wavesurfer.load('./music/fazbear.mp3');
        return () => {
            wavesurfer.destroy(); //cleanup funksjon - bryter kobling med wavesurfer server
        };
    }, []);
    
  const handleclick = async () => {
    const imgExport = await wavesurfer.exportImage('image/jpeg'); // Sender spektogram til backend som jpg i form av bildedata
  
    let dataToSend = imgExport[0]

        axios.post("/creator", {"data": dataToSend})
        .then(async (res) => {
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