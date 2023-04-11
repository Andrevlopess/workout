import { createContext, useContext } from "react";
import { api } from "../src/lib/axios";
import { AuthContext } from "./AuthContext";

export const WorkoutContext = createContext();

export default function WorkoutProvider({ children }) {

    const {user} = useContext(AuthContext)

    async function newWorkout(values){
     try{

        const {title} = values;

        const response = await api.post('/newWorkout',{
             title,
             authorId: user.id
        })

        console.log(response.data);

     }catch(err){
        console.log(err);
     }
    }

  return (
    <WorkoutContext.Provider value={{newWorkout}}>
    {children}
    </WorkoutContext.Provider>
  )
}
