import { Box, Pressable, Text } from "native-base";
import { useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import { WorkoutCard } from "../Components/WorkoutCard";
import { WorkoutContext } from "../../Contexts/WorkoutContext";
import { FlatList } from "react-native";
import { ExerciseCard } from "../Components/ExerciseCard";
import { AuthContext } from "../../Contexts/AuthContext";

export default ({ route, navigation }) => {
  const { workouts } = route.params;

  const {getWorkouts} = useContext(WorkoutContext)
  const {user} = useContext(AuthContext)

  useEffect(()=> {
    getWorkouts(user.id)
  }, [])

  const exercises = workouts.exercises;

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
          {workouts.title}
        </Text>
      </Box>
      <Pressable onPress={()=> navigation.navigate("NewWorkout", {
        newExercise: true,
        workout: workouts
        })}>
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
          Adicionar exercícios
        </Text>
      </Box>
      </Pressable>

      <FlatList
        data={exercises}
        renderItem={({ item }) => <ExerciseCard exercise={item} />}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};
