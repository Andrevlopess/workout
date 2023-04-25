import { View, Pressable, Text } from "react-native";
import { useContext, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../Contexts/AuthContext";
import { FlatList } from "native-base";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";

export default ({ navigation }) => {
  const { user, authLogout} = useContext(AuthContext);
  const [workouts, setWorkouts] = useState(null);

  const authorId = user.id;

  const { isLoading } = useQuery(
    ["workouts", authorId],
    async () => await api.get(`getWorkouts/${authorId}`),
    {
      onSuccess: (data) => {
        setWorkouts(data.data);
      },
    }
  );


  return (
    <View className="px-4 pt-16">
      <View className="bg-violet-600 h-44 w-full z-0 absolute top-0 -scale-150" />
      <View className="flex-row items-center mb-10">
        <Pressable onPress={() => navigation.push("Home")} className="absolute">
          <Icon name="ios-chevron-back-sharp" color="#fff" size={40} />
        </Pressable>
        <Text className="text-white font-bold text-4xl text-center mx-auto ">
          Perfil
        </Text>
      </View>
      <View className="bg-violet-700 rounded-lg p-10">
        <View>
          <Text className="text-white opacity-70  font-bold italic text-xl">
            Nome
          </Text>
          <Text className="text-white ml-2 font-bold text-2xl">
            {user.name}
          </Text>
        </View>
        <View className="my-2">
          <Text className="text-white opacity-70  font-bold italic text-xl">
            Email
          </Text>
          <Text className="text-white ml-2 font-bold text-xl">
            {user.email}
          </Text>
        </View>
        <View className="mt-2">
          <Text className="text-white opacity-70  font-bold italic text-xl">
            Meus treinos
          </Text>

          <FlatList
            className="h-56 my-10"
            data={workouts}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.push("WorkoutDetail", { item })}
                className="bg-violet-600 my-2 rounded-xl items-center flex-row active:bg-violet-400 p-4 justify-between"
              >
                <Text className="text-white text-xl font-bold">
                  {item.title}
                </Text>
                <Icon name="ios-chevron-forward" color="#fff" size={30} />
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View className="flex-row ">
            <Pressable
             onPress={() => {authLogout()}}
            className="bg-violet-600 my-4 rounded-xl mr-1 flex-1 items-center justify-center active:bg-violet-400 p-4">
                <Text className="text-white text-xl font-bold">
                    Sair
                </Text>
            </Pressable>
            <Pressable className="bg-violet-600 my-4 flex-2 ml-1 rounded-xl items-center justify-center active:bg-violet-400 p-4">
                <Text className="text-white text-xl font-bold">
                    Apagar Conta
                </Text>
            </Pressable>
        </View>
      </View>
    </View>
  );
};