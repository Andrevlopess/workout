import { Box, Center, Heading } from "native-base";
import { FlatList, SafeAreaView, ScrollView, StatusBar } from "react-native";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import ExerciseCard from "../Components/ExerciseCard";

export default ({ navigation, route }) => {
  const { workout } = route.params;

  return (
    <SafeAreaView>
      <StatusBar />
      <Box py={4}>
        <Box flexDirection="row" alignItems="center" p={3}>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <Icon size={40} name="chevron-left" color="#000" />
          </Pressable>
          <Heading size="xl" color="#000">
            {workout.title}
          </Heading>
        </Box>
        <Box px={3}>
          <Pressable>
            <Center
              w="full"
              bgColor="#fff"
              my={3}
              borderRadius="3xl"
              p={4}
              shadow="teste"
            >
              <Heading size="xl" color="#000">
                Começar
              </Heading>
            </Center>
          </Pressable>
        
            <FlatList
              data={workout.exercises}
              renderItem={(workout) => <ExerciseCard exercise={workout.item} />}
              keyExtractor={(workout) => workout.id}
            />
          
        </Box>
      </Box>
    </SafeAreaView>
  );
};
