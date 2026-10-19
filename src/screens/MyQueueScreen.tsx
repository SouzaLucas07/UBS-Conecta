import { Text, View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/types';
import { colors, radius } from '../theme';

// Tela não existe no protótipo (a aba mostra a lista de UBS). Placeholder com estado vazio.
export default function MyQueueScreen({ navigation }: BottomTabScreenProps<TabParamList, 'MinhaFila'>) {
  return (
    <SafeAreaView style={s.container}>
      <Text style={s.title}>Minha fila</Text>
      <View style={s.empty}>
        <Text style={{ fontSize: 48 }}>🎫</Text>
        <Text style={s.emptyTitle}>Você não está em nenhuma fila</Text>
        <Text style={s.emptyText}>Escolha uma UBS para acompanhar sua posição em tempo real.</Text>
        <Pressable style={s.btn} onPress={() => navigation.navigate('UBS')}>
          <Text style={s.btnText}>Ver postos próximos</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 20 },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginTop: 8 },
  emptyText: { fontSize: 15, color: colors.textMuted, textAlign: 'center' },
  btn: { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: 14, paddingHorizontal: 24, marginTop: 16 },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '800' },
});
