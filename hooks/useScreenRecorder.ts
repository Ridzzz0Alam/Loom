// src/hooks/useScreenRecorder.ts
import { useState } from 'react';
import { ScreenRecorder } from '@/lib/mediaRecorder';

export const useScreenRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recorder = new ScreenRecorder();

  const startScreenRecording = async (
    audioDeviceId: string,
    micEnabled: boolean
  ) => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: false,
      });

      const tracks = [...screenStream.getTracks()];

      // Add audio if mic is enabled
      if (micEnabled) {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: { exact: audioDeviceId } },
        });
        tracks.push(...audioStream.getAudioTracks());
      }

      const combinedStream = new MediaStream(tracks);
      // Start recording with combined stream
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting screen recording:', err);
    }
  };

  return { isRecording, recordingTime, startScreenRecording };
};