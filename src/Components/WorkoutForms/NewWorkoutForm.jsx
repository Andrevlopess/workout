import { Formik } from "formik";
import { useContext } from "react";
import {Text, View, TextInput} from 'react-native'
import * as Yup from "yup";
import Icon from "react-native-vector-icons/Feather";
import { WorkoutContext } from "../../../Contexts/WorkoutContext";


export default props => {
    
    const { newWorkout } = useContext(WorkoutContext);

    return(
      <View className="bg-violet-100">

      </View>
    )
} 
//<Formik
      //   initialValues={{
      //     title: "",
      //   }}
      //   validationSchema={newWorkoutSchema}
      //   onSubmit={(values, { resetForm }) => {
      //     newWorkout(values);
      //     resetForm();
      //   }}
      // >
      //   {({
      //     handleChange,
      //     handleBlur,
      //     handleSubmit,
      //     values,
      //     touched,
      //     errors,
      //   }) => (
      //     <>