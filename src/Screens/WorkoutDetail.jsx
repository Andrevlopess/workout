import { useContext, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { FlatList, Text, View, Pressable } from "react-native";
import { ExerciseCard } from "../Components/ExerciseCard";
import { AuthContext } from "../../Contexts/AuthContext";
import { Loading } from "../Components/Loading";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import FABworkout from "../Components/FABworkout";
import * as Animatable from "react-native-animatable";

export default ({ route, navigation }) => {
  const { workout } = route.params;

  const inWorkoutId = workout.id;

  const [orders, setOrders] = useState(null);
  const [exercises, setExercises] = useState([]);
   const [isOrderByOpen, setIsOrderByOpen] = useState(false);

  const { isLoading } = useQuery(
    ["Exercises", inWorkoutId],
    async () => await api.get(`getExercises/${inWorkoutId}`),
    { onSuccess: (data) => setExercises(data.data) }
  );

  if (isLoading) return <Loading />;

  const orderByParams = [
    {
      id: 1,
      param: "Mais Recentes",
    },
    {
      id: 2,
      param: "Mais Antigos",
    },
    {
      id: 3,
      param: "A-Z",
    },
    {
      id: 4,
      param: "Z-A",
    }
  ];
  const orderByTargetMuscle = [
    {
      id: 1,
      muscle: "Peitoral",
    },
    {
      id: 2,
      muscle: "Costas",
    },
    {
      id: 3,
      muscle: "Pernas",
    },
    {
      id: 4,
      muscle: "Ombros",
    },
    {
      id: 5,
      muscle: "Tronco",
    },
    {
      id: 6,
      muscle: "Braços",
    },
  ];

  function resetOrder(){
    console.log(exercises);
  }

  function orderby(orderParam) {
    let list = [...exercises];

    setOrders(orderParam)

    if (orderParam.param === "Mais Recentes") {
      setExercises(
        list.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
        )
      );
    } else if (orderParam.param === "Mais Antigos") {
      setExercises(
        list.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
        )
      );
    } else if (orderParam.param === "A-Z") {
      setExercises(
        list.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        )
      );
    } else if (orderParam.param === "Z-A") {
      setExercises(
        list.sort((a, b) =>
          a.title < b.title ? 1 : b.title < a.title ? -1 : 0
        )
      );
    }
  }
  
  return (
    <View className="flex-1 bg-violet-600 pt-14 pb-6">
      <View className="flex-row justify-between px-4 items-center mb-12">
        <Pressable onPress={() => navigation.push("Workouts")}>
          <Icon name="ios-chevron-back-sharp" color="#fff" size={40} />
        </Pressable>
        <Text className="text-white font-bold text-4xl w-4/6 text-center">
          {workout.title}
        </Text>
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

      {/* <FABworkout navigation={navigation} workout={workout} /> */}

      <View className="px-6 shadow-xl rounded-3xl bg-violet-500 p-4 mx-4 mb-10">
        <View className="flex-row justify-between items-center ">
          <View className="flex-row items-center">
            <Text className="text-white text-xl font-semibold mr-2">
              Ordenar por
            </Text>
            {!!orders && (
              <Animated.View animation="fadeIn">
                 <View
                 className="flex-row items-center bg-violet-600 p-2 rounded-xl m-2active:bg-violet-500">
                <Text className="text-md text-white font-semibold mr-2">
                  {orders.param}
                </Text>
                <Pressable 
                onPress={() => resetOrder()}
                className="rounded-full bg-violet-500 p-1">
                  <Icon name="md-close-sharp" color="white" size={15} />
                </Pressable>
              </View>
              </Animated.View>
             
            )}
          </View>
          <Pressable onPress={() => setIsOrderByOpen(!isOrderByOpen)}>
            {isOrderByOpen ? (
              <Icon name="chevron-up" color="#fff" size={25} />
            ) : (
              <Icon name="chevron-down" color="#fff" size={25} />
            )}
          </Pressable>
        </View>
        {isOrderByOpen && (
          <View>
            <FlatList
              data={orderByParams}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => orderby(item)}
                  className=" bg-violet-600 p-2 rounded-xl m-2  active:bg-violet-500"
                >
                  <Text className="text-md text-white font-semibold">
                    {item.param}
                  </Text>
                </Pressable>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <Text className="text-md text-white opacity-70 font-semibold">
              Músculo alvo
            </Text>
            <FlatList
              data={orderByTargetMuscle}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable className=" bg-violet-600 p-2 rounded-xl m-2">
                  <Text className="text-md text-white font-semibold">
                    {item.muscle}
                  </Text>
                </Pressable>
              )}
              horizontal
            />
          </View>
        )}
      </View>

      {exercises.length ? (
        <>
          <FlatList
            data={exercises}
            renderItem={({ item }) => (
              <ExerciseCard exercise={item} navigation={navigation} />
            )}
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
            <Text className="text-white text-lg font-semibold">
              Adicionar exercícios
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
