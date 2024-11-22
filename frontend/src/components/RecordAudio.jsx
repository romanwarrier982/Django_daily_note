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
        const formattedTime = currentDate.toISOString().replace(/[-:.T]/g, '').slice(0, 15);
        const file = new File([blob.blob], `audio_recording_${formattedTime}.wav`, { type: "audio/wav" });
        onAudioUpload([file]);
    };

    return (
        <div className='flex'>
            {/* <h1 className='dark:text-white'>Record Audio for Note</h1> */}
            <ReactMic
                record={recording}
                className="sound-wave w-100 h-10"
                onStop={onStop}
                strokeColor="#000000"
                backgroundColor="#162032"
            />
            <div className='flex'>
                <div className='w-9 h-9 p-1 mx-2 bg-green-100 border-2 border-green-500 rounded-full'>
                    <button className='w-100 h-100 bg-green-500  rounded-full hover:opacity-80 shadow-lg' onClick={startRecording}></button>
                </div>
                <div className='w-9 h-9 p-2 border-2 bg-red-100 border-red-500 rounded-full'>
                    <button className='w-100 h-100 bg-red-500  hover:opacity-80 shadow-lg' onClick={stopRecording}></button>
                </div>
            </div>
        </div>
    );
};

export default RecordAudio;