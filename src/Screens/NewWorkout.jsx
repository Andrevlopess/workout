import {
  Box,
  Divider,
  FormControl,
  Input,
  Pressable,
  Switch,
  Text,
} from "native-base";
import {useContext} from 'react'
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

    const {newWorkout} = useContext(WorkoutContext)

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

          {false && (
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
                <Box>
                  <Text color="#000" fontSize="lg" style={{ fontWeight: 500 }}>
                    Nome do exercício
                  </Text>
                  <Input
                    variant="underlined"
                    placeholder="Ex.: Agachamento livre"
                    fontSize="lg"
                    color="black"
                    fontWeight="semibold"
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
                      placeholder="Ex.: Agachamento livre"
                      fontSize="lg"
                      color="black"
                      fontWeight="semibold"
                    />
                  </Box>
                  <Box marginY={3} justifyContent="center" alignItems="center">
                    <Text
                      color="#000"
                      fontSize="lg"
                      style={{ fontWeight: 500 }}
                    >
                      Peso Livre
                    </Text>
                    <Switch
                      size="lg"
                      offTrackColor="indigo.100"
                      onTrackColor="indigo.200"
                      onThumbColor="indigo.500"
                      offThumbColor="indigo.100"
                    />
                  </Box>
                </Box>

                <Pressable
                  justifyContent="center"
                  alignItems="center"
                  bgColor="indigo.600"
                  rounded="md"
                  p={8}
                >
                  <Text fontSize="lg" style={{ fontWeight: "bold" }}>
                    Adicionar
                  </Text>
                </Pressable>
              </Box>
            </Box>
          )}
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
