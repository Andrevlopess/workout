import { createContext, useEffect, useState } from "react";
import { api } from "../src/lib/axios";
import { Alert } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});

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

  console.log(!!user);

  async function createNewUser(values) {
    try {
      const { name, email, password } = values;

      const response = await api.post("/newUser", { name, email, password });

      await AsyncStorage.setItem("@Workout:user",JSON.stringify(response.data.user) );
      await AsyncStorage.setItem("@Workout:token", response.data.token);

    } catch (error) {
      console.log(error);
    }
  }

  async function authLogin(values) {
    const { email, password } = values;

    try {
      const response = await api.post("/authentication", { email, password });

      setUser(response.data.user);

      await AsyncStorage.setItem(
        "@Workout:user",
        JSON.stringify(response.data.user)
      );

      await AsyncStorage.setItem("@Workout:token", response.data.token);
    } catch (error) {
      console.log("erro try" + error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, createNewUser, authLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
