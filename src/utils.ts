import { Category, DueDateCategory } from './types/invoice';
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
