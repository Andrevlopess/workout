import { ActivityIndicator, Alert, Pressable, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";

export default ({ navigation, workout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteWorkout = useMutation({
    mutationFn: async (id) => await api.delete(`/deleteWorkout/${id}`),
  });


  if(deleteWorkout.isSuccess){
    Alert.alert('Treino Apagado', `O treino "${workout.title}" foi apagado.`, [
        {text: 'OK', onPress: () => navigation.push("Workouts")},
      ]);
  }

  return (
    <Animatable.View animation="fadeIn" className="flex-row">
      {isOpen && (
        <View className="flex-row">
          <Animatable.View animation="fadeIn" duration={500} delay={100}>
            <Pressable
              onPress={() => navigation.push("EditWorkout", {workout})}
              className="bg-white shadow-md rounded-full p-2 active:bg-violet-50"
            >
              <Icon name="md-create-outline" color="#1e1b4b" size={20} />
            </Pressable>
          </Animatable.View>
          <Animatable.View animation="fadeIn" duration={500} >
            <Pressable
              onPress={() => deleteWorkout.mutate(workout.id)}
              className="bg-white shadow-md rounded-full p-2 active:bg-violet-50 mx-2"
            >
              <Icon name="ios-trash-outline" color="#ef4444" size={20} />
            </Pressable>
          </Animatable.View>
        </View>
      )}
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="bg-white shadow-md rounded-full p-2 active:bg-violet-50"
      >
        <Icon name="pencil-sharp" color="#7c3aed" size={20} />
      </Pressable>
    </Animatable.View>
  );
};
