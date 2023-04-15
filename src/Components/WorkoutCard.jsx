import { Box, Text } from "native-base";
import { useContext } from "react";
import { WorkoutContext } from "../../Contexts/WorkoutContext";
import { FlatList, Pressable } from "react-native";

export function WorkoutCard({ workouts, navigation }) {

  
  
  return (
    <Pressable
      onPress={() => navigation.push("WorkoutDetail", { workouts })}
    >
      <Box
        borderWidth={1}
        borderColor="#ccc"
        padding={3}
        rounded="lg"
        marginY={2.5}
        bgColor="indigo.600"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        shadow="5"
      >
        <Text padding={4} fontSize="2xl" style={{ fontWeight: "bold" }}>
          {workouts.title}
        </Text>
        <Text padding={4} fontSize="4xl" style={{ fontWeight: "bold" }}>
          {workouts.exercises.length}
        </Text>
      </Box>
    </Pressable>
  );
}
