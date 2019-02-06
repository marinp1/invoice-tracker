import { AuthStateType } from './index';
import { User, AuthProvider } from './auth';

import {
  Invoice,
  OpenInvoice,
  Category,
  DueDateCategory,
  CountMapType,
} from '../types/invoice';

export interface AuthState {
  apiCallInProgress: boolean;
  authState: AuthStateType;
  currentUser: User | null;
  userAvatar: string | null;
  authProvider: AuthProvider;
}

export interface InvoiceState {
  apiCallsInProgress: number;
  filterString: string;
  selectedDueDateCategory: DueDateCategory;
  selectedCategories: Category[];
  invoices: Invoice[];
  openInvoices: OpenInvoice[];
  selectedInvoiceId: string | null;
  selectedKeyword: string;
  countMap: CountMapType;
}

interface AppState {
  auth: AuthState;
  invoice: InvoiceState;
}

export default AppState;
