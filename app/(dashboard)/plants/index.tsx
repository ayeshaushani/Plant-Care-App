// app/(dashboard)/plants/index.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { plantService } from "@/services/plantService";
import { Plant } from "@/types/plant";
import { getAuth } from "firebase/auth";

const PlantList = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const router = useRouter();
  const userId = getAuth().currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    // Real-time listener for plants
    const unsubscribe = plantService.getPlants(userId, setPlants);
    return () => unsubscribe();
  }, [userId]);

  const handleDelete = (plant: Plant) => {
    if (!userId || !plant.id || !plant.photoUrl) return;

    Alert.alert("Delete Plant", `Are you sure you want to delete "${plant.name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await plantService.deletePlant(userId, plant.id!, plant.photoUrl);
          } catch (err) {
            console.log("Delete error:", err);
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Plant }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (!item.id) return; // safety check
        router.push({
          pathname: "/(dashboard)/plants/[id]",
          params: { id: item.id! }, // ✅ assert id exists
        });
      }}
    >
      <Image source={{ uri: item.photoUrl }} style={styles.photo} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.type}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {plants.length === 0 ? (
        <Text style={styles.empty}>No plants yet. Add some!</Text>
      ) : (
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id!}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default PlantList;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  photo: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  type: { fontSize: 14, color: "#555" },
  delete: { color: "red", fontWeight: "bold", padding: 8 },
  empty: { textAlign: "center", marginTop: 50, fontSize: 16, color: "#555" },
});
