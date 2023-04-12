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
import { Formik } from "formik";
import * as Yup from "yup";
import { WorkoutContext } from "../../Contexts/WorkoutContext";

const newWorkoutSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, "Titúlo muito grande")
    .required("Campo obrigatório"),
});

export default ({ navigation }) => {
  const { newWorkout, workout } = useContext(WorkoutContext);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      keyboardVerticalOffset={50}
      enabled
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
          {!workout && (
            <Formik
              initialValues={{
                title: "",
              }}
              validationSchema={newWorkoutSchema}
              onSubmit={(values, { resetForm }) => {
                newWorkout(values);
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
                  <Box
                    borderWidth={1}
                    borderColor="#ccc"
                    padding={3}
                    rounded="lg"
                    marginY={2.5}
                  >
                    <Text
                      textAlign="center"
                      padding={4}
                      color="#000"
                      fontSize="2xl"
                      style={{ fontWeight: "bold" }}
                    >
                      Criar novo treino
                    </Text>
                    <Box>
                      <Text
                        color="#000"
                        fontSize="lg"
                        style={{ fontWeight: 500 }}
                      >
                        Título do treino
                      </Text>
                      <FormControl isInvalid={touched.title && errors.title}>
                        <Input
                          variant="underlined"
                          placeholder="Ex.: Treino de Peito"
                          fontSize="lg"
                          color="black"
                          fontWeight="semibold"
                          value={values.title}
                          onChangeText={handleChange("title")}
                          onBlur={handleBlur("title")}
                        />
                        <FormControl.ErrorMessage
                          paddingBottom={4}
                          leftIcon={
                            <Icon name="alert-circle" color="red" size={14} />
                          }
                        >
                          {errors.title}
                        </FormControl.ErrorMessage>
                      </FormControl>
                    </Box>
                    <Pressable
                      onPress={handleSubmit}
                      justifyContent="center"
                      alignItems="center"
                      bgColor="indigo.600"
                      rounded="md"
                      p={8}
                      marginTop={5}
                    >
                      <Text fontSize="lg" style={{ fontWeight: "bold" }}>
                        Criar
                      </Text>
                    </Pressable>
                  </Box>
                </>
              )}
            </Formik>
          )}

          {true && (
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
                    needsMachine: false,
                  }}
                  validationSchema={newWorkoutSchema}
                  onSubmit={(values, { resetForm }) => {
                    console.log(values);
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
                        <Text
                          color="#000"
                          fontSize="lg"
                          style={{ fontWeight: 500 }}
                        >
                          Nome do exercício
                        </Text>
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
                      </Box>

                      <Box flexDirection="row">
                        <Box marginY={3} flex={1} paddingRight={2}>
                          <Text
                            color="#000"
                            fontSize="lg"
                            style={{ fontWeight: 500 }}
                          >
                            Repetições
                          </Text>
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
                        </Box>
                        <Box
                          marginY={3}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Text
                            color="#000"
                            fontSize="lg"
                            style={{ fontWeight: 500 }}
                          >
                            Peso Livre
                          </Text>
                          <Checkbox
                            defaultIsChecked
                            size="md"
                          />
                           
                        </Box>
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
          )}
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
