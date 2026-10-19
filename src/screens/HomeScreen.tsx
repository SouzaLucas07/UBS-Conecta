import { ActivityIndicator, Pressable, ScrollView, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/types';
import { colors } from '../theme';
import { totalMin } from '../data/ubs';
import { useUBS } from '../data/useUBS';
import RecommendedCard from '../components/RecommendedCard';
import UBSCard from '../components/UBSCard';

export default function HomeScreen({ navigation }: BottomTabScreenProps<TabParamList, 'Inicio'>) {
  const insets = useSafeAreaInsets();
  const { data, loading } = useUBS();
  const sorted = [...data].sort((a, b) => totalMin(a) - totalMin(b));
  const [best, ...others] = sorted;

  return (
    <ScrollView style={s.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <LinearGradient colors={[colors.primary, colors.primaryDark]} style={[s.header, { paddingTop: insets.top + 16 }]}>
        <View style={s.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={s.hello}>Olá! 👋</Text>
            <Text style={s.headline}>Encontre o melhor posto para você</Text>
          </View>
          <Pressable style={s.circle}><Ionicons name="notifications-outline" size={22} color={colors.white} /></Pressable>
          <Pressable style={s.circle} onPress={() => navigation.navigate('Perfil')}>
            <Ionicons name="person" size={22} color="#2A1B5C" />
          </Pressable>
        </View>
        <View style={s.location}>
          <Text style={s.locationText}>📍  Sua localização atual</Text>
          <Text style={s.locationChange}>Alterar</Text>
        </View>
      </LinearGradient>

      <View style={s.body}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <>
            <Text style={s.section}>Melhor opção para você</Text>
            {best && <RecommendedCard ubs={best} onPress={() => navigation.navigate('UBS')} />}

            <View style={s.info}>
              <Ionicons name="information-circle" size={20} color={colors.primary} />
              <Text style={s.infoText}>Consideramos distância, deslocamento e tempo de espera.</Text>
            </View>

            <View style={s.sectionRow}>
              <Text style={s.section}>Outras opções próximas</Text>
              <Pressable onPress={() => navigation.navigate('UBS')}><Text style={s.link}>Ver todas</Text></Pressable>
            </View>
            {others.map((u, i) => <UBSCard key={u.id} ubs={u} rank={i + 2} />)}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  hello: { color: 'rgba(255,255,255,0.85)', fontSize: 14 },
  headline: { color: colors.white, fontSize: 24, fontWeight: '800', marginTop: 4 },
  circle: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  location: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: 14, marginTop: 16 },
  locationText: { color: colors.white, fontSize: 15 },
  locationChange: { color: colors.white, fontSize: 14, fontWeight: '700' },
  body: { padding: 20 },
  section: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 12 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  link: { color: colors.primary, fontSize: 15, fontWeight: '700', marginBottom: 12 },
  info: { flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: colors.surface, borderRadius: 14, padding: 14, marginBottom: 24 },
  infoText: { flex: 1, color: colors.textMuted, fontSize: 14 },
});
