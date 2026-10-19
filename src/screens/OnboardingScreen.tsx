import { useRef, useState } from 'react';
import { FlatList, Pressable, Text, View, StyleSheet, useWindowDimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors, radius } from '../theme';

const slides = [
  { id: '1', emoji: '🏥', bg: '#E8EFFE', title: 'Encontre a UBS ideal', text: 'Veja os postos de saúde próximos de você e compare as melhores opções.' },
  { id: '2', emoji: '🎫', bg: '#DDF8E8', title: 'Acompanhe sua fila', text: 'Saiba quantas pessoas estão aguardando e acompanhe sua posição em tempo real.' },
  { id: '3', emoji: '⏱️', bg: '#FFF3CC', title: 'Chegue na hora certa', text: 'Compare distância, deslocamento e tempo de espera para escolher a melhor opção.' },
];

export default function OnboardingScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Onboarding'>) {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const isLast = index === slides.length - 1;

  const finish = () => navigation.replace('LocationPermission');
  const next = () => (isLast ? finish() : listRef.current?.scrollToIndex({ index: index + 1 }));
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) =>
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));

  return (
    <SafeAreaView style={s.container}>
      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        onMomentumScrollEnd={onScroll}
        renderItem={({ item }) => (
          <View style={[s.slide, { width }]}>
            <View style={[s.iconBox, { backgroundColor: item.bg }]}>
              <Text style={s.emoji}>{item.emoji}</Text>
            </View>
            <Text style={s.title}>{item.title}</Text>
            <Text style={s.text}>{item.text}</Text>
            <View style={s.dots}>
              {slides.map((_, i) => (
                <View key={i} style={[s.dot, i === index && s.dotActive]} />
              ))}
            </View>
          </View>
        )}
      />
      <View style={s.footer}>
        <Pressable style={s.btn} onPress={next}>
          <Text style={s.btnText}>{isLast ? 'Começar' : 'Próximo'}</Text>
        </Pressable>
        <Pressable onPress={finish} hitSlop={12}>
          <Text style={s.skip}>Pular</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  slide: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  iconBox: { width: 140, height: 140, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  emoji: { fontSize: 56 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, textAlign: 'center' },
  text: { fontSize: 16, lineHeight: 24, color: colors.textMuted, textAlign: 'center', marginTop: 12 },
  dots: { flexDirection: 'row', gap: 6, marginTop: 32 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#CBD5E1' },
  dotActive: { width: 24, backgroundColor: colors.primary },
  footer: { paddingHorizontal: 24, paddingBottom: 16, alignItems: 'center', gap: 16 },
  btn: { alignSelf: 'stretch', backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: 16, alignItems: 'center' },
  btnText: { color: colors.white, fontSize: 17, fontWeight: '800' },
  skip: { color: colors.textLight, fontSize: 15, fontWeight: '600' },
});
