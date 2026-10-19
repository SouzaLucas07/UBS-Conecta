import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { RootStackParamList, TabParamList } from './types';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LocationPermissionScreen from '../screens/LocationPermissionScreen';
import HomeScreen from '../screens/HomeScreen';
import UBSListScreen from '../screens/UBSListScreen';
import MyQueueScreen from '../screens/MyQueueScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EmployeeDashboardScreen from '../screens/employee/EmployeeDashboardScreen';
import EmployeeLoginScreen from '../screens/employee/EmployeeLoginScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

type IconName = keyof typeof Ionicons.glyphMap;
const tabIcons: Record<keyof TabParamList, IconName> = {
  Inicio: 'home-outline',
  UBS: 'location-outline',
  MinhaFila: 'ticket-outline',
  Perfil: 'person-outline',
};

function MainTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: { backgroundColor: colors.white, borderTopColor: colors.border, height: 60 + insets.bottom },
        tabBarIcon: ({ color }) => <Ionicons name={tabIcons[route.name]} size={26} color={color} />,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="UBS" component={UBSListScreen} />
      <Tab.Screen name="MinhaFila" component={MyQueueScreen} options={{ title: 'Minha Fila' }} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="LocationPermission" component={LocationPermissionScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="EmployeeLogin" component={EmployeeLoginScreen} />
      <Stack.Screen name="EmployeeArea" component={EmployeeDashboardScreen} />
    </Stack.Navigator>
  );
}
