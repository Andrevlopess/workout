import { useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { WorkoutContext } from "../../Contexts/WorkoutContext";
import { FlatList, Text, View, Pressable } from "react-native";
import { ExerciseCard } from "../Components/ExerciseCard";
import { AuthContext } from "../../Contexts/AuthContext";

export default ({ route, navigation }) => {
  const { workouts } = route.params;

  const { getWorkouts } = useContext(WorkoutContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getWorkouts(user.id);
  }, []);

  const exercises = workouts.exercises;

  return (
    <View className="flex-1 bg-white">
      <View className="bg-violet-100 h-1/2 w-full rounded-full scale-175 -translate-y-40 z-0 absolute" />
      <View className="px-4 py-12">
        <View className="flex-row justify-between items-center mb-12">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="ios-chevron-back-sharp" color="#fff" size={40} />
          </Pressable>
          <Text className="text-white font-bold text-4xl">
            {workouts.title}
          </Text>
          <Pressable
            onPress={() =>
              navigation.push("NewWorkout", {
                newExercise: true,
                workout: workouts,
              })
            }
          >
            <Icon name="md-add-sharp" color="#fff" size={40} />
          </Pressable>
        </View>

        <View className="flex-row items-center mb-4">
          <Text className="text-white text-xl font-semibold mr-2">
            Ordenar por
          </Text>
          <Icon name="chevron-down" color="#fff" size={25} />
        </View>
        <FlatList
          data={exercises}
          renderItem={({ item }) => <ExerciseCard exercise={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};
