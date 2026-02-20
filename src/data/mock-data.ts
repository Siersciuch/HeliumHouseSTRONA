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
  trips: string[];
}

export const mockPeople: Person[] = [
  { id: "p1", firstName: "Paweł", lastName: "Wołowicz", name: "Paweł Wołowicz", email: "pawel.wolowiczuth@gmail.com", phone: "512 853 951", city: "Otwock", drivingLicense: "B", isAdmin: false, trips: ["ev1", "ev3"] },
  { id: "p2", firstName: "Michał", lastName: "Surma", name: "Michał Surma", email: "michal.surma@gmail.com", phone: "735 270 635", city: "Otwock", drivingLicense: "B", isAdmin: false, trips: ["ev2", "ev5"] },
  { id: "p3", firstName: "Piotr", lastName: "Szlasa", name: "Piotr Szlasa", email: "piotr_szlasa@interia.eu", phone: "503 634 739", city: "Otwock", drivingLicense: "B", isAdmin: false, trips: ["ev1", "ev4"] },
  { id: "p4", firstName: "Robert", lastName: "Zganiacz", name: "Robert Zganiacz", email: "robert.zganiacz@icloud.com", phone: "607 657 336", city: "", drivingLicense: "B,C", isAdmin: false, trips: ["ev2", "ev6", "ev7"] },
  { id: "p5", firstName: "Siersciuch", lastName: "", name: "Siersciuch", email: "rastabiba@gmail.com", phone: "733 304 709", city: "Warszawa", drivingLicense: "", isAdmin: true, trips: [] },
  { id: "p6", firstName: "Daniel", lastName: "Obsowski", name: "Daniel Obsowski", email: "d.obsowski@telemagic.com.pl", phone: "735 270 635", city: "Żyrardów", drivingLicense: "B", isAdmin: false, trips: ["ev3", "ev5"] },
  { id: "p7", firstName: "Piotr", lastName: "Kępiński", name: "Piotr Kępiński", email: "p.ludwik@outlook.com", phone: "793 376 670", city: "Żyrardów", drivingLicense: "B", isAdmin: false, trips: ["ev4"] },
  { id: "p8", firstName: "Marceli", lastName: "Paziewski", name: "Marceli Paziewski", email: "marceln958@wp.pl", phone: "506 593 884", city: "Otwock", drivingLicense: "", isAdmin: false, trips: ["ev6"] },
  { id: "p9", firstName: "Michał", lastName: "Pietrzak", name: "Michał Pietrzak", email: "extransport@vp.pl", phone: "722 024 677", city: "", drivingLicense: "", isAdmin: false, trips: ["ev7"] },
  { id: "p10", firstName: "Paweł", lastName: "Stawiński", name: "Paweł Stawiński", email: "office@heliumhouse.eu", phone: "", city: "", drivingLicense: "", isAdmin: true, trips: [] },
  { id: "p11", firstName: "Adrian", lastName: "Błażejewski", name: "Adrian Błażejewski", email: "ddrummer420@gmail.com", phone: "733 500 489", city: "Warszawa", drivingLicense: "", isAdmin: false, trips: ["ev1", "ev5"] },
  { id: "p12", firstName: "David", lastName: "Yaremchuk", name: "David Yaremchuk", email: "dawidjaremczuk1@gmail.com", phone: "884 006 914", city: "Warszawa", drivingLicense: "", isAdmin: false, trips: ["ev2"] },
  { id: "p13", firstName: "Artur", lastName: "Boroń", name: "Artur Boroń", email: "arturboron06@gmail.com", phone: "881 229 433", city: "Wołomin", drivingLicense: "B", isAdmin: false, trips: ["ev3", "ev7"] },
  { id: "p14", firstName: "Tymon", lastName: "Celmer", name: "Tymon Celmer", email: "tymoteusz.celmer@gmail.com", phone: "518 255 045", city: "Warszawa", drivingLicense: "B", isAdmin: false, trips: ["ev4", "ev6"] },
  { id: "p15", firstName: "Nazarii", lastName: "Yaremchuk", name: "Nazarii Yaremchuk", email: "nazarjaremczuk87@gmail.com", phone: "453 670 194", city: "Warszawa", drivingLicense: "B", isAdmin: false, trips: [] },
  { id: "p16", firstName: "Piotr", lastName: "Kozyrski", name: "Piotr Kozyrski", email: "p.kozyrski@heliumhouse.eu", phone: "733 304 709", city: "Warszawa", drivingLicense: "", isAdmin: true, trips: [] },
  { id: "p17", firstName: "Ryszard", lastName: "Kot", name: "Ryszard Kot", email: "r.kot@heliumhouse.eu", phone: "500 444 283", city: "Warszawa", drivingLicense: "B", isAdmin: true, trips: [] },
  { id: "p18", firstName: "Kuba", lastName: "Wnęk", name: "Kuba Wnęk", email: "kw_72@wp.pl", phone: "501 193 606", city: "Warszawa", drivingLicense: "B", isAdmin: false, trips: ["ev5", "ev7"] },
  { id: "p19", firstName: "Przemek", lastName: "Kępiński", name: "Przemek Kępiński", email: "", phone: "732 925 753", city: "Żyrardów", drivingLicense: "B,C,E", isAdmin: false, trips: ["ev6"] },
  { id: "p20", firstName: "Mariusz", lastName: "Perszon", name: "Mariusz Perszon", email: "mapers@op.pl", phone: "604 323 321", city: "Otwock", drivingLicense: "", isAdmin: false, trips: [] },
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
  brand: string;
  category: "BS" | "MUA" | "MUC" | "SPA" | "DBT" | "POP";
  quantity: number;
  outCount: number;
  assignedEvent: string | null;
  status: "dostępny" | "na wyjeździe" | "brak";
}

