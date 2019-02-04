import { InvoiceAction, selectDueDateCategory } from './invoiceActions';
import { DueDateCategory } from './../../types/invoice';
import { InvoiceState } from '../../types/state';

import _ from 'lodash';

const initialState: InvoiceState = {
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
    case 'SELECT_INVOICE':
      return {
        ...state,
        openInvoices: _.uniqBy(
          [...state.openInvoices, action.invoice],
          'id'
        ).filter(inv => inv.unsavedChanges),
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
