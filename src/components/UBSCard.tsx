import { Text, View, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';
import { UBS, totalMin } from '../data/ubs';
import QueueBadge from './QueueBadge';

function Stat({ emoji, value, label }: { emoji: string; value: string; label: string }) {
  return (
    <View style={s.stat}>
      <Text style={s.statEmoji}>{emoji}</Text>
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

export default function UBSCard({ ubs, rank }: { ubs: UBS; rank: number }) {
  return (
    <View style={s.card}>
      <View style={s.top}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text style={s.rank}>#{rank}º lugar</Text>
          <Text style={s.name}>{ubs.name}</Text>
        </View>
        <View style={{ alignItems: 'flex-end', gap: 8 }}>
          <QueueBadge level={ubs.queueLevel} />
          <View style={s.total}>
            <Text style={s.totalValue}>{totalMin(ubs)}</Text>
            <Text style={s.totalLabel}>min total</Text>
          </View>
        </View>
      </View>
      <View style={s.stats}>
        <Stat emoji="🚗" value={`${ubs.travelMin} min`} label="deslocamento" />
        <Stat emoji="👥" value={`${ubs.waitMin} min`} label="espera" />
        <Stat emoji="📍" value={`${ubs.distanceKm.toFixed(1)} km`} label="distância" />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: colors.card, borderRadius: radius.lg, padding: 16, marginBottom: 16,
    shadowColor: '#0F172A', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3,
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  rank: { fontSize: 12, fontWeight: '700', color: colors.textLight },
  name: { fontSize: 18, fontWeight: '800', color: colors.text, marginTop: 6 },
  total: { backgroundColor: colors.primaryLight, borderRadius: radius.md, paddingVertical: 8, paddingHorizontal: 16, alignItems: 'center' },
  totalValue: { fontSize: 24, fontWeight: '800', color: colors.primary },
  totalLabel: { fontSize: 11, color: colors.textMuted },
  stats: { flexDirection: 'row', gap: 8 },
  stat: { flex: 1, backgroundColor: colors.bg, borderRadius: radius.md, paddingVertical: 12, alignItems: 'center' },
  statEmoji: { fontSize: 14, marginBottom: 4 },
  statValue: { fontSize: 15, fontWeight: '800', color: colors.text },
  statLabel: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
});
