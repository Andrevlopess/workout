import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {useContext} from 'react'
import { AuthContext } from "../../Contexts/AuthContext";
import AppRoutes from "./AppRoutes";
import AuthRoute from "./AuthRoute";

export default (props) => {


 const {user} = useContext(AuthContext)

  return (
    <NavigationContainer>
      {user ? <AppRoutes/> : <AuthRoute/>}
    </NavigationContainer>
  );
};
