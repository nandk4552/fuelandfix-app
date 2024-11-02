import moment from "moment";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const OrderCard = ({ orders, onUpdateStatus }) => {
  if (!orders) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Total Orders: {orders.length}</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {orders.map((order) => (
          <View key={order._id} style={styles.orderContainer}>
            <View style={styles.orderHeader}>
              <Text style={styles.title}>Order Type: {order.type}</Text>
              <Text style={styles.status}>Status: {order.status}</Text>
            </View>
            <Text style={styles.description}>Location: {order.location}</Text>
            <Text style={styles.description}>Liters: {order.liters}</Text>
            <Text style={styles.description}>
              Total Cost: ₹{order.totalCost}
            </Text>
            <Text style={styles.date}>
              Created At: {moment(order.createdAt).format("DD/MM/YYYY")}
            </Text>

            {/* Conditional rendering for cancellation */}
            {order.status !== "canceled" && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => onUpdateStatus(order._id, "canceled")}
              >
                <Text style={styles.cancelButtonText}>Cancel Order</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    color: "#ff9966",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  orderContainer: {
    backgroundColor: "#1F1B24",
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  orderHeader: {
    marginBottom: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  status: {
    color: "#FFCC00", // Yellow for status
    fontSize: 14,
  },
  description: {
    color: "#E1E1E1",
    fontSize: 14,
    marginVertical: 5,
    lineHeight: 20,
  },
  date: {
    color: "#888", // Lighter text for date
    fontSize: 12,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#F44336", // Red color for cancellation
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default OrderCard;
