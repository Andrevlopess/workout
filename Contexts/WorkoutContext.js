import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../src/lib/axios";
import { AuthContext } from "./AuthContext";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export const WorkoutContext = createContext();

export default function WorkoutProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [workouts, setWorkouts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  async function newWorkout(values) {
    try {
      setIsLoading(true);
      const { title } = values;
      
      const response = await api.post("/newWorkout", {
        title,
        authorId: user.id,
      });

      getWorkouts(user.id);

      console.log("treino criado");

    } catch (err) {
      console.log(err);
    }
  }
  async function newExercise(values) {
    try {
      const { title, reps, targetMuscle, inWorkoutId } = values;
    
        const response = await api.post("/newExercise", {
          title,
          reps,
          targetMuscle,
          inWorkoutId
        })

        console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function getWorkouts(values) {
    try {
      setIsLoading(true);
      const { authorId } = values;

      const workouts = await api.get("/getWorkouts", {
        authorId,
      });

      if (workouts.data && workouts.status === 200) {
        setWorkouts(workouts.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  // useEffect(() => {
  // getWorkouts(user.id)
  // }, [newExercise, newWorkout])
  


  return (
    <WorkoutContext.Provider
      value={{ newWorkout, newExercise, workouts, getWorkouts, isLoading }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
