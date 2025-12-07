import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { useAppointments } from '../../contexts/AppointmentContext';
import AppointmentCard from '../../components/AppointmentCard';
import { router } from 'expo-router';

export default function AppointmentsScreen() {
  const { appointments, cancelAppointment } = useAppointments();
  const [filter, setFilter] = useState<'all' | 'booked' | 'completed' | 'cancelled'>('all');

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    if (filter === 'booked') return appointment.status === 'booked-paid';
    if (filter === 'completed') return appointment.status === 'completed';
    if (filter === 'cancelled') return appointment.status === 'cancelled';
    return true;
  });

  const handleStartCall = (appointmentId: string) => {
    router.push(`/(screens)/call/${appointmentId}`);
  };

  const handleViewDetails = (appointmentId: string) => {
    router.push(`/(screens)/appointment-details/${appointmentId}`);
  };

  const handleCancel = (appointmentId: string) => {
    cancelAppointment(appointmentId);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      <View style={styles.filterContainer}>
        {['all', 'booked', 'completed', 'cancelled'].map((filterType) => (
          <TouchableOpacity
            key={filterType}
            style={[
              styles.filterButton,
              filter === filterType && styles.activeFilter,
            ]}
            onPress={() => setFilter(filterType as any)}
          >
            <Text
              style={[
                styles.filterText,
                filter === filterType && styles.activeFilterText,
              ]}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.appointmentsList}>
        {filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onPress={() => handleViewDetails(appointment.id)}
            onCancel={() => handleCancel(appointment.id)}
            onStartCall={() => handleStartCall(appointment.id)}
          />
        ))}
        {filteredAppointments.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No appointments found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
  },
  activeFilter: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  activeFilterText: {
    color: colors.white,
  },
  appointmentsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 16,
  },
});