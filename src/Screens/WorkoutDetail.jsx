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
    <View className="flex-1 bg-white px-4 pt-14 pb-6">
   <View className="bg-violet-100 h-1/5 w-full z-0 absolute rotate-3 -scale-150" />
    
        <View className="flex-row justify-between items-center mb-12">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="ios-chevron-back-sharp" color="#fff" size={40} />
          </Pressable>
          <Text className="text-white font-bold text-4xl">
            {workouts.title}
          </Text>
          <Pressable
            onPress={() =>
              navigation.push("NewExercise", {
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
  );
};
