import Melvin from './images/placeholder_melvin.jpg';
import { useNavigate } from 'react-router-dom';

function SongCard({sangNavn, lengde, index={index}, bilde, beskrivelse}, props) {
    console.log(sangNavn)

    const navigate = useNavigate()

    const name = sangNavn;

    return (
        <div onClick={handleNav} name={sangNavn} className="karaokeCard">
            <h1>{sangNavn}</h1>
            <img src={bilde}/>
        </div>
    );
    function handleNav() {
        navigate("/song/"+name)
        console.log(name)
    }
}

export default SongCard;