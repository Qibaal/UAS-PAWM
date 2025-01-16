import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Guide = () => {
  return (
    <View style={styles.guide}>
      <Text style={styles.title}>Stoichiometry Guide</Text>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Steps</Text>
          <Text>1. Balance the chemical equation</Text>
          <Text>2. Convert given mass/volume to moles</Text>
          <Text>3. Use molar ratios to find moles of product</Text>
          <Text>4. Convert moles to requested unit</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Example Calculation</Text>
          <Text>Problem: HCl + NaOH → NaCl + H₂O</Text>
          <Text>Given: 100 mL of 0.5 M HCl and 100 mL of 0.25 M NaOH</Text>
          <Text>1. Calculate moles of HCl: 0.5 M × 0.1 L = 0.05 moles</Text>
          <Text>2. Calculate moles of NaOH: 0.25 M × 0.1 L = 0.025 moles</Text>
          <Text>3. Determine limiting reagent: NaOH (0.025 moles) is limiting</Text>
          <Text>4. Calculate product: 0.025 moles NaCl will form</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Formulas</Text>
          <Text>Molarity (M) = moles/liters</Text>
          <Text>Moles = Molarity × Volume (L)</Text>
          <Text>Moles = Mass/Molar Mass</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  guide: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default Guide;

