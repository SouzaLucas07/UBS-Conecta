import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';

export default function SplashScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Splash'>) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Onboarding'), 2500);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <LinearGradient colors={[colors.primary, colors.primaryDark]} style={s.container}>
      <View style={s.logo}>
        <Ionicons name="heart" size={44} color={colors.white} />
        <View style={s.bars}>
          {[5, 8, 11, 14].map((h, i) => (
            <View key={i} style={[s.bar, { height: h }]} />
          ))}
        </View>
      </View>
      <Text style={s.title}>UBStrack</Text>
      <Text style={s.subtitle}>Menos tempo na fila. Mais tempo para você.</Text>
      <View style={s.dots}>
        <View style={[s.dot, { width: 20 }]} />
        <View style={s.dot} />
        <View style={s.dot} />
      </View>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  logo: { width: 96, height: 96, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, marginTop: 2 },
  bar: { width: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.9)' },
  title: { color: colors.white, fontSize: 40, fontWeight: '800', marginTop: 24 },
  subtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 15, marginTop: 10, textAlign: 'center' },
  dots: { flexDirection: 'row', gap: 6, marginTop: 40 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.5)' },
});
