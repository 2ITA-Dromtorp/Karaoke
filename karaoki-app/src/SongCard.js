import Melvin from './images/placeholder_melvin.jpg';
import { useNavigate } from 'react-router-dom';

function SongCard({sangNavn, lengde, index={index}, bilde, beskrivelse}, props) {
    console.log(sangNavn)

    const navigate = useNavigate()

    const name = props.name;
    // console.log(name);

    function handleNav() {
        navigate(name)
        console.log(name)
    }
    return (
        <div onClick={handleNav} name={sangNavn} className="karaokeCard">
            <h1>{sangNavn}</h1>
            <img src={bilde}/>
            {/* <img src={song} alt="Melvin" className="bilde"/> */}
        </div>
    );
}

export default SongCard;