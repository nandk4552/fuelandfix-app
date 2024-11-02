import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "@/context/authContext";

const FooterMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [state] = useContext(AuthContext);
  const isAdmin = state?.user?.role === "admin";

  return (
    <View style={styles.footer}>
      {isAdmin ? (
        <>
          {/* Admin Dashboard Menu Item */}
          <TouchableOpacity
            onPress={() => navigation.navigate("AdminDashboard")}
            style={styles.menuItem}
            activeOpacity={0.7}
          >
            <Icon
              name={
                route.name === "AdminDashboard"
                  ? "speedometer"
                  : "speedometer-outline"
              }
              color={route.name === "AdminDashboard" ? "#ff9966" : "#ccc"}
              size={24}
            />
            <Text
              style={[
                styles.menuText,
                route.name === "AdminDashboard" && styles.activeText,
              ]}
            >
              Dashboard
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* User Menu Items */}
          <TouchableOpacity
            onPress={() => navigation.navigate("UserHome")}
            style={styles.menuItem}
            activeOpacity={0.7}
          >
            <Icon
              name={route.name === "UserHome" ? "home" : "home-outline"}
              color={route.name === "UserHome" ? "#ff9966" : "#ccc"}
              size={24}
            />
            <Text
              style={[
                styles.menuText,
                route.name === "UserHome" && styles.activeText,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("MyOrders")}
            style={styles.menuItem}
            activeOpacity={0.7}
          >
            <Icon
              name={route.name === "MyOrders" ? "cart" : "cart-outline"}
              color={route.name === "MyOrders" ? "#ff9966" : "#ccc"}
              size={24}
            />
            <Text
              style={[
                styles.menuText,
                route.name === "MyOrders" && styles.activeText,
              ]}
            >
              My Orders
            </Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("Account")}
        style={styles.menuItem}
        activeOpacity={0.7}
      >
        <Icon
          name={route.name === "Account" ? "person" : "person-outline"}
          color={route.name === "Account" ? "#ff9966" : "#ccc"}
          size={24}
        />
        <Text
          style={[
            styles.menuText,
            route.name === "Account" && styles.activeText,
          ]}
        >
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1c1c1e",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
    height: 70,
  },
  menuItem: {
    alignItems: "center",
    flex: 1,
  },
  menuText: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 5,
  },
  activeText: {
    color: "#ff9966",
    fontWeight: "bold",
  },
});

export default FooterMenu;