export const mockTesters: Tester[] = [
  // BS
  { id: "t1", brand: "MAC", category: "BS", quantity: 2, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t2", brand: "Estée Lauder", category: "BS", quantity: 6, outCount: 2, assignedEvent: "ev2", status: "na wyjeździe" },
  { id: "t3", brand: "YSL", category: "BS", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t4", brand: "Lancôme", category: "BS", quantity: 5, outCount: 1, assignedEvent: "ev3", status: "na wyjeździe" },
  { id: "t5", brand: "Douglas", category: "BS", quantity: 2, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t6", brand: "Giorgio Armani", category: "BS", quantity: 4, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t7", brand: "By Terry", category: "BS", quantity: 2, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t8", brand: "Laura Mercier", category: "BS", quantity: 0, outCount: 0, assignedEvent: null, status: "brak" },
  { id: "t9", brand: "Bobbi Brown", category: "BS", quantity: 0, outCount: 0, assignedEvent: null, status: "brak" },
  { id: "t10", brand: "Guerlain", category: "BS", quantity: 0, outCount: 0, assignedEvent: null, status: "brak" },
  { id: "t11", brand: "Clarins", category: "BS", quantity: 0, outCount: 0, assignedEvent: null, status: "brak" },
  { id: "t12", brand: "Clinique", category: "BS", quantity: 1, outCount: 0, assignedEvent: null, status: "dostępny" },
  // MUA
  { id: "t13", brand: "Lancôme", category: "MUA", quantity: 5, outCount: 2, assignedEvent: "ev1", status: "na wyjeździe" },
  { id: "t14", brand: "YSL", category: "MUA", quantity: 4, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t15", brand: "Estée Lauder", category: "MUA", quantity: 4, outCount: 1, assignedEvent: "ev4", status: "na wyjeździe" },
  { id: "t16", brand: "Bobbi Brown", category: "MUA", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t17", brand: "Giorgio Armani", category: "MUA", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t18", brand: "By Terry", category: "MUA", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t19", brand: "Clinique", category: "MUA", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t20", brand: "Dior", category: "MUA", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t21", brand: "MAC", category: "MUA", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t22", brand: "Douglas", category: "MUA", quantity: 3, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t23", brand: "Bare Minerals", category: "MUA", quantity: 0, outCount: 0, assignedEvent: null, status: "brak" },
  { id: "t24", brand: "Clarins", category: "MUA", quantity: 2, outCount: 0, assignedEvent: null, status: "dostępny" },
  // MUC
  { id: "t25", brand: "Clarins", category: "MUC", quantity: 2, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t26", brand: "Lancôme", category: "MUC", quantity: 0, outCount: 0, assignedEvent: null, status: "brak" },
  { id: "t27", brand: "Clinique", category: "MUC", quantity: 1, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t28", brand: "Estée Lauder", category: "MUC", quantity: 1, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t29", brand: "Douglas", category: "MUC", quantity: 2, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t30", brand: "Giorgio Armani", category: "MUC", quantity: 0, outCount: 0, assignedEvent: null, status: "brak" },
  { id: "t31", brand: "YSL", category: "MUC", quantity: 0, outCount: 0, assignedEvent: null, status: "brak" },
  { id: "t32", brand: "Dior", category: "MUC", quantity: 4, outCount: 0, assignedEvent: null, status: "dostępny" },
  { id: "t33", brand: "Art Deco", category: "MUC", quantity: 1, outCount: 0, assignedEvent: null, status: "dostępny" },
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
