import { Box, FormControl, Input, Pressable, Text } from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Nome Muito Curto!")
    .max(40, "Nome Muito Longo!")
    .required("Campo Obrigatório"),

  email: Yup.string().email("Email Inválido!").required("Campo Obrigatório"),

  password: Yup.string()
    .min(4, "Senha muito fraca!")
    .required("Campo Obrigatório"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas não correspondem!")
    .required("Campo Obrigatório"),
});

export default (props) => {
  const [show, setShow] = useState(false);

  const { createNewUser, errors } = useContext(AuthContext);

  if (errors) {
    Alert.alert(errors.title, errors.message);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      keyboardVerticalOffset={50}
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <Box padding={3} flex={1}>
          <Box flex={1} justifyContent="flex-end" py={5}>
            <Box>
              <Text
                marginY={40}
                color="black"
                fontSize="5xl"
                fontWeight="bold"
                textAlign="center"
              >
                Cadastro
              </Text>
            </Box>

            <Box>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, { resetForm }) => {
                  createNewUser(values);
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
                    <FormControl
                      isInvalid={touched.name && errors.name ? true : false}
                    >
                      <Input
                        variant="underlined"
                        placeholder="Nome"
                        fontSize="lg"
                        color="black"
                        marginBottom={touched.name && errors.name ? 0 : 5}
                        fontWeight="semibold"
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                        InputLeftElement={
                          <Icon
                            name="user"
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
                        {errors.name}
                      </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={touched.email && errors.email ? true : false}
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
                            name="mail"
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
                        {errors.email}
                      </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        touched.confirmPassword &&
                        errors.confirmPassword &&
                        errors.password &&
                        touched.password
                          ? true
                          : false
                      }
                    >
                      <Input
                        variant="underlined"
                        placeholder="Senha"
                        fontSize="lg"
                        color="black"
                        marginBottom={5}
                        fontWeight="semibold"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        type={show ? "text" : "password"}
                        InputRightElement={
                          <Pressable
                            marginRight={4}
                            onPress={() => setShow(!show)}
                          >
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
                      <Input
                        variant="underlined"
                        placeholder="Confirmar Senha"
                        fontSize="lg"
                        color="black"
                        fontWeight="semibold"
                        marginBottom={
                          touched.confirmPassword && errors.confirmPassword
                            ? 0
                            : 5
                        }
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        value={values.confirmPassword}
                        type={show ? "text" : "password"}
                        InputRightElement={
                          <Pressable
                            marginRight={4}
                            onPress={() => setShow(!show)}
                          >
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
                        {errors.password
                          ? errors.password
                          : errors.confirmPassword}
                      </FormControl.ErrorMessage>
                    </FormControl>

                    <Pressable
                      justifyContent="center"
                      alignItems="center"
                      bgColor="indigo.600"
                      rounded="md"
                      p={8}
                      marginY={5}
                      onPress={handleSubmit}
                    >
                      <Text fontSize="2xl">Cadastrar</Text>
                    </Pressable>
                  </>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
