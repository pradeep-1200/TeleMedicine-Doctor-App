import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../constants/colors';

interface CallScreenProps {
  patientName: string;
  symptom: string;
  callType: 'video' | 'audio';
  onEndCall: () => void;
  onToggleMute: (muted: boolean) => void;
  onToggleCamera: (cameraOn: boolean) => void;
}

const CallScreen: React.FC<CallScreenProps> = ({
  patientName,
  symptom,
  callType,
  onEndCall,
  onToggleMute,
  onToggleCamera,
}) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    onToggleMute(newMutedState);
  };

  const handleToggleCamera = () => {
    const newCameraState = !isCameraOn;
    setIsCameraOn(newCameraState);
    onToggleCamera(newCameraState);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Call Header */}
      <View style={styles.header}>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{patientName}</Text>
          <Text style={styles.symptom}>{symptom}</Text>
        </View>
        <Text style={styles.duration}>{formatTime(callDuration)}</Text>
      </View>

      {/* Video/Audio Display Area */}
      <View style={styles.displayArea}>
        {callType === 'video' ? (
          <View style={styles.videoContainer}>
            {/* Local Video Stream */}
            <View style={styles.localVideo} />
            {/* Remote Video Stream */}
            <View style={styles.remoteVideo} />
          </View>
        ) : (
          <View style={styles.audioContainer}>
            <Icon name="person" size={80} color={colors.white} />
            <Text style={styles.audioName}>{patientName}</Text>
            <Text style={styles.audioStatus}>Audio Call</Text>
          </View>
        )}
      </View>

      {/* Call Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, isMuted && styles.controlButtonActive]}
          onPress={handleToggleMute}
        >
          <Icon
            name={isMuted ? 'mic-off' : 'mic'}
            size={24}
            color={colors.white}
          />
        </TouchableOpacity>

        {callType === 'video' && (
          <TouchableOpacity
            style={[styles.controlButton, !isCameraOn && styles.controlButtonActive]}
            onPress={handleToggleCamera}
          >
            <Icon
              name={isCameraOn ? 'videocam' : 'videocam-off'}
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.controlButton, styles.endCallButton]}
          onPress={onEndCall}
        >
          <Icon name="call-end" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  symptom: {
    fontSize: 14,
    color: colors.gray[400],
    marginTop: 4,
  },
  duration: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '500',
  },
  displayArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    height: '100%',
  },
  localVideo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100,
    height: 150,
    backgroundColor: colors.gray[800],
    borderRadius: 8,
    zIndex: 10,
  },
  remoteVideo: {
    flex: 1,
    backgroundColor: colors.gray[900],
  },
  audioContainer: {
    alignItems: 'center',
    gap: 16,
  },
  audioName: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.white,
  },
  audioStatus: {
    fontSize: 16,
    color: colors.gray[400],
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    paddingVertical: 40,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.gray[700],
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonActive: {
    backgroundColor: colors.error,
  },
  endCallButton: {
    backgroundColor: colors.error,
  },
});

export default CallScreen;