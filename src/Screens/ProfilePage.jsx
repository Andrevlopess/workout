import { View, Pressable, Text, ActivityIndicator } from "react-native";
import { useContext, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../Contexts/AuthContext";
import { FlatList } from "native-base";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import DeleteAccountModal from "../Components/DeleteAccountModal";

export default ({ navigation }) => {
  const { user, authLogout } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
      <View className="flex-row items-center mb-16">
        <Pressable onPress={() => navigation.push("Home")} className="absolute">
          <Icon name="ios-chevron-back-sharp" color="#fff" size={40} />
        </Pressable>
        <Text className="text-white font-bold text-4xl text-center mx-auto ">
          Perfil
        </Text>
      </View>
      <View className="bg-violet-700 rounded-lg p-10 h-5/6 justify-between">
        <View>
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
        </View>

        {!!workouts.length ? (
          <View className="mt-2">
            <Text className="text-white opacity-70 font-bold italic text-xl">
              Meus treinos
            </Text>
            {isLoading ? (
              <ActivityIndicator size={20} color="#fff" />
            ) : (
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
            )}
          </View>
        ) : (
          <View className="my-10">
             <Text className="text-white text-xl font-bold text-center mb-6">
                Você ainda não tem nenhum treino!
              </Text>
            <Pressable 
            onPress={() => navigation.navigate("NewWorkout")}
            className="bg-violet-400 p-5 items-center justify-center rounded-sm">
              <Text className="text-white text-xl font-bold">
                Adicione novos treinos
              </Text>
            </Pressable>
          </View>
        )}

        <View className="flex-row ">
          <Pressable
            onPress={() => {
              authLogout();
            }}
            className="bg-violet-600 my-4 rounded-sm mr-1 flex-1 items-center justify-center active:bg-violet-400 p-4"
          >
            <Text className="text-white text-xl font-bold">Sair</Text>
          </Pressable>
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            className="bg-violet-600 my-4 flex-2 ml-1 rounded-sm items-center justify-center active:bg-violet-400 p-4"
          >
            <Text className="text-white text-xl font-bold">Apagar Conta</Text>
          </Pressable>
          <DeleteAccountModal
            modalVisible={modalVisible}
            closeModal={setModalVisible}
            user={user}
          />
        </View>
      </View>
    </View>
  );
};
