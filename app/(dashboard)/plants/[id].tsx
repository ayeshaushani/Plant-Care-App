// app/(dashboard)/plants/[id].tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, Button, Alert, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getAuth } from "firebase/auth";
import { plantService } from "@/services/plantService";
import { Plant } from "@/types/plant";

const PlantDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const userId = getAuth().currentUser?.uid;

  const [plant, setPlant] = useState<Plant | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");

  useEffect(() => {
    if (!userId || !id) return;

    const fetchPlant = async () => {
      const data = await plantService.getPlant(userId, id);
      if (data) {
        setPlant(data);
        setName(data.name);
        setType(data.type);
        setWateringFrequency(data.wateringFrequency.toString());
      }
    };

    fetchPlant();
  }, [userId, id]);

  const handleUpdate = async () => {
    if (!userId || !id) return;

    try {
      await plantService.updatePlant(userId, id, {
        name,
        type,
        wateringFrequency: Number(wateringFrequency),
      });
      Alert.alert("Success", "Plant updated successfully!");
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  const handleDelete = async () => {
    if (!userId || !id || !plant?.photoUrl) return;

    Alert.alert("Delete Plant", `Are you sure you want to delete "${plant.name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await plantService.deletePlant(userId, id, plant.photoUrl);
            router.back(); // go back to plant list
          } catch (err) {
            console.log("Delete error:", err);
          }
        },
      },
    ]);
  };

  if (!plant) {
    return (
      <View style={styles.container}>
        <Text>Loading plant...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: plant.photoUrl }} style={styles.photo} />

      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Type:</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} />

      <Text style={styles.label}>Watering Frequency (days):</Text>
      <TextInput
        style={styles.input}
        value={wateringFrequency}
        onChangeText={setWateringFrequency}
        keyboardType="numeric"
      />

      <Button title="Update Plant" onPress={handleUpdate} color="#4CAF50" />
      <View style={{ height: 10 }} />
      <Button title="Delete Plant" onPress={handleDelete} color="red" />
    </View>
  );
};

export default PlantDetail;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  photo: { width: "100%", height: 200, borderRadius: 8, marginBottom: 16 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
});
