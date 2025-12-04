import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppointments } from '../../contexts/AppointmentContext';

export default function HomeScreen() {
  const { appointments } = useAppointments();
  
  const todayAppointments = appointments.filter(app => 
    app.date === '13/09/2023' // Filter for today's date
  );

  const upcomingAppointments = appointments.filter(app => 
    app.status === 'booked-paid'
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.name}>Dr. Prem</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="person" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{todayAppointments.length}</Text>
          <Text style={styles.statLabel}>Today's Appointments</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{upcomingAppointments.length}</Text>
          <Text style={styles.statLabel}>Upcoming</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      {/* Today's Schedule */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {todayAppointments.length > 0 ? (
          todayAppointments.map(appointment => (
            <View key={appointment.id} style={styles.scheduleItem}>
              <View style={styles.timeContainer}>
                <Text style={styles.time}>{appointment.time}</Text>
              </View>
              <View style={styles.scheduleDetails}>
                <Text style={styles.patientName}>{appointment.patientName}</Text>
                <Text style={styles.symptom}>{appointment.symptom}</Text>
                <View style={styles.scheduleFooter}>
                  <Text style={styles.fee}>INR {appointment.fee}</Text>
                  <Text style={styles.type}>{appointment.type === 'video' ? 'Video' : 'Audio'}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noAppointments}>No appointments for today</Text>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="videocam" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Start Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="note-add" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Add Prescription</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="calendar-today" size={24} color={colors.primary} />
            <Text style={styles.actionText}>View Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="chat" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Messages</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  greeting: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  scheduleItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  timeContainer: {
    marginRight: 16,
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  scheduleDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  symptom: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  scheduleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  fee: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  type: {
    fontSize: 12,
    color: colors.textSecondary,
    backgroundColor: colors.gray[100],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  noAppointments: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontStyle: 'italic',
    padding: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionButton: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
});