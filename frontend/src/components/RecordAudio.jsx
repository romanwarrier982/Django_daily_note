import React, { useState } from 'react';
import { ReactMic } from 'react-mic';

const RecordAudio = ({ onAudioUpload }) => {
    const [recording, setRecording] = useState(false);

    const startRecording = () => {
        setRecording(true);
    };

    const stopRecording = () => {
        setRecording(false);
    };

    const onStop = (blob) => {
        const currentDate = new Date();
        console.log(currentDate.toISOString())
        const formattedTime = currentDate.toISOString().replace(/[-:.T]/g, '').slice(0, 15);
        const file = new File([blob.blob], `audio_recording_${formattedTime}.wav`, { type: "audio/wav" });
        onAudioUpload([file]);
    };

    return (
        <div>
            <h1 className='dark:text-white'>Record Audio for Note</h1>
            <ReactMic
                record={recording}
                className="sound-wave w-100"
                onStop={onStop}
                strokeColor="#000000"
                backgroundColor="gray"
            />
            <button className='text-white py-2 px-3 rounded-xl mt-1 mx-2 bg-green-700' onClick={startRecording}>Start</button>
            <button className='text-white py-2 px-3 rounded-xl mt-1 mx-2 bg-red-700' onClick={stopRecording}>Stop</button>
        </div>
    );
};

export default RecordAudio;