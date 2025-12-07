import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, BackHandler } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../../../constants/colors';
import CallScreen from '../../../components/CallScreen';
import { useAppointments } from '../../../contexts/AppointmentContext';
// import { zegoService } from '../../../services/zegoService';

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
    };
  }, []);

  const startCall = async () => {
    if (!selectedAppointment) {
      router.back();
      return;
    }
    setCallStarted(true);
  };

  const handleEndCall = async () => {
    router.push(`/call-ended/${id}`);
  };

  const handleToggleMute = async (muted: boolean) => {
    console.log('Toggle mute:', muted);
  };

  const handleToggleCamera = async (cameraOn: boolean) => {
    console.log('Toggle camera:', cameraOn);
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