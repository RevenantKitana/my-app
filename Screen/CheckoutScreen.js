import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const formatCardNumber = (text) => {
  return text.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiryDate = (text) => {
  return text
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d{0,4})$/, "$1/$2")
    .trim();
};

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const isFormValid =
    paymentMethod === "applePay" ||
    (cardNumber.replace(/\s/g, "").length === 16 &&
      cardHolder.trim() !== "" &&
      /^(0[1-9]|1[0-2])\/\d{4}$/.test(expiryDate) &&
      cvv.length === 3);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
      </View>

      {/* Total Amount */}
      <Text style={styles.amount}>₹ 1,527</Text>
      <Text style={styles.subText}>Including GST (18%)</Text>

      {/* Payment Methods */}
      <View style={styles.paymentMethods}>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === "creditCard" && styles.selected]}
          onPress={() => setPaymentMethod("creditCard")}
        >
          <Text style={styles.paymentText}>Credit card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === "applePay" && styles.selected]}
          onPress={() => setPaymentMethod("applePay")}
        >
          <Text style={styles.paymentText}>Apple Pay</Text>
        </TouchableOpacity>
      </View>

      {/* Card Details (Only for Credit Card) */}
      {paymentMethod === "creditCard" && (
        <View>
          <Text style={styles.label}>Card number</Text>
          <TextInput
            placeholder="5261 4141 0151 8472"
            keyboardType="numeric"
            style={styles.inputField}
            maxLength={19}
            value={cardNumber}
            onChangeText={(text) => setCardNumber(formatCardNumber(text))}
          />

          <Text style={styles.label}>Cardholder name</Text>
          <TextInput
            placeholder="Christie Doe"
            style={styles.inputField}
            value={cardHolder}
            onChangeText={setCardHolder}
          />

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Expiry date</Text>
              <TextInput
                placeholder="MM/YYYY"
                keyboardType="numeric"
                style={styles.inputField}
                maxLength={7}
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>CVV / CVC</Text>
              <TextInput
                placeholder="XXX"
                keyboardType="numeric"
                style={styles.inputField}
                maxLength={3}
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
          </View>
        </View>
      )}

      {/* Apple Pay Details */}
      {paymentMethod === "applePay" && (
        <View style={styles.applePayContainer}>
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" }}
            style={styles.applePayLogo}
          />
          <Text style={styles.applePayText}>Use Apple Pay for a faster checkout experience.</Text>
        </View>
      )}

      <Text style={styles.infoText}>
        We will send you an order details to your email after successful payment.
      </Text>

      {/* Pay Button */}
      <TouchableOpacity 
        style={[styles.payButton, !isFormValid && { backgroundColor: "#D1D5DB" }]} 
        activeOpacity={0.8} 
        onPress={() => navigation.navigate("PaymentSuccess")}
        disabled={!isFormValid}
      >
        <Text style={styles.payText}>Pay for the order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 20, paddingTop: StatusBar.currentHeight || 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  amount: { fontSize: 26, fontWeight: "bold", color: "#22C55E", marginBottom: 5 },
  subText: { color: "#6B7280", marginBottom: 20 },
  paymentMethods: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  paymentButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#E5E7EB",
  },
  selected: {
    backgroundColor: "#22C55E",
  },
  paymentText: { color: "black", fontWeight: "600" },
  label: { color: "#6B7280", marginBottom: 5, fontSize: 14 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  input: { flex: 1, fontSize: 16 },
  cardLogo: { width: 30, height: 20, marginLeft: 10 },
  applePayContainer: { alignItems: "center", padding: 20 },
  applePayLogo: { width: 100, height: 40, marginBottom: 10 },
  applePayText: { fontSize: 16, textAlign: "center", color: "#6B7280" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  column: { width: "48%" },
  infoText: { color: "#9CA3AF", textAlign: "center", marginTop: 15, fontSize: 14 },
  payButton: {
    backgroundColor: "#22C55E",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  payText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default CheckoutScreen;
