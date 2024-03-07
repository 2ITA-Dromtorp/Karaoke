import axios from "axios";
import { useParams } from "react-router-dom";
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import { useEffect, useState} from "react";
 function Song() {
    const {songName} = useParams();
    let test = 2


    const [content, setContent] = useState({});
    const [imgClass, setImgClass] = useState("bilde");
    const [score, setScore] = useState();

        const getText = async() => {
            await axios
            .get("/getText")
            .then(response => {
                let vareArray = response.data;
                    setContent(vareArray.find((song) => song.vareNavn === songName));

            })
            .catch(error => console.log(error));
        };
        const pauseButton = document.querySelector('#pause')
        if (content.easterEgg === true) {
            function redSong() {
                

            const songDivStyler = document.querySelector('#song')
            songDivStyler.classList.add('redSong')

            const navBarStyler = document.querySelector('#karaokeHeaders')
            navBarStyler.classList.add('redNav')

            const recordButtonStyler = document.querySelector('#record')
            recordButtonStyler.classList.add('redRecord')

            const pauseButtonStyler = document.querySelector('#pause')
            pauseButtonStyler.classList.add('redRecord')

            const micSelectStyler = document.querySelector('#mic-select')
            micSelectStyler.classList.add('redMic')
        }
        redSong()
        }

        useEffect(() => {
        if(!content.lengde) return;

        let wavesurfer, record
        let scrollingWaveform = false

        
        const createWaveSurfer = (content, songProfile, vareArray) => {
        // Create an instance of WaveSurfer
        if (wavesurfer) {
            wavesurfer.destroy()
        }
        wavesurfer = WaveSurfer.create({
            container: '#mic',
            waveColor: '#4F4A85',
            progressColor: 'orange',
            sampleRate: 20000
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
            waveColor: '#4F4A85',
            progressColor: 'rgb(100, 50, 0)',
            url: recordedUrl,
            sampleRate: 20000
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
        console.log(content.lengde)
        if (formattedTime == content.lengde) {
            record.stopRecording()
                const imgExport = await wavesurfer.exportImage('image/jpeg'); // Export the image data
                let dataToSend = imgExport[0]
                recButton.classList.add("shown")
                pauseButton.classList.remove("shown")
                pauseButton.classList.add("hidden")
            
                    axios.post("/ssim", {"data": dataToSend, "id":content.id})
                    .then(response => {
                        setScore(response.data)
                    })
                    .catch(error => {
                      console.error('Error sending the POST request:', error);
                    });
        }
        }



        pauseButton.onclick = () => {
          if (record.isPaused()) {
            record.resumeRecording()
            audio.play();
            pauseButton.textContent = 'Pause'
            return
          }
        
          record.pauseRecording()
          audio.pause();
          pauseButton.textContent = 'Resume'
          pauseButton.classList.add("shown")
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
          var audio = new Audio(content.songPath);
        recButton.onclick = () => {
          audio.play();
          pauseButton.classList.add("shown")
          recButton.classList.remove("shown")
          recButton.classList.add("hidden")

        if (record.isRecording() || record.isPaused()) {
            record.stopRecording()
            audio.pause();
            recButton.textContent = 'Record'
            return
        }
        
        recButton.disabled = true
        
        // reset the wavesurfer instance
        
        // get selected device
        const deviceId = micSelect.value
        record.startRecording({ deviceId }).then(() => {
            recButton.textContent = 'Record'
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
      <div className="karaokeSong" id="song">
        
         <img src={content.bilde} className={imgClass} id="bilde"/>
         <h1>{content.vareNavn}</h1>
        
        <h2 className="songSubHeader">{content.artist}</h2>
        <p className="pText">{content.lengde}</p>

        <h2 className="songSubHeader">{score}</h2>

        <button id="record" className="record">Record</button>
        <button id="pause" className="record hidden">Pause</button>

        <select id="mic-select" className="mic">
            <option value="" hidden>Select mic</option>
            </select>
        <label className="hidden"><input type="checkbox"  /> Scrolling waveform</label>
        
        <p id="progress">00:00</p>
        
        <p className="sangTekst">{content.sangTekst}</p>


        <div id="mic" className="micey"></div>

        <div id="recordings" className="recordingsey"></div> 




      </div>
</div>


    

    );


}


export default Song;