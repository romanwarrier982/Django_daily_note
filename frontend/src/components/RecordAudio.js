import React, { useState } from 'react';  
import { ReactMic } from 'react-mic';  

const RecordAudio = ({ match }) => {  
    const [recording, setRecording] = useState(false);  
    const [blob, setBlob] = useState(null);  
    
    const noteId = match.params.noteId; // Get note ID from URL parameters  

    const startRecording = () => {  
        setRecording(true);  
    };  

    const stopRecording = () => {  
        setRecording(false);  
    };  

    const onStop = (recordedBlob) => {  
        setBlob(recordedBlob);  
    };  

    const uploadAudio = async () => {  
        const formData = new FormData();  
        formData.append('audio_file', blob.blob, 'recording.wav');  
        
        // await api.post('/audio/', {   
        //         audio_file: blob.blob,   
        //         note: noteId   
        //     },   
        //     {  
        //         headers: {   
        //             Authorization: `Bearer ${localStorage.getItem('token')}`   
        //         },  
        //     }  
        // );  
        alert('Audio uploaded successfully!');  
    };  

    return (  
        <div>  
            <h1>Record Audio for Note</h1>  
            <ReactMic  
                record={recording}  
                className="sound-wave"  
                onStop={onStop}  
                strokeColor="#000000"  
                backgroundColor="#FF4081"  
            />  
            <button onClick={startRecording}>Start</button>  
            <button onClick={stopRecording}>Stop</button>  
            {blob && <button onClick={uploadAudio}>Upload Audio</button>}  
        </div>  
    );  
};  

export default RecordAudio;