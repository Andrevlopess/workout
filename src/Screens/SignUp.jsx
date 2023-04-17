import { FormControl } from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
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
    <View className="flex-1 bg-violet-800">
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-6xl font-bold">Workout</Text>
      </View>

      <View className="flex-2 justify-end py-5 bg-white p-4 rounded-t-3xl">
        <Text className="text-black text-center text-4xl font-bold py-5">
          Registrar
        </Text>

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
              <View>
                <FormControl
                  isInvalid={
                    errors.name && touched.name && errors ? true : false
                  }
                >
                  <Text className="text-lg font-bold">Nome</Text>
                  <TextInput
                    className="border-b-2 p-2 text-xl"
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />

                  <FormControl.ErrorMessage
                    leftIcon={
                      <Icon name="alert-circle" color="red" size={14} />
                    }
                  >
                    {errors.name}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    errors.email && touched.email && errors ? true : false
                  }
                >
                  <Text className="text-lg font-bold">Email</Text>
                  <TextInput
                    className="border-b-2 p-2 text-xl"
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
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
                  py={4}
                >
                  <Text className="text-lg font-bold">Senha</Text>
                  <View className="flex-row items-center">
                    <TextInput
                      className="border-b-2 p-2 text-xl flex-1 mr-2"
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry={show ? true : false}
                    />
                    <Pressable onPress={() => setShow(!show)}>
                      {show ? (
                        <Icon name="eye" color="#000" size={25} />
                      ) : (
                        <Icon name="eye-off" color="#000" size={25} />
                      )}
                    </Pressable>
                  </View>

                  <FormControl.ErrorMessage
                    paddingBottom={4}
                    leftIcon={
                      <Icon name="alert-circle" color="red" size={14} />
                    }
                  >
                    {errors.password}
                  </FormControl.ErrorMessage>

                  <Text className="text-lg font-bold">Confirmar Senha</Text>
                  <View className="flex-row items-center">
                    <TextInput
                      className="border-b-2 p-2 text-xl flex-1 mr-2"
                      onChange={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                      secureTextEntry={show ? true : false}
                    />
                    <Pressable onPress={() => setShow(!show)}>
                      {show ? (
                        <Icon name="eye" color="#000" size={25} />
                      ) : (
                        <Icon name="eye-off" color="#000" size={25} />
                      )}
                    </Pressable>
                  </View>
                  <FormControl.ErrorMessage
                    paddingBottom={4}
                    leftIcon={
                      <Icon name="alert-circle" color="red" size={14} />
                    }
                  >
                    {errors.password}
                  </FormControl.ErrorMessage>
                </FormControl>

                <TouchableOpacity
                  onPress={handleSubmit}
                  activeOpacity={0.9}
                  className="bg-violet-700 p-6 justify-center items-center rounded-xl"
                >
                  <Text className="text-white text-2xl font-bold">
                    Registrar
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};
