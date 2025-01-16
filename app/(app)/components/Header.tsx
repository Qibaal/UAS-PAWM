import React from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace("../(tabs)/home")}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.backText}>Homepage</Text>
      </TouchableOpacity>
      <View style={styles.profileSection}>
        <Text style={styles.userName}>User Name</Text>
        <Text style={styles.userScore}>Highest Score: 1200</Text>
        <Ionicons name="person-circle-outline" size={24} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    marginLeft: 8,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: 'white',
    marginRight: 8,
  },
  userScore: {
    color: 'white',
    marginRight: 8,
  },
});

export default Header;

