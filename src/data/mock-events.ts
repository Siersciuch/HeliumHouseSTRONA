import { addDays, format } from "date-fns";

export interface EventTrip {
  id: string;
  date: string;
  standShort: string; // BS, MUA, MUC, SPA, DBT
  shopNumber: string;
  shopLocation: string;
  eventName: string; // auto: "data rodzaj sklep/lokalizacja"
  city: string;
  address: string;
  shopPhones: string[];
  locationDescription: string;
  eventDescription: string;
  dateFrom: string;
  dateTo: string;
  brands: string[];
  testers: string[];
  missingTesters: string[];
  brandContents: string[];
  missingContents: string[];
  startTimeRamp: string;
  startTimeShop: string;
  time: string;
  vehicle: string;
  vehicles: string[];
  hasTrailer: boolean;
  vehicleAbsenceFrom: string;
  vehicleAbsenceTo: string;
  routeLength: string;
  unloadType: string;
  crew: string[];
  status: "planned" | "in-progress" | "completed" | "cancelled";
  client: string;
  photos: string[];
  boothPhotos: string[];
  fuelPhotos: string[];
  rampPin: string;
  weatherOnRoute: string;
  rampPathDescription: string;
  notes: string;
}

function emptyEvent(partial: Partial<EventTrip> & { id: string; date: string }): EventTrip {
  return {
    standShort: "",
    shopNumber: "",
    shopLocation: "",
    eventName: "",
    city: "",
    address: "",
    shopPhones: [],
    locationDescription: "",
    eventDescription: "",
    dateFrom: "",
    dateTo: "",
    brands: [],
    testers: [],
    missingTesters: [],
    brandContents: [],
    missingContents: [],
    startTimeRamp: "",
    startTimeShop: "",
    time: "",
    vehicle: "",
    vehicles: [],
    hasTrailer: false,
    vehicleAbsenceFrom: "",
    vehicleAbsenceTo: "",
    routeLength: "",
    unloadType: "",
    crew: [],
    status: "planned",
    client: "",
    photos: [],
    boothPhotos: [],
    fuelPhotos: [],
    rampPin: "",
    weatherOnRoute: "",
    rampPathDescription: "",
    notes: "",
    ...partial,
  };
}

const today = new Date();

export const mockEvents: EventTrip[] = [
  emptyEvent({
    id: "ev1",
    date: format(addDays(today, -1), "yyyy-MM-dd"),
    standShort: "MUA",
    city: "Kraków",
    time: "07:00",
    vehicle: "Bus #1 (KR 12345)",
    hasTrailer: true,
    crew: ["Anna Nowak", "Piotr Wiśniewski"],
    status: "completed",
    client: "Evento Sp. z o.o.",
    testers: ["T-001", "T-003"],
  }),
  emptyEvent({
    id: "ev2",
    date: format(today, "yyyy-MM-dd"),
    standShort: "BAL",
    city: "Warszawa",
    time: "09:00",
    vehicle: "Bus #2 (WA 67890)",
    hasTrailer: false,
    crew: ["Anna Nowak"],
    status: "in-progress",
    client: "FunFair Group",
    testers: ["T-002"],
  }),
  emptyEvent({
    id: "ev3",
    date: format(today, "yyyy-MM-dd"),
    standShort: "LED",
    city: "Gdańsk",
    time: "10:30",
    vehicle: "Bus #1 (KR 12345)",
    hasTrailer: true,
    crew: ["Piotr Wiśniewski"],
    status: "planned",
    client: "Morskie Atrakcje",
    testers: ["T-001", "T-004"],
  }),
  emptyEvent({
    id: "ev4",
    date: format(addDays(today, 1), "yyyy-MM-dd"),
    standShort: "MUA",
    city: "Wrocław",
    time: "06:30",
    vehicle: "Bus #3 (WR 11111)",
    hasTrailer: false,
    crew: ["Anna Nowak", "Piotr Wiśniewski"],
    status: "planned",
    client: "Zabawa Max",
    testers: ["T-002", "T-003"],
  }),
  emptyEvent({
    id: "ev5",
    date: format(addDays(today, 2), "yyyy-MM-dd"),
    standShort: "BAL",
    city: "Poznań",
    time: "08:00",
    vehicle: "Bus #2 (WA 67890)",
    hasTrailer: true,
    crew: ["Anna Nowak"],
    status: "planned",
    client: "Balony i Więcej",
    testers: ["T-005"],
  }),
  emptyEvent({
    id: "ev6",
    date: format(addDays(today, 3), "yyyy-MM-dd"),
    standShort: "LED",
    city: "Łódź",
    time: "11:00",
    vehicle: "Bus #1 (KR 12345)",
    hasTrailer: false,
    crew: ["Piotr Wiśniewski"],
    status: "planned",
    client: "EventPro",
    testers: ["T-001"],
  }),
  emptyEvent({
    id: "ev7",
    date: format(addDays(today, 5), "yyyy-MM-dd"),
    standShort: "MUA",
    city: "Katowice",
    time: "07:30",
    vehicle: "Bus #3 (WR 11111)",
    hasTrailer: true,
    crew: ["Anna Nowak", "Piotr Wiśniewski"],
    status: "planned",
    client: "Śląskie Eventy",
    testers: ["T-002", "T-004"],
  }),
];

export function getEventsByDate(date: string): EventTrip[] {
  return mockEvents.filter((e) => e.date === date);
}
