import { Pressable, Text, View } from "react-native"

export default ({navigation}) => {
    return(
        <View>
            <Text>mt massa esse treino</Text>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Text>home</Text>
            </Pressable>
        </View>
    )
}