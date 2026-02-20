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

export const mockEvents: EventTrip[] = [];

export function getEventsByDate(date: string): EventTrip[] {
  return mockEvents.filter((e) => e.date === date);
}
