import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { Appointment } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface AppointmentCardProps {
  appointment: Appointment;
  onPress: () => void;
  onCancel: () => void;
  onStartCall: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onPress,
  onCancel,
  onStartCall,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.patientName}>{appointment.patientName}</Text>
        <Text style={styles.symptom}>{appointment.symptom}</Text>
      </View>

      <View style={styles.statusContainer}>
        <View style={[
          styles.statusBadge,
          { backgroundColor: appointment.status === 'booked-paid' ? colors.success : colors.warning }
        ]}>
          <Text style={styles.statusText}>
            {appointment.status === 'booked-paid' ? 'Booked-Paid' : appointment.status}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar" size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>{appointment.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time" size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>{appointment.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="cash" size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>INR {appointment.fee}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name={appointment.type === 'video' ? 'videocam' : 'call'} size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>
            {appointment.type === 'video' ? 'Video' : 'Audio'}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton} onPress={onStartCall}>
          <Text style={styles.callButtonText}>Start Call</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  symptom: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statusContainer: {
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.white,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.error,
    fontWeight: '600',
  },
  callButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  callButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
});

export default AppointmentCard;