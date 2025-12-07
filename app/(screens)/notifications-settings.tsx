import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '../../constants/colors';

export default function NotificationsSettingsScreen() {
  const [settings, setSettings] = useState({
    appointments: true,
    messages: true,
    payments: true,
    reminders: true,
    promotions: false,
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="calendar" size={24} color={colors.primary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Appointments</Text>
                <Text style={styles.settingDesc}>New appointment bookings</Text>
              </View>
            </View>
            <Switch
              value={settings.appointments}
              onValueChange={(value) => setSettings({ ...settings, appointments: value })}
              trackColor={{ false: colors.gray[300], true: colors.primary }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="chatbubble" size={24} color={colors.primary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Messages</Text>
                <Text style={styles.settingDesc}>New chat messages</Text>
              </View>
            </View>
            <Switch
              value={settings.messages}
              onValueChange={(value) => setSettings({ ...settings, messages: value })}
              trackColor={{ false: colors.gray[300], true: colors.primary }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="cash" size={24} color={colors.primary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Payments</Text>
                <Text style={styles.settingDesc}>Payment confirmations</Text>
              </View>
            </View>
            <Switch
              value={settings.payments}
              onValueChange={(value) => setSettings({ ...settings, payments: value })}
              trackColor={{ false: colors.gray[300], true: colors.primary }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="alarm" size={24} color={colors.primary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Reminders</Text>
                <Text style={styles.settingDesc}>Appointment reminders</Text>
              </View>
            </View>
            <Switch
              value={settings.reminders}
              onValueChange={(value) => setSettings({ ...settings, reminders: value })}
              trackColor={{ false: colors.gray[300], true: colors.primary }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="megaphone" size={24} color={colors.primary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Promotions</Text>
                <Text style={styles.settingDesc}>Updates and offers</Text>
              </View>
            </View>
            <Switch
              value={settings.promotions}
              onValueChange={(value) => setSettings({ ...settings, promotions: value })}
              trackColor={{ false: colors.gray[300], true: colors.primary }}
            />
          </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: colors.white,
    marginTop: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingInfo: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  settingDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
