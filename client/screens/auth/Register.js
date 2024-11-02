import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Updated import
const Register = ({ navigation }) => {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role set to 'user'
  const [loading, setLoading] = useState(false);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust length based on requirement
    return phoneRegex.test(phone);
  };

  const handleSubmit = async () => {
    try {
      if (!name || !email || !phone || !password) {
        Alert.alert("Please fill all required fields");
        setLoading(false);
        return;
      }
      if (!validatePhoneNumber(phone)) {
        Alert.alert("Please enter a valid 10-digit phone number");
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data } = await axios.post(`/auth/register`, {
        name,
        email,
        password,
        phone,
        role, // Include role in the request
      });
      Alert.alert(data && data.message);
      setEmail("");
      setPhone("");
      setName("");
      setPassword("");

      setLoading(false);

      // Navigate to login page
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["rgba(0,0,0,0.6)", "transparent"]}
      style={styles.overlay}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.pageTitle}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="person" size={24} color="white" />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Name"
                placeholderTextColor="#dcdcdc"
                style={styles.inputBox}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail" size={24} color="white" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#dcdcdc"
                style={styles.inputBox}
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons name="call" size={24} color="white" />
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
                placeholderTextColor="#dcdcdc"
                style={styles.inputBox}
                keyboardType="numeric"
                maxLength={10}
                autoComplete="tel"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed" size={24} color="white" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#dcdcdc"
                style={styles.inputBox}
                secureTextEntry
              />
            </View>
            {/* Role Picker */}
            <View style={styles.inputWrapper}>
              <Ionicons name="person" size={24} color="white" />
              <Picker
                selectedValue={role}
                style={styles.picker}
                onValueChange={(itemValue) => setRole(itemValue)}
              >
                <Picker.Item label="User" value="user" />
                <Picker.Item label="Admin" value="admin" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <LinearGradient
              colors={["#ff9966", "#ff5e62"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {loading ? "Loading..." : "Register"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.linkText}>
            Already have an account?{" "}
            <Text
              onPress={() => navigation.navigate("Login")}
              style={styles.loginText}
            >
              Login
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    borderRadius: 15,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#dcdcdc",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  inputBox: {
    flex: 1,
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
  picker: {
    flex: 1,
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
  submitButton: {
    marginVertical: 20,
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  loginText: {
    color: "#ff9966",
    fontWeight: "bold",
  },
});

export default Register;
