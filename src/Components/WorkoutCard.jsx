import { Box, Center, Text } from "native-base";
import { Pressable } from "react-native";

export function WorkoutCard({ workout, nav }) {
  return (
    <Box px={3}>
      <Pressable onPress={() => nav.navigate("Workout", { workout })}>
        <Box w="full" bgColor="#fff" my={3} rounded="xl" p={2} shadow="teste">
          <Text fontSize="2xl" fontWeight="bold" color="#000">
            {workout.title}
          </Text>
          <Text
            color={"#474747"}
            fontSize="xl"
            fontWeight="bold"
            fontStyle="italic"
          >
            {`"${workout.description}"`}
          </Text>
          <Center
            rounded="full"
            bgColor={"#ccc"}
            alignSelf="flex-start"
            py={1}
            px={2.5}
            my={2}
          >
            <Text
              color="#000"
              fontStyle={"italic"}
              fontWeight="bold"
            >{`${workout.exercises.length} exercícios`}</Text>
          </Center>
        </Box>
      </Pressable>
    </Box>
  );
}
