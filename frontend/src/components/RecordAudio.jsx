import React, { useState } from "react";
import { ReactMic } from "react-mic";

const RecordAudio = ({ onAudioUpload, darkMode }) => {
    const [recording, setRecording] = useState(false);
    const backgroundColor = darkMode ? "#1E293B" : "#F3F4F6";

    const startRecording = () => {
        setRecording(true);
    };

    const stopRecording = () => {
        setRecording(false);
    };

    const onStop = (blob) => {
        const currentDate = new Date();
        const formattedTime = currentDate
            .toISOString()
            .replace(/[-:.T]/g, "")
            .slice(0, 15);
        const file = new File([blob.blob], `audio_recording_${formattedTime}.wav`, {
            type: "audio/wav",
        });
        onAudioUpload([file]);
    };

    return (
        <div className="flex flex-col items-center space-y-4 mt-6">
            <div className="w-full border rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
                <ReactMic
                    key={darkMode}
                    record={recording}
                    className="w-full h-16 border rounded-lg bg-gray-100 dark:bg-gray-900"
                    onStop={onStop}
                    strokeColor="#4ADE80"
                    backgroundColor={backgroundColor}
                />
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={startRecording}
                    disabled={recording}
                    role="record"
                    className={`flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg transition duration-300 ${recording ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                    </svg>
                </button>
                <button
                    onClick={stopRecording}
                    disabled={!recording}
                    role="stop"
                    className={`flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full shadow-lg transition duration-300 ${!recording ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default RecordAudio;
