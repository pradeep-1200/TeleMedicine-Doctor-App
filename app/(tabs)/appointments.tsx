import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/colors';
import AppointmentCard from '../../components/AppointmentCard';
import { useAppointments } from '../../contexts/AppointmentContext';
import { dummyAppointments } from '../../constants/data';

export default function AppointmentsScreen() {
  const router = useRouter();
  const { appointments, setSelectedAppointment } = useAppointments();

  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
    router.push(`/appointment-detail/${appointment.id}`);
  };

  const handleCancel = (appointmentId: string) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes', 
          style: 'destructive',
          onPress: () => {
            // Handle cancel logic
            console.log('Cancelled appointment:', appointmentId);
          }
        }
      ]
    );
  };

  const handleStartCall = (appointment: any) => {
    setSelectedAppointment(appointment);
    // Show disclaimer before starting call
    Alert.alert(
      'Call Recording Disclaimer',
      'By continuing, you consent to this call being recorded for quality and support purposes. Please provide accurate details to help the doctor assist you effectively.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Proceed', 
          onPress: () => {
            router.push(`/video-call/${appointment.id}`);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Appointments</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onPress={() => handleViewDetails(appointment)}
              onCancel={() => handleCancel(appointment.id)}
              onStartCall={() => handleStartCall(appointment)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No appointments scheduled</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});