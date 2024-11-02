import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";

const Account = () => {
  const [state, setState] = useContext(AuthContext);
  const { user } = state;

  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState(user?.password || "");
  const [email] = useState(user?.email || "");
  const [phone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);

  // Handle update user data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/auth/update-user", {
        name,
        password,
        email,
      });
      setState({ ...state, user: data?.updatedUser });
      Alert.alert(data?.message);
    } catch (error) {
      Alert.alert(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
            }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.msg}>
          * You can update your Name and Password only.
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#ddd" // Light purple for placeholder text
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.inputBox}
            value={email}
            editable={false}
            placeholder="Email"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone no:</Text>
          <TextInput
            style={styles.inputBox}
            value={phone}
            editable={false}
            placeholder="Phone number"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inputBox}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter New Password"
            placeholderTextColor="#333" // Light purple for placeholder text
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Role:</Text>
          <TextInput
            editable={false}
            style={styles.inputBox}
            value={user.role}
          />
        </View>
        <TouchableOpacity onPress={handleUpdate} style={styles.updateBtn}>
          <Text style={styles.btnText}>
            {loading ? "Updating..." : "Update Profile"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark purple background
    paddingTop: 5,
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#ff9966", // Light purple for image border
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  msg: {
    color: "#ddd", // Light purple message color
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: "orange", // Lighter shade for the label
    width: "25%",
    textAlign: "right",
    paddingRight: 5,
    fontWeight: "600",
  },
  inputBox: {
    flex: 1,
    backgroundColor: "#ddd",
    opacity: 0.8, // Slightly lighter purple for input box
    borderWidth: 1,
    borderColor: "#ddd", // Light purple border for input box
    borderRadius: 10,
    padding: 5,
    paddingLeft: 10,
    fontSize: 16,
    color: "#000", // Light purple text color in input box
  },
  updateBtn: {
    marginTop: 30,
    backgroundColor: "#ff9966", // Darker purple for update button
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    alignSelf: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Account;
