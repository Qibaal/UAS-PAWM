import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/ui/Button';

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Text style={styles.logo}>Stoichify</Text>

        <Text style={styles.header}>Welcome to Stoichify</Text>

        <Text style={styles.paragraph}>
            Explore the fundamentals of stoichiometry in a fun, interactive virtual lab..
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.button}
          >
            Log in
          </Button>

          <View style={styles.space}></View>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate("RegisterScreen")}
            style={styles.button}
          >
            Create an account
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#BDE0FE',
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 40,
  },
  button: {
    marginVertical: 10,  // Vertical spacing between buttons
  },
  space: {
    marginVertical: 10,  // Spacer between the buttons
  },
});
