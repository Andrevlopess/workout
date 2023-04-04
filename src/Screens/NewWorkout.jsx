import { Box, Heading, Input, Text } from "native-base";
import { Button, Pressable, StatusBar, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default ({ navigation }) => {
  return (
    <SafeAreaView>
      <StatusBar />
      <Box py={4}>
        <Box flexDirection="row" alignItems="center" p={3}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon size={40} name="chevron-left" color="#000" />
          </Pressable>
          <Heading size="xl" color="#000">
            Novo treino
          </Heading>
        </Box>
        <Box px={3}>
          <Box flexDirection='row' alignItems='center' bgColor="#fff" my={3} rounded="xl" p={2} shadow="teste">
            <Text color="#000" fontSize="md" fontWeight="semibold">
              Titulo:
            </Text>
            <Input borderBottomColor="black" borderBottomWidth={1} variant="unstyled" flex={1} color="#000" mx={2}/>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};
