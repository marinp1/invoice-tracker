import * as Icons from '@fortawesome/free-solid-svg-icons';

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

export const categoryToIcon = (category: Category): Icons.IconDefinition => {
  switch (category) {
    case Category.Electricity:
      return Icons.faLightbulb;
    case Category.Soccer:
      return Icons.faFutbol;
    case Category.Water:
      return Icons.faWater;
    case Category.Event:
      return Icons.faTicketAlt;
    case Category.Rent:
      return Icons.faHome;
    case Category.Friend:
      return Icons.faUser;
    case Category.Internet:
      return Icons.faEthernet;
    default:
      return Icons.faTag;
  }
};

export interface Invoice {
  id: string;
  category: Category;
  companyName: string;
  amount: number; // cents
  dueDate: string;
}
