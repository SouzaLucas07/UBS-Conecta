export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  LocationPermission: undefined;
  Main: undefined;
  EmployeeLogin: undefined;
  EmployeeArea: { role: 'recepcao' | 'saude'; email: string };
};

export type TabParamList = {
  Inicio: undefined;
  UBS: undefined;
  MinhaFila: undefined;
  Perfil: undefined;
};
