// src/components/DeviceSelector.tsx
'use client';

import { useMediaDevices } from '@/hooks/useMediaDevices';

export const DeviceSelector = () => {
  const {
    audioDevices,
    videoDevices,
    selectedAudio,
    setSelectedAudio,
    selectedVideo,
    setSelectedVideo,
  } = useMediaDevices();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Microphone
        </label>
        <select
          value={selectedAudio}
          onChange={(e) => setSelectedAudio(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          {audioDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Microphone ${device.deviceId.slice(0, 5)}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Camera
        </label>
        <select
          value={selectedVideo}
          onChange={(e) => setSelectedVideo(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          {videoDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};