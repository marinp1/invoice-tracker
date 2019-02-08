import { InvoiceAction } from './invoiceActions';
import { DueDateCategory } from './../../types/invoice';
import { InvoiceState } from '../../types/state';

import _ from 'lodash';

const initialState: InvoiceState = {
  apiCallsInProgress: 0,
  filterString: '',
  selectedDueDateCategory: DueDateCategory.ALL,
  selectedCategories: [],
  invoices: [],
  openInvoices: [],
  selectedInvoiceId: null,
  selectedKeyword: '',
  countMap: {},
  history: {
    invoiceHistory: [],
    invoiceFuture: [],
  },
};

function appReducer(
  state: InvoiceState = initialState,
  action: InvoiceAction
): InvoiceState {
  switch (action.type) {
    case 'START_API_CALL': {
      return {
        ...state,
        apiCallsInProgress: state.apiCallsInProgress + 1,
      };
    }
    case 'END_API_CALL': {
      return {
        ...state,
        apiCallsInProgress: Math.max(0, state.apiCallsInProgress - 1),
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
        countMap: action.countMap,
        selectedKeyword: action.selectedKeyword,
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
    case 'SAVE_HISTORY_ACTION':
      return {
        ...state,
        history: {
          invoiceHistory: [...state.history.invoiceHistory, action.state],
          invoiceFuture: [{}],
        },
      };
    case 'UNDO_ACTION':
      return {
        ...state,
        ...action.state,
      };
    case 'REDO_ACTION':
      return {
        ...state,
        ...action.state,
      };
    default:
      return state;
  }
}

export default appReducer;
