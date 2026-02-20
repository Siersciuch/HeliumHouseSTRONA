import { addDays, format } from "date-fns";

export interface EventTrip {
  id: string;
  standShort: string;
  city: string;
  hasTrailer: boolean;
  status: "planned" | "in-progress" | "completed" | "cancelled";
  client: string;
  crew: string[];
  vehicle: string;
  testers: string[];
  notes: string;
  date: string; // ISO
}

const today = new Date();

export const mockEvents: EventTrip[] = [
  {
    id: "ev1",
    standShort: "MUA",
    city: "Kraków",
    hasTrailer: true,
    status: "completed",
    client: "Evento Sp. z o.o.",
    crew: ["Anna Nowak", "Piotr Wiśniewski"],
    vehicle: "Bus #1 (KR 12345)",
    testers: ["T-001", "T-003"],
    notes: "Event zakończony pomyślnie",
    date: format(addDays(today, -1), "yyyy-MM-dd"),
  },
  {
    id: "ev2",
    standShort: "BAL",
    city: "Warszawa",
    hasTrailer: false,
    status: "in-progress",
    client: "FunFair Group",
    crew: ["Anna Nowak"],
    vehicle: "Bus #2 (WA 67890)",
    testers: ["T-002"],
    notes: "W trakcie montażu",
    date: format(today, "yyyy-MM-dd"),
  },
  {
    id: "ev3",
    standShort: "LED",
    city: "Gdańsk",
    hasTrailer: true,
    status: "planned",
    client: "Morskie Atrakcje",
    crew: ["Piotr Wiśniewski"],
    vehicle: "Bus #1 (KR 12345)",
    testers: ["T-001", "T-004"],
    notes: "",
    date: format(today, "yyyy-MM-dd"),
  },
  {
    id: "ev4",
    standShort: "MUA",
    city: "Wrocław",
    hasTrailer: false,
    status: "planned",
    client: "Zabawa Max",
    crew: ["Anna Nowak", "Piotr Wiśniewski"],
    vehicle: "Bus #3 (WR 11111)",
    testers: ["T-002", "T-003"],
    notes: "Klient prosi o wcześniejszy montaż",
    date: format(addDays(today, 1), "yyyy-MM-dd"),
  },
  {
    id: "ev5",
    standShort: "BAL",
    city: "Poznań",
    hasTrailer: true,
    status: "planned",
    client: "Balony i Więcej",
    crew: ["Anna Nowak"],
    vehicle: "Bus #2 (WA 67890)",
    testers: ["T-005"],
    notes: "",
    date: format(addDays(today, 2), "yyyy-MM-dd"),
  },
  {
    id: "ev6",
    standShort: "LED",
    city: "Łódź",
    hasTrailer: false,
    status: "planned",
    client: "EventPro",
    crew: ["Piotr Wiśniewski"],
    vehicle: "Bus #1 (KR 12345)",
    testers: ["T-001"],
    notes: "",
    date: format(addDays(today, 3), "yyyy-MM-dd"),
  },
  {
    id: "ev7",
    standShort: "MUA",
    city: "Katowice",
    hasTrailer: true,
    status: "planned",
    client: "Śląskie Eventy",
    crew: ["Anna Nowak", "Piotr Wiśniewski"],
    vehicle: "Bus #3 (WR 11111)",
    testers: ["T-002", "T-004"],
    notes: "",
    date: format(addDays(today, 5), "yyyy-MM-dd"),
  },
];

export function getEventsByDate(date: string): EventTrip[] {
  return mockEvents.filter((e) => e.date === date);
}
