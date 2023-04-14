import { Badge, Box, Text } from "native-base";
import { useContext } from "react";
import { WorkoutContext } from "../../Contexts/WorkoutContext";
import { FlatList, Pressable } from "react-native";

export function ExerciseCard({ exercise, navigation }) {
  console.log(exercise);

  return (
    <Pressable>
      <Box
        borderWidth={1}
        padding={3}
        borderColor="#ccc"
        rounded="lg"
        marginY={2.5}
        bgColor="indigo.600"
        shadow="5"
      >
        <Text fontSize="2xl" marginBottom={4} style={{ fontWeight: "bold" }}>
          {exercise.title}
        </Text>

        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box bgColor="indigo.400" padding={3} rounded="lg" shadow={3} flex={1} marginX={1} alignItems='center'>
            <Text
              style={{ fontWeight: "bold", fontStyle: "italic" }}
            >
              {exercise.reps}
            </Text>
          </Box>

          <Box bgColor="indigo.400" padding={3} rounded="lg" shadow={3}>
            <Text style={{ fontWeight: "bold" }}>{exercise.targetMuscle}</Text>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
}
