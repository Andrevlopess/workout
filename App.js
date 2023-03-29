import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import Index from './src/Routes/Index';
import { useFonts, Inter_900Black, Inter_700Bold} from '@expo-google-fonts/inter';
import { Loading } from './src/Components/Loading';
import theme from './src/Theme/CustomTheme';

export default function App() {

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_700Bold
  });

  if (!fontsLoaded) {
    return <Loading/>;
  }


  return (
    <NativeBaseProvider theme={theme}>
      <Index/>
    </NativeBaseProvider>
  );
}

