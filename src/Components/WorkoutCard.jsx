import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity, Text, View } from "react-native";

export function WorkoutCard({ workouts, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("WorkoutDetail", { workouts })}
      activeOpacity={0.9}
      className="bg-violet-200 my-2 py-5 px-4 justify-between items-center rounded-xl flex-row shadow-2xl"
    >
      <View className="p-2 w-4/5">
        <Text className="text-white text-2xl font-bold">{workouts.title}</Text>
        {!!workouts.exercises.length && (
          <Text className="italic text-white text-lg font-bold">
            {`${workouts.exercises.length} exercícios`}
          </Text>
        )}
      </View>
      <Icon name="ios-chevron-forward" color="#fff" size={40} />
    </TouchableOpacity>
  );
}
