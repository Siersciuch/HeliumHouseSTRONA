import { format, addDays } from "date-fns";

const today = new Date();

// ─── People ───
export interface Person {
  id: string;
  name: string;
  role: "kierowca" | "montażysta" | "kierownik";
  phone: string;
  email: string;
  trips: string[]; // event IDs
}

export const mockPeople: Person[] = [
  { id: "p1", name: "Anna Nowak", role: "kierownik", phone: "+48 600 111 222", email: "anna@hh.pl", trips: ["ev1", "ev2", "ev4", "ev5"] },
  { id: "p2", name: "Piotr Wiśniewski", role: "montażysta", phone: "+48 600 333 444", email: "piotr@hh.pl", trips: ["ev1", "ev3", "ev4", "ev6", "ev7"] },
];

// ─── Vehicles ───
export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  type: "bus" | "przyczepa";
  status: "dostępny" | "w trasie" | "serwis";
  nextService: string;
  trips: string[];
}

export const mockVehicles: Vehicle[] = [
  { id: "v1", name: "Bus #1", plate: "KR 12345", type: "bus", status: "w trasie", nextService: format(addDays(today, 30), "yyyy-MM-dd"), trips: ["ev1", "ev3", "ev6"] },
  { id: "v2", name: "Bus #2", plate: "WA 67890", type: "bus", status: "w trasie", nextService: format(addDays(today, 45), "yyyy-MM-dd"), trips: ["ev2", "ev5"] },
  { id: "v3", name: "Bus #3", plate: "WR 11111", type: "bus", status: "dostępny", nextService: format(addDays(today, 15), "yyyy-MM-dd"), trips: ["ev4", "ev7"] },
  { id: "v4", name: "Przyczepa #1", plate: "KR 99999", type: "przyczepa", status: "dostępny", nextService: format(addDays(today, 60), "yyyy-MM-dd"), trips: ["ev1", "ev5", "ev7"] },
];

// ─── Testers ───
export interface Tester {
  id: string;
  serial: string;
  name: string;
  status: "dostępny" | "zarezerwowany" | "serwis";
  assignedEvent: string | null;
}

export const mockTesters: Tester[] = [
  { id: "t1", serial: "T-001", name: "Tester Alpha", status: "zarezerwowany", assignedEvent: "ev3" },
  { id: "t2", serial: "T-002", name: "Tester Beta", status: "zarezerwowany", assignedEvent: "ev2" },
  { id: "t3", serial: "T-003", name: "Tester Gamma", status: "dostępny", assignedEvent: null },
  { id: "t4", serial: "T-004", name: "Tester Delta", status: "zarezerwowany", assignedEvent: "ev7" },
  { id: "t5", serial: "T-005", name: "Tester Epsilon", status: "serwis", assignedEvent: null },
];

// ─── Stands (Stoiska) ───
export interface Stand {
  id: string;
  shortCode: string;
  fullName: string;
  description: string;
  dimensions: string;
  weight: string;
  needsTrailer: boolean;
}

export const mockStands: Stand[] = [
  { id: "s1", shortCode: "MUA", fullName: "Mur z Balonów", description: "Duża ściana dekoracyjna z balonów lateksowych. Wymaga przyczepy.", dimensions: "6m x 3m", weight: "120 kg", needsTrailer: true },
  { id: "s2", shortCode: "BAL", fullName: "Balonowy Stand", description: "Standardowe stoisko balonowe ze stołem ekspozycyjnym.", dimensions: "3m x 2m", weight: "45 kg", needsTrailer: false },
  { id: "s3", shortCode: "LED", fullName: "LED Balloon Wall", description: "Ściana z balonów z podświetleniem LED RGB.", dimensions: "4m x 2.5m", weight: "80 kg", needsTrailer: true },
];
