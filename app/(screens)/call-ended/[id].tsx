import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppointments } from '../../../contexts/AppointmentContext';

export default function CallEndedScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { selectedAppointment } = useAppointments();

  const endReason = 'completed'; // This would come from call data
  const callDuration = 356; // in seconds (5:56)
  const amountReceived = 369;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!selectedAppointment) {
    return (
      <View style={styles.container}>
        <Text>Appointment not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Call Ended</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Call Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.patientInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {selectedAppointment.patientName.charAt(0)}
            </Text>
          </View>
          <View style={styles.patientDetails}>
            <Text style={styles.patientName}>{selectedAppointment.patientName}</Text>
            <Text style={styles.symptom}>{selectedAppointment.symptom}</Text>
          </View>
        </View>

        <View style={styles.callStatus}>
          <Icon 
            name={endReason === 'completed' ? 'call-end' : 'error'} 
            size={48} 
            color={endReason === 'completed' ? colors.success : colors.error} 
          />
          <Text style={styles.callStatusText}>
            {endReason === 'completed' ? 'Call Completed' : 'Call Disconnected'}
          </Text>
        </View>

        {/* Call Duration */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Consultation Duration</Text>
            <Text style={styles.statValue}>{formatTime(callDuration)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Amount Received</Text>
            <Text style={styles.statValue}>INR {amountReceived}</Text>
          </View>
        </View>

        {/* Reason for Disconnection */}
        {endReason !== 'completed' && (
          <View style={styles.reasonContainer}>
            <Text style={styles.reasonTitle}>Call Ended Due To:</Text>
            <Text style={styles.reasonText}>
              {endReason === 'low-balance' 
                ? 'Low wallet balance of patient' 
                : endReason === 'patient-unavailable'
                ? 'Patient is not picking up the call'
                : 'Patient ended the call'}
            </Text>
          </View>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.chatButton}>
          <Icon name="chat" size={20} color={colors.primary} />
          <Text style={styles.chatButtonText}>Send a chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadButton}>
          <Icon name="upload" size={20} color={colors.white} />
          <Text style={styles.uploadButtonText}>Upload Prescription</Text>
        </TouchableOpacity>

        {endReason === 'patient-unavailable' && (
          <TouchableOpacity style={styles.callAgainButton}>
            <Icon name="call" size={20} color={colors.white} />
            <Text style={styles.callAgainButtonText}>Call Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  summaryContainer: {
    backgroundColor: colors.white,
    margin: 16,
    borderRadius: 12,
    padding: 20,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  patientDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  symptom: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  callStatus: {
    alignItems: 'center',
    marginBottom: 24,
  },
  callStatusText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  reasonContainer: {
    backgroundColor: colors.gray[50],
    borderRadius: 8,
    padding: 16,
  },
  reasonTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  reasonText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  actions: {
    padding: 16,
    gap: 12,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: 8,
  },
  chatButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    gap: 8,
  },
  uploadButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  callAgainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: colors.success,
    gap: 8,
  },
  callAgainButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});