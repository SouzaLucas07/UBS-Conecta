import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { UBS, totalMin } from '../data/ubs';
import { useUBS } from '../data/useUBS';
import RecommendedCard from '../components/RecommendedCard';
import UBSCard from '../components/UBSCard';

type Filter = 'tempo' | 'distancia' | 'fila';
const filters: { key: Filter; label: string }[] = [
  { key: 'tempo', label: 'Menor tempo' },
  { key: 'distancia', label: 'Menor distância' },
  { key: 'fila', label: 'Menor fila' },
];

const sorters: Record<Filter, (a: UBS, b: UBS) => number> = {
  tempo: (a, b) => totalMin(a) - totalMin(b),
  distancia: (a, b) => a.distanceKm - b.distanceKm,
  fila: (a, b) => a.peopleInQueue - b.peopleInQueue,
};

export default function UBSListScreen() {
  const { data, loading } = useUBS();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('tempo');

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((u) => u.name.toLowerCase().includes(q)).sort(sorters[filter]);
  }, [data, query, filter]);

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <View style={s.header}>
        <Text style={s.title}>Postos próximos</Text>
        <View style={s.search}>
          <Ionicons name="search" size={20} color={colors.text} />
          <TextInput
            style={s.input}
            placeholder="Buscar UBS ou bairro"
            placeholderTextColor={colors.textLight}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {filters.map((f) => (
            <Pressable key={f.key} onPress={() => setFilter(f.key)} style={[s.chip, filter === f.key && s.chipActive]}>
              <Text style={[s.chipText, filter === f.key && s.chipTextActive]}>{f.label}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={list}
          keyExtractor={(u) => u.id}
          contentContainerStyle={{ padding: 20 }}
          ListEmptyComponent={<Text style={s.empty}>Nenhuma UBS encontrada. Tente buscar por outro nome ou bairro.</Text>}
          renderItem={({ item, index }) =>
            filter === 'tempo' && index === 0 && !query ? (
              <RecommendedCard ubs={item} />
            ) : (
              <UBSCard ubs={item} rank={index + 1} />
            )
          }
        />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, gap: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  search: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface, borderRadius: 14, paddingHorizontal: 14, height: 48 },
  input: { flex: 1, fontSize: 16, color: colors.text },
  chip: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 999, backgroundColor: colors.surface },
  chipActive: { backgroundColor: colors.primary },
  chipText: { fontSize: 14, fontWeight: '700', color: colors.textMuted },
  chipTextActive: { color: colors.white },
  empty: { textAlign: 'center', color: colors.textMuted, marginTop: 40, fontSize: 15 },
});
