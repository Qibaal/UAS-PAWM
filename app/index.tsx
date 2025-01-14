import { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


export default function SplashScreen() {
  const videoRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/startscreen')
    }, 7500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#FFC8DD', '#BDE0FE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Video
        ref={videoRef}
        source={require('../assets/videos/stoichichoice.mp4')}
        style={styles.video}
        shouldPlay
        resizeMode="cover"
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
 });
