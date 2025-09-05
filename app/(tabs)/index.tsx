import { View, Text, StyleSheet } from "react-native";

const Index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌱 Plant Care</Text>
      <Text style={styles.subtitle}>Next reminder: Water Aloe Vera 🌵</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ECFDF5", // light green
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#065F46", // green-800
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#047857", // green-700
  },
});
