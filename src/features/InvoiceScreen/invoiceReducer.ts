import { InvoiceAction, selectDueDateCategory } from './invoiceActions';
import { DueDateCategory } from './../../types/invoice';
import { InvoiceState } from '../../types/state';

const initialState: InvoiceState = {
  filterString: '',
  selectedDueDateCategory: DueDateCategory.ALL,
  selectedCategories: [],
  invoices: [],
};

function appReducer(
  state: InvoiceState = initialState,
  action: InvoiceAction
): InvoiceState {
  switch (action.type) {
    case 'CREATE_INVOICE':
      return {
        ...state,
        invoices: [...state.invoices, action.invoice],
      };
    case 'SELECT_DUE_DATE_CATEGORY':
      return {
        ...state,
        selectedDueDateCategory: action.dueDateCategory,
      };
    case 'FILTER_INVOICES_BY_KEYWORD':
      return {
        ...state,
        filterString: action.keyword,
      };
    default:
      return state;
  }
}

export default appReducer;
