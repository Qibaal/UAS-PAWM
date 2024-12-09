import { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


export default function HomeScreen() {
  const videoRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('startscreen');
    }, 7500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#FFC8DD', '#BDE0FE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Video
        ref={videoRef}
        source={require('../../assets/videos/stoichichoice.mp4')}
        style={styles.video}
        shouldPlay
        resizeMode="cover"
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Make the gradient fill the entire screen
    justifyContent: 'center',  // Vertically center content
    alignItems: 'center',      // Horizontally center content
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
 });
