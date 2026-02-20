/**
 * API Abstraction Layer — Events
 * 
 * Currently returns mock data.
 * Replace with fetch() calls to your REST API.
 * 
 * Example future usage:
 *   const BASE = "https://your-server.com/api";
 *   export async function fetchEvents() { return fetch(`${BASE}/events`).then(r => r.json()); }
 */

import { mockEvents, getEventsByDate, type EventTrip } from "@/data/mock-events";

export type { EventTrip };

export async function fetchAllEvents(): Promise<EventTrip[]> {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 200));
  return mockEvents;
}

export async function fetchEventsByDate(date: string): Promise<EventTrip[]> {
  await new Promise((r) => setTimeout(r, 100));
  return getEventsByDate(date);
}

export async function fetchEventById(id: string): Promise<EventTrip | undefined> {
  await new Promise((r) => setTimeout(r, 100));
  return mockEvents.find((e) => e.id === id);
}
