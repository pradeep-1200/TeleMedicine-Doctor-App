import ZegoExpressEngine from 'zego-express-engine-reactnative';
import { zegoConfig } from '../constants/zegoConfig';

class ZegoService {
  private zego: ZegoExpressEngine | null = null;
  private streamID: string = '';
  private userID: string = 'doctor_' + Date.now();
  private userName: string = 'Doctor';
  private roomID: string = '';

  async initialize() {
    if (!this.zego && zegoConfig.appID && zegoConfig.appSign) {
      try {
        this.zego = await ZegoExpressEngine.createEngineWithProfile({
          appID: zegoConfig.appID,
          appSign: zegoConfig.appSign,
          scenario: 0,
        });
        
        this.zego.enableCamera(true, 0);
        this.zego.muteMicrophone(false);
        
        this.zego.setVideoConfig({
          captureWidth: 360,
          captureHeight: 640,
          encodeWidth: 360,
          encodeHeight: 640,
          bitrate: 600,
          fps: 15,
          codecID: 0,
        }, 0);
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
        await this.initialize();
      }

      this.roomID = `room_${Date.now()}_${patientUserId}`;
      this.streamID = `stream_${this.userID}`;

      await this.zego!.loginRoom(
        this.roomID,
        { userID: this.userID, userName: this.userName },
        { maxMemberCount: 2, isUserStatusNotify: true, token: '' }
      );

      // Fixed: Added third parameter (config)
      await this.zego!.startPublishingStream(this.streamID, 0, undefined);
      
      return true;
    } catch (error) {
      console.error('Error starting call:', error);
      return false;
    }
  }

  async endCall(): Promise<void> {
    try {
      if (this.zego && this.roomID) {
        await this.zego.stopPublishingStream(0);
        await this.zego.logoutRoom(this.roomID);
        this.streamID = '';
        this.roomID = '';
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
      this.zego.enableCamera(enable, 0);
    }
  }

  async getZego(): Promise<ZegoExpressEngine | null> {
    if (!this.zego) {
      await this.initialize();
    }
    return this.zego;
  }

  cleanup() {
    if (this.zego) {
      ZegoExpressEngine.destroyEngine();
      this.zego = null;
    }
  }
}

export const zegoService = new ZegoService();
