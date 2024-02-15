import { Link, useNavigate } from "react-router-dom"

function NavBar() {

    
    return (
    <div on className='karaokeHeader'>
    <Link to="/">
    <h1 style={{color: 'white'}}>Karaoke🎤</h1>
    </Link>
    </div>
    )
    
}

export default NavBar