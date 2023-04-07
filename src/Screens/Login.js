import { Box, StatusBar, Text, Input, Pressable } from "native-base";
import { TouchableOpacity } from "react-native";
import { useContext } from "react";
import { SafeAreaView } from "react-native";
import { Formik } from "formik";
import { AuthContext } from "../../Contexts/AuthContext";
import * as Yup from "yup";


const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email Inválido!").required("Campo Obrigatório"),
  password: Yup.string().required("Campo Obrigatório"),

});

export default ({ navigation }) => {
  
  const { authLogin } = useContext(AuthContext);

  return (
    <Box padding={3} flex={1}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text color="black" fontSize="5xl" fontWeight="bold">
          Workout
        </Text>
      </Box>
      <Box flex={2} justifyContent="flex-end" py={5}>
        <Text color="black" fontSize="5xl" fontWeight="bold" py={5}>
          Olá,
        </Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values, { resetForm }) => {
            authLogin(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
          }) => (
            <>
              <Box>
                <Input
                  variant="underlined"
                  placeholder="Email"
                  fontSize="lg"
                  color="black"
                  marginBottom={5}
                  fontWeight="semibold"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                <Input
                  variant="underlined"
                  placeholder="Senha"
                  fontSize="lg"
                  color="black"
                  fontWeight="semibold"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <Pressable
                  justifyContent="center"
                  alignItems="center"
                  bgColor="indigo.600"
                  rounded="sm"
                  p={8}
                  marginY={5}
                  onPress={handleSubmit}
                >
                  <Text fontSize="xl" fontWeight="bold">
                    Entrar
                  </Text>
                </Pressable>

                <Pressable
                  alignItems="center"
                  onPress={() => navigation.navigate("SignUp")}
                >
                  <Text color="gray.800" fontWeight="bold">
                    Registrar-se
                  </Text>
                </Pressable>
              </Box>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
