import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { QueueLevel } from '../data/ubs';

const map: Record<QueueLevel, { label: string; bg: string; fg: string }> = {
  tranquila: { label: 'Fila tranquila', bg: colors.successBg, fg: colors.success },
  moderada: { label: 'Fila moderada', bg: colors.warningBg, fg: colors.warning },
  alta: { label: 'Fila alta', bg: colors.dangerBg, fg: colors.danger },
};

export default function QueueBadge({ level }: { level: QueueLevel }) {
  const { label, bg, fg } = map[level];
  return (
    <View style={[s.badge, { backgroundColor: bg }]}>
      <Text style={[s.text, { color: fg }]}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  text: { fontSize: 12, fontWeight: '700' },
});
