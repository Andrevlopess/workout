import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import Index from "./src/Routes/Index";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Loading } from "./src/Components/Loading";
import theme from "./src/Theme/CustomTheme";
import AuthProvider from "./Contexts/AuthContext";
import WorkoutProvider from "./Contexts/WorkoutContext";

const queryClient = new QueryClient();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <AuthProvider>
          <WorkoutProvider>
            <Index />
          </WorkoutProvider>
        </AuthProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
