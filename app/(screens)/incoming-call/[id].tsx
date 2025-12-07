import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../constants/colors';
import { useAppointments } from '../../../contexts/AppointmentContext';

export default function IncomingCallScreen() {
  const { id } = useLocalSearchParams();
  const { getAppointment } = useAppointments();
  
  const appointment = getAppointment(id as string);

  const handleAccept = () => {
    router.push(`/(screens)/call/${id}`);
  };

  const handleDecline = () => {
    router.back();
  };

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Appointment not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.incomingText}>Incoming Call</Text>
        
        <View style={styles.patientInfo}>
          <View style={styles.patientAvatar}>
            <Icon name="person" size={64} color={colors.white} />
          </View>
          <Text style={styles.patientName}>{appointment.patientName}</Text>
          <Text style={styles.concern}>{appointment.symptom}</Text>
          <Text style={styles.callType}>
            {appointment.type === 'video' ? 'Video Call' : 'Audio Call'}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.declineButton} onPress={handleDecline}>
            <Icon name="call-end" size={32} color={colors.white} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Icon name="call" size={32} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
  },
  incomingText: {
    fontSize: 18,
    color: colors.white,
    marginTop: 40,
  },
  patientInfo: {
    alignItems: 'center',
  },
  patientAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  patientName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  concern: {
    fontSize: 16,
    color: colors.gray[400],
    marginBottom: 8,
  },
  callType: {
    fontSize: 14,
    color: colors.gray[400],
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 60,
  },
  declineButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
});