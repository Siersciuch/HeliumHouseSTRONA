import { format, addDays } from "date-fns";

const today = new Date();

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

export const mockPeople: Person[] = [
  { id: "p1", firstName: "Paweł", lastName: "Wołowicz", name: "Paweł Wołowicz", email: "pawel.wolowiczuth@gmail.com", phone: "512 853 951", city: "Otwock", drivingLicense: "B", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: ["ev1", "ev3"] },
  { id: "p2", firstName: "Michał", lastName: "Surma", name: "Michał Surma", email: "michal.surma@gmail.com", phone: "735 270 635", city: "Otwock", drivingLicense: "B", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: ["ev2", "ev5"] },
  { id: "p3", firstName: "Piotr", lastName: "Szlasa", name: "Piotr Szlasa", email: "piotr_szlasa@interia.eu", phone: "503 634 739", city: "Otwock", drivingLicense: "B", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: ["ev1", "ev4"] },
  { id: "p4", firstName: "Robert", lastName: "Zganiacz", name: "Robert Zganiacz", email: "robert.zganiacz@icloud.com", phone: "607 657 336", city: "", drivingLicense: "B,C", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: ["ev2", "ev6", "ev7"] },
  { id: "p5", firstName: "Siersciuch", lastName: "", name: "Siersciuch", email: "rastabiba@gmail.com", phone: "733 304 709", city: "Warszawa", drivingLicense: "", isAdmin: true, hasKeys: true, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: [] },
  { id: "p6", firstName: "Daniel", lastName: "Obsowski", name: "Daniel Obsowski", email: "d.obsowski@telemagic.com.pl", phone: "735 270 635", city: "Żyrardów", drivingLicense: "B", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: ["ev3", "ev5"] },
  { id: "p7", firstName: "Piotr", lastName: "Kępiński", name: "Piotr Kępiński", email: "p.ludwik@outlook.com", phone: "793 376 670", city: "Żyrardów", drivingLicense: "B", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: ["ev4"] },
  { id: "p8", firstName: "Marceli", lastName: "Paziewski", name: "Marceli Paziewski", email: "marceln958@wp.pl", phone: "506 593 884", city: "Otwock", drivingLicense: "", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: ["ev6"] },
  { id: "p9", firstName: "Michał", lastName: "Pietrzak", name: "Michał Pietrzak", email: "extransport@vp.pl", phone: "722 024 677", city: "", drivingLicense: "", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: ["ev7"] },
  { id: "p10", firstName: "Paweł", lastName: "Stawiński", name: "Paweł Stawiński", email: "office@heliumhouse.eu", phone: "", city: "", drivingLicense: "", isAdmin: true, hasKeys: true, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: [] },
  { id: "p11", firstName: "Adrian", lastName: "Błażejewski", name: "Adrian Błażejewski", email: "ddrummer420@gmail.com", phone: "733 500 489", city: "Warszawa", drivingLicense: "", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: ["ev1", "ev5"] },
  { id: "p12", firstName: "David", lastName: "Yaremchuk", name: "David Yaremchuk", email: "dawidjaremczuk1@gmail.com", phone: "884 006 914", city: "Warszawa", drivingLicense: "", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: ["ev2"] },
  { id: "p13", firstName: "Artur", lastName: "Boroń", name: "Artur Boroń", email: "arturboron06@gmail.com", phone: "881 229 433", city: "Wołomin", drivingLicense: "B", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: ["ev3", "ev7"] },
  { id: "p14", firstName: "Tymon", lastName: "Celmer", name: "Tymon Celmer", email: "tymoteusz.celmer@gmail.com", phone: "518 255 045", city: "Warszawa", drivingLicense: "B", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: ["ev4", "ev6"] },
  { id: "p15", firstName: "Nazarii", lastName: "Yaremchuk", name: "Nazarii Yaremchuk", email: "nazarjaremczuk87@gmail.com", phone: "453 670 194", city: "Warszawa", drivingLicense: "B", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: [] },
  { id: "p16", firstName: "Piotr", lastName: "Kozyrski", name: "Piotr Kozyrski", email: "p.kozyrski@heliumhouse.eu", phone: "733 304 709", city: "Warszawa", drivingLicense: "", isAdmin: true, hasKeys: true, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: [] },
  { id: "p17", firstName: "Ryszard", lastName: "Kot", name: "Ryszard Kot", email: "r.kot@heliumhouse.eu", phone: "500 444 283", city: "Warszawa", drivingLicense: "B", isAdmin: true, hasKeys: true, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: [] },
  { id: "p18", firstName: "Kuba", lastName: "Wnęk", name: "Kuba Wnęk", email: "kw_72@wp.pl", phone: "501 193 606", city: "Warszawa", drivingLicense: "B", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: ["ev5", "ev7"] },
  { id: "p19", firstName: "Przemek", lastName: "Kępiński", name: "Przemek Kępiński", email: "", phone: "732 925 753", city: "Żyrardów", drivingLicense: "B,C,E", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: ["ev6"] },
  { id: "p20", firstName: "Mariusz", lastName: "Perszon", name: "Mariusz Perszon", email: "mapers@op.pl", phone: "604 323 321", city: "Otwock", drivingLicense: "", isAdmin: false, hasKeys: false, electricalCert: false, heightCert: false, twoFA: false, devices: "", lastLogin: "", notes: "", trips: [] },
];

