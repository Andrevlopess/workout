import { View, Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

export default ({ navigation }) => {
  
  const { user } = useContext(AuthContext);

  return (
    <View className="flex-1 bg-white">
      <View className="bg-violet-600 h-1/5 w-full z-0 absolute -scale-150" />
      <View className="px-6 py-12">
        <View className="flex-row justify-between items-center mb-12">
          <Text className="text-white font-bold text-4xl">{`Olá, ${user.name}`}</Text>
          <Pressable
          onPress={() => navigation.navigate("ProfilePage")}
          >
          <Icon name="user" color="#fff" size={30} />
          </Pressable>
        </View>
        <Pressable
          onPress={() => navigation.push("Workouts")}
          className="bg-violet-200 py-14 px-8 justify-center items-center rounded-xl active:bg-violet-800"
        >
          <Text className="text-white text-4xl font-bold">Meus treinos</Text>
        </Pressable>
      </View>
      </View>
  );
};
