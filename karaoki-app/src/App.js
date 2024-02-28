import './App.css';
import NavBar from './navBar';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Song from './Song';
import HomePage from './homepage';
import Mp3Creator from './Mp3Creator';


function App() {



  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/song/:songName" element={<Song/>}/>
      <Route path="/EnumaElish" element={<Mp3Creator/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;