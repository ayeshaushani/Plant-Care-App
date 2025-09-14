import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { createReminder, getReminderById, updateReminder } from "@/services/reminderService"
import { useLoader } from "@/context/LoaderContext"
import { useAuth } from "@/context/AuthContext"
//import DateTimePicker from "@react-native-community/datetimepicker";

const ReminderFormScreen = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const { id } = useLocalSearchParams<{ id?: string }>()
  const isNew = !id || id === "new"

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const router = useRouter()
  const { showLoader, hideLoader } = useLoader()
  const { user } = useAuth()
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null) // ✅ FIX

  useEffect(() => {
    const loadReminder = async () => {
      if (!isNew && id) {
        try {
          showLoader()
          const reminder = await getReminderById(id)
          if (reminder) {
            setTitle(reminder.title)
            setDescription(reminder.description || "")
          }
        } catch (error) {
          console.error("Failed to load reminder", error)
        } finally {
          hideLoader()
        }
      }
    }
    loadReminder()
  }, [id])

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Title is required")
      return
    }

    try {
      showLoader()
      if (isNew) {
        await createReminder({
      title,
      description,
      date,              // mandatory in Reminder
      done: false,       // default value
      userId: user?.uid,
      plantId:selectedPlantId           // if plant specific reminder
    })
      } else {
        await updateReminder(id!, {   title,
      description,
      date,              // keep date updatable
      userId: user?.uid,
      plantId:selectedPlantId })
      }
      router.back()
    } catch (error) {
      console.error(`Error ${isNew ? "creating" : "updating"} reminder`, error)
      Alert.alert("Error", `Failed to ${isNew ? "create" : "update"} reminder`)
    } finally {
      hideLoader()
    }
  }

  return (
    <View className="flex-1 w-full p-5">
      <Text className="text-2xl font-bold">
        {isNew ? "Add Reminder" : "Edit Reminder"}
      </Text>
      <TextInput
        placeholder="Title"
        className="border border-gray-400 p-2 my-2 rounded-md"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description"
        className="border border-gray-400 p-2 my-2 rounded-md"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity
        className="bg-green-500 rounded-md px-6 py-3 my-2"
        onPress={handleSubmit}
      >
        <Text className="text-xl text-white">
          {isNew ? "Add Reminder" : "Update Reminder"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ReminderFormScreen
