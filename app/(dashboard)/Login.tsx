import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const navigation = useNavigation();  // 👈 move this INSIDE component

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);

      // ✅ navigate to Dashboard on success
      navigation.navigate('Dashboard' as never);
      // 👆 type error fix karanna `as never` danna
    } catch (error: any) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);

      // ✅ navigate to Dashboard on success
      navigation.navigate('Dashboard' as never);
    } catch (error: any) {
      console.log(error);
      alert('Sign up failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('./../../assets/images/plant-indoor.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.card}>
            <Text style={styles.title}>🌱 Plant Care</Text>
            <Text style={styles.subtitle}>Login to continue</Text>

            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#777"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              secureTextEntry={true}
              value={password}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#777"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />

            {loading ? (
              <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
            ) : (
              <>
                <TouchableOpacity style={styles.btnPrimary} onPress={signIn}>
                  <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSecondary} onPress={signUp}>
                  <Text style={styles.btnText}>Create Account</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // dark overlay on background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: 'rgba(203, 241, 220, 0.41)',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 4,
    color: '#09f015ff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#3e3838ff',
  },
  input: {
    marginVertical: 8,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  btnPrimary: {
    backgroundColor: '#43a047',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 18,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  btnSecondary: {
    backgroundColor: '#66bb6a',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});