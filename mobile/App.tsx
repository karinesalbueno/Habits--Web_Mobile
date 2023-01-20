import { StyleSheet, Text, View, StatusBar} from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter'
import { Loading } from './src/assets/components/Loading';

export default function App() {
  // fontsLoader: se a fonte está ou não carregada no dispositivo
  const [fontsLoader] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  //se nao estiver carregada, nao rodar a aplicação ainda
  if (!fontsLoader) {
    return (
      <Loading />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>hello word *-*</Text>
      {/* exibe a barra de cima do celular */}
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#09090A',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: 'Inter_800ExtraBold'
  }
});
