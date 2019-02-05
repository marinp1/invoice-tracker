export enum Category {
  Electricity = 'Electricity',
  Soccer = 'Soccer',
  Water = 'Water',
  Event = 'Event',
  Rent = 'Rent',
  Friend = 'Friend',
  Internet = 'Internet',
  Misc = 'Miscellaneous',
}

export enum DueDateCategory {
  ALL = 'All',
  UNPAID = 'All unpaid',
  TODAY = 'Today',
  NEXT_5_DAYS = 'Next 5 days',
  NEXT_20_DAYS = 'Next 20 days',
  LATER = 'Later',
  PAID = 'Paid',
}

export interface Invoice {
  id: string;
  category: Category;
  companyName: string;
  amount: number; // cents
  dueDate: string;
  paid: boolean;
  iban: string | null;
  reference: string | null;
  message: string | null;
}

export type OpenInvoice = Invoice & {
  unsavedChanges: boolean;
  name: string;
};
