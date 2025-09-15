import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native"
import { useEffect, useState } from "react"
import { MaterialIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { onSnapshot } from "firebase/firestore"
import { plantsRef, deletePlant } from "@/services/plantService"
import { Plant } from "@/types/plant"
import { useLoader } from "@/context/LoaderContext"

const PlantScreen = () => {
  const [plants, setPlants] = useState<Plant[]>([])
  const router = useRouter()
  const { showLoader, hideLoader } = useLoader()

  // Fetch plants from Firebase in realtime
  useEffect(() => {
    const unsubscribe = onSnapshot(
      plantsRef,
      (snapshot) => {
        const allPlants = snapshot.docs.map(
          (d) => ({ id: d.id, ...d.data() }) as Plant
        )
        setPlants(allPlants)
        hideLoader()
      },
      (err) => {
        console.log("Error fetching plants:", err)
      }
    )

    return () => unsubscribe()
  }, [])

  const handleDelete = async (id: string) => {
    Alert.alert("Delete", "Are you sure you want to delete this plant?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            showLoader()
            await deletePlant(id)
          } catch (err) {
            console.log("Error deleting plant:", err)
          } finally {
            hideLoader()
          }
        }
      }
    ])
  }

  return (
    <View className="flex-1 w-full">
      <Text className="text-4xl">My Plants</Text>

      {/* Floating Add Button */}
      <View className="absolute bottom-5 right-5">
        <Pressable
          className="bg-green-600 rounded-full p-5 shadow-lg"
          onPress={() => router.push("/")}
        >
          <MaterialIcons name="add" size={28} color="#fff" />
        </Pressable>
      </View>

      {/* Plant List */}
      <ScrollView className="mt-4">
        {plants.map((plant) => (
          <View
            key={plant.id}
            className="bg-gray-200 p-4 mb-3 rounded-lg mx-4 border border-gray-400"
          >
            <Text className="text-lg font-semibold">{plant.name}</Text>
            {plant.species && (
              <Text className="text-sm text-gray-700">{plant.species}</Text>
            )}
            {plant.description && (
              <Text className="text-sm text-gray-500 mb-2">
                {plant.description}
              </Text>
            )}

            <View className="flex-row">
              <TouchableOpacity
                className="bg-yellow-300 px-3 py-1 rounded"
                onPress={() =>
                  router.push(`/(dashboard)/plants/${plant.id}`)
                }
              >
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 px-3 py-1 rounded ml-3"
                onPress={() => plant.id && handleDelete(plant.id)}
              >
                <Text style={{ color: "#fff" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default PlantScreen
