import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, BackHandler } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../../../constants/colors';
import CallScreen from '../../../components/CallScreen';
import { useAppointments } from '../../../contexts/AppointmentContext';
import { zegoService } from '../../../services/zegoService';

export default function VideoCallScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { selectedAppointment, updateAppointment } = useAppointments();
  const [callStarted, setCallStarted] = useState(false);

  useEffect(() => {
    // Start call when component mounts
    startCall();

    // Handle back button
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Alert.alert(
          'End Call',
          'Are you sure you want to end the call?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'End Call', onPress: handleEndCall }
          ]
        );
        return true;
      }
    );

    return () => {
      backHandler.remove();
      zegoService.endCall();
    };
  }, []);

  const startCall = async () => {
    if (!selectedAppointment) {
      router.back();
      return;
    }

    try {
      const success = await zegoService.startCall(
        selectedAppointment.patientId,
        selectedAppointment.type === 'video'
      );

      if (success) {
        setCallStarted(true);
      } else {
        Alert.alert('Error', 'Failed to start call. Please try again.');
        router.back();
      }
    } catch (error) {
      console.error('Error starting call:', error);
      Alert.alert('Error', 'Failed to start call');
      router.back();
    }
  };

  const handleEndCall = async () => {
    await zegoService.endCall();
    
    // Navigate to call ended screen
    router.push(`/call-ended/${id}`);
  };

  const handleToggleMute = async (muted: boolean) => {
    await zegoService.toggleMic(muted);
  };

  const handleToggleCamera = async (cameraOn: boolean) => {
    await zegoService.toggleCamera(cameraOn);
  };

  if (!selectedAppointment) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <CallScreen
      patientName={selectedAppointment.patientName}
      symptom={selectedAppointment.symptom}
      callType={selectedAppointment.type}
      onEndCall={handleEndCall}
      onToggleMute={handleToggleMute}
      onToggleCamera={handleToggleCamera}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});