import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";
import PostCard from "@/components/PostCard";

const MyPosts = () => {
  // state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //   get user posts
  const getUserPosts = async () => {
    try {
      setLoading(true);
      // call API to get user posts
      const { data } = await axios.get("/post/get-user-posts");
      setPosts(data?.userPosts);
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // initial
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text>MyPosts</Text>
      <ScrollView>
        {/* <Text style={{color: "#fff"}}>{JSON.stringify(posts, null, 4)}</Text>
         */}

        <PostCard posts={posts} myPostScreen={true} />
      </ScrollView>
      <FooterMenu />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
export default MyPosts;
