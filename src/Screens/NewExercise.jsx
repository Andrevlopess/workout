import { useContext } from "react";
import {
  View,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import * as Yup from "yup";
import { FormControl } from "native-base";
import { Formik } from "formik";
import { WorkoutContext } from "../../Contexts/WorkoutContext";

const newExerciseSchema = Yup.object().shape({
  name: Yup.string().max(30, "Nome muito grande").required("Campo obrigatório"),
  reps: Yup.string()
    .max(20, "Insira no máximo 20 caracteres")
    .required("Campo obrigatório"),
  targetMuscle: Yup.string().required("Campo obrigatório"),
});

export default ({ navigation, route }) => {
  const { workout } = route.params;
  const {newExercise} = useContext(WorkoutContext)

  return (
    <View className="bg-white flex-1 px-4 py-12">
       <View className="bg-violet-600 h-1/5 w-full z-0 absolute -scale-150" /> 
      <View className="flex-row items-center mb-10">
        <Pressable onPress={() => navigation.goBack()} className="absolute">
          <Icon name="ios-chevron-back-sharp" color="#fff" size={40} />
        </Pressable>
        <Text className="text-white font-bold text-4xl text-center mx-auto ">
          Novo Exercício
        </Text>
      </View>
      <View className=" border-4 bg-white rounded-2xl p-4 border-violet-600 justify-between">
        <Formik
          initialValues={{
            name: "",
            reps: "",
            targetMuscle: "",
            inWorkoutId: workout.id
          }}
          validationSchema={newExerciseSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            newExercise(values)
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
                isInvalid={errors.name && touched.name && errors ? true : false}
              >
                <Text className="text-xl font-bold">Nome do exercício</Text>
                <TextInput
                  className="border-b-2 p-2 text-xl"
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />

                <FormControl.ErrorMessage
                  leftIcon={<Icon name="alert-circle" color="red" size={14} />}
                >
                  {errors.name}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={errors.reps && touched.reps && errors ? true : false}
                py={4}
              >
                <Text className="text-xl font-bold">Repetições</Text>
                <TextInput
                  className="border-b-2 p-2 text-xl"
                  onChange={handleChange("reps")}
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
                <Text className="text-white text-2xl font-bold">Criar</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};
