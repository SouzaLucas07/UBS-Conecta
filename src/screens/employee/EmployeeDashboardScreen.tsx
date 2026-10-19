import { useMemo, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, radius } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'EmployeeArea'>;
type QueueStatus = 'Aguardando' | 'Chamado' | 'Em atendimento' | 'Concluído';
type QueueItem = { id: number; name: string; reason: string; time: string; status: QueueStatus };
const initialQueue: QueueItem[] = [
  { id: 1, name: 'Paciente demonstrativo 01', reason: 'Consulta agendada', time: '09:15', status: 'Aguardando' },
  { id: 2, name: 'Paciente demonstrativo 02', reason: 'Retorno', time: '09:30', status: 'Aguardando' },
  { id: 3, name: 'Paciente demonstrativo 03', reason: 'Consulta agendada', time: '09:40', status: 'Em atendimento' },
];

export default function EmployeeDashboardScreen({ navigation, route }: Props) {
  const isReception = route.params.role === 'recepcao';
  const [queue, setQueue] = useState(initialQueue);
  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newReason, setNewReason] = useState('Consulta agendada');
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [notes, setNotes] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<QueueItem | null>(null);
  const waiting = queue.filter(p => p.status === 'Aguardando');
  const filtered = useMemo(() => queue.filter(p => p.name.toLowerCase().includes(search.toLowerCase())), [queue, search]);
  const notify = (title: string, msg: string) => Alert.alert(title, msg);
  const changeStatus = (id: number, status: QueueStatus) => setQueue(old => old.map(p => p.id === id ? { ...p, status } : p));
  const callNext = () => {
    const next = queue.find(p => p.status === 'Aguardando');
    if (!next) return notify('Fila vazia', 'Não há pacientes aguardando na fila demonstrativa.');
    changeStatus(next.id, 'Chamado');
    notify('Paciente chamado', `${next.name} foi marcado como chamado no protótipo.`);
  };
  const addPatient = () => {
    if (!newName.trim()) return notify('Nome obrigatório', 'Informe um nome fictício para testar o check-in.');
    setQueue(old => [...old, { id: Date.now(), name: newName.trim(), reason: newReason, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), status: 'Aguardando' }]);
    setNewName(''); setNewReason('Consulta agendada'); setShowCheckIn(false);
    notify('Check-in registrado', 'Paciente adicionado à fila local de demonstração.');
  };
  const finishConsultation = () => {
    if (!notes.trim()) return notify('Registro pendente', 'Adicione uma anotação fictícia antes de concluir no protótipo.');
    if (selectedPatient) changeStatus(selectedPatient.id, 'Concluído');
    setSelectedPatient(null); setNotes('');
    notify('Atendimento concluído', 'O status foi atualizado localmente. Nenhum prontuário real foi salvo.');
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Pressable style={s.back} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={21} color={colors.primary} /><Text style={s.backText}>Voltar ao aplicativo</Text>
        </Pressable>
        <View style={s.hero}>
          <View style={s.heroIcon}><Ionicons name={isReception ? 'people-outline' : 'medkit-outline'} size={28} color="#fff" /></View>
          <Text style={s.eyebrow}>{isReception ? 'PAINEL DA RECEPÇÃO' : 'PAINEL CLÍNICO'}</Text>
          <Text style={s.title}>{isReception ? 'Recepção da UBS' : 'Área do profissional de saúde'}</Text>
          <Text style={s.subtitle}>{isReception ? 'Organize a chegada, a fila e o fluxo de pacientes.' : 'Consulte sua agenda e acompanhe os atendimentos da unidade.'}</Text>
          <Text style={s.unit}>UBS Vila Nova · Unidade demonstrativa</Text>
        </View>

        <View style={s.stats}>
          <Stat icon="people-outline" value={String(waiting.length)} label="Aguardando" />
          <Stat icon="time-outline" value="18 min" label="Espera estimada" />
          <Stat icon="checkmark-circle-outline" value={String(queue.filter(p => p.status === 'Concluído').length + 24)} label="Atendidos hoje*" />
        </View>
        <Text style={s.disclaimer}>*Números e pacientes fictícios para demonstração.</Text>

        {isReception ? (
          <>
            <Text style={s.sectionTitle}>Atalhos da recepção</Text>
            <View style={s.actionGrid}>
              <Action icon="person-add-outline" title="Novo check-in" desc="Registrar chegada" onPress={() => setShowCheckIn(v => !v)} />
              <Action icon="megaphone-outline" title="Chamar próximo" desc="Avançar a fila" onPress={callNext} />
              <Action icon="calendar-outline" title="Agenda do dia" desc="Horários e encaixes" onPress={() => notify('Agenda do dia', 'A agenda ainda é demonstrativa e precisa ser conectada ao sistema da UBS.')} />
              <Action icon="document-text-outline" title="Relatórios" desc="Movimento da unidade" onPress={() => notify('Relatórios', `Fila demonstrativa: ${queue.length} registros locais. Relatórios reais exigem backend.`)} />
            </View>
            {showCheckIn && <View style={s.panel}>
              <Text style={s.panelTitle}>Registrar chegada</Text>
              <Text style={s.label}>Nome fictício do paciente</Text>
              <TextInput value={newName} onChangeText={setNewName} placeholder="Ex.: Paciente 04" placeholderTextColor={colors.textLight} style={s.input} />
              <Text style={s.label}>Motivo / tipo de visita</Text>
              <View style={s.chips}>
                {['Consulta agendada', 'Retorno', 'Encaixe'].map(reason => <Pressable key={reason} style={[s.chip, newReason === reason && s.chipActive]} onPress={() => setNewReason(reason)}><Text style={[s.chipText, newReason === reason && s.chipTextActive]}>{reason}</Text></Pressable>)}
              </View>
              <Pressable style={s.primaryBtn} onPress={addPatient}><Text style={s.primaryBtnText}>Confirmar check-in</Text></Pressable>
            </View>}
            <Text style={s.sectionTitle}>{isReception ? "Fila de atendimento" : "Atendimentos clínicos"}</Text>
            <TextInput value={search} onChangeText={setSearch} placeholder="Buscar paciente demonstrativo" placeholderTextColor={colors.textLight} style={s.search} />
            <View style={s.panel}>
              {filtered.map((p, i) => <View key={p.id} style={[s.patient, i < filtered.length - 1 && s.divider]}>
                <View style={s.personIcon}><Ionicons name="person-outline" size={19} color={colors.primary} /></View>
                <View style={{ flex: 1 }}><Text style={s.patientName}>{p.name}</Text><Text style={s.patientSub}>{p.reason} · {p.time}</Text><Text style={[s.status, p.status === 'Concluído' && s.statusDone]}>{p.status}</Text></View>
                {p.status === 'Aguardando' && <Pressable style={s.smallBtn} onPress={() => { changeStatus(p.id, 'Chamado'); notify('Fila atualizada', `${p.name} marcado como chamado.`); }}><Text style={s.smallBtnText}>Chamar</Text></Pressable>}
                {p.status === 'Chamado' && <Pressable style={s.smallBtn} onPress={() => changeStatus(p.id, 'Em atendimento')}><Text style={s.smallBtnText}>Em atendimento</Text></Pressable>}
              </View>)}
              {filtered.length === 0 && <Text style={s.empty}>Nenhum registro encontrado.</Text>}
            </View>
            <View style={s.notice}><Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} /><Text style={s.noticeText}>A recepção deve acessar somente os dados necessários para cadastro, agenda e fluxo da fila.</Text></View>
          </>
        ) : (
          <>
            <Text style={s.sectionTitle}>Minha agenda</Text>
            <View style={s.panel}>
              {[
                { time: '09:15', title: 'Consulta de rotina', state: 'Aguardando chamada' },
                { time: '09:30', title: 'Retorno', state: 'Agendado' },
                { time: '10:00', title: 'Avaliação clínica', state: 'Agendado' },
              ].map((a, i) => <View key={a.time} style={[s.appointment, i < 2 && s.divider]}>
                <View style={s.timeBox}><Text style={s.timeText}>{a.time}</Text></View>
                <View style={{ flex: 1 }}><Text style={s.patientName}>{a.title}</Text><Text style={s.patientSub}>Paciente demonstrativo · {a.state}</Text></View>
              </View>)}
            </View>
            <Text style={s.sectionTitle}>Pacientes aguardando</Text>
            <View style={s.panel}>
              {waiting.map(p => <View key={p.id} style={[s.patient, s.divider]}>
                <View style={{ flex: 1 }}><Text style={s.patientName}>{p.name}</Text><Text style={s.patientSub}>{p.reason} · chegada {p.time}</Text></View>
                <Pressable style={s.smallBtn} onPress={() => { setSelectedPatient(p); setNotes(''); }}><Text style={s.smallBtnText}>Iniciar</Text></Pressable>
              </View>)}
              {waiting.length === 0 && <Text style={s.empty}>Não há pacientes aguardando na fila demonstrativa.</Text>}
            </View>
            {selectedPatient && <View style={s.panel}>
              <Text style={s.panelTitle}>Atendimento demonstrativo</Text>
              <Text style={s.patientSub}>{selectedPatient.name} · {selectedPatient.reason}</Text>
              <Text style={s.label}>Anotação fictícia (não é prontuário real)</Text>
              <TextInput multiline value={notes} onChangeText={setNotes} placeholder="Digite uma anotação de teste..." placeholderTextColor={colors.textLight} style={[s.input, s.notes]} />
              <Pressable style={s.primaryBtn} onPress={finishConsultation}><Text style={s.primaryBtnText}>Concluir atendimento de teste</Text></Pressable>
              <Pressable style={s.cancelBtn} onPress={() => setSelectedPatient(null)}><Text style={s.cancelText}>Cancelar</Text></Pressable>
            </View>}
            <View style={s.actionGrid}>
              <Action icon="clipboard-outline" title="Histórico clínico" desc="Acesso restrito" onPress={() => notify('Histórico clínico', 'O histórico real exige autenticação, autorização por função e integração segura ao prontuário eletrônico.')} />
              <Action icon="document-text-outline" title="Protocolos" desc="Orientações da unidade" onPress={() => notify('Protocolos', 'Adicione aqui protocolos oficiais aprovados pela unidade após validação da gestão clínica.')} />
              <Action icon="calendar-outline" title="Disponibilidade" desc="Agenda profissional" onPress={() => notify('Disponibilidade', 'A agenda será conectada ao backend em uma próxima etapa.')} />
              <Action icon="alert-circle-outline" title="Encaminhamentos" desc="Fluxo assistencial" onPress={() => notify('Encaminhamentos', 'O encaminhamento real deve seguir os protocolos da unidade e usar sistema seguro.')} />
            </View>
            <View style={s.notice}><Ionicons name="lock-closed-outline" size={20} color={colors.primary} /><Text style={s.noticeText}>Dados clínicos reais não devem ser registrados neste protótipo. Prontuários exigem controle de acesso e armazenamento seguro.</Text></View>
          </>
        )}
        <Pressable style={s.logout} onPress={() => navigation.replace('EmployeeLogin')}><Ionicons name="log-out-outline" size={19} color={colors.primary} /><Text style={s.logoutText}>Sair da área do funcionário</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ icon, value, label }: { icon: keyof typeof Ionicons.glyphMap; value: string; label: string }) {
  return <View style={s.stat}><Ionicons name={icon} size={21} color={colors.primary} /><Text style={s.statValue}>{value}</Text><Text style={s.statLabel}>{label}</Text></View>;
}
function Action({ icon, title, desc, onPress }: { icon: keyof typeof Ionicons.glyphMap; title: string; desc: string; onPress: () => void }) {
  return <Pressable style={s.action} onPress={onPress}><View style={s.actionIcon}><Ionicons name={icon} size={22} color={colors.primary} /></View><Text style={s.actionTitle}>{title}</Text><Text style={s.actionDesc}>{desc}</Text><Ionicons name="chevron-forward" size={18} color={colors.textLight} style={{ position: 'absolute', right: 12, top: 12 }} /></Pressable>;
}

