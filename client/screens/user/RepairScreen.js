import useLocation from "@/hooks/useLocation";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, Alert } from "react-native";
import axios from "axios";
import FooterMenu from "@/components/Menus/FooterMenu";

// Sample static repair options
const REPAIR_OPTIONS = [
  { id: "1", name: "Oil Change", price: 100, location: "Service Center A" },
  { id: "2", name: "Brake Repair", price: 250, location: "Service Center B" },
  {
    id: "3",
    name: "Tire Replacement",
    price: 150,
    location: "Service Center C",
  },
];

const RepairScreen = () => {
  const { address, lat, long, erroMsg } = useLocation();
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // Address will be set here

  useEffect(() => {
    // Update userLocation when address is available
    if (address) setUserLocation(address);
  }, [address]);

  const handleOrder = async () => {
    if (!selectedRepair) {
      Alert.alert("Error", "Please select a repair option.");
      return;
    }

    if (!userLocation) {
      Alert.alert("Error", "User location is not available.");
      return;
    }

    const orderDetails = {
      type: selectedRepair.name,
      location: selectedRepair.location,
      totalCost: selectedRepair.price,
      latitude: lat,
      longitude: long,
      userLocation: userLocation,
    };

    Alert.alert(
      "Success",
      `Order placed successfully!\nTotal Cost: ${orderDetails.totalCost}`
    );
    try {
      const response = await axios.post("/order", orderDetails);

      if (response.status === 201) {
        Alert.alert("Success", "Order placed successfully!");
        setSelectedRepair(null);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert(
        "Error",
        error.response?.data?.error ||
          "An error occurred while placing the order."
      );
    }
    setSelectedRepair(null);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Repair Options</Text>
        <FlatList
          data={REPAIR_OPTIONS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.priceText}>Price: ₹ {item.price} /-</Text>
              <Button
                title="Select"
                onPress={() => setSelectedRepair(item)}
                color="#ff9966"
              />
            </View>
          )}
        />
        {selectedRepair && (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedText}>
              Selected Repair: {selectedRepair.name}
            </Text>
            <Text style={styles.priceText}>
              Total Cost: ₹ {selectedRepair.price} /-
            </Text>
            <Text style={styles.locationText}>
              User Location: {userLocation || "Fetching..."}
            </Text>
            <Button title="Place Order" onPress={handleOrder} color="#4CAF50" />
          </View>
        )}
      </View>
      <FooterMenu />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
  },
  item: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#1E1E1E",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  priceText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#ffffff",
  },
  selectedContainer: {
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: "#2A2A2A",
  },
  selectedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  locationText: {
    fontSize: 16,
    marginTop: 10,
    color: "#ffffff",
  },
});

export default RepairScreen;
