import { Link, useNavigate } from "react-router-dom"

function NavBar() {

    
    return (
    <div on className='karaokeHeader' id="karaokeHeaders">
    <Link to="/" className="karaokeHeaderText">
    <h1>Karaoke🎤</h1>
    </Link>
    </div>
    )
    
}

export default NavBar