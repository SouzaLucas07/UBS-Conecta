import { Text, View, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../theme';
import { UBS, totalMin } from '../data/ubs';

function Stat({ emoji, value, label }: { emoji: string; value: string; label: string }) {
  return (
    <View style={s.stat}>
      <Text style={s.statEmoji}>{emoji}</Text>
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

const levelLabel = { tranquila: 'Fila tranquila', moderada: 'Fila moderada', alta: 'Fila alta' } as const;

export default function RecommendedCard({ ubs, onPress }: { ubs: UBS; onPress?: () => void }) {
  return (
    <LinearGradient colors={[colors.primary, colors.primaryDark]} style={s.card}>
      <Text style={s.tag}>🏆 RECOMENDADO PARA VOCÊ</Text>
      <View style={s.top}>
        <View style={{ flex: 1 }}>
          <Text style={s.name}>{ubs.name}</Text>
          <Text style={s.sub}>Menor tempo total</Text>
        </View>
        <View style={s.total}>
          <Text style={s.totalValue}>{totalMin(ubs)}</Text>
          <Text style={s.totalLabel}>min total</Text>
        </View>
      </View>
      <View style={s.stats}>
        <Stat emoji="🚗" value={`${ubs.travelMin} min`} label="deslocamento" />
        <Stat emoji="👥" value={`${ubs.waitMin} min`} label="espera" />
        <Stat emoji="📍" value={`${ubs.distanceKm.toFixed(1)} km`} label="distância" />
      </View>
      <View style={s.queueRow}>
        <Text style={s.queueText}>👥  {ubs.peopleInQueue} pessoas na fila</Text>
        <Text style={s.queueLevel}>{levelLabel[ubs.queueLevel]}</Text>
      </View>
      <Pressable style={({ pressed }) => [s.btn, pressed && { opacity: 0.85 }]} onPress={onPress}>
        <Text style={s.btnText}>Ver detalhes →</Text>
      </Pressable>
    </LinearGradient>
  );
}

const glass = 'rgba(255,255,255,0.14)';
const s = StyleSheet.create({
  card: { borderRadius: radius.xl, padding: 16, marginBottom: 16 },
  tag: { color: colors.white, fontSize: 12, fontWeight: '800', letterSpacing: 0.5, marginBottom: 10 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  name: { color: colors.white, fontSize: 20, fontWeight: '800' },
  sub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 },
  total: { backgroundColor: glass, borderRadius: radius.md, paddingVertical: 8, paddingHorizontal: 16, alignItems: 'center' },
  totalValue: { color: colors.white, fontSize: 26, fontWeight: '800' },
  totalLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 11 },
  stats: { flexDirection: 'row', gap: 8 },
  stat: { flex: 1, backgroundColor: glass, borderRadius: radius.md, paddingVertical: 12, alignItems: 'center' },
  statEmoji: { fontSize: 14, marginBottom: 4 },
  statValue: { color: colors.white, fontSize: 15, fontWeight: '800' },
  statLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 2 },
  queueRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: glass, borderRadius: radius.md, padding: 12, marginTop: 8 },
  queueText: { color: colors.white, fontSize: 14 },
  queueLevel: { color: 'rgba(255,255,255,0.85)', fontSize: 12 },
  btn: { backgroundColor: colors.white, borderRadius: radius.md, paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  btnText: { color: colors.primary, fontSize: 16, fontWeight: '800' },
});
