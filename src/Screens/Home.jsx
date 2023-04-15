import { Avatar, Box, Pressable, Text } from "native-base";
import { TextInput, View } from "react-native";
import Calendar from "../Components/Calendar";
import {useContext} from 'react'
import { AuthContext } from "../../Contexts/AuthContext";
 
export default ({ navigation }) => {

  const {authLogout} = useContext(AuthContext)

  return (
    <Box flex={1} padding={3} paddingBottom={5} bgColor="white">
      <Box
        paddingY={8}
        paddingX={2}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Text color="#000" fontSize="3xl">
          Olá, André
        </Text>
        <Pressable onPress={()=> authLogout()}>
          <Avatar
          source={{
            uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
          }}
        />
        </Pressable>
        
      </Box>

      <Box flex={1}>
        <Pressable onPress={() =>  navigation.navigate("Workouts")}
          bgColor="white"
          flex={2}
          marginY={2}
          padding={10}
          borderWidth={1.5}
          rounded="sm"
          borderColor="#ccc"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="black" fontSize="2xl" style={{ fontWeight: "bold" }}>
            Meus treinos
          </Text>
        </Pressable>

      </Box>
    </Box>
  );
};
