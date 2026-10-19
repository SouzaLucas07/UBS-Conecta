import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { colors, radius } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'EmployeeLogin'>;
type Role = 'recepcao' | 'saude';

export default function EmployeeLoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('recepcao');
  const [showPassword, setShowPassword] = useState(false);

  function openPanel() {
    // Protótipo: não há autenticação; os campos são opcionais.
    navigation.navigate('EmployeeArea', {
      role,
      email: email.trim() || 'demo@ubstrack.local',
    });
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
          <Pressable style={s.back} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={colors.primary} />
            <Text style={s.backText}>Voltar</Text>
          </Pressable>

          <View style={s.hero}>
            <View style={s.logo}>
              <Ionicons name="medkit" size={34} color="#fff" />
            </View>
            <Text style={s.eyebrow}>UBSTRACK • MODO DEMONSTRAÇÃO</Text>
            <Text style={s.title}>Área do funcionário</Text>
            <Text style={s.subtitle}>
              Escolha a área que deseja acessar. Não é necessário fazer login neste protótipo.
            </Text>
          </View>

          <View style={s.form}>
            <Text style={s.label}>Escolha a área</Text>
            <View style={s.roles}>
              <Pressable
                onPress={() => setRole('recepcao')}
                style={[s.role, role === 'recepcao' && s.roleActive]}
                accessibilityRole="button"
              >
                <Ionicons
                  name="people-outline"
                  size={21}
                  color={role === 'recepcao' ? colors.primary : colors.textMuted}
                />
                <Text style={[s.roleText, role === 'recepcao' && s.roleTextActive]}>
                  Recepção
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setRole('saude')}
                style={[s.role, role === 'saude' && s.roleActive]}
                accessibilityRole="button"
              >
                <Ionicons
                  name="medkit-outline"
                  size={21}
                  color={role === 'saude' ? colors.primary : colors.textMuted}
                />
                <Text style={[s.roleText, role === 'saude' && s.roleTextActive]}>
                  Médico
                </Text>
              </Pressable>
            </View>

            <View style={s.placeholder}>
              <Ionicons name="information-circle-outline" size={19} color={colors.primary} />
              <Text style={s.placeholderText}>
                Demonstração: e-mail e senha são opcionais. Basta escolher Recepção ou Médico e tocar em acessar.
              </Text>
            </View>

            <Text style={s.label}>E-mail (opcional)</Text>
            <View style={s.inputWrap}>
              <Ionicons name="mail-outline" size={20} color={colors.textMuted} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Opcional — não será validado"
                placeholderTextColor={colors.textLight}
                style={s.input}
              />
            </View>

            <Text style={s.label}>Senha (opcional)</Text>
            <View style={s.inputWrap}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textMuted} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Opcional — não será validada"
                placeholderTextColor={colors.textLight}
                style={s.input}
              />
              <Pressable onPress={() => setShowPassword(value => !value)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.textMuted}
                />
              </Pressable>
            </View>

            <Pressable style={s.button} onPress={openPanel}>
              <Text style={s.buttonText}>
                Acessar {role === 'recepcao' ? 'Recepção' : 'Médico'}
              </Text>
              <Ionicons name="arrow-forward" size={19} color="#fff" />
            </Pressable>

            <View style={s.notice}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
              <Text style={s.noticeText}>
                Protótipo visual com dados fictícios. Não insira dados reais de pacientes.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, paddingBottom: 36 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 24 },
  backText: { color: colors.primary, fontWeight: '700' },
  hero: { backgroundColor: colors.primary, borderRadius: radius.xl, padding: 22, marginBottom: 20 },
  logo: { width: 58, height: 58, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  eyebrow: { color: '#DCEAFE', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { color: '#fff', fontSize: 27, fontWeight: '800', marginTop: 7 },
  subtitle: { color: '#EAF2FF', fontSize: 14, lineHeight: 21, marginTop: 8 },
  form: { backgroundColor: colors.white, borderRadius: radius.lg, padding: 18, borderWidth: 1, borderColor: colors.border },
  label: { color: colors.text, fontSize: 13, fontWeight: '800', marginTop: 14, marginBottom: 8 },
  roles: { flexDirection: 'row', gap: 8 },
  role: { flex: 1, minHeight: 76, alignItems: 'center', justifyContent: 'center', gap: 7, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 8 },
  roleActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  roleText: { color: colors.textMuted, fontSize: 12, fontWeight: '700', textAlign: 'center' },
  roleTextActive: { color: colors.primary },
  placeholder: { flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: colors.primaryLight, borderRadius: 12, padding: 12, marginTop: 16 },
  placeholderText: { flex: 1, color: colors.text, fontSize: 12, lineHeight: 17 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 52, borderWidth: 1, borderColor: colors.border, borderRadius: 13, paddingHorizontal: 13, backgroundColor: colors.bg },
  input: { flex: 1, color: colors.text, fontSize: 14, paddingVertical: 12 },
  button: { backgroundColor: colors.primary, borderRadius: 14, minHeight: 54, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 22 },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '800' },
  notice: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.primaryLight, borderRadius: 12, padding: 12, marginTop: 16 },
  noticeText: { flex: 1, color: colors.text, fontSize: 12, lineHeight: 17 },
});
