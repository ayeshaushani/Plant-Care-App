import { plantService } from "@/services/plantService";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddPlant() {
  const userId = getAuth().currentUser?.uid;
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handleAdd = async () => {
    if (!userId || !name || !type || !wateringFrequency || !photoFile) {
      Alert.alert("Error", "Please fill all fields and select a photo.");
      return;
    }
    try {
      await plantService.addPlant(userId, {
        name,
        type,
        wateringFrequency: Number(wateringFrequency),
      }, photoFile);
      Alert.alert("Success", "Plant added successfully!");
      setName(""); setType(""); setWateringFrequency(""); setPhotoFile(null);
    } catch (err) {
      Alert.alert("Error", "Failed to add plant.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Plant</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Type" value={type} onChangeText={setType} />
      <TextInput style={styles.input} placeholder="Watering Frequency" value={wateringFrequency} onChangeText={setWateringFrequency} keyboardType="numeric" />
      {/* TODO: Add photo picker */}
      <Button title="Add Plant" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 12, borderRadius: 6 },
});
