import { Box, Center, Text } from "native-base";
import { Pressable } from "react-native";
import React from "react";

function ExerciseCard({ exercise, nav }) {
  return (
    <Box px={3}>
      <Pressable>
        <Box
          w="full"
          bgColor="#fff"
          my={3}
          borderRadius="3xl"
          py={2}
          px={4}
          shadow="teste"
        >
          <Text fontSize="2xl" fontWeight="bold" color="#000">
            {exercise.name}
          </Text>
          <Center
            rounded="full"
            bgColor={"#ccc"}
            alignSelf="flex-start"
            py={1}
            px={2.5}
            my={2}
          >
            <Text color="#000" fontStyle={"italic"} fontWeight="bold">
              {exercise.repetitions}
            </Text>
          </Center>
        </Box>
      </Pressable>
    </Box>
  );
}
export default ExerciseCard;
