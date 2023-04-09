import { createContext, useEffect, useState } from "react";
import { api } from "../src/lib/axios";
import { Alert } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState("");

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@Workout:user");
      const storageToken = await AsyncStorage.getItem("@Workout:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }
    }

    loadStorageData();
    
  }, []);

  async function createNewUser(values) {
    try {
      setErrors("")
      const { name, email, password } = values;

      const response = await api.post("/newUser", { name, email, password });

      if (response.data) {
        setErrors(response.data.error);
        return;
      }

      await AsyncStorage.setItem(
        "@Workout:user",
        JSON.stringify(response.data.user)
      );
      await AsyncStorage.setItem("@Workout:token", response.data.token);
    } catch (error) {
      console.log(error);
    }
  }

  async function authLogin(values) {
    const { email, password } = values;

    try {
      setErrors("")

      const response = await api.post("/authentication", {email,password });
        
      
      if (response.data) {
        setErrors(response.data.error);
        return;
      }


      setUser(response.data.user);

      await AsyncStorage.setItem(
        "@Workout:user",
        JSON.stringify(response.data.user)
      );

      await AsyncStorage.setItem("@Workout:token", response.data.token);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, errors, user, createNewUser, authLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
