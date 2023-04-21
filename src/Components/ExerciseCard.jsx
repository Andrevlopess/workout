import { WorkoutContext } from "../../Contexts/WorkoutContext";
import { View, Text, TouchableOpacity } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';

export function ExerciseCard({ exercise, navigation }) {
  return (
      <View className=" border-b-2 border-b-white px-6 py-4 ">
      <View className="justify-between flex-row">
        <Text className="text-2xl text-white font-bold ">{exercise.title}</Text>
        <View className="border-2 px-3 py-1 bg-white border-white rounded-full shadow-2xl">
          <Text className="text-lg text-violet-700 font-bold ">
            {exercise.targetMuscle}
          </Text>
        </View>
      </View>
      <Text className="text-lg text-white font-semibold italic ">
        {exercise.reps}
      </Text>
    </View>
 
  );
}
