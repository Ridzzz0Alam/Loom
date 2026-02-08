// src/components/RecordingsList.tsx
'use client';

import { useEffect, useState } from 'react';

interface Recording {
  name: string;
  handle: FileSystemFileHandle;
  timestamp: number;
}

interface RecordingsListProps {
  folderHandle: FileSystemDirectoryHandle | null;
}

export const RecordingsList = ({ folderHandle }: RecordingsListProps) => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [playingFile, setPlayingFile] = useState<string | null>(null);

  useEffect(() => {
    const loadRecordings = async () => {
      if (!folderHandle) return;

      const files: Recording[] = [];
      for await (const [name, handle] of folderHandle.entries()) {
        if (handle.kind === 'file' && name.endsWith('.webm')) {
          const file = await handle.getFile();
          files.push({
            name,
            handle,
            timestamp: file.lastModified,
          });
        }
      }

      setRecordings(files.sort((a, b) => b.timestamp - a.timestamp));
    };

    loadRecordings();
  }, [folderHandle]);

  const playRecording = async (handle: FileSystemFileHandle) => {
    const file = await handle.getFile();
    const url = URL.createObjectURL(file);
    setPlayingFile(url);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Recordings</h2>

      {playingFile && (
        <video
          controls
          src={playingFile}
          className="w-full rounded-lg"
          style={{ maxHeight: '400px' }}
        />
      )}

      <div className="space-y-2">
        {recordings.map((recording) => (
          <button
            key={recording.name}
            onClick={() => playRecording(recording.handle)}
            className="w-full p-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition"
          >
            <p className="font-semibold text-gray-800">{recording.name}</p>
            <p className="text-sm text-gray-600">
              {new Date(recording.timestamp).toLocaleString()}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};