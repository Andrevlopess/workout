import { useContext } from "react";
import {
  View,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Yup from "yup";
import { FormControl } from "native-base";
import { Formik } from "formik";
import { WorkoutContext } from "../../Contexts/WorkoutContext";

export default ({ navigation, route }) => {
  
  const newWorkoutSchema = Yup.object().shape({
    title: Yup.string()
      .max(50, "Titúlo muito grande")
      .required("Campo obrigatório"),
  });

  const {newWorkout} = useContext(WorkoutContext)

  

  return (
    <View className="bg-white justify-between flex-1 px-4 py-12">
      <View className="flex-row items-center">
        <Pressable onPress={() => navigation.goBack()} className="absolute">
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
            newWorkout(values)
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
                  <Text className="text-white text-2xl font-bold">Criar</Text>
                </Pressable>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};
