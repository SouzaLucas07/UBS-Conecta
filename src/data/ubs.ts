export type QueueLevel = 'tranquila' | 'moderada' | 'alta';

export type UBS = {
  id: string;
  name: string;
  travelMin: number; // deslocamento
  waitMin: number; // espera
  distanceKm: number;
  peopleInQueue: number;
  queueLevel: QueueLevel;
};

// TODO: substituir por chamada à API quando o back-end estiver pronto.
const MOCK: UBS[] = [
  { id: '1', name: 'UBS Centro', travelMin: 7, waitMin: 35, distanceKm: 1.8, peopleInQueue: 28, queueLevel: 'alta' },
  { id: '2', name: 'UBS Vila Nova', travelMin: 10, waitMin: 15, distanceKm: 2.4, peopleInQueue: 12, queueLevel: 'tranquila' },
  { id: '3', name: 'UBS Parque Industrial', travelMin: 19, waitMin: 8, distanceKm: 4.7, peopleInQueue: 6, queueLevel: 'tranquila' },
  { id: '4', name: 'UBS Jardim Europa', travelMin: 12, waitMin: 18, distanceKm: 3.1, peopleInQueue: 14, queueLevel: 'tranquila' },
];

export const totalMin = (u: UBS) => u.travelMin + u.waitMin;

export async function fetchUBS(): Promise<UBS[]> {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK), 300));
}
