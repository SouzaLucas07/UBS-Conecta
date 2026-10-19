import { ScrollView, Text, View, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius } from '../theme';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList } from '../navigation/types';

type ProfileNavigation = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Perfil'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type IconName = keyof typeof Ionicons.glyphMap;
const items: { label: string; icon: IconName; color: string; bg: string }[] = [
  { label: 'Localização', icon: 'location-outline', color: colors.primary, bg: '#E8EFFE' },
  { label: 'Notificações', icon: 'notifications-outline', color: '#D97706', bg: '#FEF3C7' },
  { label: 'Acessibilidade', icon: 'accessibility-outline', color: '#16A34A', bg: '#DCFCE7' },
  { label: 'Privacidade', icon: 'shield-outline', color: '#7C3AED', bg: '#EDE9FE' },
  { label: 'Ajuda', icon: 'help-circle-outline', color: '#0E7490', bg: '#CFFAFE' },
  { label: 'Configurações', icon: 'settings-outline', color: '#475569', bg: '#F1F5F9' },
];

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileNavigation>();
  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <LinearGradient colors={[colors.primary, colors.primaryDark]} style={s.avatar}>
            <Ionicons name="person" size={44} color="#2A1B5C" />
          </LinearGradient>
          <Text style={s.name}>Maria da Silva</Text>
          <Text style={s.email}>maria.silva@email.com</Text>
        </View>

        <Pressable style={s.employeeButton} onPress={() => navigation.navigate('EmployeeLogin')}>
          <View style={s.employeeIcon}><Ionicons name="medkit-outline" size={22} color="#FFFFFF" /></View>
          <View style={{ flex: 1 }}>
            <Text style={s.employeeTitle}>Área do funcionário</Text>
            <Text style={s.employeeSubtitle}>Acessar painel da UBS</Text>
          </View>
          <Ionicons name="chevron-forward" size={21} color={colors.primary} />
        </Pressable>

        <View style={s.statsRow}>
          <View style={s.statCard}>
            <Text style={[s.statValue, { color: colors.primary }]}>3</Text>
            <Text style={s.statLabel}>Atendimentos</Text>
          </View>
          <View style={s.statCard}>
            <Text style={[s.statValue, { color: colors.success }]}>~2h</Text>
            <Text style={s.statLabel}>Tempo economizado</Text>
          </View>
        </View>

        <View style={s.menu}>
          {items.map((it, i) => (
            <Pressable key={it.label} style={[s.row, i < items.length - 1 && s.rowBorder]}>
              <View style={[s.iconBox, { backgroundColor: it.bg }]}>
                <Ionicons name={it.icon} size={20} color={it.color} />
              </View>
              <Text style={s.rowLabel}>{it.label}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const card = { backgroundColor: colors.card, borderRadius: radius.lg, shadowColor: '#0F172A', shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2 };
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  name: { fontSize: 22, fontWeight: '800', color: colors.text, marginTop: 14 },
  email: { fontSize: 15, color: colors.textMuted, marginTop: 4 },
  employeeButton: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.white, borderRadius: radius.lg, padding: 14, marginTop: 20, borderWidth: 1, borderColor: '#DCE8FF' },
  employeeIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  employeeTitle: { fontSize: 15, fontWeight: '800', color: colors.text },
  employeeSubtitle: { fontSize: 12, color: colors.textMuted, marginTop: 3 },
  statsRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  statCard: { ...card, flex: 1, alignItems: 'center', paddingVertical: 20 },
  statValue: { fontSize: 28, fontWeight: '800' },
  statLabel: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  menu: { ...card, marginTop: 20, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  iconBox: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { flex: 1, fontSize: 16, fontWeight: '700', color: colors.text },
});
