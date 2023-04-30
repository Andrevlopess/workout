import {
  Modal,
  Alert,
  View,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useContext, useState } from "react";
import { Formik } from "formik";
import { FormControl } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { AuthContext } from "../../Contexts/AuthContext";
import { ActivityIndicator } from "react-native";

export default ({ modalVisible, closeModal, user }) => {
  const [show, setShow] = useState(true);
  const { authLogout } = useContext(AuthContext);

  const deleteAccountSchema = Yup.object().shape({
    password: Yup.string().required("Campo Obrigatório"),
  });

  const deleteUser = useMutation({
    mutationFn: async (values) => {
      const { userId, password } = values;

      await api
        .delete(`/deleteUser/${userId}`, { data: { password } })
        .then((res) => {
          if(res.data.error) {
           return Alert.alert(res.data.error.title, res.data.error.message)
          }
          if(res.data.delUser) {
            Alert.alert("Conta apagada!", "Sua conta foi apagada com sucesso!")
            authLogout();
          }
          
        });
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
    
        <View className=" flex-1 justify-center items-center mt-22">
        <View className=" w-5/6 px-10 py-6 bg-white rounded-lg items-center shadow-xl">
          <Text className="font-bold text-2xl text-violet-800">Confirmar</Text>
          <Text className="font-semibold text-lg">
            Deseja excluir sua conta?
          </Text>
          <Formik
            initialValues={{
              password: "senha123",
              userId: user.id,
            }}
            validationSchema={deleteAccountSchema}
            onSubmit={(values, { resetForm }) => {
              deleteUser.mutate(values);
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
                      errors.password && touched.password ? true : false
                    }
                    py={4}
                  >
                    <Text className="text-lg font-bold">Senha</Text>
                    <View className="flex-row items-center">
                      <TextInput
                        className="border-b-2 p-2 text-xl mr-2 w-full pr-10"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        secureTextEntry={show ? true : false}
                      />
                      <Pressable
                        onPress={() => setShow(!show)}
                        className="-ml-10"
                      >
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
                    className="bg-violet-700 p-2 justify-center items-center rounded-sm"
                    style={{elevation: 5}}
                  >
                    {deleteUser.isLoading ? (
                      <ActivityIndicator size={20} color="#fff" />
                    ) : (
                      <Text className="text-white text-lg font-bold">
                        Confirmar
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          <Pressable className="pt-5" onPress={() => closeModal(!modalVisible)}>
            <Text className="text-lg font-bold">Cancelar</Text>
          </Pressable>
        </View>
      </View>

      
    </Modal>
  );
};
