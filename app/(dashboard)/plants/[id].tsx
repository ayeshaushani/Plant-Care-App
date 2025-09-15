import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, TextInput, FlatList } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Reminder } from "@/types/reminder"
import { createReminder } from "@/services/reminderService"
import { useLoader } from "@/context/LoaderContext"
import { useAuth } from "@/context/AuthContext"
import { Plant } from "@/types/plant"


export default function ReminderForm() {
  const { user } = useAuth()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date())
  const [plants, setPlants] = useState<Plant[]>([])
  const [selectedPlantId, setSelectedPlantId] = useState<string | undefined>(undefined)
  const [showDatePicker, setShowDatePicker] = useState(false)

  // Load user's plants
  useEffect(() => {
    const fetchPlants = async () => {
      if (!user) return
      const data = await (user.uid)
     // setPlants(data)
    }
    fetchPlants()
  }, [user])

  const handleSave = async () => {
    if (!user || !selectedPlantId) return alert("Select a plant first!")
    await createReminder({
      title,
      description,
      userId: user.uid,
      date,
      plantId: selectedPlantId
    })
    alert("Reminder saved!")
    setTitle("")
    setDescription("")
    setSelectedPlantId(undefined)
    setDate(new Date())
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter reminder title"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter reminder description"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Select Plant</Text>
      <FlatList
        data={plants}
        keyExtractor={(item, index) => item.id ?? index.toString()}

        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedPlantId(item.id)}
            style={{
              padding: 10,
              margin: 5,
              borderWidth: 1,
              borderColor: selectedPlantId === item.id ? "green" : "#ccc"
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Text>Date: {date.toDateString()}</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: "blue", marginBottom: 10 }}>Pick Date</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false)
            if (selectedDate) setDate(selectedDate)
          }}
        />
      )}

      <TouchableOpacity
        onPress={handleSave}
        style={{ backgroundColor: "green", padding: 10, marginTop: 20 }}
      >
        <Text style={{ color: "white" }}>Save Reminder</Text>
      </TouchableOpacity>
    </View>
  )
}
