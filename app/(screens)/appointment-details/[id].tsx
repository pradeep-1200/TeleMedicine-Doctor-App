import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../constants/colors';
import { useAppointments } from '../../../contexts/AppointmentContext';

export default function AppointmentDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { getAppointment } = useAppointments();
  const [expandedSections, setExpandedSections] = useState<string[]>(['appointment']);

  const appointment = getAppointment(id as string);

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Appointment not found</Text>
      </SafeAreaView>
    );
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const renderCollapsibleSection = (
    title: string,
    icon: string,
    sectionKey: string,
    content: React.ReactNode
  ) => {
    const isExpanded = expandedSections.includes(sectionKey);
    
    return (
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(sectionKey)}
        >
          <View style={styles.sectionTitleContainer}>
            <Icon name={icon} size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
          <Icon
            name={isExpanded ? 'expand-less' : 'expand-more'}
            size={24}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
        {isExpanded && <View style={styles.sectionContent}>{content}</View>}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {renderCollapsibleSection(
          'Appointment Details',
          'event',
          'appointment',
          <View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Appointment ID</Text>
              <Text style={styles.detailValue}>{appointment.id}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Appointment Type</Text>
              <Text style={styles.detailValue}>{appointment.appointmentType}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Appointment Fee</Text>
              <Text style={styles.detailValue}>INR {appointment.fee}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{appointment.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{appointment.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status</Text>
              <Text style={styles.detailValue}>{appointment.bookingStatus}</Text>
            </View>
          </View>
        )}

        {appointment.symptoms && renderCollapsibleSection(
          'Symptom Details',
          'local-hospital',
          'symptoms',
          <View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Symptoms</Text>
              <Text style={styles.detailValue}>{appointment.symptoms.symptom}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Description</Text>
              <Text style={styles.detailValue}>{appointment.symptoms.description}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Severity</Text>
              <Text style={styles.detailValue}>{appointment.symptoms.severity}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>{appointment.symptoms.duration}</Text>
            </View>
          </View>
        )}

        {renderCollapsibleSection(
          'Booking Details',
          'receipt',
          'booking',
          <View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Booked By</Text>
              <Text style={styles.detailValue}>{appointment.patientName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Patient ID</Text>
              <Text style={styles.detailValue}>{appointment.patientId}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Status</Text>
              <Text style={styles.detailValue}>Paid</Text>
            </View>
          </View>
        )}

        {renderCollapsibleSection(
          'Medical Reports',
          'folder',
          'reports',
          <View style={styles.uploadSection}>
            <Icon name="cloud-upload" size={48} color={colors.gray[400]} />
            <Text style={styles.uploadText}>No medical reports uploaded</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload Reports</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.prescriptionButton}
            onPress={() => router.push(`/(screens)/prescription/${appointment.id}`)}
          >
            <Text style={styles.prescriptionButtonText}>Add Prescription</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => router.push(`/(screens)/call/${appointment.id}`)}
          >
            <Text style={styles.callButtonText}>Start Call</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: colors.white,
    marginVertical: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  uploadSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  uploadText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginVertical: 16,
  },
  uploadButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  prescriptionButton: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  prescriptionButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  callButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  callButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
});