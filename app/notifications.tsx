import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '../constants/colors';

const initialNotifications = [
  {
    id: 1,
    title: 'New Appointment',
    message: 'Jay Patil booked an appointment for Hairfall consultation',
    time: '10 min ago',
    read: false,
    type: 'appointment',
  },
  {
    id: 2,
    title: 'Appointment Reminder',
    message: 'Your appointment with Aliana Sen starts in 15 minutes',
    time: '1 hour ago',
    read: false,
    type: 'appointment',
  },
  {
    id: 3,
    title: 'Payment Received',
    message: 'Payment of ₹800 received from Jay Patil',
    time: '2 hours ago',
    read: true,
    type: 'payment',
  },
  {
    id: 4,
    title: 'Prescription Request',
    message: 'Patient requesting prescription for completed consultation',
    time: '1 day ago',
    read: true,
    type: 'prescription',
  },
  {
    id: 5,
    title: 'System Update',
    message: 'New features added to the doctor portal',
    time: '2 days ago',
    read: true,
    type: 'system',
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/(tabs)/home');
            }
          }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={markAllAsRead}>
            <Ionicons name="checkmark-done" size={24} color={notifications.length > 0 ? colors.white : colors.gray[400]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={clearAll}>
            <Ionicons name="trash-outline" size={24} color={notifications.length > 0 ? colors.white : colors.gray[400]} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={80} color={colors.gray[300]} />
            <Text style={styles.emptyStateTitle}>No Notifications</Text>
            <Text style={styles.emptyStateMessage}>
              You are all caught up! Check back later for updates.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.notificationsHeader}>
              <Text style={styles.notificationsHeaderText}>
                {unreadCount > 0 ? `${unreadCount} Unread` : 'All Read'}
              </Text>
            </View>
            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[styles.notificationCard, !notification.read && styles.unreadNotificationCard]}
                onPress={() => markAsRead(notification.id)}
              >
                <View style={styles.notificationIcon}>
                  {notification.type === 'appointment' ? (
                    <Ionicons name="calendar" size={24} color={colors.primary} />
                  ) : notification.type === 'payment' ? (
                    <Ionicons name="cash" size={24} color={colors.success} />
                  ) : notification.type === 'prescription' ? (
                    <Ionicons name="document-text" size={24} color={colors.warning} />
                  ) : (
                    <Ionicons name="information-circle" size={24} color={colors.info} />
                  )}
                </View>
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    {!notification.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    flex: 1,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
    padding: 4,
  },
  content: {
    flex: 1,
  },
  notificationsHeader: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  notificationsHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  unreadNotificationCard: {
    backgroundColor: '#F0F9FF',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  notificationIcon: {
    marginRight: 12,
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.gray[400],
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: 14,
    color: colors.gray[400],
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
