import React, { useState, useEffect } from 'react';
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
import CallScreen from '../../../components/CallScreen';

export default function CallScreenPage() {
  const { id } = useLocalSearchParams();
  const { getAppointment, updateAppointment } = useAppointments();
  const [callState, setCallState] = useState<'waiting' | 'connected' | 'ended'>('waiting');
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const appointment = getAppointment(id as string);

  const handleProceedCall = () => {
    setShowDisclaimer(false);
    setTimeout(() => {
      setCallState('connected');
    }, 3000);
  };

  const handleEndCall = () => {
    setCallState('ended');
    updateAppointment(id as string, { status: 'completed' });
    router.push(`/(screens)/call-summary/${id}`);
  };

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Appointment not found</Text>
      </SafeAreaView>
    );
  }

  if (showDisclaimer) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.disclaimerContainer}>
          <Icon name="warning" size={48} color={colors.warning} />
          <Text style={styles.disclaimerTitle}>Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            By continuing, you consent to this call being recorded for quality and support purposes.
          </Text>
          <View style={styles.disclaimerActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.proceedButton} onPress={handleProceedCall}>
              <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (callState === 'waiting') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.waitingContainer}>
          <Text style={styles.waitingText}>Waiting for patient to pick up the call</Text>
          <Text style={styles.patientName}>{appointment.patientName}</Text>
          <View style={styles.patientAvatar}>
            <Icon name="person" size={48} color={colors.white} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <CallScreen
      patientName={appointment.patientName}
      symptom={appointment.symptom}
      callType={appointment.type}
      onEndCall={handleEndCall}
      onToggleMute={() => {}}
      onToggleCamera={() => {}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  disclaimerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  disclaimerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 20,
  },
  disclaimerText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  disclaimerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.error,
    fontWeight: '600',
  },
  proceedButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  waitingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  waitingText: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  patientName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 40,
  },
  patientAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});