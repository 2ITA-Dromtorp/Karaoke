import './App.css';
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