import FooterMenu from "@/components/Menus/FooterMenu";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import Linear Gradient
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Material Icons

const UserHome = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Petrol Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("PetrolScreen")}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={["#ff9966", "#ff5e62"]} // Gradient colors
              style={styles.gradient}
            >
              <Icon
                name="local-gas-station"
                size={28}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.cardText}>Petrol Services</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Diesel Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DieselScreen")}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={["#ff9966", "#ff5e62"]}
              style={styles.gradient}
            >
              <Icon
                name="local-gas-station"
                size={28}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.cardText}>Diesel Services</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Repair Services Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("RepairScreen")}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={["#ff9966", "#ff5e62"]}
              style={styles.gradient}
            >
              <Icon name="build" size={28} color="#fff" style={styles.icon} />
              <Text style={styles.cardText}>Repair Services</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <FooterMenu />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
    justifyContent: "center",
  },
  scrollContainer: {
    paddingBottom: 16, // Space for better scrolling experience
  },
  card: {
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden", // Ensure the gradient is contained within the card
    elevation: 5, // Adds a shadow effect on Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  gradient: {
    padding: 20,
    flexDirection: "row", // Aligns icon and text in a row
    alignItems: "center", // Center items vertically
  },
  cardText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10, // Space between icon and text
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
});

export default UserHome;
