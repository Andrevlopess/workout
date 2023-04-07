import { createContext, useState } from "react";
import { api } from "../src/lib/axios";
import { Alert } from "native-base";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  console.log(user);

  async function createNewUser(values) {
    try {
      const { name, email, password } = values;

      await api
        .post("/newUser", { name, email, password })
        .then(function (response) {
          if (!response.data) return console.log("erro");

          setUser(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function authLogin(values){

    const {email, password} = values;

    try {
        await api.post("/authentication", {email, password})
        .then((response) => console.log(response.data))
        .catch((error) => console.log("erro axios" + error))
        
    } catch (error) {
        console.log("erro try" + error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, createNewUser, authLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
