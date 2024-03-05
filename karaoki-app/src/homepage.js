import Melvin from './images/placeholder_melvin.jpg';
import './App.css';
import Test from './components/test';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Scoreboard from './components/scoreboard'
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