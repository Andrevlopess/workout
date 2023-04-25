import { useContext, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { WorkoutCard } from "../Components/WorkoutCard";
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
    ["workouts", authorId],
    async () => await api.get(`getWorkouts/${authorId}`),
    {onSuccess: (data) => {
     setWorkouts(data.data)
    }}
  )

  if(isLoading) return <Loading/>

  return (
    <View className="flex-1 bg-violet-600 pt-14 pb-6">
        <View className="flex-row justify-between items-center mb-8 px-4">
        <Pressable onPress={() => navigation.push("Home")}>
            <Icon name="ios-chevron-back-sharp" color="#fff" size={40} />
          </Pressable>
          <Text className="text-white font-bold text-4xl">
           Meus treinos
          </Text>
          <Pressable
            onPress={() =>
              navigation.push("NewWorkout")
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
          data={workouts}
          renderItem={({ item }) => (
            <WorkoutCard workout={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
        />
  
    </View>
  );
};
