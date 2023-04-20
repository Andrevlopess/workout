import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity, Text, View } from "react-native";

export function WorkoutCard({ workout, navigation }) {

  return (
      <TouchableOpacity
      onPress={() => navigation.navigate("WorkoutDetail", { workout })}
      activeOpacity={0.9}
      className="py-5 px-4 justify-between items-center flex-row shadow-2xl border-b-2 border-b-white "
    >
      <View className="p-2 w-4/5">
        <Text className="text-white text-2xl font-bold">{workout.title}</Text>
        {!!workout.exercises.length && (
          <Text className="italic text-white text-lg font-bold">
            {`${workout.exercises.length} exercícios`}
          </Text>
        )}
      </View>
      <Icon name="ios-chevron-forward" color="#fff" size={40} />
    </TouchableOpacity>
  );
}
