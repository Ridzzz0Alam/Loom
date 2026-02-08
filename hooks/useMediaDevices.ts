// src/hooks/useMediaDevices.ts
import { useState, useEffect } from 'react';

export interface MediaDevice {
  deviceId: string;
  label: string;
  kind: 'audioinput' | 'videoinput';
}

export const useMediaDevices = () => {
  const [audioDevices, setAudioDevices] = useState<MediaDevice[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDevice[]>([]);
  const [selectedAudio, setSelectedAudio] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<string>('');

  useEffect(() => {
    const enumerateDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        
        const audio = devices.filter(d => d.kind === 'audioinput');
        const video = devices.filter(d => d.kind === 'videoinput');

        setAudioDevices(audio);
        setVideoDevices(video);
        
        if (audio.length > 0) setSelectedAudio(audio[0].deviceId);
        if (video.length > 0) setSelectedVideo(video[0].deviceId);
      } catch (err) {
        console.error('Error enumerating devices:', err);
      }
    };

    enumerateDevices();
  }, []);

  return {
    audioDevices,
    videoDevices,
    selectedAudio,
    setSelectedAudio,
    selectedVideo,
    setSelectedVideo,
  };
};