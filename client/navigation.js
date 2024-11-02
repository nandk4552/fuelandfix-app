import React from "react";
import ScreenMenu from "./components/Menus/ScreenMenu.js";
import { AuthProvider } from "./context/authContext";
import { OrderProvider } from "./context/orderContext.js";
const RootNavigation = () => {
  return (
    <AuthProvider>
      <OrderProvider>
        <ScreenMenu />
      </OrderProvider>
    </AuthProvider>
  );
};

export default RootNavigation;
