import { Avatar, Box, Image, StatusBar, Text } from "native-base";
import { Button, SafeAreaView } from "react-native";
import { api } from "../lib/axios";
import { useState } from "react";

export default (props) => {
  const [users, setUsers] = useState();

  const name = "react native";
  const email = "reactnative@gmail.com";
  const password = "amem0000";

  async function testeapi() {
    await api.post("newUser", { name, email, password });
  }

  return (
    <SafeAreaView>
      <Button title="teste" onPress={() => testeapi()} />
    </SafeAreaView>
  );
};
