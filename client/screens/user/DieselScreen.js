import FooterMenu from "@/components/Menus/FooterMenu";
import useLocation from "@/hooks/useLocation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const DieselScreen = () => {
  const { address, lat, long, erroMsg } = useLocation();
  const [liters, setLiters] = useState("");
  const [currentDieselPrice, setCurrentDieselPrice] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const DELIVERY_CHARGE = 50; // Fixed delivery charge in your currency
  useEffect(() => {
    const fetchFuelPrices = async () => {
      try {
        const { data } = await axios.get(
          "https://daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com/v1/fuel-prices/today/india/maharashtra/mumbai",
          {
            headers: {
              "x-rapidapi-host":
                "daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com",
              "x-rapidapi-key":
                "485e18c773msh5b8e818ab5a2255p1ca048jsna294f4648b7d", // Ensure this is updated
            },
          }
        );

        // Check the actual structure of data and extract petrol and diesel prices correctly
        if (data && data.fuel) {
          const dieselPrice = data.fuel.diesel.retailPrice; // Adjusted access
          setCurrentDieselPrice(dieselPrice);
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        if (error.response) {
          console.error("Error fetching fuel prices:", error.response.data);
          Alert.alert("Error", error.response.data.message); // Display error message to user
        } else if (error.request) {
          console.error("No response received from the server:", error.request);
          Alert.alert(
            "Error",
            "No response from the server. Please check your connection."
          );
        } else {
          console.error("Error in setup:", error.message);
          Alert.alert("Error", "An unexpected error occurred.");
        }
      }
    };
    fetchFuelPrices();
  }, []);

  const handleOrder = async () => {
    if (!liters || !address) {
      Alert.alert("Error", "Please enter both liters and location");
      return;
    }

    try {
      await axios.post("/order", {
        type: "diesel",
        liters,
        location: address,
        latitude: lat,
        longitude: long,
        totalCost,
      });

      // Show success alert with response data if needed
      Alert.alert(
        "Success",
        `Order placed successfully! Total cost: ${totalCost}`
      );

      // Clear the input fields
      setLiters("");
    } catch (error) {
      console.log("Order failed:", error);
      Alert.alert("Error", "Failed to place order. Please try again.");
    }
  };
  const handleLitersChange = (text) => {
    const value = parseFloat(text);
    setLiters(text);
    if (!isNaN(value) && currentDieselPrice) {
      // Update total cost whenever liters is changed
      setTotalCost(value * currentDieselPrice + DELIVERY_CHARGE);
    } else {
      setTotalCost(DELIVERY_CHARGE); // Just the delivery charge if no valid liters
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Order Diesel</Text>
          <Text style={styles.infoText}>Diesel In Liters:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter liters"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={liters}
            onChangeText={handleLitersChange} // Updated handler
          />
          <Text style={styles.infoText}>Current Address:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter live location"
            placeholderTextColor="#888"
            value={address}
            multiline
            editable={false} // Make it readonly if only displaying address from location hook
          />
          <Text style={styles.infoText}>
            Current Price per Liter (Diesel):{" "}
            {currentDieselPrice || "Loading..."}
          </Text>
          <Text style={styles.infoText}>
            Delivery Charge: {DELIVERY_CHARGE}
          </Text>
          <Text style={styles.infoText}>Total Charges: {totalCost}</Text>
          <Button title="Order Diesel" onPress={handleOrder} color="#ff9966" />
        </ScrollView>
      </View>
      <FooterMenu />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212", // Dark background
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff9966", // Primary color for dark theme
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#ddd", // Light text color
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    color: "#fff",
    backgroundColor: "#1F1F1F",
  },
  subtitle: {
    fontSize: 18,
    color: "#ff9966",
    marginVertical: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  itemText: {
    color: "#ddd",
  },
});

export default DieselScreen;
