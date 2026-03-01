// Uwaga: Ten plik celowo NIE zawiera żadnych danych przykładowych.
// Jest tylko typowaniem + pustymi kolekcjami, żeby UI miał z czego czytać,
// dopóki nie podepniemy prawdziwej bazy / API.

// ─── People (Ekipa) ───
export interface Person {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  drivingLicense: string;
  isAdmin: boolean;
  hasKeys: boolean;
  electricalCert: boolean;
  heightCert: boolean;
  twoFA: boolean;
  devices: string;
  lastLogin: string;
  notes: string;
  trips: string[];
}

export const mockPeople: Person[] = [];

// ─── Vehicles (Flota) ───
export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  type: "bus" | "przyczepa" | "autobus" | "samochód";
  status: "dostępny" | "w trasie" | "serwis";
  year: string;
  mileage: string;
  inspectionUntil: string;
  insuranceUntil: string;
  serviceOil: string;
  repairDescription: string;
  repairStatus: string;
  notes: string;
  nextService: string;
  trips: string[];
}

export const mockVehicles: Vehicle[] = [];

// ─── Testers (Magazyn testerów) ───
export interface Tester {
  id: string;
  name: string; // full name like "BS MAC"
  brand: string;
  category: "BS" | "MUA" | "MUC" | "SPA" | "DBT" | "POP" | "HSPA";
  quantity: number;
  outCount: number;
  assignedEvent: string | null;
  status: "dostępny" | "na wyjeździe" | "brak";
  nfcCode: string;
  notes: string;
}

export const mockTesters: Tester[] = [];

// ─── Stands (Stoiska) ───
export interface Stand {
  id: string;
  shortCode: string;
  fullName: string;
  description: string;
}

export const mockStands: Stand[] = [];

// ─── Content (Kontenty wideo marek) ───
export interface BrandContent {
  id: string;
  brand: string;
  notes?: string;
}

/**
 * Lista marek, dla których trzymamy kontenty.
 * Pliki wideo wrzucamy do: /public/kontenty
 *
 * Aplikacja sama szuka plików według nazwy marki + orientacji:
 *  - "MARKA pion.mp4" / "MARKA poziom.mp4"
 *  - oraz warianty z podkreślnikiem lub myślnikiem (np. MARKA_pion.mp4)
 */
export const mockBrandContent: BrandContent[] = [];

