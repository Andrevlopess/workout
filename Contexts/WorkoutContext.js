import { createContext, useContext, useState } from "react";
import { api } from "../src/lib/axios";
import { AuthContext } from "./AuthContext";

export const WorkoutContext = createContext();

export default function WorkoutProvider({ children }) {

    const {user} = useContext(AuthContext)

    const [workout, setWorkout] = useState("")

    async function newWorkout(values){
     try{

        const {title} = values;

        const response = await api.post('/newWorkout',{
             title,
             authorId: user.id
        })

        if(response.data){
          setWorkout(response.data)
        }

     }catch(err){
        console.log(err);
     }
    }

    console.log(workout);

  return (
    <WorkoutContext.Provider value={{newWorkout, workout}}>
    {children}
    </WorkoutContext.Provider>
  )
}
