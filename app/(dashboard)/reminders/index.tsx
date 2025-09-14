import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native"
import { useEffect, useState } from "react"
import {
  deleteReminder,
  getAllReminder,
  getReminders,
  remindersRef
} from "@/services/reminderService"
import { MaterialIcons } from "@expo/vector-icons"
import { useRouter, useSegments } from "expo-router"
import { Reminder } from "@/types/reminder"
import { useLoader } from "@/context/LoaderContext"
import { onSnapshot } from "firebase/firestore"

const ReminderScreen = () => {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const router = useRouter()
  const { showLoader, hideLoader } = useLoader()

  const handleFetchData = async () => {
    try {
      showLoader()
      // const data = await getReminders() // returns array axios get
      const data = await getAllReminder() // firebase get all
      console.log(data)
      setReminders(data)
    } catch (error) {
      console.log("Error fetching:", error)
    } finally {
      hideLoader()
    }
  }

  const segment = useSegments()

  // useEffect(() => {
  //   handleFetchData()
  // }, [segment])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      remindersRef,
      (snapshot) => {
        const allReminders = snapshot.docs.map(
          (d) => ({ id: d.id, ...d.data() }) as Reminder
        )
        setReminders(allReminders)
        hideLoader()
      },
      (err) => {
        console.log("Error listening:", err)
      }
    )

    return () => unsubscribe()
  }, [])

  const handleDelete = async (id: string) => {
    Alert.alert("Delete", "Are you sure want to delete ?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            showLoader()
            await deleteReminder(id)
            handleFetchData()
          } catch (err) {
            console.log("Error deleting reminder", err)
          } finally {
            hideLoader()
          }
        }
      }
    ])
  }

  return (
    <View className="flex-1 w-full">
      <Text className="text-4xl">Reminder Screen</Text>
      <View className="absolute bottom-5 right-5">
        <Pressable
          className="bg-blue-500 rounded-full p-5 shadow-lg"
          onPress={() => {
            router.push("/(dashboard)/reminders/new")
          }}
        >
          <MaterialIcons name="add" size={28} color="#fff" />
        </Pressable>
      </View>

      <ScrollView className="mt-4">
        {reminders.map((reminder) => {
          return (
            <View
              key={reminder.id}
              className="bg-gray-200 p-4 mb-3 rounded-lg mx-4 border border-gray-400"
            >
              <Text className="text-lg font-semibold">{reminder.title}</Text>
              <Text className="text-sm text-gray-700 mb-2">
                {reminder.description}
              </Text>

              <View className="flex-row">
                <TouchableOpacity
                  className="bg-yellow-300 px-3 py-1 rounded"
                  onPress={() =>
                    router.push(`/(dashboard)/reminders/${reminder.id}`)
                  }
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-red-500 px-3 py-1 rounded ml-3"
                  onPress={() => {
                    if (reminder.id) handleDelete(reminder.id)
                  }}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default ReminderScreen
