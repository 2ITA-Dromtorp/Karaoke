import Melvin from './images/placeholder_melvin.jpg';
import { useNavigate } from 'react-router-dom';

function SongCard({sangNavn, lengde, index={index}, bilde, beskrivelse, easterEgg}, props) { //brukes som komponenter på homepage.js
    console.log(sangNavn)

    const navigate = useNavigate()



    if (easterEgg === false) {
        

    return (
        <div onClick={handleNav} className="karaokeCard">
            <h1>{sangNavn}</h1>
            <img src={bilde}/>
        </div>
    );
}
    function handleNav() {
        navigate("/song/"+sangNavn)
    }
}

export default SongCard;