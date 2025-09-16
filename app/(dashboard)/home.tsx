import { useRouter } from "expo-router";
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



const Home = () => {
  const router = useRouter();
  const navigation = require('@react-navigation/native').useNavigation();

  // Sample data for plants and tasks
  const plants = [
    { id: 1, name: 'Monstera', nextWatering: 'Tomorrow', health: 'Good' },
    { id: 2, name: 'Snake Plant', nextWatering: 'In 3 days', health: 'Excellent' },
    { id: 3, name: 'Fiddle Leaf', nextWatering: 'Today', health: 'Needs Care' },
  ];

  const tasks = [
    { id: 1, plant: 'Fiddle Leaf', task: 'Watering', time: '10:00 AM', completed: false },
    { id: 2, plant: 'Monstera', task: 'Fertilize', time: '2:00 PM', completed: true },
    { id: 3, plant: 'Snake Plant', task: 'Rotate', time: '4:30 PM', completed: false },
  ];
  

  return (
    <View style={[styles.container, {flex: 1}]}> 
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Plant Parent!</Text>
          <Text style={styles.date}>Wednesday, June 12</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileInitial}>P</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Plants</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Due Today</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Healthy</Text>
          </View>
        </View>
        {/* Today's Tasks */}
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.tasksContainer}>
          {tasks.map(task => (
            <View key={task.id} style={[styles.taskCard, task.completed && styles.completedTask]}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskPlant}>{task.plant}</Text>
                <Text style={styles.taskType}>{task.task}</Text>
                <Text style={styles.taskTime}>{task.time}</Text>
              </View>
              <TouchableOpacity style={[styles.taskButton, task.completed && styles.completedButton]}>
                <Text style={styles.taskButtonText}>
                  {task.completed ? 'Done' : 'Mark Done'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {/* Your Plants */}
        <Text style={styles.sectionTitle}>Your Plants</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.plantsScroll}>
          {plants.map(plant => (
            <View key={plant.id} style={styles.plantCard}>
              <View style={styles.plantImagePlaceholder}>
                <Text style={styles.plantEmoji}>🌿</Text>
              </View>
              <Text style={styles.plantName}>{plant.name}</Text>
              <View style={styles.wateringInfo}>
                <Text style={styles.wateringText}>Water {plant.nextWatering}</Text>
              </View>
              <View style={[
                styles.healthStatus,
                plant.health === 'Excellent' ? styles.healthExcellent :
                plant.health === 'Good' ? styles.healthGood :
                styles.healthNeedsCare
              ]}>
                <Text style={styles.healthText}>{plant.health}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    
       
    
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('AddPlant')}
            >
              <Text style={styles.actionEmoji}>📝</Text>
              <Text style={styles.actionText}>Add Plant</Text>
            </TouchableOpacity>
          
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('UserSearch')}
            >
              <Text style={styles.actionEmoji}>🔍</Text>
              <Text style={styles.actionText}>User Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('UserList')}
            >
              <Text style={styles.actionEmoji}>📊</Text>
              <Text style={styles.actionText}>Status</Text>
            </TouchableOpacity>
          </View>
        </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9F4',
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
  },
  date: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 15,
  },
  tasksContainer: {
    marginBottom: 25,
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  completedTask: {
    opacity: 0.7,
    backgroundColor: '#F1F8E9',
  },
  taskInfo: {
    flex: 1,
  },
  taskPlant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  taskType: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  taskTime: {
    fontSize: 14,
    color: '#E67E22',
    marginTop: 4,
    fontWeight: '500',
  },
  taskButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
  },
  completedButton: {
    backgroundColor: '#7CB342',
  },
  taskButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  plantsScroll: {
    marginBottom: 25,
  },
  plantCard: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  plantImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  plantEmoji: {
    fontSize: 40,
  },
  plantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  wateringInfo: {
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
  wateringText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
  },
  healthStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  healthExcellent: {
    backgroundColor: '#E8F5E9',
  },
  healthGood: {
    backgroundColor: '#FFF8E1',
  },
  healthNeedsCare: {
    backgroundColor: '#FFEBEE',
  },
  healthText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F8F9F4',
    borderTopWidth: 1,
    borderColor: '#eee',
    zIndex: 10,
  },
  actionButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 12,
    color: '#2C3E50',
    fontWeight: '500',
  },
});
