import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/authContext";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authState] = useContext(AuthContext); // Access token from AuthContext

  const getAllOrders = async () => {
    // Ensure token exists before attempting fetch
    if (!authState?.token) return;

    try {
      setLoading(true);
      const { data } = await axios.get("/order/all-orders", {
        headers: {
          Authorization: `Bearer ${authState.token}`, // Using token securely
        },
      });
      setOrders(data);
    } catch (error) {
      // Handle unauthorized access (401) and other errors
      if (error.response?.status === 401) {
        console.error("Unauthorized: Please check your token or log in again.");
        // Optional: Implement logout or redirect logic here if needed
      } else {
        console.error("Error fetching orders:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authState?.token) {
      getAllOrders(); // Fetch orders only when token is available
    }
  }, [authState?.token]);

  return (
    <OrderContext.Provider value={[orders, loading, getAllOrders]}>
      {children}
    </OrderContext.Provider>
  );
};
