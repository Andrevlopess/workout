import { useContext, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { WorkoutContext } from "../../Contexts/WorkoutContext";
import { FlatList, Text, View, Pressable } from "react-native";
import { ExerciseCard } from "../Components/ExerciseCard";
import { AuthContext } from "../../Contexts/AuthContext";
import { Loading } from "../Components/Loading";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import FABworkout from "../Components/FABworkout";

export default ({ route, navigation }) => {
  const { workout } = route.params;

  const inWorkoutId = workout.id;

  const [exercises, setExercises] = useState([]);

  const { isLoading } = useQuery(
    ["Exercises", inWorkoutId],
    async () => await api.get(`getExercises/${inWorkoutId}`),
    { onSuccess: (data) => setExercises(data.data) }
  );

  if (isLoading) return <Loading />;

  return (
    <View className="flex-1 bg-violet-600 pt-14 pb-6">
      <View className="flex-row justify-between px-4 items-center mb-12">
        <Pressable onPress={() => navigation.push("Workouts")}>
          <Icon name="ios-chevron-back-sharp" color="#fff" size={40} />
        </Pressable>
        <Text className="text-white font-bold text-4xl w-4/6 text-center">{workout.title}</Text>
        <Pressable
          onPress={() =>
            navigation.push("NewExercise", {
              workout: workout,
            })
          }
        >
          <Icon name="md-add-sharp" color="#fff" size={40} />
        </Pressable>
      </View>

      {exercises.length ? (
        <>
        <View className="flex-row justify-between px-6 rounded-full bg-violet-500 p-4 mx-4 mb-10">
           <View className="flex-row items-center">
            <Text className="text-white text-xl font-semibold mr-2">
              Ordenar por
            </Text>
            <Icon name="chevron-down" color="#fff" size={25} />
          </View>
          <FABworkout navigation={navigation} workout={workout}/>
        </View>
         

          <FlatList
            data={exercises}
            renderItem={({ item }) => <ExerciseCard exercise={item} />}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <View className="p-4 flex-1 justify-center items-center">
          <Text className="text-white text-xl font-semibold">
            Adicione exercícios a este treino!
          </Text>
          <Pressable
            onPress={() =>
              navigation.push("NewExercise", {
                workout: workout,
              })
            }
            className="bg-violet-500 justify-center items-center p-3 w-full rounded-sm my-5"
          >
            <Text className="text-white text-lg font-semibold">Adicionar exercícios</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
