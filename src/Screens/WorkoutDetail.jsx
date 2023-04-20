import { useContext, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { WorkoutContext } from "../../Contexts/WorkoutContext";
import { FlatList, Text, View, Pressable } from "react-native";
import { ExerciseCard } from "../Components/ExerciseCard";
import { AuthContext } from "../../Contexts/AuthContext";
import { Loading } from "../Components/Loading";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";

export default ({ route, navigation }) => {
  const { workout } = route.params;

  const inWorkoutId = workout.id;

  const [exercises, setExercises] = useState(null);

  const { isLoading } = useQuery(
    ["Exercises"],
    async () => await api.get(`getExercises/${inWorkoutId}`),
    { onSuccess: (data) => setExercises(data.data) }
  );

  if (isLoading) return <Loading />;

  return (
    <View className="flex-1 bg-violet-600 pt-14 pb-6">
      <View className="flex-row justify-between px-4 items-center mb-12">
        <Pressable onPress={() => navigation.push("Workouts")}>
          <Icon name="ios-chevron-back-sharp" color="#fff" size={40} />
        </Pressable>
        <Text className="text-white font-bold text-4xl">{workout.title}</Text>
        <Pressable
          onPress={() =>
            navigation.push("NewExercise", {
              workout: workout,
            })
          }
        >
          <Icon name="md-add-sharp" color="#fff" size={40} />
        </Pressable>
      </View>

      <View className="flex-row items-center mb-4 px-4">
        <Text className="text-white text-xl font-semibold mr-2">
          Ordenar por
        </Text>
        <Icon name="chevron-down" color="#fff" size={25} />
      </View>
      <FlatList
        data={workout.exercises}
        renderItem={({ item }) => <ExerciseCard exercise={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
