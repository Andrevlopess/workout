import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import { FormControl } from "native-base";
import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { api } from "../lib/axios";
import {useState} from 'react'

export default ({ route, navigation }) => {
  const { workout } = route.params;

  const authorId = workout.authorId
  const workoutId = workout.id

  const [authorName, setAuthorName] = useState(null)

  const { isLoading } = useQuery(
    ["Username", authorId],
    async () => await api.get(`/user/${authorId}`),
    { onSuccess: (data) => setAuthorName(data.data) }
  );

  const editWorkout = useMutation({
    mutationFn: async (values) => {

      const { title } = values;

      await api.patch(`/patchWorkout/${workoutId}`, {
        title
      });
    },
  });


  if (editWorkout.isSuccess) {
    Alert.alert("Treino editado com sucesso!")
  }
  if (editWorkout.isError) {
    Alert.alert("Erro ao editar o treino!");
  }


  return (
    <View className="flex-1 bg-white px-6 py-16 justify-between">
      <View className="bg-violet-600 h-1/5 w-full z-0 absolute -scale-150" />

      <View className="">
        <View className="flex-row items-center mb-12">
          <Pressable className="absolute" onPress={() => navigation.navigate("Workouts")}>
            <Icon name="ios-chevron-back-sharp" color="#fff" size={40} />
          </Pressable>
          <Text className="text-white font-bold text-4xl mx-auto">Editar</Text>
        </View>
        <View className="bg-violet-200 py-6 px-6 rounded-xl shadow-lg">
          <Text className="text-white text-3xl font-bold">{workout.title}</Text>

          {!!workout.exercises.length ? (
            <Text className="italic text-white text-lg font-bold">
              {`${workout.exercises.length} exercícios`}
            </Text>
          ): (
            <Text className="italic text-white text-lg font-bold">
            Nenhum exercício
          </Text>
          )}

          <Text className="text-white text-lg font-bold text-right mt-10">
           {`de ${authorName}`}
          </Text>
        </View>
      </View>

      <View className="">
        <Text className="text-black text-3xl font-bold">Alterações</Text>
        <Formik
          initialValues={{
            title: workout.title,
          }}
          onSubmit={(values, { resetForm }) => {
            editWorkout.mutate(values)
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
                    {editWorkout.isLoading ? (
                      <ActivityIndicator color="#fff" size={40} />
                    ) : (
                      "Salvar"
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
