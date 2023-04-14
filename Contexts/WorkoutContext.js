import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../src/lib/axios";
import { AuthContext } from "./AuthContext";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export const WorkoutContext = createContext();

export default function WorkoutProvider({ children }) {

    const {user} = useContext(AuthContext)

    const [workouts, setWorkouts] = useState(null)

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
    async function newExercise(values){
     try{
        const {title, reps, targetMuscle} = values;

        if(workout){
          const response = await api.post('/newWorkout',{
             title,
             reps,
             targetMuscle,
             inWorkoutId: workout.id,
        })

        if(response.data){
          console.log(response.data)
        }
        }

     }catch(err){
        console.log(err);
     }
    }

    async function getWorkouts(values){

      const {authorId} = values;

      const workouts = await api.get('/getWorkouts',{
        authorId
      })

      if(workouts.data){
        setWorkouts(workouts.data)
      }
    }

    useEffect(()=>{
      getWorkouts("fd6c8e29-f2f2-4b19-abea-c9f2275fe46c")
    },[])

  return (
    <WorkoutContext.Provider value={{newWorkout, newExercise, workouts}}>
    {children}
    </WorkoutContext.Provider>
  )
}
