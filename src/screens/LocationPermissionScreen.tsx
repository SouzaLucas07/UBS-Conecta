import { Alert, Pressable, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors, radius } from '../theme';

export default function LocationPermissionScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'LocationPermission'>) {
  const goHome = () => navigation.reset({ index: 0, routes: [{ name: 'Main' }] });

  const allow = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') return goHome();
    Alert.alert('Localização não permitida', 'Você pode escolher a localização manualmente.');
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.center}>
        <View style={s.iconBox}>
          <Text style={{ fontSize: 56 }}>🗺️</Text>
          <View style={s.pin}><Text style={{ fontSize: 14 }}>📍</Text></View>
        </View>
        <Text style={s.title}>Encontre os postos mais próximos</Text>
        <Text style={s.text}>Usaremos sua localização para calcular a distância e o tempo estimado até cada unidade.</Text>
      </View>
      <View style={s.footer}>
        <Pressable style={s.primary} onPress={allow}>
          <Text style={s.primaryText}>📍 Permitir localização</Text>
        </Pressable>
        <Pressable style={s.secondary} onPress={goHome}>
          <Text style={s.secondaryText}>Escolher localização manualmente</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  iconBox: { width: 160, height: 160, borderRadius: 44, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  pin: { position: 'absolute', top: -6, right: -6, width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, textAlign: 'center' },
  text: { fontSize: 16, lineHeight: 24, color: colors.textMuted, textAlign: 'center', marginTop: 12 },
  footer: { paddingHorizontal: 24, paddingBottom: 16, gap: 12 },
  primary: { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: 16, alignItems: 'center' },
  primaryText: { color: colors.white, fontSize: 17, fontWeight: '800' },
  secondary: { borderWidth: 1.5, borderColor: colors.primary, borderRadius: radius.md, paddingVertical: 16, alignItems: 'center' },
  secondaryText: { color: colors.primary, fontSize: 16, fontWeight: '700' },
});
