import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CheckoutScreen from "./Screen/CheckoutScreen";
import PaymentSuccess from "./Screen/PaymentSuccess"; // Import màn hình PaymentSuccess

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
