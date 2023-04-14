import { Box, Pressable, Text } from "native-base";
import {useContext} from 'react'
import Icon from "react-native-vector-icons/Feather";
import {WorkoutCard} from "../Components/WorkoutCard";
import { WorkoutContext } from "../../Contexts/WorkoutContext";
import { FlatList } from "react-native";

export default ({navigation}) => {

  const { workouts } = useContext(WorkoutContext);


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
          WORKOUTS
        </Text>
      </Box>

       <FlatList
        data={workouts}
        renderItem={({item}) => <WorkoutCard workouts={item} navigation={navigation}/>}
        keyExtractor={item => item.id}
      />
    </Box>
  );
};
