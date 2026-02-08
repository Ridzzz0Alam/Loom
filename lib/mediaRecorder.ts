// src/lib/mediaRecorder.ts
export class ScreenRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async startRecording(
    audioDeviceId: string,
    videoDeviceId: string,
    micEnabled: boolean,
    cameraEnabled: boolean
  ): Promise<void> {
    try {
      const tracks: MediaStreamTrack[] = [];

      // Get audio
      if (micEnabled) {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: { exact: audioDeviceId } },
        });
        tracks.push(...audioStream.getAudioTracks());
      }

      // Get video
      if (cameraEnabled) {
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: videoDeviceId } },
        });
        tracks.push(...videoStream.getVideoTracks());
      }

      this.stream = new MediaStream(tracks);
      this.recordedChunks = [];

      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: 'video/webm;codecs=vp9',
      });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
    } catch (err) {
      console.error('Error starting recording:', err);
      throw err;
    }
  }

  stopRecording(): Blob {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No recording in progress'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
        this.stopAllTracks();
        resolve(blob);
      };

      this.mediaRecorder.stop();
    });
  }

  private stopAllTracks() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
  }
}