import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="person" size={24} color={colors.textSecondary} />
          <Text style={styles.settingText}>Profile</Text>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="security" size={24} color={colors.textSecondary} />
          <Text style={styles.settingText}>Security</Text>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="notifications" size={24} color={colors.textSecondary} />
          <Text style={styles.settingText}>Notifications</Text>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="language" size={24} color={colors.textSecondary} />
          <Text style={styles.settingText}>Language</Text>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="dark-mode" size={24} color={colors.textSecondary} />
          <Text style={styles.settingText}>Dark Mode</Text>
          <Icon name="toggle-on" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="help" size={24} color={colors.textSecondary} />
          <Text style={styles.settingText}>Help & Support</Text>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="info" size={24} color={colors.textSecondary} />
          <Text style={styles.settingText}>About App</Text>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="description" size={24} color={colors.textSecondary} />
          <Text style={styles.settingText}>Terms & Conditions</Text>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="policy" size={24} color={colors.textSecondary} />
          <Text style={styles.settingText}>Privacy Policy</Text>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Icon name="logout" size={24} color={colors.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
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
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
  },
  section: {
    backgroundColor: colors.white,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginVertical: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginTop: 16,
    padding: 16,
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    color: colors.error,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginVertical: 24,
  },
});