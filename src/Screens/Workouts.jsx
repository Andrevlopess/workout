import { Box, Pressable, Skeleton, Text } from "native-base";
import { useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import { WorkoutCard } from "../Components/WorkoutCard";
import { WorkoutContext } from "../../Contexts/WorkoutContext";
import { FlatList } from "react-native";
import { AuthContext } from "../../Contexts/AuthContext";

export default ({ navigation }) => {

  const { workouts, getWorkouts, isLoading } = useContext(WorkoutContext);
  const { user } = useContext(AuthContext);

  useEffect(()=> {
    getWorkouts(user.id)
  }, [])


  return (
    <Box flex={1} padding={3} color="white">
      <Box
        paddingY={8}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={25} color="#000" />
        </Pressable>
        <Text
          marginX="auto"
          color="black"
          style={{ fontWeight: "bold" }}
          fontSize="2xl"
        >
          WORKOUTS
        </Text>
      </Box>
      <Pressable onPress={() => navigation.push("NewWorkout", {newWorkout: true})}>
         <Box
        borderWidth={1}
        borderColor="#ccc"
        padding={3}
        rounded="lg"
        marginY={2.5}
        bgColor="indigo.600"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        shadow="5"
      >
        <Text padding={4} fontSize="2xl" style={{ fontWeight: "bold" }}>
          Novo treino
        </Text>
      </Box>
      </Pressable>
     {isLoading ? 
         <FlatList
         data={Array.from({length: 5})}
         renderItem={() => (
          <Skeleton h="24" marginY={3} rounded="lg" startColor="indigo.300" endColor="indigo.500"/>
         )}
       />
     :
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <WorkoutCard workouts={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
     }

     
    </Box>
  );
};
