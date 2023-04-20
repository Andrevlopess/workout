import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator color="#6d28d9" size={60}/>
    </View>
  )
}