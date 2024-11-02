import { AuthContext } from "@/context/authContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Account from "../../screens/Account";
import AdminDashboard from "../../screens/admin/AdminDashboard"; // Example admin screen
import Login from "../../screens/auth/Login";
import Register from "../../screens/auth/Register";
import MyOrders from "../../screens/MyOrders";
import DieselScreen from "../../screens/user/DieselScreen";
import PetrolScreen from "../../screens/user/PetrolScreen";
import RepairScreen from "../../screens/user/RepairScreen";
import UserHome from "../../screens/user/UserHome";
import HeaderMenu from "./HeaderMenu";

const Stack = createNativeStackNavigator();

const ScreenMenu = () => {
  const [state] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Check authentication and role
  const authUser = state?.user && state?.token;
  const isAdmin = state?.user?.role === "admin";

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Set delay for 1 second (1000 ms)

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  if (loading) {
    return (
      // You can replace this with your own loading component
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Login">
      {authUser ? (
        isAdmin ? (
          // Admin Routes
          <>
            <Stack.Screen
              name="AdminDashboard"
              component={AdminDashboard}
              options={{
                title: "Admin Dashboard",
                headerRight: () => <HeaderMenu />,
              }}
            />
            <Stack.Screen
              name="Account"
              component={Account}
              options={{
                title: "Account",
                headerBackTitle: "Back",
                headerRight: () => <HeaderMenu />,
              }}
            />
          </>
        ) : (
          // User Routes
          <>
            <Stack.Screen
              name="UserHome"
              component={UserHome}
              options={{
                title: "FuelMart",
                headerRight: () => <HeaderMenu />,
              }}
            />
            <Stack.Screen
              name="MyOrders"
              component={MyOrders}
              options={{
                title: "My Orders",
                headerRight: () => <HeaderMenu />,
              }}
            />
            <Stack.Screen
              name="PetrolScreen"
              component={PetrolScreen}
              options={{
                title: "Petrol Services",
                headerRight: () => <HeaderMenu />,
              }}
            />
            <Stack.Screen
              name="DieselScreen"
              component={DieselScreen}
              options={{
                title: "Diesel Services",
                headerRight: () => <HeaderMenu />,
              }}
            />
            <Stack.Screen
              name="RepairScreen"
              component={RepairScreen}
              options={{
                title: "Repair Services",
                headerRight: () => <HeaderMenu />,
              }}
            />
            <Stack.Screen
              name="Account"
              component={Account}
              options={{
                title: "Account",
                headerBackTitle: "Back",
                headerRight: () => <HeaderMenu />,
              }}
            />
          </>
        )
      ) : (
        // Public Routes (for unauthenticated users)
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
