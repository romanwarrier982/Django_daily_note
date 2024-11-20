import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';

const API_URL = "http://localhost:8000/api/";

const RecordAudio = ({ onAudioUpload }) => {
    const [recording, setRecording] = useState(false);
    const [recordedBlob, setRecordedBlob] = useState(null);

    const startRecording = () => {
        setRecording(true);
    };

    const stopRecording = () => {
        setRecording(false);
    };

    const onStop = (blob) => {
        setRecordedBlob(blob);
        // Convert blob to file and pass it to onAudioUpload  
        const file = new File([blob.blob], "audio_recording.wav", { type: "audio/wav" });
        onAudioUpload([file]);
    };

    return (
        <div>
            <h1 className='dark:text-white'>Record Audio for Note</h1>
            <ReactMic
                record={recording}
                className="sound-wave"
                onStop={onStop}
                strokeColor="#000000"
                backgroundColor="gray"
            />
            <button className='dark:text-white' onClick={startRecording}>Start</button>
            <button className='dark:text-white' onClick={stopRecording}>Stop</button>
        </div>
    );
};

export default RecordAudio;