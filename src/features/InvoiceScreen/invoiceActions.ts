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

export interface SaveInvoice {
  type: 'SAVE_INVOICE';
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
  | SaveInvoice
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

interface InvoiceFormData {
  id: string;
  companyName: string;
  iban: string;
  reference: string;
  message: string;
  category: Category;
  dueDate: Date;
  amount: number;
  paid: boolean;
}

export const createInvoice = (
  data: InvoiceFormData
): InvoiceThunkResult<void> => async (dispatch, getState) => {
  const invoice: Invoice = {
    id: data.id,
    amount: data.amount,
    companyName: data.companyName.trim(),
    category: data.category,
    dueDate: moment(data.dueDate).format('YYYY-MM-DD'),
    paid: data.paid,
    iban: data.iban.trim().length > 0 ? data.iban.trim() : null,
    reference: data.reference.trim().length > 0 ? data.reference.trim() : null,
    message: data.message.trim().length > 0 ? data.message.trim() : null,
  };
  const invoices = getState().invoice.invoices;
  const existing = invoices.find(inv => inv.id === data.id);
  if (!existing) {
    dispatch({
      type: 'CREATE_INVOICE',
      invoice,
    });
    unselectInvoice(data.id)(dispatch, getState, undefined);
    toast.success('Invoice created!');
  } else {
    dispatch({
      type: 'SAVE_INVOICE',
      invoice,
    });
    unselectInvoice(data.id)(dispatch, getState, undefined);
    toast.info('Invoice saved!');
  }
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
    unsavedChanges: true,
    name: 'New invoice',
    iban: null,
    reference: null,
    message: null,
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
