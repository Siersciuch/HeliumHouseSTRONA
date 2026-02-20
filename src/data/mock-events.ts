import { addDays, format } from "date-fns";

export interface EventTrip {
  id: string;
  date: string; // ISO date
  standShort: string; // rodzaj stoiska: BS, MUA, MUC, SPA, DBT
  shopNumber?: string; // nr sklepu
  shopLocation?: string; // lokalizacja sklepu
  eventName?: string; // nazwa eventu/katalog (auto: "data rodzaj sklep")
  city: string;
  address?: string; // dokładny adres
  shopPhones?: string[]; // telefony do sklepu (z bazy sklepów)
  locationDescription?: string; // opis lokalizacji (przed galerią, w galerii itp.)
  eventDescription?: string; // opis eventu (stawiamy całość, ile toaletek itp.)
  dateFrom?: string; // czas trwania eventu - od
  dateTo?: string; // czas trwania eventu - do
  brands?: string[]; // marki biorące udział
  testers: string[]; // testery do zabrania
  missingTesters?: string[]; // brakujące testery
  brandContents?: string[]; // kontenty marek
  missingContents?: string[]; // brakujące kontenty
  startTimeRamp?: string; // godzina startu RAMPA
  startTimeShop?: string; // godzina startu SKLEP
  time: string; // godzina ogólna
  vehicle: string;
  vehicles?: string[]; // samochody biorące udział
  hasTrailer: boolean;
  vehicleAbsenceFrom?: string; // czas nieobecności od
  vehicleAbsenceTo?: string; // czas nieobecności do
  routeLength?: string; // długość trasy
  unloadType?: string; // czy rozładowujemy całość czy wybrane
  crew: string[];
  status: "planned" | "in-progress" | "completed" | "cancelled";
  client: string;
  // FOTY
  photos?: string[];
  boothPhotos?: string[]; // FOTO-stoisko
  fuelPhotos?: string[]; // foty tankowanie
  // szpilka do rampy (z bazy sklepów)
  rampPin?: string;
  weatherOnRoute?: string;
  // PROTOKÓŁ
  rampPathDescription?: string; // opis drogi z rampy
  notes: string; // uwagi ogólne
}

const today = new Date();

