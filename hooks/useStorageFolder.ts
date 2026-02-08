// src/hooks/useStorageFolder.ts
import { useState } from 'react';

export const useStorageFolder = () => {
  const [folderHandle, setFolderHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [folderPath, setFolderPath] = useState<string>('');

  const selectFolder = async () => {
    try {
      const handle = await window.showDirectoryPicker();
      setFolderHandle(handle);
      setFolderPath(handle.name);
    } catch (err) {
      console.error('Folder selection cancelled', err);
    }
  };

  return { folderHandle, folderPath, selectFolder };
};