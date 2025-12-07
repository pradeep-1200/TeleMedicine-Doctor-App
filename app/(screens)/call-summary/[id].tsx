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

export default function CallSummaryScreen() {
  const { id } = useLocalSearchParams();
  const { getAppointment } = useAppointments();
  
  const appointment = getAppointment(id as string);
  const callDuration = '05:56';
  const amountReceived = 369;

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
        <View style={styles.statusIcon}>
          <Icon name="check-circle" size={64} color={colors.success} />
        </View>
        
        <Text style={styles.title}>Call Ended</Text>
        
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Consultation Duration</Text>
            <Text style={styles.summaryValue}>{callDuration}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Amount Received</Text>
            <Text style={styles.summaryValue}>₹{amountReceived}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Patient</Text>
            <Text style={styles.summaryValue}>{appointment.patientName}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Concern</Text>
            <Text style={styles.summaryValue}>{appointment.symptom}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.prescriptionButton}
            onPress={() => router.push(`/(screens)/prescription/${id}`)}
          >
            <Icon name="description" size={20} color={colors.white} />
            <Text style={styles.prescriptionButtonText}>Upload Prescription</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => router.push(`/(screens)/chat/${id}`)}
          >
            <Icon name="chat" size={20} color={colors.primary} />
            <Text style={styles.chatButtonText}>Send Chat</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/home')}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  statusIcon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 32,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  actionButtons: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  prescriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  prescriptionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  chatButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 12,
  },
  backButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});