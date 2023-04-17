import { WorkoutContext } from "../../Contexts/WorkoutContext";
import { View, Text, TouchableOpacity } from "react-native";

export function ExerciseCard({ exercise, navigation }) {

  return (
    <View className="bg-violet-200 my-2 p-2 justify-between items-center rounded-xl shadow-2xl">
      <View className="bg-violet-600 p-2 mb-2 justify-center items-center rounded-lg w-full">
        <Text className="text-white font-bold text-2xl">{exercise.title}</Text>
      </View>

      <View className="flex-row justify-center items-center">
        <View className="bg-violet-600 p-2 justify-center items-center rounded-lg flex-1">
          <Text className="text-white font-bold text-xl">{exercise.reps}</Text>
        </View>
        <View className="bg-violet-600 p-2 w-1/2 justify-center items-center rounded-lg ml-2 flex-2">
          <Text className="text-white font-bold text-xl">{exercise.targetMuscle}</Text>
        </View>
      </View>
    </View>
  );
}
