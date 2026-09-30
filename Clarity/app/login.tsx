import { View } from 'react-native';
import { AuthView } from '@clerk/expo/native';

export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AuthView />
    </View>
  );
}
