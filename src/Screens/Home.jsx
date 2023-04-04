import {
  Pressable,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import { Box, Heading, Image, Text } from "native-base";
import Icon from "react-native-vector-icons/Feather";
import { WorkoutCard } from "../Components/WorkoutCard";

export default ({ navigation }) => {
  const workouts = [
    {
      id: 1,
      title: "Treino de peito",
      description: "treinin depeito",
      exercises: [
        {
          name: "Cross Polia Alta",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Supino Inclinado c halteres",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Supino Inclinado c halteres",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Supino Inclinado c halteres",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Paralelas",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Cross Polia Alta",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Supino Inclinado c halteres",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Paralelas",
          repetitions: "4x10 10 8 8",
        },
      ],
    },
    {
      id: 2,
      title: "Treino de costa",
      description: "tartaruga ninja",
      repetitions: "4x10 10 8 8",
      exercises: [
        {
          name: "Puxada Alta",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Serrote",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Remada curvada c 100kg",
          repetitions: "4x10 10 8 8",
        },
      ],
    },
    {
      id: 3,
      title: "Treino de costa",
      description: "tartaruga ninja",
      repetitions: "4x10 10 8 8",
      exercises: [
        {
          name: "Puxada Alta",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Serrote",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Remada curvada c 100kg",
          repetitions: "4x10 10 8 8",
        },
      ],
    },
    {
      id: 4,
      title: "Treino de costa",
      description: "tartaruga ninja",
      repetitions: "4x10 10 8 8",
      exercises: [
        {
          name: "Puxada Alta",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Serrote",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Remada curvada c 100kg",
          repetitions: "4x10 10 8 8",
        },
      ],
    },
    {
      id: 5,
      title: "Treino de costa",
      description: "tartaruga ninja",
      repetitions: "4x10 10 8 8",
      exercises: [
        {
          name: "Puxada Alta",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Serrote",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Remada curvada c 100kg",
          repetitions: "4x10 10 8 8",
        },
      ],
    },
    {
      id: 6,
      title: "Treino de costa",
      description: "tartaruga ninja",
      repetitions: "4x10 10 8 8",
      exercises: [
        {
          name: "Puxada Alta",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Serrote",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Remada curvada c 100kg",
          repetitions: "4x10 10 8 8",
        },
      ],
    },
    {
      id: 7,
      title: "Treino de costa",
      description: "tartaruga ninja",
      repetitions: "4x10 10 8 8",
      exercises: [
        {
          name: "Puxada Alta",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Serrote",
          repetitions: "4x10 10 8 8",
        },
        {
          name: "Remada curvada c 100kg",
          repetitions: "4x10 10 8 8",
        },
      ],
    },
  ];

  return (
    <SafeAreaView>
      <StatusBar />
      <Box py={4}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          px={3}
          mb={2}
        >
          <Pressable onPress={() => navigation.navigate('Profile')}>
             <Image
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
            alt="profile picture"
            borderRadius={100}
            size="sm"
        
          />
          </Pressable>
         
          <Pressable onPress={() => navigation.navigate("NewWorkout")}>
            <Icon name="plus-square" size={50} color="#000" />
          </Pressable>
        </Box>
        <Heading color="#000" px={3} size="2xl">
          Treinos de andre
        </Heading>

        <FlatList
          data={workouts}
          renderItem={(Workout) => (
            <WorkoutCard workout={Workout.item} nav={navigation} />
          )}
          keyExtractor={(Workout) => Workout.id}
        />
      </Box>
    </SafeAreaView>
  );
};
