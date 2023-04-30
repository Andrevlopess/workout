import { FormControl } from "native-base";
import { Button, TouchableOpacity, Alert } from "react-native";
import { useContext, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Formik } from "formik";
import { AuthContext } from "../../Contexts/AuthContext";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/Feather";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email Inválido!").required("Campo Obrigatório"),
  password: Yup.string().required("Campo Obrigatório"),
});

export default ({ navigation }) => {
  const { setUser, errors } = useContext(AuthContext);

  const [show, setShow] = useState(false);


  const login = useMutation({
    mutationFn: async (values) => {
      const { email, password } = values;

     const response =  await api.post("/authentication", {
        email,
        password,
      });

      console.log(response.user);

     if(response.data.user){
      setUser(response.data.user);

      await AsyncStorage.setItem(
        "@Workout:user",
        JSON.stringify(response.data.user)
      );
      
      await AsyncStorage.setItem("@Workout:token", response.data.token);
   }
    }
    });


  return (
    <View className="flex-1 bg-violet-800">
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-6xl font-bold">Workout</Text>
      </View>

      <View className="flex-2 justify-end py-5 bg-white p-4 rounded-t-3xl">
        <Text className="text-black text-center text-4xl font-bold py-5">
          Entrar
        </Text>

        <Text className="text-black text-5xl font-bold py-5">Olá,</Text>

        <Formik
          initialValues={{
            email: "andrellopes021@gmail.com",
            password: "senha123",
          }}
          validationSchema={loginSchema}
          onSubmit={(values, { resetForm }) => {
            login.mutate(values);
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
                    errors.email && touched.email && errors ? true : false
                  }
                >
                  <Text className="text-lg font-bold">Email</Text>
                  <TextInput
                    className="border-b-2 p-2 text-xl"
                    onChangeText={handleChange("email")}
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
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={show ? true : false}
                  />
                   <Pressable onPress={() => setShow(!show)}>
                  {show ? <Icon name="eye" color="#000" size={25}/>
                  :       <Icon name="eye-off" color="#000" size={25}/>}  
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
                <TouchableOpacity onPress={handleSubmit} activeOpacity={.9} className="bg-violet-700 p-6 justify-center items-center rounded-xl">
                      <Text className="text-white text-2xl font-bold">Entrar</Text>
                </TouchableOpacity>

                <Pressable
                  className="items-center py-2"
                  onPress={() => navigation.push("SignUp")}
                >
                  <Text className="text-gray-950 font-bold">
                    Registrar-se
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};
