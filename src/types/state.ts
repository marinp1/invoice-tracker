import { AuthStateType } from './index';
import {
  Invoice,
  OpenInvoice,
  Category,
  DueDateCategory,
} from '../types/invoice';

export interface AuthState {
  apiCallInProgress: boolean;
  authState: AuthStateType;
  currentUser: any; // FIXME: User type?
}

export interface InvoiceState {
  filterString: string;
  selectedDueDateCategory: DueDateCategory;
  selectedCategories: Category[];
  invoices: Invoice[];
  openInvoices: OpenInvoice[];
  selectedInvoiceId: string | null;
}

interface AppState {
  auth: AuthState;
  invoice: InvoiceState;
}

export default AppState;
