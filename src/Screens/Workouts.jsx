import { useContext, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { WorkoutCard } from "../Components/WorkoutCard";
import { WorkoutContext } from "../../Contexts/WorkoutContext";
import { View, Text, FlatList, Pressable } from "react-native";
import { AuthContext } from "../../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { Loading } from "../Components/Loading";

export default ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState(null)

  const authorId = user.id

  const { isLoading } = useQuery(
    ["workouts"],
    async () => await api.get("getWorkouts", {authorId}),
    {onSuccess: (data) => {
     setWorkouts(data.data)
    }}
  )

  if(isLoading) return <Loading/>

  return (
    <View className="flex-1 bg-white px-4 pt-14 pb-6">
    <View className="bg-violet-100 h-1/5 w-full z-0 absolute rotate-3 -scale-150" />
        <View className="flex-row justify-between items-center mb-8">
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
  );
};
