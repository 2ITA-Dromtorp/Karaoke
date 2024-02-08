import Melvin from './images/placeholder_melvin.jpg';
import './App.css';
import Test from './components/test';
import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js'
import Scoreboard from './components/scoreboard'

function App() {

  const waveref = useRef(null);
  let wavesurfer = null;

  useEffect(() => {
      wavesurfer = WaveSurfer.create({
        container: '#waveform',
          waveColor: '#4F4A85',
          progressColor: 'orange',
          sampleRate: 22050,
          url: './audio/HURHRUHURHURHRU.mp3'
      });

      wavesurfer.load('./audio/HURHRUHURHURHRU.mp3');
      return () => {
          wavesurfer.destroy();
      };
  }, []);
  
  const handleclick = async () => {
    const a = await wavesurfer.exportImage('image/png');
    console.log(a);
  }

  return (
    <>
    <div className='vibeCheck'>
      <h1>VENNLIGST SNU ENHETEN DIN SÅNN AT DEN ER I PORTRETT MODUS!!!</h1>
    </div>
    <div className="karaokeWrapper">
      <div className='karaokeHeader'>
        <h1 style={{color: 'white'}}>Karaoke🎤</h1>
      </div>
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
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
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