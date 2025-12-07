import { ZegoExpressEngine } from 'zego-express-engine-reactnative';
import { zegoConfig } from '../constants/zegoConfig';

class ZegoService {
  private zego: ZegoExpressEngine | null = null;
  private streamID: string = '';
  private userID: string = 'doctor_' + Date.now();
  private userName: string = 'Doctor';

  initialize() {
    if (!this.zego && zegoConfig.appID && zegoConfig.appSign) {
      try {
        this.zego = new ZegoExpressEngine(zegoConfig.appID, zegoConfig.appSign);
        
        // Enable video call
        this.zego.enableCamera(true);
        this.zego.enableMic(true);
        
        // Set video configuration
        this.zego.setVideoConfig({
          preset: 2, // 720p
          bitrate: 600,
          fps: 15,
          width: 360,
          height: 640,
        });
      } catch (error) {
        console.error('Failed to initialize Zego SDK:', error);
        this.zego = null;
      }
    }
    return this.zego;
  }

  async startCall(patientUserId: string, isVideo: boolean = true): Promise<boolean> {
    try {
      if (!this.zego) {
        this.initialize();
      }

      // Generate unique room ID
      const roomID = `room_${Date.now()}_${patientUserId}`;
      this.streamID = `stream_${this.userID}`;

      // Login room
      const loginResult = await this.zego!.loginRoom(
        roomID,
        { userID: this.userID, userName: this.userName },
        { userUpdate: true }
      );

      if (loginResult.errorCode === 0) {
        // Start publishing stream
        const publishResult = await this.zego!.startPublishingStream(
          this.streamID,
          isVideo ? 0 : 1 // 0 for video, 1 for audio
        );
        
        return publishResult.errorCode === 0;
      }
      return false;
    } catch (error) {
      console.error('Error starting call:', error);
      return false;
    }
  }

  async endCall(): Promise<void> {
    try {
      if (this.zego) {
        await this.zego.stopPublishingStream(this.streamID);
        await this.zego.logoutRoom();
        this.streamID = '';
      }
    } catch (error) {
      console.error('Error ending call:', error);
    }
  }

  async toggleMic(mute: boolean): Promise<void> {
    if (this.zego) {
      this.zego.muteMicrophone(mute);
    }
  }

  async toggleCamera(enable: boolean): Promise<void> {
    if (this.zego) {
      this.zego.enableCamera(enable);
    }
  }

  async getZego(): Promise<ZegoExpressEngine | null> {
    if (!this.zego) {
      this.initialize();
    }
    return this.zego;
  }

  cleanup() {
    if (this.zego) {
      this.zego.destroyEngine();
      this.zego = null;
    }
  }
}

export const zegoService = new ZegoService();