import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../src/lib/axios";
import { AuthContext } from "./AuthContext";
import { useQuery } from '@tanstack/react-query'

export const WorkoutContext = createContext();

export default function WorkoutProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [workouts, setWorkouts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function newWorkout(values) {
    try {
      const { title } = values;

      const { isLoading, isError, isSuccess } = useMutation(
        "newWorkout",
        async () =>{
           await api.post("/newWorkout", {
            title,
            authorId: user.id,
          })
        }
         
      );

      console.log(isLoading, isError, isSuccess);

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
        inWorkoutId,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }}

  return (
    <WorkoutContext.Provider
      value={{ newWorkout, newExercise, workouts, isLoading }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
