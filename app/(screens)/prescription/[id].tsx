import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../constants/colors';
import { useAppointments } from '../../../contexts/AppointmentContext';
import * as ImagePicker from 'expo-image-picker';

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export default function PrescriptionScreen() {
  const { id } = useLocalSearchParams();
  const { getAppointment } = useAppointments();
  const [medicines, setMedicines] = useState<Medicine[]>([
    { name: '', dosage: '', frequency: '', duration: '' }
  ]);
  const [notes, setNotes] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const appointment = getAppointment(id as string);

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const updateMedicine = (index: number, field: keyof Medicine, value: string) => {
    const updated = medicines.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setMedicines(updated);
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedFiles([...uploadedFiles, result.assets[0].uri]);
    }
  };

  const savePrescription = () => {
    Alert.alert('Success', 'Prescription saved successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Appointment not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prescription</Text>
        <TouchableOpacity onPress={savePrescription}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{appointment.patientName}</Text>
          <Text style={styles.patientId}>ID: {appointment.patientId}</Text>
          <Text style={styles.concern}>Concern: {appointment.symptom}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Medicines</Text>
            <TouchableOpacity onPress={addMedicine} style={styles.addButton}>
              <Icon name="add" size={20} color={colors.primary} />
              <Text style={styles.addButtonText}>Add Medicine</Text>
            </TouchableOpacity>
          </View>

          {medicines.map((medicine, index) => (
            <View key={index} style={styles.medicineCard}>
              <View style={styles.medicineHeader}>
                <Text style={styles.medicineNumber}>Medicine {index + 1}</Text>
                {medicines.length > 1 && (
                  <TouchableOpacity onPress={() => removeMedicine(index)}>
                    <Icon name="delete" size={20} color={colors.error} />
                  </TouchableOpacity>
                )}
              </View>
              
              <TextInput
                style={styles.input}
                placeholder="Medicine Name"
                value={medicine.name}
                onChangeText={(text) => updateMedicine(index, 'name', text)}
              />
              
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Dosage"
                  value={medicine.dosage}
                  onChangeText={(text) => updateMedicine(index, 'dosage', text)}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Frequency"
                  value={medicine.frequency}
                  onChangeText={(text) => updateMedicine(index, 'frequency', text)}
                />
              </View>
              
              <TextInput
                style={styles.input}
                placeholder="Duration"
                value={medicine.duration}
                onChangeText={(text) => updateMedicine(index, 'duration', text)}
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add any additional instructions or notes..."
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upload Files</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Icon name="cloud-upload" size={24} color={colors.primary} />
            <Text style={styles.uploadButtonText}>Upload Image/PDF</Text>
          </TouchableOpacity>
          
          {uploadedFiles.map((file, index) => (
            <View key={index} style={styles.fileItem}>
              <Icon name="insert-drive-file" size={20} color={colors.primary} />
              <Text style={styles.fileName}>File {index + 1}</Text>
            </View>
          ))}
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
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  patientInfo: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  patientId: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  concern: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  medicineCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  medicineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicineNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  notesInput: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 20,
    gap: 8,
  },
  uploadButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  fileName: {
    fontSize: 14,
    color: colors.text,
  },
});