const card = { backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border };
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg }, content: { padding: 18, paddingBottom: 36 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }, backText: { color: colors.primary, fontWeight: '700' },
  hero: { backgroundColor: colors.primary, borderRadius: 24, padding: 20, marginBottom: 16 },
  heroIcon: { width: 48, height: 48, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 13 },
  eyebrow: { color: '#DCEAFE', fontSize: 10, fontWeight: '800', letterSpacing: 1 }, title: { color: '#fff', fontSize: 24, lineHeight: 30, fontWeight: '800', marginTop: 6 }, subtitle: { color: '#EAF2FF', fontSize: 13, lineHeight: 19, marginTop: 7 }, unit: { color: '#fff', fontSize: 12, fontWeight: '700', marginTop: 14 },
  stats: { flexDirection: 'row', gap: 8, marginBottom: 4 }, stat: { ...card, flex: 1, alignItems: 'center', paddingVertical: 13, paddingHorizontal: 3 }, statValue: { fontSize: 18, fontWeight: '800', color: colors.text, marginTop: 6 }, statLabel: { fontSize: 10, color: colors.textMuted, textAlign: 'center', marginTop: 3 }, disclaimer: { fontSize: 10, color: colors.textMuted, marginBottom: 22, marginTop: 4 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 8, marginBottom: 12 }, actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 }, action: { ...card, width: '48%', minHeight: 132, padding: 13 }, actionIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: 9 }, actionTitle: { color: colors.text, fontSize: 13, fontWeight: '800' }, actionDesc: { color: colors.textMuted, fontSize: 11, lineHeight: 16, marginTop: 4 },
  panel: { ...card, paddingHorizontal: 13, paddingVertical: 4, marginBottom: 16 }, panelTitle: { color: colors.text, fontSize: 16, fontWeight: '800', marginTop: 12, marginBottom: 4 }, label: { color: colors.text, fontSize: 12, fontWeight: '800', marginTop: 12, marginBottom: 7 }, input: { backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 12, paddingVertical: 12, color: colors.text, fontSize: 14 }, notes: { minHeight: 92, textAlignVertical: 'top' }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 12 }, chip: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 18, backgroundColor: colors.surface }, chipActive: { backgroundColor: colors.primaryLight, borderWidth: 1, borderColor: colors.primary }, chipText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' }, chipTextActive: { color: colors.primary }, primaryBtn: { backgroundColor: colors.primary, padding: 13, borderRadius: 12, alignItems: 'center', marginVertical: 10 }, primaryBtnText: { color: '#fff', fontSize: 13, fontWeight: '800' }, cancelBtn: { alignItems: 'center', padding: 10, marginBottom: 6 }, cancelText: { color: colors.textMuted, fontWeight: '700' },
  search: { backgroundColor: colors.surface, borderRadius: 13, paddingHorizontal: 14, paddingVertical: 12, color: colors.text, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  patient: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 13 }, divider: { borderBottomWidth: 1, borderBottomColor: colors.border }, personIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' }, patientName: { color: colors.text, fontSize: 13, fontWeight: '800' }, patientSub: { color: colors.textMuted, fontSize: 11, lineHeight: 16, marginTop: 3 }, status: { color: colors.warning, fontSize: 11, fontWeight: '800', marginTop: 5 }, statusDone: { color: colors.success }, smallBtn: { backgroundColor: colors.primaryLight, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8, maxWidth: 116 }, smallBtnText: { color: colors.primary, fontSize: 11, fontWeight: '800', textAlign: 'center' }, empty: { color: colors.textMuted, fontSize: 13, textAlign: 'center', padding: 20 },
  appointment: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 }, timeBox: { backgroundColor: colors.primaryLight, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 9 }, timeText: { color: colors.primary, fontWeight: '800', fontSize: 12 }, notice: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: colors.primaryLight, borderRadius: 13, padding: 13, marginTop: 6 }, noticeText: { flex: 1, color: colors.text, fontSize: 11, lineHeight: 16 }, logout: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 14, marginTop: 12 }, logoutText: { color: colors.primary, fontWeight: '800', fontSize: 13 },
});
