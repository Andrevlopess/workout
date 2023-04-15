import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  Input,
  Pressable,
  Switch,
  Text,
} from "native-base";
import { useContext } from "react";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { WorkoutContext } from "../../Contexts/WorkoutContext";
import NewExerciseForm from "../Components/WorkoutForms/NewExerciseForm";
import NewWorkoutForm from "../Components/WorkoutForms/NewWorkoutForm";

export default ({ navigation, route }) => {
  const { newExercise, newWorkout, workout } = route.params;

  console.log(newExercise, newWorkout);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
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
              Novo treino
            </Text>
          </Box>

          {newExercise && <NewExerciseForm workout={workout}/>}
          {newWorkout && <NewWorkoutForm />}
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
