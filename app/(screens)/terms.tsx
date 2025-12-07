import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '../../constants/colors';

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.title}>Terms of Service</Text>
          <Text style={styles.date}>Last updated: January 2024</Text>

          <Text style={styles.heading}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.
          </Text>

          <Text style={styles.heading}>2. Professional Conduct</Text>
          <Text style={styles.text}>
            As a healthcare professional, you agree to maintain the highest standards of medical ethics and provide quality care to all patients.
          </Text>

          <Text style={styles.heading}>3. Account Responsibilities</Text>
          <Text style={styles.text}>
            You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device.
          </Text>

          <Text style={styles.heading}>4. Service Availability</Text>
          <Text style={styles.text}>
            We strive to provide uninterrupted service but do not guarantee that the service will be available at all times.
          </Text>

          <Text style={styles.heading}>5. Payment Terms</Text>
          <Text style={styles.text}>
            Consultation fees will be transferred to your registered bank account within 3-5 business days after the consultation.
          </Text>

          <Text style={styles.heading}>6. Termination</Text>
          <Text style={styles.text}>
            We reserve the right to terminate or suspend your account if you violate these terms or engage in fraudulent activities.
          </Text>

          <Text style={styles.heading}>7. Contact Information</Text>
          <Text style={styles.text}>
            For questions about these Terms of Service, please contact us at legal@doctorapp.com
          </Text>
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
    padding: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