export const mockEvents: EventTrip[] = [
  {
    id: "ev1",
    standShort: "MUA",
    city: "Kraków",
    shopNumber: "1234",
    shopLocation: "Galeria Krakowska",
    eventName: "2026-02-19 MUA Galeria Krakowska",
    address: "ul. Pawia 5, 31-154 Kraków",
    shopPhones: ["+48 12 345 67 89"],
    locationDescription: "Montaż w galerii, poziom 0, wejście od strony parkingu",
    eventDescription: "Stawiamy całe stoisko MUA, 2 toaletki",
    dateFrom: format(addDays(today, -1), "yyyy-MM-dd"),
    dateTo: format(addDays(today, -1), "yyyy-MM-dd"),
    brands: ["Douglas", "Chanel", "Dior"],
    testers: ["T-001", "T-003"],
    missingTesters: [],
    brandContents: ["Plakat Chanel A1", "Roll-up Dior"],
    missingContents: [],
    startTimeRamp: "06:00",
    startTimeShop: "07:00",
    time: "07:00",
    vehicle: "Bus #1 (KR 12345)",
    vehicles: ["Bus #1 (KR 12345)"],
    hasTrailer: true,
    vehicleAbsenceFrom: format(addDays(today, -1), "yyyy-MM-dd") + " 05:00",
    vehicleAbsenceTo: format(addDays(today, -1), "yyyy-MM-dd") + " 22:00",
    routeLength: "12 km",
    unloadType: "Rozładowujemy całość",
    crew: ["Anna Nowak", "Piotr Wiśniewski"],
    status: "completed",
    client: "Evento Sp. z o.o.",
    photos: ["foto-licznik-start", "foto-testery-start", "foto-paka", "foto-rampa"],
    boothPhotos: [],
    fuelPhotos: [],
    rampPin: "Tak",
    weatherOnRoute: "Pochmurno, 2°C",
    rampPathDescription: "Winda towarowa 2x2m, bez schodów, prosto z rampy",
    notes: "Event zakończony pomyślnie",
  },
  {
    id: "ev2",
    standShort: "BAL",
    city: "Warszawa",
    shopNumber: "5678",
    shopLocation: "Złote Tarasy",
    eventName: "2026-02-20 BAL Złote Tarasy",
    address: "ul. Złota 59, 00-120 Warszawa",
    shopPhones: ["+48 22 123 45 67"],
    locationDescription: "Przed galerią, plac główny",
    eventDescription: "Stoisko balonowe, bez toaletek",
    dateFrom: format(today, "yyyy-MM-dd"),
    dateTo: format(today, "yyyy-MM-dd"),
    brands: ["Douglas"],
    testers: ["T-002"],
    missingTesters: [],
    brandContents: ["Banner Douglas 3x2m"],
    missingContents: [],
    startTimeRamp: "08:00",
    startTimeShop: "09:00",
    time: "09:00",
    vehicle: "Bus #2 (WA 67890)",
    vehicles: ["Bus #2 (WA 67890)"],
    hasTrailer: false,
    routeLength: "5 km",
    unloadType: "Rozładowujemy całość",
    crew: ["Anna Nowak"],
    status: "in-progress",
    client: "FunFair Group",
    notes: "W trakcie montażu",
  },
  {
    id: "ev3",
    standShort: "LED",
    city: "Gdańsk",
    address: "ul. Rajska 10, 80-850 Gdańsk",
    locationDescription: "W galerii, 2 piętro",
    eventDescription: "Stoisko LED pełne, 1 toaletka",
    dateFrom: format(today, "yyyy-MM-dd"),
    dateTo: format(today, "yyyy-MM-dd"),
    brands: ["Douglas", "YSL"],
    testers: ["T-001", "T-004"],
    missingTesters: ["T-006"],
    brandContents: ["LED panel YSL"],
    missingContents: ["LED panel YSL"],
    startTimeRamp: "09:30",
    startTimeShop: "10:30",
    time: "10:30",
    vehicle: "Bus #1 (KR 12345)",
    vehicles: ["Bus #1 (KR 12345)"],
    hasTrailer: true,
    routeLength: "350 km",
    unloadType: "Tylko wybrane rzeczy",
    crew: ["Piotr Wiśniewski"],
    status: "planned",
    client: "Morskie Atrakcje",
    weatherOnRoute: "Deszcz, 5°C",
    rampPathDescription: "Winda mała 1.5x1.5m, 3 schody na rampę",
    notes: "",
  },
  {
    id: "ev4",
    standShort: "MUA",
    city: "Wrocław",
    address: "ul. Świdnicka 40, 50-024 Wrocław",
    locationDescription: "Przed galerią",
    eventDescription: "Stoisko MUA kompaktowe",
    dateFrom: format(addDays(today, 1), "yyyy-MM-dd"),
    dateTo: format(addDays(today, 1), "yyyy-MM-dd"),
    brands: ["Douglas", "Lancôme"],
    testers: ["T-002", "T-003"],
    missingTesters: [],
    startTimeRamp: "05:30",
    startTimeShop: "06:30",
    time: "06:30",
    vehicle: "Bus #3 (WR 11111)",
    vehicles: ["Bus #3 (WR 11111)"],
    hasTrailer: false,
    routeLength: "180 km",
    unloadType: "Rozładowujemy całość",
    crew: ["Anna Nowak", "Piotr Wiśniewski"],
    status: "planned",
    client: "Zabawa Max",
    notes: "Klient prosi o wcześniejszy montaż",
  },
  {
    id: "ev5",
    standShort: "BAL",
    city: "Poznań",
    time: "08:00",
    vehicle: "Bus #2 (WA 67890)",
    hasTrailer: true,
    crew: ["Anna Nowak"],
    status: "planned",
    client: "Balony i Więcej",
    testers: ["T-005"],
    notes: "",
    date: format(addDays(today, 2), "yyyy-MM-dd"),
  },
  {
    id: "ev6",
    standShort: "LED",
    city: "Łódź",
    time: "11:00",
    vehicle: "Bus #1 (KR 12345)",
    hasTrailer: false,
    crew: ["Piotr Wiśniewski"],
    status: "planned",
    client: "EventPro",
    testers: ["T-001"],
    notes: "",
    date: format(addDays(today, 3), "yyyy-MM-dd"),
  },
  {
    id: "ev7",
    standShort: "MUA",
    city: "Katowice",
    time: "07:30",
    vehicle: "Bus #3 (WR 11111)",
    hasTrailer: true,
    crew: ["Anna Nowak", "Piotr Wiśniewski"],
    status: "planned",
    client: "Śląskie Eventy",
    testers: ["T-002", "T-004"],
    notes: "",
    date: format(addDays(today, 5), "yyyy-MM-dd"),
  },
];

// Ensure all events have a date field
mockEvents.forEach((ev) => {
  if (!ev.date) {
    ev.date = ev.dateFrom || format(today, "yyyy-MM-dd");
  }
});

export function getEventsByDate(date: string): EventTrip[] {
  return mockEvents.filter((e) => e.date === date);
}
