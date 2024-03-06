import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongCard from './SongCard';

function HomePage() {
    const [songArray, setSongArray] = useState([]);
    let [text, setText] = useState("");


  
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
        </div>
      </div>
    );
}

export default HomePage;