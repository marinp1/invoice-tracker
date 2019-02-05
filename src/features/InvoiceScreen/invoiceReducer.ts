import { InvoiceAction } from './invoiceActions';
import { DueDateCategory, Category } from './../../types/invoice';
import { InvoiceState } from '../../types/state';

import _ from 'lodash';

const initialState: InvoiceState = {
  filterString: '',
  selectedDueDateCategory: DueDateCategory.ALL,
  selectedCategories: [],
  invoices: [
    {
      id: 'demo',
      amount: 4000,
      dueDate: '2019-02-20',
      reference: '213123',
      companyName: 'Soccer',
      iban: '',
      message: null,
      category: Category.Soccer,
      paid: false,
    },
  ],
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
    case 'SAVE_INVOICE':
      return {
        ...state,
        invoices: state.invoices
          .filter(inv => inv.id !== action.invoice.id)
          .concat(action.invoice),
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
