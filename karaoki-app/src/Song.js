import axios from "axios";
import { useParams, useNavigate} from "react-router-dom";
function Song() {
    const {songName} = useParams();
    console.log(songName)
    let test = 2
    
    const navigate = useNavigate()
    const getLIZONGREN = async () => {
        await axios
          .get("/LIZHONGREN")
          .then(response => {
            console.log(response)
            let vareArray = response.data;
            // console.log(vareArray.headerText)
            for (let i = 0; i < vareArray.length; i++) {
            if ( i == test) {
                const songProfile = vareArray.find((song) => song.vareNavn === songName);
                console.log(songProfile)
              const wrapperDiv = document.createElement("div");
              wrapperDiv.classList.add("songBox");
            
              const h1Tag = document.createElement("h1");
              const h1Text = document.createTextNode(songProfile.vareNavn);
              h1Tag.appendChild(h1Text);
            
              // const pTag = document.createElement("p");
              // const pText = document.createTextNode(vareArray[i].lengde);
              // pTag.appendChild(pText);
            
      
            
              const imgTag = document.createElement("img");
              imgTag.src = songProfile.bilde
              imgTag.classList.add("bilde")
            
              wrapperDiv.appendChild(h1Tag);
              wrapperDiv.appendChild(imgTag)
              // wrapperDiv.appendChild(pTag);
      
            
              const gridElementfromhtml = document.getElementById("songDiv")
              gridElementfromhtml.appendChild(wrapperDiv)
              console.log("sang "+[i + 1]+" er lagt til")
            }
        }
          })
          .catch(error => console.log(error));
      };

    getLIZONGREN()

    return (
        <div className='songWrapper'>
            <div className="karaokeSong">
            <div id="songDiv"></div>
            <button onClick={handleNav}>TILBAKE</button>

            </div>
        </div>
    );

    function handleNav() {
        navigate("/")
        // console.log(name)
    }
}

export default Song;