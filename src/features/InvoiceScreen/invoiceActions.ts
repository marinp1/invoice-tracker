import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { toast } from 'react-toastify';
import AppState from '../../types/state';

import {
  Invoice,
  OpenInvoice,
  Category,
  DueDateCategory,
} from '../../types/invoice';

import { v1 as uuidv1 } from 'uuid';
import moment from 'moment';

export interface CreateInvoice {
  type: 'CREATE_INVOICE';
  invoice: Invoice;
}

export interface DeleteInvoice {
  type: 'DELETE_INVOICE';
}

export interface FetchInvoices {
  type: 'FETCH_INVOICES';
}

export interface MarkInvoiceAsPaid {
  type: 'MARK_INVOICE_AS_PAID';
}

export interface EditInvoice {
  type: 'EDIT_INVOICE';
}

export interface SelectInvoice {
  type: 'SELECT_INVOICE';
  invoice: OpenInvoice;
}

export interface UnselectInvoice {
  type: 'UNSELECT_INVOICE';
  invoiceId: string;
}

export interface SelectDueDateCategory {
  type: 'SELECT_DUE_DATE_CATEGORY';
  dueDateCategory: DueDateCategory;
}

export interface FilterInvoicesByKeyword {
  type: 'FILTER_INVOICES_BY_KEYWORD';
  keyword: string;
}

export type InvoiceAction =
  | CreateInvoice
  | DeleteInvoice
  | FetchInvoices
  | MarkInvoiceAsPaid
  | EditInvoice
  | SelectInvoice
  | UnselectInvoice
  | SelectDueDateCategory
  | FilterInvoicesByKeyword;

type InvoiceThunkResult<R> = ThunkAction<R, AppState, undefined, InvoiceAction>;

export type InvoiceThunkDispatch = ThunkDispatch<
  AppState,
  undefined,
  InvoiceAction
>;

// FIXME: invoice as param
export const createInvoice = (): InvoiceThunkResult<void> => async (
  dispatch,
  getState
) => {
  const invoice: Invoice = {
    id: uuidv1(),
    amount: Math.random() * 5400 + 600,
    companyName: Math.random() > 0.5 ? 'Random company' : 'Satunnainen yritys',
    category: Category.Electricity,
    dueDate: '2020-02-16',
    paid: Math.random() > 0.5,
  };
  dispatch({
    type: 'CREATE_INVOICE',
    invoice,
  });
  toast.success('Invoice created!');
};

export const createTemporaryInvoice = (): InvoiceThunkResult<void> => async (
  dispatch,
  getState
) => {
  const invoice: OpenInvoice = {
    id: uuidv1(),
    amount: 0,
    companyName: '',
    category: Category.Misc,
    dueDate: moment().format('YYYY-MM-DD'),
    paid: false,
    unsavedChanges: false,
    name: 'New invoice',
  };
  dispatch({
    type: 'SELECT_INVOICE',
    invoice,
  });
};

export const selectInvoice = (invoiceId: string): InvoiceThunkResult<void> => (
  dispatch,
  getState
) => {
  const invoice =
    getState().invoice.invoices.find(inv => inv.id === invoiceId) || null;

  const openInvoice: OpenInvoice | undefined = invoice
    ? {
        ...invoice,
        unsavedChanges: false,
        name: invoice.companyName,
      }
    : getState().invoice.openInvoices.find(inv => inv.id === invoiceId);

  if (!openInvoice) return null;

  dispatch({
    type: 'SELECT_INVOICE',
    invoice: openInvoice,
  });
};

export const unselectInvoice = (
  invoiceId: string
): InvoiceThunkResult<void> => (dispatch, getState) => {
  dispatch({
    type: 'UNSELECT_INVOICE',
    invoiceId,
  });
};

export const selectDueDateCategory = (
  dueDateCategory: DueDateCategory
): InvoiceThunkResult<void> => (dispatch, getState) => {
  dispatch({
    type: 'SELECT_DUE_DATE_CATEGORY',
    dueDateCategory,
  });
};

export const filterInvoicesByKeyword = (
  keyword: string
): InvoiceThunkResult<void> => (dispatch, getState) => {
  dispatch({
    type: 'FILTER_INVOICES_BY_KEYWORD',
    keyword,
  });
};
