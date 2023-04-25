import { useContext } from "react";
import {
  View,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Yup from "yup";
import { FormControl } from "native-base";
import { Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { AuthContext } from "../../Contexts/AuthContext";
import { Loading } from "../Components/Loading";

export default ({ navigation, route }) => {
  const { user } = useContext(AuthContext);

  const newWorkoutSchema = Yup.object().shape({
    title: Yup.string()
      .max(50, "Titúlo muito grande")
      .required("Campo obrigatório"),
  });

  const createWorkout = useMutation({
    mutationFn: async (values) => {
      const { title } = values;
      await api.post("/newWorkout", {
        title,
        authorId: user.id,
      });
    },
  });

  // if (createWorkout.isSuccess) {
  //   Alert.alert("Treino criado com sucesso!")
  // }
  // if (createWorkout.isError) {
  //   Alert.alert("Erro ao criar novo treino!");
  // }

  return (
    <View className="bg-white justify-between flex-1 px-4 py-12">
      <View className="flex-row items-center">
        <Pressable onPress={() => navigation.push("Workouts")} className="absolute">
          <Icon name="ios-chevron-back-sharp" color="#000" size={40} />
        </Pressable>
        <Text className="text-black font-bold text-4xl text-center mx-auto ">
          Novo treino
        </Text>
      </View>
      <Text className="text-4xl font-bold text-black py-20 ">
        Crie e personalize seus treinos como quiser!
      </Text>

      <View>
        <Formik
          initialValues={{
            title: "",
          }}
          validationSchema={newWorkoutSchema}
          onSubmit={(values, { resetForm }) => {
            createWorkout.mutate(values);
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
                isInvalid={errors.title && touched.title ? true : false}
                className="my-10"
              >
                <Text className="text-xl font-bold">Titulo do treino</Text>
                <TextInput
                  maxLength={50}
                  autoFocus
                  cursorColor="#7c3aed"
                  className="border-b-2 p-2 text-xl"
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                />

                <FormControl.ErrorMessage
                  leftIcon={<Icon name="alert-circle" color="red" size={14} />}
                >
                  {errors.title}
                </FormControl.ErrorMessage>
              </FormControl>

              <TouchableOpacity activeOpacity={0.9}>
                <Pressable
                  onPress={handleSubmit}
                  className="bg-violet-700 p-6 justify-center items-center rounded-xl "
                >
                  <Text className="text-white text-2xl font-bold">
                    {createWorkout.isLoading ? (
                      <ActivityIndicator color="#fff" size={40} />
                    ) : (
                      "Criar"
                    )}
                  </Text>
                </Pressable>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};
