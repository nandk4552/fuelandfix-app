import { AuthContext } from "@/context/authContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl, // Import RefreshControl
} from "react-native";
import FooterMenu from "../components/Menus/FooterMenu"; // Ensure the path is correct
import OrderCard from "../components/Orders/OrderCard";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing
  const [state] = useContext(AuthContext);

  const getUserOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/order/my-orders", {
        headers: {
          Authorization: `Bearer ${state?.token}`,
        },
      });
      if (data.success) {
        setOrders(data.orders);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error fetching orders");
    } finally {
      setLoading(false);
      setRefreshing(false); // Reset refreshing state
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `/order/${orderId}/userstatus`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${state?.token}`,
          },
        }
      );
      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing state to true
    await getUserOrders(); // Fetch the orders again
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ff9966" />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing} // Control refreshing state
              onRefresh={onRefresh} // Function to call on refresh
              colors={["#ff9966"]} // Customize the refresh spinner color
            />
          }
        >
          <OrderCard orders={orders} onUpdateStatus={handleUpdateStatus} />
        </ScrollView>
      )}
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  title: {
    color: "#ff9966",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default MyOrders;
