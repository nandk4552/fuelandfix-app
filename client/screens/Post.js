import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { PostContext } from "@/context/postContext";

const Post = ({ navigation }) => {
  const [state] = useContext(AuthContext);
  const [posts, setPosts] = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle post data
  const handlePost = async () => {
    try {
      setLoading(true);
      if (!title || !description) {
        alert("Please fill all fields");
        return;
      }

      const { data } = await axios.post("/post/create-post", {
        title,
        description,
      });
      setPosts([...posts, data?.post]);
      setTitle("");
      setDescription("");
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error?.response?.data?.message || error?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100} // Adjust this value as needed
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.centeredView}>
            <Text style={styles.heading}>Create a Post</Text>
            <TextInput
              value={title}
              onChangeText={(txt) => setTitle(txt)}
              placeholderTextColor={"#999"}
              style={styles.input}
              placeholder="Add a post title..."
            />
            <TextInput
              value={description}
              onChangeText={(txt) => setDescription(txt)}
              style={styles.inputLarge}
              placeholder="Add a post description..."
              multiline={true}
              numberOfLines={4}
              placeholderTextColor={"#999"}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable
              onPress={handlePost}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <FontAwesome5 name="plus-square" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Create Post</Text>
            </Pressable>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <FooterMenu />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#121212", // Dark background
    paddingTop: 40,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  centeredView: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    color: "#BB86FC", // Light purple color for heading
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 30,
    letterSpacing: 1,
  },
  input: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#BB86FC", // Border color matching theme
    borderRadius: 10,
    backgroundColor: "#1F1B24", // Darker background for input
    fontSize: 18,
    width: "100%",
    color: "#FFFFFF", // Light text color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  inputLarge: {
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#BB86FC", // Border color matching theme
    borderRadius: 10,
    backgroundColor: "#1F1B24", // Darker background for input
    fontSize: 18,
    width: "100%",
    color: "#FFFFFF", // Light text color
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonWrapper: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#BB86FC", // Button color matching theme
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    width: "90%",
  },
  buttonPressed: {
    backgroundColor: "#9B59B6", // Lighter shade for pressed state
  },
  buttonIcon: {
    fontSize: 22,
    color: "#fff",
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  footer: {
    paddingTop: 20,
  },
});

export default Post;
