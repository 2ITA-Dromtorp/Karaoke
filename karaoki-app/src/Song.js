import axios from "axios";
import { useParams } from "react-router-dom";
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import { useEffect, useState} from "react";
 function Song() {
    const {songName} = useParams();
    console.log(songName)
    let test = 2

    const [songArray, setSongArray] = useState([]);
        

        const getText = async() => {
            await axios
            .get("mulighet.no:8080/getText")
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
                h1Tag.classList.add("songHeader")

                const h2Tag = document.createElement("h2");
                const h2Text = document.createTextNode(songProfile.artist);
                h2Tag.appendChild(h2Text);
                h2Tag.classList.add("songSubHeader")
                
                const pTag = document.createElement("p");
                const pText = document.createTextNode(vareArray[i].lengde);
                pTag.appendChild(pText);
                pTag.classList.add("songLengthText")
                setSongArray(songProfile.lengde)
                console.log(songProfile.lengde)
                
                
        
                
                const imgTag = document.createElement("img");
                imgTag.src = songProfile.bilde
                imgTag.classList.add("bilde")
                
                wrapperDiv.appendChild(imgTag)
                wrapperDiv.appendChild(h1Tag);
                wrapperDiv.appendChild(h2Tag);
                wrapperDiv.appendChild(pTag);
        
                
                const gridElementfromhtml = document.getElementById("karaokeSong")
                gridElementfromhtml.appendChild(wrapperDiv)
                console.log("sang "+[i + 1]+" er lagt til")
                }
            }
            

            })
            .catch(error => console.log(error));
        // };





        let wavesurfer, record
        let scrollingWaveform = false
        // console.log(vareArray)
        
        const createWaveSurfer = (vareArray) => {
        // Create an instance of WaveSurfer
        
        if (wavesurfer) {
            wavesurfer.destroy()
        }
        wavesurfer = WaveSurfer.create({
            container: '#mic',
            waveColor: '#FFFF00',
            progressColor: 'orange',
            sampleRate: 5000,
        })
        
        // Initialize the Record plugin
        record = wavesurfer.registerPlugin(RecordPlugin.create({ scrollingWaveform, renderRecordedAudio: false }))
        // Render recorded audio
        record.on('record-end', (blob) => {
            const container = document.querySelector('#recordings')
            const recordedUrl = URL.createObjectURL(blob)
        
            // Create wavesurfer from the recorded audio
            const wavesurfer = WaveSurfer.create({
            container,
            waveColor: 'rgb(200, 100, 0)',
            progressColor: 'rgb(100, 50, 0)',
            url: recordedUrl,
            })
        
            // Play button
            const button = container.appendChild(document.createElement('button'))
            button.textContent = 'Play'
            button.onclick = () => wavesurfer.playPause()
            wavesurfer.on('pause', () => (button.textContent = 'Play'))
            wavesurfer.on('play', () => (button.textContent = 'Pause'))
        
            // Download link
            const link = container.appendChild(document.createElement('a'))
            Object.assign(link, {
            href: recordedUrl,
            download: 'recording.' + blob.type.split(';')[0].split('/')[1] || 'webm',
            textContent: 'Download recording',
            })
        })

        recButton.textContent = 'Record'
        
        record.on('record-progress', (time) => {
            updateProgress(time)

        })
        }
        
        const progress = document.querySelector('#progress')
        const updateProgress = async(time, vareArray) => {
        // time will be in milliseconds, convert it to mm:ss format
        const formattedTime = [
            Math.floor((time % 3600000) / 60000), // minutes
            Math.floor((time % 60000) / 1000), // seconds
        ]
            .map((v) => (v < 10 ? '0' + v : v))
            .join(':')
        progress.textContent = formattedTime
        console.log(songArray)
        console.log(formattedTime)
        if (formattedTime == songArray) {
            record.stopRecording()

                const imgExport = await wavesurfer.exportImage('image/jpeg'); // Export the image data
              
                let dataToSend = imgExport[0]
            
                    axios.post("mulighet.no:8080/test", {"data": dataToSend})
                    .catch(error => {
                      console.error('Error sending the POST request:', error);
                    });
                
        }
        }



        
        const micSelect = document.querySelector('#mic-select')
        {
          // Mic selection
          RecordPlugin.getAvailableAudioDevices().then((devices) => {
            devices.forEach((device) => {
              const option = document.createElement('option')
              option.value = device.deviceId
              option.text = device.label || device.deviceId
              micSelect.appendChild(option)
            })
          })
        }
        // Record button: finn ut hvor lyd waveform blir laget og gjør om til base64
        const recButton = document.querySelector('#record')
        
        recButton.onclick = () => {
        if (record.isRecording() || record.isPaused()) {
            record.stopRecording()
            recButton.textContent = 'Record'
            return
        }
        
        recButton.disabled = true
        
        // reset the wavesurfer instance
        
        // get selected device
        const deviceId = micSelect.value
        record.startRecording({ deviceId }).then(() => {
            recButton.textContent = 'Stop'
            recButton.disabled = false
        })
        }
        document.querySelector('input[type="checkbox"]').onclick = (e) => {
        scrollingWaveform = e.target.checked
        createWaveSurfer()
        
        }
        
        
        createWaveSurfer()
        
    }



    useEffect(() => {
        getText()
    })


    return (

            <div className="karaokeSong" id="karaokeSong">
            {/* <div id="songDiv"></div> */}

<html>
  <h1>Press Record to start recording 🎙️</h1>

  <p>
    📖 <a href="https://wavesurfer.xyz/docs/classes/plugins_record.RecordPlugin">Record plugin docs</a>
  </p>

  <button id="record">Record</button>


  <select id="mic-select">
    <option value="" hidden>Select mic</option>
  </select>
  <label><input type="checkbox"  /> Scrolling waveform</label>
  <p id="progress">00:00</p>

  <div id="mic"></div>

  <div id="recordings"></div> 
    {/* <button onclick={updateTimes()}></button> */}

</html>


            </div>

    );


}

export default Song;