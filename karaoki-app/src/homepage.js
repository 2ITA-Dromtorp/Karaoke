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
            {/* <Test/> */}
            
              
            <div>
            


          <button onClick={() => getTester()}>Sammenlikne spektrogrammene</button>  
          <button onClick={() => getText()}>Hent tekst</button>
          
          <p>{text}</p> 
          <div id='gridElement'></div>
          </div>
        </div>
      </div>
  
  </>
    );

}

export default HomePage;