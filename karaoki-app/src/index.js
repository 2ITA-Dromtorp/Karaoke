import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import Song from './Song';
import reportWebVitals from './reportWebVitals';
import NavBar from './navBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <div className='vibeCheck'>
    <h1>VENNLIGST SNU ENHETEN DIN SÅNN AT DEN ER I PORTRETT MODUS!!!</h1>
    </div>
    <div className="Appen">
    <NavBar/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/song" element={<Song/>}/>
    </Routes>
    </BrowserRouter>
    </div>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