// ─── Vehicles (Flota) ───
export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  type: "bus" | "przyczepa" | "autobus" | "samochód";
  status: "dostępny" | "w trasie" | "serwis";
  nextService: string;
  trips: string[];
}

export const mockVehicles: Vehicle[] = [
  { id: "v1", name: "Fiat Ducato 3,5t", plate: "WZ 448HF", type: "bus", status: "w trasie", nextService: format(addDays(today, 30), "yyyy-MM-dd"), trips: ["ev1", "ev3", "ev6"] },
  { id: "v2", name: "Fiat Ducato 3,5t", plate: "WZ 449HF", type: "bus", status: "w trasie", nextService: format(addDays(today, 45), "yyyy-MM-dd"), trips: ["ev2", "ev5"] },
  { id: "v3", name: "Fiat Ducato 3,5t", plate: "WZ 314HG", type: "bus", status: "dostępny", nextService: format(addDays(today, 15), "yyyy-MM-dd"), trips: ["ev4", "ev7"] },
  { id: "v4", name: "Renault Master 3,5t", plate: "WW 418GR", type: "bus", status: "dostępny", nextService: format(addDays(today, 60), "yyyy-MM-dd"), trips: ["ev1"] },
  { id: "v5", name: "Iveco 7,2t", plate: "WZ 325HF", type: "bus", status: "dostępny", nextService: format(addDays(today, 20), "yyyy-MM-dd"), trips: ["ev5"] },
  { id: "v6", name: "Skoda", plate: "", type: "samochód", status: "dostępny", nextService: format(addDays(today, 90), "yyyy-MM-dd"), trips: [] },
  { id: "v7", name: "Autobus", plate: "", type: "autobus", status: "serwis", nextService: format(addDays(today, 10), "yyyy-MM-dd"), trips: ["ev7"] },
  { id: "v8", name: "Duża Przyczepa", plate: "", type: "przyczepa", status: "dostępny", nextService: format(addDays(today, 50), "yyyy-MM-dd"), trips: ["ev1", "ev3"] },
  { id: "v9", name: "Przyczepa", plate: "", type: "przyczepa", status: "w trasie", nextService: format(addDays(today, 40), "yyyy-MM-dd"), trips: ["ev2", "ev6"] },
];

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

