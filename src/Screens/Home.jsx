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
          <Image
            source={{
              uri: "https://instagram.fvcp2-1.fna.fbcdn.net/v/t51.2885-19/337152961_207133215266787_5312857535398017100_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fvcp2-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=EmMS4hhBTwMAX8WaTpC&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfA1lGeK_V1I0mKS-p8xWgOSGQePgzfypi4vNwf4E-NpAg&oe=6427EC75&_nc_sid=8fd12b}",
            }}
            alt="profile picture"
            borderRadius={100}
            size="sm"
          />
          <Pressable onPress={() => navigation.navigate("NewWorkout")}>
            <Icon name="plus" size={50} color="#000" />
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
