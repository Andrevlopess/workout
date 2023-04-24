import { isError, useMutation, useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import { FormControl } from "native-base";
import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import { api } from "../lib/axios";
import { useState } from "react";
import * as Yup from "yup";

const newExerciseSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, "Nome muito grande")
    .required("Campo obrigatório"),
  reps: Yup.string()
    .max(20, "Insira no máximo 20 caracteres")
    .required("Campo obrigatório"),
  targetMuscle: Yup.string().required("Campo obrigatório"),
});

export default ({ route, navigation }) => {
  const { exercise } = route.params;
  const exerciseId = exercise.id;

  const editExercise = useMutation({
    mutationFn: async (values) => {
      const { title, reps, targetMuscle } = values;

      await api.patch(`/patchExercise/${exerciseId}`, {
        title,
        reps,
        targetMuscle,
      });
    },
    onSuccess: () => {
        Alert.alert('Alert Title', 'My Alert Msg', [
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
    },
  });

  return (
    <View className="flex-1 bg-white px-6 py-16 justify-between">
      <View className="bg-violet-600 h-48 w-full z-0 absolute top-0 -scale-150" />

      <View className="">
        <View className="flex-row items-center mb-12">
          <Pressable
            className="absolute"
            onPress={() => navigation.push("Workouts")}
          >
            <Icon name="ios-chevron-back-sharp" color="#fff" size={40} />
          </Pressable>
          <Text className="text-white font-bold text-4xl mx-auto">Editar</Text>
        </View>
        <View className="bg-violet-200 py-6 px-6 rounded-xl shadow-lg">
          <>
            <Text className="text-white opacity-70 text-lg font-semibold">
              Título
            </Text>
            <Text className="text-white text-3xl font-bold ml-2">
              {exercise.title}
            </Text>
          </>
          <View className="flex-row justify-between items-end">
            <View className="w-4/6">
              <Text className="text-white opacity-70 text-lg font-semibold">
                Repetições
              </Text>
              <Text className="text-white text-xl font-bold  italic ml-2">
                {exercise.reps}
              </Text>
            </View>
            <View className="border-2 px-3 py-1 bg-white border-white rounded-full shadow-2xl">
              <Text className="text-lg text-violet-700 font-bold ">
                {exercise.targetMuscle}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="">
        <Formik
          initialValues={{
            title: exercise.title,
            reps: exercise.reps,
            targetMuscle: exercise.targetMuscle,
          }}
          validationSchema={newExerciseSchema}
          onSubmit={(values, { resetForm }) => {
            editExercise.mutate(values);
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
                isInvalid={
                  errors.title && touched.title && errors ? true : false
                }
                pt={5}
              >
                <Text className="text-2xl font-bold">Título</Text>
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

              <FormControl
                isInvalid={errors.reps && touched.reps && errors ? true : false}
                py={5}
              >
                <Text className="text-2xl font-bold">Repetições</Text>
                <TextInput
                  maxLength={20}
                  cursorColor="#7c3aed"
                  className="border-b-2 p-2 text-xl"
                  onChangeText={handleChange("reps")}
                  onBlur={handleBlur("reps")}
                  value={values.reps}
                />

                <FormControl.ErrorMessage
                  leftIcon={<Icon name="alert-circle" color="red" size={14} />}
                >
                  {errors.name}
                </FormControl.ErrorMessage>
              </FormControl>

              <View className="border-2 border-black rounded-lg mb-4">
                <Picker
                  selectedValue={values.targetMuscle}
                  onValueChange={handleChange("targetMuscle")}
                >
                  <Picker.Item label="Peito" value="Peito" />
                  <Picker.Item label="Costas" value="Costas" />
                  <Picker.Item label="Braços" value="Braços" />
                  <Picker.Item label="Ombros" value="Ombros" />
                  <Picker.Item label="Pernas" value="Pernas" />
                  <Picker.Item label="Tronco" value="Tronco" />
                </Picker>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={0.9}
                className="bg-violet-700 p-10 justify-center items-center rounded-xl "
              >
                <Text className="text-white text-2xl font-bold">
                  {editExercise.isLoading ? (
                    <ActivityIndicator color="#fff" size={40} />
                  ) : (
                    "Editar"
                  )}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};
