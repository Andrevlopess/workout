import {
  Box,
  StatusBar,
  Text,
  Input,
  Pressable,
  FormControl,
} from "native-base";
import { Button, TouchableOpacity, Alert } from "react-native";
import { useContext, useState } from "react";
import { SafeAreaView } from "react-native";
import { Formik } from "formik";
import { AuthContext } from "../../Contexts/AuthContext";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/Feather";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email Inválido!").required("Campo Obrigatório"),
  password: Yup.string().required("Campo Obrigatório"),
});

export default ({ navigation }) => {
  const { authLogin, errors } = useContext(AuthContext);

  const [show, setShow] = useState(false);

  if (errors) {
    Alert.alert(errors.title, errors.message);
  }

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
            email: "andrellopes021@gmail.com",
            password: "senha123",
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
            touched,
            errors,
          }) => (
            <>
              <Box>
                <FormControl
                  isInvalid={
                    errors.email && touched.email && errors ? true : false
                  }
                >
                  <Input
                    variant="underlined"
                    placeholder="Email"
                    fontSize="lg"
                    color="black"
                    marginBottom={touched.email && errors.email ? 0 : 5}
                    fontWeight="semibold"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    InputLeftElement={
                      <Icon
                        name={"user"}
                        size={20}
                        color="#111"
                        style={{ marginLeft: 4, marginRight: 5 }}
                      />
                    }
                  />
                  <FormControl.ErrorMessage
                    leftIcon={
                      <Icon name="alert-circle" color="red" size={14} />
                    }
                  >
                    {errors.email}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.password && touched.password ? true : false}
                >
                  <Input
                    variant="underlined"
                    placeholder="Senha"
                    fontSize="lg"
                    color="black"
                    marginBottom={touched.password && errors.password ? 0 : 5}
                    fontWeight="semibold"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    type={show ? "text" : "password"}
                    InputRightElement={
                      <Pressable marginRight={4} onPress={() => setShow(!show)}>
                        <Icon
                          name={show ? "eye" : "eye-off"}
                          size={20}
                          color="#111"
                        />
                      </Pressable>
                    }
                    InputLeftElement={
                      <Icon
                        name="lock"
                        color="black"
                        size={20}
                        style={{ marginLeft: 4, marginRight: 5 }}
                      />
                    }
                  />
                  <FormControl.ErrorMessage
                    paddingBottom={4}
                    leftIcon={
                      <Icon name="alert-circle" color="red" size={14} />
                    }
                  >
                    {errors.password}
                  </FormControl.ErrorMessage>
                </FormControl>
                <TouchableOpacity activeOpacity={0.7}>
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
                </TouchableOpacity>

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
