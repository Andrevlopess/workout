import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Screens/Home";
import Workout from "../Screens/Workout";

const Stack = createNativeStackNavigator();

export default props => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{title: 'home'}}/>
                <Stack.Screen name="Workout" component={Workout}  options={{title: 'workout'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}