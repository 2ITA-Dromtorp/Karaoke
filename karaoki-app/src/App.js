import Melvin from './images/placeholder_melvin.jpg';
import './App.css';
import Test from './components/test';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js'
import Scoreboard from './components/scoreboard'
import axios from 'axios';
import SongCard from './SongCard';
import NavBar from './navBar';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Song from './Song';
import HomePage from './homepage';


function App() {



  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/song/:songName" element={<Song/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;