export const mockTesters: Tester[] = [
  // BS
  { id: "t1", name: "BS MAC", brand: "MAC", category: "BS", quantity: 2, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t2", name: "BS Estée Lauder", brand: "Estée Lauder", category: "BS", quantity: 6, outCount: 2, assignedEvent: "ev2", status: "na wyjeździe", nfcCode: "", notes: "" },
  { id: "t3", name: "BS YSL", brand: "YSL", category: "BS", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t4", name: "BS Lancôme", brand: "Lancôme", category: "BS", quantity: 5, outCount: 1, assignedEvent: "ev3", status: "na wyjeździe", nfcCode: "", notes: "" },
  { id: "t5", name: "BS Douglas", brand: "Douglas", category: "BS", quantity: 2, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t6", name: "BS Giorgio Armani", brand: "Giorgio Armani", category: "BS", quantity: 4, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t7", name: "BS By Terry", brand: "By Terry", category: "BS", quantity: 2, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t8", name: "BS Laura Mercier", brand: "Laura Mercier", category: "BS", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t9", name: "BS Bobbi Brown", brand: "Bobbi Brown", category: "BS", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t10", name: "BS Guerlain", brand: "Guerlain", category: "BS", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t11", name: "BS Clarins", brand: "Clarins", category: "BS", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t12", name: "BS Clinique", brand: "Clinique", category: "BS", quantity: 1, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  // MUA
  { id: "t13", name: "MUA Lancôme", brand: "Lancôme", category: "MUA", quantity: 5, outCount: 2, assignedEvent: "ev1", status: "na wyjeździe", nfcCode: "", notes: "" },
  { id: "t14", name: "MUA YSL", brand: "YSL", category: "MUA", quantity: 4, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t15", name: "MUA Estée Lauder", brand: "Estée Lauder", category: "MUA", quantity: 4, outCount: 1, assignedEvent: "ev4", status: "na wyjeździe", nfcCode: "", notes: "" },
  { id: "t16", name: "MUA Bobbi Brown", brand: "Bobbi Brown", category: "MUA", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t17", name: "MUA Giorgio Armani", brand: "Giorgio Armani", category: "MUA", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t18", name: "MUA By Terry", brand: "By Terry", category: "MUA", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t19", name: "MUA Clinique", brand: "Clinique", category: "MUA", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t20", name: "MUA Dior", brand: "Dior", category: "MUA", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t21", name: "MUA MAC", brand: "MAC", category: "MUA", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t22", name: "MUA Douglas", brand: "Douglas", category: "MUA", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t23", name: "MUA Bare Minerals", brand: "Bare Minerals", category: "MUA", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t24", name: "MUA Clarins", brand: "Clarins", category: "MUA", quantity: 2, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  // MUC
  { id: "t25", name: "MUC Clarins", brand: "Clarins", category: "MUC", quantity: 2, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t26", name: "MUC Lancôme", brand: "Lancôme", category: "MUC", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t27", name: "MUC Clinique", brand: "Clinique", category: "MUC", quantity: 1, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t28", name: "MUC Estée Lauder", brand: "Estée Lauder", category: "MUC", quantity: 1, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t29", name: "MUC Douglas", brand: "Douglas", category: "MUC", quantity: 2, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t30", name: "MUC Giorgio Armani", brand: "Giorgio Armani", category: "MUC", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t31", name: "MUC YSL", brand: "YSL", category: "MUC", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t32", name: "MUC Dior", brand: "Dior", category: "MUC", quantity: 4, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  { id: "t33", name: "MUC Art Deco", brand: "Art Deco", category: "MUC", quantity: 1, outCount: 0, assignedEvent: null, status: "dostępny", nfcCode: "", notes: "" },
  // POP
  { id: "t34", name: "POP MAC", brand: "MAC", category: "POP", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t35", name: "POP Estée Lauder", brand: "Estée Lauder", category: "POP", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t36", name: "POP YSL", brand: "YSL", category: "POP", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t37", name: "POP Lancôme", brand: "Lancôme", category: "POP", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t38", name: "POP Douglas", brand: "Douglas", category: "POP", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t39", name: "POP Giorgio Armani", brand: "Giorgio Armani", category: "POP", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t40", name: "POP By Terry", brand: "By Terry", category: "POP", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t41", name: "POP Laura Mercier", brand: "Laura Mercier", category: "POP", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t42", name: "POP Bobbi Brown", brand: "Bobbi Brown", category: "POP", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t43", name: "POP Guerlain", brand: "Guerlain", category: "POP", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t44", name: "POP Clarins", brand: "Clarins", category: "POP", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
  { id: "t45", name: "POP Clinique", brand: "Clinique", category: "POP", quantity: 0, outCount: 0, assignedEvent: null, status: "brak", nfcCode: "", notes: "" },
];

// ─── Stands (Stoiska) ───
export interface Stand {
  id: string;
  shortCode: string;
  fullName: string;
  description: string;
}

export const mockStands: Stand[] = [
  { id: "s1", shortCode: "BS", fullName: "Stoisko Beauty Street", description: "Główne stoisko eventowe Beauty Street" },
  { id: "s2", shortCode: "BS POP UP", fullName: "Stoisko BS Pop Up", description: "Mniejsza wersja stoiska Beauty Street w formie pop-up" },
  { id: "s3", shortCode: "MUA", fullName: "Stoisko MUA", description: "Stoisko makijażowe MUA" },
  { id: "s4", shortCode: "MUC", fullName: "Stoisko MUC", description: "Stoisko makijażowe MUC" },
  { id: "s5", shortCode: "SPA1", fullName: "Stoisko SPA 1", description: "Stoisko SPA — wariant 1" },
  { id: "s6", shortCode: "SPA2", fullName: "Stoisko SPA 2", description: "Stoisko SPA — wariant 2" },
  { id: "s7", shortCode: "DBT1", fullName: "Stoisko DBT 1", description: "Stoisko DBT — wariant 1" },
  { id: "s8", shortCode: "DBT2", fullName: "Stoisko DBT 2", description: "Stoisko DBT — wariant 2" },
  { id: "s9", shortCode: "DBT3", fullName: "Stoisko DBT 3", description: "Stoisko DBT — wariant 3" },
  { id: "s10", shortCode: "HSPA", fullName: "Stoisko HSPA", description: "Stoisko HSPA" },
  { id: "s11", shortCode: "SCHWARZKOPF", fullName: "Stoisko Schwarzkopf", description: "Stoisko dedykowane marce Schwarzkopf" },
  { id: "s12", shortCode: "KIMOCO", fullName: "Stoisko Kimoco", description: "Stoisko Kimoco" },
  { id: "s13", shortCode: "AUTOBUS", fullName: "Stoisko Autobus", description: "Stoisko w formie autobusu" },
  { id: "s14", shortCode: "DMUCHAŃCE", fullName: "Stoisko Dmuchańce", description: "Stoisko z dmuchańcami" },
  { id: "s15", shortCode: "MUDI", fullName: "Stoisko Mudi", description: "Stoisko Mudi" },
  { id: "s16", shortCode: "NEST", fullName: "Stoisko Nest", description: "Stoisko Nest" },
  { id: "s17", shortCode: "ONE TWO FREE", fullName: "Stoisko One Two Free", description: "Stoisko One Two Free" },
  { id: "s18", shortCode: "FRYZJER", fullName: "Stoisko Fryzjer", description: "Stoisko fryzjerskie" },
  { id: "s19", shortCode: "BARBER", fullName: "Stoisko Barber", description: "Stoisko barberskie" },
  { id: "s20", shortCode: "ROSSMAN", fullName: "Stoisko Rossman", description: "Stoisko dedykowane sieci Rossman" },
  { id: "s21", shortCode: "OMEGA", fullName: "Stoisko Omega", description: "Stoisko Omega" },
];

// ─── Content (Kontenty wideo marek) ───
export interface BrandContent {
  id: string;
  brand: string;
  hasVertical: boolean;
  hasHorizontal: boolean;
  notes: string;
}

export const mockBrandContent: BrandContent[] = [
  { id: "bc1", brand: "MAC", hasVertical: true, hasHorizontal: true, notes: "" },
  { id: "bc2", brand: "Estée Lauder", hasVertical: true, hasHorizontal: true, notes: "" },
  { id: "bc3", brand: "YSL", hasVertical: true, hasHorizontal: false, notes: "Brak wersji poziomej" },
  { id: "bc4", brand: "Lancôme", hasVertical: true, hasHorizontal: true, notes: "" },
  { id: "bc5", brand: "Douglas", hasVertical: true, hasHorizontal: true, notes: "" },
  { id: "bc6", brand: "Giorgio Armani", hasVertical: false, hasHorizontal: true, notes: "Brak wersji pionowej" },
  { id: "bc7", brand: "By Terry", hasVertical: true, hasHorizontal: true, notes: "" },
  { id: "bc8", brand: "Laura Mercier", hasVertical: false, hasHorizontal: false, notes: "Brak kontentów" },
  { id: "bc9", brand: "Bobbi Brown", hasVertical: true, hasHorizontal: true, notes: "" },
  { id: "bc10", brand: "Guerlain", hasVertical: false, hasHorizontal: false, notes: "Brak kontentów" },
  { id: "bc11", brand: "Clarins", hasVertical: true, hasHorizontal: true, notes: "" },
  { id: "bc12", brand: "Clinique", hasVertical: true, hasHorizontal: true, notes: "" },
  { id: "bc13", brand: "Dior", hasVertical: true, hasHorizontal: true, notes: "" },
  { id: "bc14", brand: "Bare Minerals", hasVertical: false, hasHorizontal: false, notes: "Brak kontentów" },
  { id: "bc15", brand: "Art Deco", hasVertical: true, hasHorizontal: false, notes: "" },
  { id: "bc16", brand: "Schwarzkopf", hasVertical: true, hasHorizontal: true, notes: "" },
];