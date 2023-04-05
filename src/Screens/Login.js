import { Box, StatusBar, Text, Input, Pressable } from "native-base";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { Formik } from "formik";

export default ({ navigation }) => {
  return (
    <Box padding={3} flex={1}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text color="black" fontSize="5xl" fontWeight="bold">
          Workout
        </Text>
      </Box>
      <Box flex={2} justifyContent="flex-end" py={5}>
        <Text color="black" fontSize="5xl" fontWeight="bold" py={5}>
          Olá,
        </Text>
        <Box>        
            <Input
              variant="underlined"
              placeholder="Email"
              fontSize="lg"
              color="black"
              marginBottom={5}
              fontWeight="semibold"
            />
            <Input
              variant="underlined"
              placeholder="Senha"
              fontSize="lg"
              color="black"
              fontWeight="semibold"
            />
            <Pressable
              justifyContent="center"
              alignItems="center"
              bgColor="indigo.600"
              rounded="sm"
              p={8}
              marginY={5}
            >
              <Text fontSize="xl" fontWeight="bold">
                Entrar
              </Text>
            </Pressable>
          <Pressable
            alignItems="center"
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text color="gray.800" fontWeight="bold">
              Registrar-se
            </Text>
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
};
