import { Box, Pressable, Text } from "native-base";
import {useContext} from 'react'
import Icon from "react-native-vector-icons/Feather";
import {WorkoutCard} from "../Components/WorkoutCard";
import { WorkoutContext } from "../../Contexts/WorkoutContext";
import { FlatList } from "react-native";
import { ExerciseCard } from "../Components/ExerciseCard";

export default ({ route, navigation}) => {

    const { exercises } = route.params;

  return (
    <Box flex={1} padding={3} color="white">
      <Box
        paddingY={8}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          marginX="auto"
          color="black"
          style={{ fontWeight: "bold" }}
          fontSize="2xl"
        >
          Treino de Peito
        </Text>
      </Box>

      <FlatList
        data={exercises}
        renderItem={({item}) => <ExerciseCard exercise={item}/>}
        keyExtractor={item => item.id}
      />
        
    </Box>
  );
};
