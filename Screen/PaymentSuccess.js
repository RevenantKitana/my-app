import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PaymentSuccess = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Image
        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Payment_success.svg" }}
        style={styles.successImage}
      />
      <Text style={styles.successTitle}>Payment Success, Yayy!</Text>
      <Text style={styles.successMessage}>
        We will send order details and invoice in your contact no. and registered email
      </Text>
      <TouchableOpacity>
        <Text style={styles.checkDetails}>Check Details →</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadText}>Download Invoice</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white", padding: 20 },
  successImage: { width: 200, height: 200, marginBottom: 20 },
  successTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  successMessage: { textAlign: "center", color: "#6B7280", marginBottom: 20 },
  checkDetails: { color: "#6366F1", fontWeight: "600", marginBottom: 20 },
  downloadButton: { backgroundColor: "#6366F1", padding: 15, borderRadius: 12, alignItems: "center" },
  downloadText: { color: "white", fontWeight: "bold", fontSize: 16 },
  backButton: { position: "absolute", top: StatusBar.currentHeight || 20, left: 20 },
});

export default PaymentSuccess;
