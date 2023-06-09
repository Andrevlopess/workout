import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import Home from "../Screens/Home";
import NewWorkout from "../Screens/NewWorkout";
import Workouts from "../Screens/Workouts";
import WorkoutDetail from "../Screens/WorkoutDetail";
import NewExercise from "../Screens/NewExercise";
import EditWorkout from "../Screens/EditWorkout";
import EditExercise from "../Screens/EditExercise";
import ProfilePage from "../Screens/ProfilePage";

export default (props) => {
  const { user } = useContext(AuthContext);


  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!!user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Workouts" component={Workouts} />
            <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />
            <Stack.Screen name="NewWorkout" component={NewWorkout} />
            <Stack.Screen name="NewExercise" component={NewExercise} />
            <Stack.Screen name="EditWorkout" component={EditWorkout} />
            <Stack.Screen name="EditExercise" component={EditExercise} />
            <Stack.Screen name="ProfilePage" component={ProfilePage} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
