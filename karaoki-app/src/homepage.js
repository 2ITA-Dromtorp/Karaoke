import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongCard from './SongCard';

function HomePage() {
    const [songArray, setSongArray] = useState([]);
  
  const getText = async () => { //henter getText (content.json) fra backend 
    await axios
      .get("/getText")
      .then(response => {
        let vareArray = response.data;
        setSongArray(response.data);
      })
      
      .catch(error => console.log(error));
  };
  useEffect(() => {
    getText()
  }, [onloadstart]) //getText kjøres bare når den loades

    return (
      <div className="karaokeWrapper">
        <div className='songWrapper'>
          <div className='karaokeSongs' id='karaokeSongs'>  
            {songArray.length > 0 &&songArray.map((sang, index) => ( 
                <SongCard name={sang.vareNavn} sangNavn={sang.vareNavn} index={index} lengde={sang.lengde} bilde={sang.bilde} beskrivelse={sang.beskrivelse} easterEgg={sang.easterEgg}/>
            ))} {/* hvis lengden på songArray er lenger enn 0 så lager den ett SongCard element for hvert objekt som er i arrayet. */}
          </div> 
        </div>
      </div>
    );
}


export default HomePage;