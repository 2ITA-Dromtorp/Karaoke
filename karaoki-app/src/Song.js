import axios from "axios";

function Song() {

    let test = 2
    const getTesteren = async () => {
        await axios
          .get("/song")
          .then(response => {
            console.log(response)
            let vareArray = response.data;
            // console.log(vareArray.headerText)
            for (let i = 0; i < vareArray.length; i++) {
            if ( i == test) {
                

              const wrapperDiv = document.createElement("div");
              wrapperDiv.classList.add("karaokeCard");
            
              const h1Tag = document.createElement("h1");
              const h1Text = document.createTextNode(vareArray[i].vareNavn);
              h1Tag.appendChild(h1Text);
            
              // const pTag = document.createElement("p");
              // const pText = document.createTextNode(vareArray[i].lengde);
              // pTag.appendChild(pText);
            
      
            
              const imgTag = document.createElement("img");
              imgTag.src = vareArray[i].bilde
              imgTag.classList.add("bilde")
            
              wrapperDiv.appendChild(h1Tag);
              wrapperDiv.appendChild(imgTag)
              // wrapperDiv.appendChild(pTag);
      
            
              const gridElementfromhtml = document.getElementById("songElement")
              gridElementfromhtml.appendChild(wrapperDiv)
              console.log("sang "+[i + 1]+" er lagt til")
            }
        }
          })
          .catch(error => console.log(error));
      };

    getTesteren()

    return (
        <div>
            <h1>SONG</h1>
            <div id="songElement"></div>
        </div>
    );
}

export default Song;