import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Screens/Home";
import Workout from "../Screens/Workout";
import NewWorkout from "../Screens/NewWorkout";
import ProfilePage from "../Screens/ProfilePage";

const Stack = createNativeStackNavigator();

export default (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Workout" component={Workout} />
        <Stack.Screen name="NewWorkout" component={NewWorkout} />
        <Stack.Screen name="Profile" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
