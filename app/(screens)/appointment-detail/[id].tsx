import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import CollapsibleSection from '../../../components/CollapsibleSection';
import { useAppointments } from '../../../contexts/AppointmentContext';

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getAppointment } = useAppointments();
  const appointment = getAppointment(id as string);
  const [prescription, setPrescription] = useState('');

  if (!appointment) {
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
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment Details</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Patient Info */}
      <View style={styles.patientInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {appointment.patientName.charAt(0)}
          </Text>
        </View>
        <View style={styles.patientDetails}>
          <Text style={styles.patientName}>{appointment.patientName}</Text>
          <Text style={styles.patientId}>ID: {appointment.patientId}</Text>
        </View>
      </View>

      {/* Appointment Details */}
      <CollapsibleSection title="Appointment Details">
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Patient Name:</Text>
          <Text style={styles.detailValue}>{appointment.patientName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Appointment Type:</Text>
          <Text style={styles.detailValue}>{appointment.appointmentType}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Appointment Fee:</Text>
          <Text style={styles.detailValue}>INR {appointment.fee}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Appointment Date:</Text>
          <Text style={styles.detailValue}>{appointment.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Appointment Time:</Text>
          <Text style={styles.detailValue}>{appointment.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Booking Status:</Text>
          <Text style={styles.detailValue}>{appointment.bookingStatus}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Routine Status:</Text>
          <Text style={styles.detailValue}>{appointment.routineStatus}</Text>
        </View>
      </CollapsibleSection>

      {/* Symptom Details */}
      {appointment.symptoms && (
        <CollapsibleSection title="Symptom Details">
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Symptoms:</Text>
            <Text style={styles.detailValue}>{appointment.symptoms.symptom}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Description:</Text>
            <Text style={styles.detailValue}>{appointment.symptoms.description}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Severity:</Text>
            <Text style={styles.detailValue}>{appointment.symptoms.severity}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Symptom Duration:</Text>
            <Text style={styles.detailValue}>{appointment.symptoms.duration}</Text>
          </View>
          {appointment.symptoms.sleepPattern && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Sleep Pattern:</Text>
              <Text style={styles.detailValue}>{appointment.symptoms.sleepPattern}</Text>
            </View>
          )}
        </CollapsibleSection>
      )}

      {/* Medical Reports */}
      <CollapsibleSection title="Medical Reports">
        <View style={styles.reportsContainer}>
          <Text style={styles.noDataText}>No medical reports uploaded</Text>
        </View>
      </CollapsibleSection>

      {/* Add Prescription */}
      <CollapsibleSection title="Add Prescription">
        <TouchableOpacity
          style={styles.prescriptionButton}
          onPress={() => router.push(`/(screens)/prescription/${appointment.id}`)}
        >
          <Text style={styles.prescriptionButtonText}>
            {prescription ? 'Update Prescription' : 'Add Prescription'}
          </Text>
        </TouchableOpacity>
      </CollapsibleSection>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => router.push(`/(screens)/call/${appointment.id}`)}
        >
          <Text style={styles.callButtonText}>Start Call</Text>
        </TouchableOpacity>
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
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
    marginBottom: 8,
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
  patientId: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  reportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reportImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: colors.gray[200],
  },
  noDataText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
    padding: 8,
  },
  prescriptionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  prescriptionButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
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
    fontSize: 16,
  },
  callButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  callButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});