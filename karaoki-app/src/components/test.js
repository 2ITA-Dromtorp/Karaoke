import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

export default function Test() {
    const waveref = useRef(null);
    let wavesurfer = null;

    useEffect(() => {
        wavesurfer = WaveSurfer.create({
            container: waveref.current,
            waveColor: '#4F4A85',
            progressColor: '#383351'
        });

        wavesurfer.load('./audio/Freddy.mp3');
        console.log(wavesurfer)
        return () => {
            wavesurfer.destroy();
        };
    }, []);
  return (
    <>
        <p>Hello World</p>
        <div ref={waveref}/>
        <h1>test</h1>
    </>
  );
}

