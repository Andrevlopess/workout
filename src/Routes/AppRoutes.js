import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import Home from "../Screens/Home";
import NewWorkout from "../Screens/NewWorkout";
import Workouts from "../Screens/Workouts";
import WorkoutDetail from "../Screens/WorkoutDetail";
import NewExercise from "../Screens/NewExercise";

export default (props) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Workouts" component={Workouts} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />
      <Stack.Screen name="NewWorkout" component={NewWorkout} />
      <Stack.Screen name="NewExercise" component={NewExercise} />
    </Stack.Navigator>
  );
};
