import { Formik } from "formik";
import { useContext } from "react";
import { Box, FormControl, Input, Pressable, Select, Text } from "native-base";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/Feather";
import { WorkoutContext } from "../../../Contexts/WorkoutContext";

const newExerciseSchema = Yup.object().shape({
  title: Yup.string()
    .trim("Não use espaços vazios")
    .max(50, "Nome muito grande")
    .required("Campo obrigatório"),
  reps: Yup.string()
    .trim("Não use espaços vazios")
    .max(30, "Nome muito grande")
    .required("Campo obrigatório"),
  targetMuscle: Yup.string().required("Escolha um Músculo Alvo"),
});

export default (props) => {

    const {newExercise} = useContext(WorkoutContext)

  return (
    <Box borderWidth={1} borderColor="#ccc" padding={3} rounded="lg">
      <Text
        textAlign="center"
        paddingTop={4}
        color="#000"
        fontSize="2xl"
        style={{ fontWeight: "bold" }}
      >
        Adicionar exercícios
      </Text>
      <Box>
        <Text
          color="#333"
          textAlign="center"
          fontSize="md"
          style={{ fontWeight: 500 }}
        >
          Adicione novos exercicios ao seu treino!
        </Text>
      </Box>
      <Box
        borderWidth={1}
        borderColor="#ccc"
        padding={3}
        rounded="lg"
        marginY={4}
      >
        <Formik
          initialValues={{
            title: "",
            reps: "",
            targetMuscle: "",
          }}
          validationSchema={newExerciseSchema}
          onSubmit={(values, { resetForm }) => {
            newExercise(values);
            resetForm();
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <>
              <Box>
                <Text color="#000" fontSize="lg" style={{ fontWeight: 500 }}>
                  Nome do exercício
                </Text>
                <FormControl isRequired isInvalid={errors.title}>
                  <Input
                    variant="underlined"
                    placeholder="Ex.: Agachamento livre"
                    fontSize="lg"
                    color="black"
                    fontWeight="semibold"
                    value={values.title}
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={
                      <Icon name="alert-circle" color="red" size={14} />
                    }
                  >
                    {errors.title}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>
              <Box marginTop={3} flex={1} paddingRight={2}>
                <Text color="#000" fontSize="lg" style={{ fontWeight: 500 }}>
                  Repetições
                </Text>
                <FormControl isRequired isInvalid={errors.targetMuscle}>
                  <Input
                    variant="underlined"
                    placeholder="Ex.: 4 x 12"
                    fontSize="lg"
                    color="black"
                    fontWeight="semibold"
                    value={values.reps}
                    onChangeText={handleChange("reps")}
                    onBlur={handleBlur("reps")}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={
                      <Icon name="alert-circle" color="red" size={14} />
                    }
                  >
                    {errors.reps}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>
              <Box marginY={3} justifyContent="center">
                <Text color="#000" fontSize="lg" style={{ fontWeight: 500 }}>
                  Músculo alvo
                </Text>
                <FormControl isRequired isInvalid={errors.targetMuscle}>
                  <Select
                    defaultValue=""
                    minWidth="full"
                    fontSize="md"
                    accessibilityLabel="Escolha o Músculo"
                    placeholder="Escolha o Músculo"
                    color="#000"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <Icon name="plus" color="green" size={25} />,
                    }}
                    mt={1}
                    onValueChange={handleChange("targetMuscle")}
                  >
                    <Select.Item label="Peitoral" value="Peitoral" />
                    <Select.Item label="Costas" value="Costas" />
                    <Select.Item label="Ombro" value="Ombro" />
                    <Select.Item label="Braços" value="Braços" />
                    <Select.Item label="Pernas" value="Pernas" />
                    <Select.Item label="Tronco" value="Tronco" />
                  </Select>
                  <FormControl.ErrorMessage
                    leftIcon={
                      <Icon name="alert-circle" color="red" size={14} />
                    }
                  >
                    {errors.targetMuscle}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>
              <Pressable
                justifyContent="center"
                alignItems="center"
                bgColor="indigo.600"
                rounded="md"
                p={8}
                onPress={handleSubmit}
              >
                <Text fontSize="lg" style={{ fontWeight: "bold" }}>
                  Adicionar
                </Text>
              </Pressable>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
