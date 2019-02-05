import moment from 'moment';
import { Category, DueDateCategory, Invoice } from './types/invoice';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { COLORS } from './styles';

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

export const mapDueDateCategoryToColor = (dueDateCategory: DueDateCategory) => {
  switch (dueDateCategory) {
    case DueDateCategory.ALL:
      return COLORS.PURE_BLACK;
    case DueDateCategory.UNPAID:
      return COLORS.MAIN_BLACK;
    case DueDateCategory.TODAY:
      return COLORS.MAIN_RED;
    case DueDateCategory.NEXT_5_DAYS:
      return COLORS.YELLOW;
    case DueDateCategory.NEXT_20_DAYS:
      return COLORS.MAIN_BLUE;
    case DueDateCategory.LATER:
      return COLORS.DARK_BLUE;
    case DueDateCategory.PAID:
      return COLORS.GREEN;
  }
};

export const filterInvoices = (
  dueDateCategory: DueDateCategory,
  invoice: Invoice
) => {
  if (dueDateCategory === DueDateCategory.ALL) {
    return true;
  }

  if (dueDateCategory === DueDateCategory.UNPAID) {
    return !invoice.paid;
  }

  if (dueDateCategory === DueDateCategory.PAID) {
    return invoice.paid;
  }

  if (invoice.paid) return false;

  const now = moment();
  const dueDate = moment(invoice.dueDate);
  const diff = Math.ceil(
    moment.duration(dueDate.startOf('day').diff(now.startOf('day'))).asDays()
  );

  if (dueDateCategory === DueDateCategory.TODAY) {
    return diff <= 1;
  }

  if (dueDateCategory === DueDateCategory.NEXT_5_DAYS) {
    return diff <= 5;
  }

  if (dueDateCategory === DueDateCategory.NEXT_20_DAYS) {
    return diff <= 20;
  }

  if (dueDateCategory === DueDateCategory.LATER) {
    return diff > 20;
  }
};
