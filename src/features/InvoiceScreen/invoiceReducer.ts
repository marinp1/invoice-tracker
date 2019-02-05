import { InvoiceAction } from './invoiceActions';
import { DueDateCategory, Category } from './../../types/invoice';
import { InvoiceState } from '../../types/state';

import _ from 'lodash';

const initialState: InvoiceState = {
  apiCallInProgress: false,
  filterString: '',
  selectedDueDateCategory: DueDateCategory.ALL,
  selectedCategories: [],
  invoices: [],
  openInvoices: [],
  selectedInvoiceId: null,
};

function appReducer(
  state: InvoiceState = initialState,
  action: InvoiceAction
): InvoiceState {
  switch (action.type) {
    case 'START_API_CALL': {
      return {
        ...state,
        apiCallInProgress: true,
      };
    }
    case 'END_API_CALL': {
      return {
        ...state,
        apiCallInProgress: false,
      };
    }
    case 'CLEAR_INVOICES': {
      return {
        ...state,
        invoices: [],
      };
    }
    case 'FETCH_INVOICES': {
      return {
        ...state,
        invoices: action.invoices,
      };
    }
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
    case 'SELECT_INVOICE':
      return {
        ...state,
        openInvoices: _.uniqBy([...state.openInvoices, action.invoice], 'id'),
        selectedInvoiceId: action.invoice.id,
      };
    case 'UNSELECT_INVOICE':
      return {
        ...state,
        openInvoices: state.openInvoices.filter(
          inv => inv.id !== action.invoiceId
        ),
        selectedInvoiceId: state.openInvoices.filter(
          inv => inv.id !== action.invoiceId
        )[0]
          ? state.openInvoices.filter(inv => inv.id !== action.invoiceId)[0].id
          : null,
      };
    default:
      return state;
  }
}

export default appReducer;
