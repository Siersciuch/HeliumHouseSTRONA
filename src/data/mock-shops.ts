// Uwaga: Ten plik celowo NIE zawiera żadnych danych przykładowych.
// Jest tylko typowaniem + pustą listą, dopóki nie podepniemy prawdziwej bazy / API.

export interface Shop {
  id: string;
  branchNo: number;
  gallery: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  phone2: string;
  hours: string;
  hasRamp: boolean;
  hasElevator: boolean;
  distance: string;
  travelTime: string;
  notes: string;
}

export const mockShops: Shop[] = [];
