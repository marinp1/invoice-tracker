import { AuthStateType } from './index';
import { CognitoUser } from 'amazon-cognito-identity-js';

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
  currentUser: CognitoUser | null;
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
