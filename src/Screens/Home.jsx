import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

export default ({ navigation }) => {
  
  const { authLogout } = useContext(AuthContext);

  return (
    <View className="flex-1 bg-white">
      <View className="bg-violet-100 h-1/2 w-full rounded-full scale-175 -translate-y-40 z-0 absolute" />
      <View className="px-6 py-12">
        <View className="flex-row justify-between items-center mb-12">
          <Text className="text-white font-bold text-4xl">Olá, André</Text>
          <Icon name="user" color="#fff" size={30} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Workouts")}
          activeOpacity={0.9}
          className="bg-violet-200 py-14 px-8 justify-center items-center rounded-xl"
        >
          <Text className="text-white text-4xl font-bold">Meus treinos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
