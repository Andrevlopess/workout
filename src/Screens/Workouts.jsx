import { useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { WorkoutCard } from "../Components/WorkoutCard";
import { WorkoutContext } from "../../Contexts/WorkoutContext";
import { View, Text, FlatList, Pressable } from "react-native";
import { AuthContext } from "../../Contexts/AuthContext";

export default ({ navigation }) => {
  const { workouts, getWorkouts, isLoading } = useContext(WorkoutContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getWorkouts(user.id);
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View className=" blur-md bg-violet-100 h-1/2 w-full rounded-full scale-175 -translate-y-40 z-0 absolute" />
      <View className="px-4 py-12">
        <View className="flex-row justify-between items-center mb-12">
        <Pressable onPress={() => navigation.goBack()}>
            <Icon name="ios-chevron-back-sharp" color="#fff" size={40} />
          </Pressable>
          <Text className="text-white font-bold text-4xl">
           Meus treinos
          </Text>
          <Pressable
            onPress={() =>
              navigation.push("NewWorkout", {
                newWorkout: true,
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
          data={workouts}
          renderItem={({ item }) => (
            <WorkoutCard workouts={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};
