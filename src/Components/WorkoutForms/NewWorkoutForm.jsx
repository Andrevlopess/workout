import { Formik } from "formik";
import { useContext } from "react";
import { Box, FormControl, Input, Pressable, Text } from "native-base";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/Feather";
import { WorkoutContext } from "../../../Contexts/WorkoutContext";

const newWorkoutSchema = Yup.object().shape({
    title: Yup.string()
      .max(50, "Titúlo muito grande")
      .required("Campo obrigatório"),
  });

export default props => {
    
    const { newWorkout } = useContext(WorkoutContext);

    return(
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
    )
}