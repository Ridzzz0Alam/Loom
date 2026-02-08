// src/components/RecordingControls.tsx
'use client';

import { useState } from 'react';

interface RecordingControlsProps {
  onRecordingStart: () => void;
  onRecordingStop: () => void;
}

export const RecordingControls = ({
  onRecordingStart,
  onRecordingStop,
}: RecordingControlsProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const handleStartRecording = () => {
    setIsRecording(true);
    onRecordingStart();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    onRecordingStop();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => setMicEnabled(!micEnabled)}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
            micEnabled
? 'bg-blue-600 hover: bg-blue-700 text-white': 'bg-red-600 hover: bg-red-700 text-white' }`} > {micEnabled ? '🎤 Mic On': '🔇 Mic Off'} </button>

        <button
          onClick={() => setCameraEnabled(!cameraEnabled)}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
            cameraEnabled
? 'bg-blue-600 hover: bg-blue-700 text-white': 'bg-red-600 hover: bg-red-700 text-white' }`} > {cameraEnabled ? '📹 Camera On': '📹 Camera Off'} </button> </div>

      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className={`w-full py-3 px-4 rounded-lg font-bold text-white text-lg transition ${
          isRecording
? 'bg-red-600 hover: bg-red-700': 'bg-green-600 hover: bg-green-700' }`} > {isRecording ? '⏹ Stop Recording': '⏺ Start Recording'} </button> </div> ); };