import React, { useState } from "react";
import { Button, StyleSheet, Text, View, Linking } from "react-native";
import moment from "moment";
import { Picker } from "@react-native-picker/picker";

const AdminOrderCard = ({ order, onUpdateStatus }) => {
  const [status, setStatus] = useState(order?.status);

  // Update the status and call onUpdateStatus when status changes
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onUpdateStatus(order?._id, newStatus);
  };

  // Determine the color based on the current status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#FFCC00"; // Yellow for pending
      case "accepted":
        return "#4CAF50"; // Green for accepted
      case "completed":
        return "#2196F3"; // Blue for completed
      case "canceled":
        return "#F44336"; // Red for canceled
      default:
        return "#FFFFFF"; // Default to white if unknown
    }
  };

  // Open Google Maps with directions from current location to order location
  const openGoogleMaps = () => {
    const { latitude, longitude } = order;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;

    Linking.openURL(url).catch((err) => {
      console.error("Failed to open Google Maps:", err);
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.orderHeader}>
        <Text style={styles.title}>Order Type: {order.type}</Text>
        <Text style={styles.userInfo}>
          Customer: {order.userId?.name} ({order.userId?.phone})
        </Text>
        <Text style={[styles.status, { color: getStatusColor(status) }]}>
          Status: {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      </View>
      <Text style={styles.description}>Location: {order.location}</Text>
      <Text style={styles.description}>Liters: {order.liters}</Text>
      <Text style={styles.description}>Total Cost: ₹{order.totalCost}</Text>
      <Text style={styles.date}>
        Created At: {moment(order.createdAt).format("DD/MM/YYYY")}
      </Text>

      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => handleStatusChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item
          label="Pending"
          value="pending"
          color="#FFCC00" // Yellow for Pending
        />
        <Picker.Item
          label="Accepted"
          value="accepted"
          color="#4CAF50" // Green for Accepted
        />
        <Picker.Item
          label="Completed"
          value="completed"
          color="#2196F3" // Blue for Completed
        />
        <Picker.Item
          label="Canceled"
          value="canceled"
          color="#F44336" // Red for Canceled
        />
      </Picker>

      <Button title="Get Directions" onPress={openGoogleMaps} color="#ff9966" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  orderHeader: { marginBottom: 10 },
  title: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  userInfo: { color: "#FFFFFF", fontSize: 14 },
  status: { fontSize: 14, fontWeight: "600" }, // Base style for status
  description: {
    color: "#E1E1E1",
    fontSize: 14,
    marginVertical: 5,
    lineHeight: 20,
  },
  date: { color: "#888", fontSize: 12, marginTop: 10 },
  picker: {
    color: "#ff9966",
    marginTop: 10,
  },
});

export default AdminOrderCard;