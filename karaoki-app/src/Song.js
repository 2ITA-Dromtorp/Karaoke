import axios from "axios";
import { useParams } from "react-router-dom";
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import { useEffect, useState} from "react";
 function Song() {
    const {songName} = useParams();
    console.log(songName)
    let test = 2

    // const [songArray, setSongArray] = useState("");
    const [content, setContent] = useState({});
    const [imgClass, setImgClass] = useState("bilde");

        const getText = async() => {
            await axios
            .get("/getText")
            .then(response => {
                console.log(response)
                let vareArray = response.data;
                // console.log(vareArray.headerText)
                    // const songProfile = vareArray.find((song) => song.vareNavn === songName);
                    setContent(vareArray.find((song) => song.vareNavn === songName));
                
                              // console.log(content.lengde)

            })
            .catch(error => console.log(error));
        };



        useEffect(() => {
          console.log(content.lengde)
        if(!content.lengde) return;

        let wavesurfer, record
        let scrollingWaveform = false
        // console.log(vareArray)
        
        const createWaveSurfer = (content, songProfile, vareArray) => {
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
            setImgClass("bilde")
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
        const updateProgress = async(time) => {
        // time will be in milliseconds, convert it to mm:ss format
        const formattedTime = [
            Math.floor((time % 3600000) / 60000), // minutes
            Math.floor((time % 60000) / 1000), // seconds
        ]
            .map((v) => (v < 10 ? '0' + v : v))
            .join(':')

        progress.textContent = formattedTime
        console.log(formattedTime)
        console.log(content)
        if (formattedTime == content.lengde) {
            record.stopRecording()

                const imgExport = await wavesurfer.exportImage('image/jpeg'); // Export the image data
              
                let dataToSend = imgExport[0]
            
                    axios.post("/ssim", {"data": dataToSend})
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
            setImgClass("bilde spinningimg")
        })
        }
        document.querySelector('input[type="checkbox"]').onclick = (e) => {
        scrollingWaveform = e.target.checked
        createWaveSurfer()
        
        }
        
        createWaveSurfer()
        
    },[content])

    useEffect(() => {
        getText()
    }, [onloadstart])


    return (<div className="karaokeWrapper">
      <div className="karaokeSong" id="karaokeSong">
      {/* <div id="songDiv"></div> */}
        
         <img src={content.bilde} className={imgClass}/>
         <h1>{content.vareNavn}</h1>
        
        <h2 className="songSubHeader">{content.artist}</h2>
        <p className="pText">{content.lengde}</p>

        <button id="record" className="record">Record</button>

        <select id="mic-select" className="mic">
            <option value="" hidden>Select mic</option>
            </select>
        <label><input type="checkbox"  /> Scrolling waveform</label>
        
        <p id="progress">00:00</p>
        
        <p className="sangTekst">{content.sangTekst}</p>


        <div id="mic" className="micey"></div>

        <div id="recordings" className="recordingsey"></div> 
    {/* <button onclick={updateTimes()}></button> */}




      </div>
</div>


    

    );


}


export default Song;