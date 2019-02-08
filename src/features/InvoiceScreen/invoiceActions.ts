import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { toast } from 'react-toastify';
import _ from 'lodash';
import AppState, { InvoiceState } from '../../types/state';

import API from '../Api';

import {
  Invoice,
  OpenInvoice,
  Category,
  DueDateCategory,
  CountMapType,
} from '../../types/invoice';

import { v1 as uuidv1 } from 'uuid';
import moment from 'moment';

export interface StartApiCall {
  type: 'START_API_CALL';
}

export interface EndApiCall {
  type: 'END_API_CALL';
}

export interface FetchInvoices {
  type: 'FETCH_INVOICES';
  invoices: Invoice[];
  countMap: CountMapType;
  selectedKeyword: string;
}

export interface ClearInvoices {
  type: 'CLEAR_INVOICES';
}

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

export interface SaveHistoryAction {
  type: 'SAVE_HISTORY_ACTION';
  state: Partial<InvoiceState>;
}

export interface UndoAction {
  type: 'UNDO_ACTION';
  state: Partial<InvoiceState>;
}

export interface RedoAction {
  type: 'REDO_ACTION';
  state: Partial<InvoiceState>;
}

export type InvoiceAction =
  | StartApiCall
  | EndApiCall
  | CreateInvoice
  | DeleteInvoice
  | FetchInvoices
  | ClearInvoices
  | SaveInvoice
  | SelectInvoice
  | UnselectInvoice
  | SelectDueDateCategory
  | FilterInvoicesByKeyword
  | SaveHistoryAction
  | UndoAction
  | RedoAction;

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

const diff = (obj1: any, obj2: any) =>
  _.reduce(
    obj1,
    (result: any, value, key) => {
      if (_.isPlainObject(value)) {
        if (key === 'countMap') {
          result[key] = { ...value, ...diff(value, obj2[key]) };
        } else if (key === 'history' || key === 'apiCallsInProgress') {
          // Do nothing
        } else {
          result[key] = diff(value, obj2[key]);
        }
      } else if (!_.isEqual(value, obj2[key])) {
        result[key] = value;
      }
      return result;
    },
    {}
  );

export const undoAction = (): InvoiceThunkResult<void> => async (
  dispatch,
  getState
) => {
  const invoiceState = getState().invoice;

  if (invoiceState.history.invoiceHistory.length > 0) {
    const invoiceHistory = [...invoiceState.history.invoiceHistory];
    const previousHistory = invoiceHistory.pop() as Partial<InvoiceState>;
    let newState = { ...invoiceState, ...previousHistory };

    const MODIFIED = diff(invoiceState, newState);

    newState = {
      ...newState,
      history: {
        invoiceHistory,
        invoiceFuture: [...invoiceState.history.invoiceFuture, MODIFIED],
      },
    };

    dispatch({
      type: 'UNDO_ACTION',
      state: newState,
    });
  }
};

export const redoAction = (): InvoiceThunkResult<void> => async (
  dispatch,
  getState
) => {
  const invoiceState = getState().invoice;

  if (invoiceState.history.invoiceFuture.length > 0) {
    const invoiceFuture = [...invoiceState.history.invoiceFuture];
    const previousFuture = invoiceFuture.pop() as Partial<InvoiceState>;
    let newState = { ...invoiceState, ...previousFuture };

    const MODIFIED = diff(invoiceState, newState);

    newState = {
      ...newState,
      history: {
        invoiceHistory: [...invoiceState.history.invoiceHistory, MODIFIED],
        invoiceFuture,
      },
    };

    dispatch({
      type: 'REDO_ACTION',
      state: newState,
    });
  }
};

export const saveHistoryAction = (
  previousState: InvoiceState
): InvoiceThunkResult<void> => async (dispatch, getState) => {
  const currentState = getState().invoice;
  const DELETED = diff(previousState, currentState);
  dispatch({
    type: 'SAVE_HISTORY_ACTION',
    state: DELETED,
  });
};

export const getInvoices = (): InvoiceThunkResult<void> => async (
  dispatch,
  getState
) => {
  const state = getState();
  const { selectedDueDateCategory, filterString } = state.invoice;

  const parameters = {
    filterString,
    dueDateCategory: selectedDueDateCategory,
  };

  if (state.invoice.apiCallsInProgress === 0) {
    dispatch({
      type: 'START_API_CALL',
    });
    try {
      dispatch({
        type: 'CLEAR_INVOICES',
      });
      const result = await API.getInvoices(parameters);
      dispatch({
        type: 'FETCH_INVOICES',
        invoices: result.invoices,
        countMap: result.countMap,
        selectedKeyword: filterString,
      });
    } catch (error) {
      toast.error('Failed to retrieve invoices!');
    }
    dispatch({
      type: 'END_API_CALL',
    });
  }
};

export const createInvoice = (
  data: InvoiceFormData
): InvoiceThunkResult<void> => async (dispatch, getState) => {
  const state = getState();

  if (state.invoice.apiCallsInProgress === 0) {
    dispatch({
      type: 'START_API_CALL',
    });

    const invoice: Invoice = {
      id: data.id,
      amount: data.amount,
      companyName: data.companyName.trim(),
      category: data.category,
      dueDate: moment(data.dueDate).format('YYYY-MM-DD'),
      paid: data.paid,
      iban: data.iban.trim().length > 0 ? data.iban.trim() : null,
      reference:
        data.reference.trim().length > 0 ? data.reference.trim() : null,
      message: data.message.trim().length > 0 ? data.message.trim() : null,
    };

    const { invoices } = state.invoice;
    const existing = invoices.find(inv => inv.id === data.id);

    try {
      if (!existing) {
        await API.createInvoice(invoice);
        dispatch({
          type: 'END_API_CALL',
        });
        await getInvoices()(dispatch, getState, undefined);
        await saveHistoryAction(state.invoice)(dispatch, getState, undefined);
        toast.success('Invoice created!');
      } else {
        await API.saveInvoice(invoice);
        dispatch({
          type: 'END_API_CALL',
        });
        await getInvoices()(dispatch, getState, undefined);
        await saveHistoryAction(state.invoice)(dispatch, getState, undefined);
        toast.info('Invoice saved!');
      }
      unselectInvoice(data.id)(dispatch, getState, undefined);
    } catch (e) {
      toast.error('Failed to save invoice');
      dispatch({
        type: 'END_API_CALL',
      });
    }
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
): InvoiceThunkResult<void> => async (dispatch, getState) => {
  const state = getState();
  if (
    state.invoice.selectedDueDateCategory !== dueDateCategory &&
    state.invoice.apiCallsInProgress === 0
  ) {
    dispatch({
      type: 'SELECT_DUE_DATE_CATEGORY',
      dueDateCategory,
    });
    await getInvoices()(dispatch, getState, undefined);
  }
};

export const filterInvoicesByKeyword = (
  keyword: string
): InvoiceThunkResult<void> => async (dispatch, getState) => {
  const debouncedGetInvoices = _.debounce(
    () => getInvoices()(dispatch, getState, undefined),
    500
  );

  dispatch({
    type: 'FILTER_INVOICES_BY_KEYWORD',
    keyword,
  });

  dispatch({
    type: 'CLEAR_INVOICES',
  });

  await debouncedGetInvoices();
};
