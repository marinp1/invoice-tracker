// Temporary api mockup

import moment from 'moment';

import {
  Invoice,
  DueDateCategory,
  Category,
  FilterParameters,
} from '../../types/invoice';

let invoices: Invoice[] = [
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
];

const wait = async (ms: number = 500) =>
  new Promise(resolve => setTimeout(() => resolve(true), ms));

const getInvoices = async (params: FilterParameters) => {
  await wait(500);

  const filterInvoices = (invoice: Invoice) => {
    if (params.dueDateCategory === DueDateCategory.ALL) {
      return true;
    }

    if (params.dueDateCategory === DueDateCategory.UNPAID) {
      return !invoice.paid;
    }

    if (params.dueDateCategory === DueDateCategory.PAID) {
      return invoice.paid;
    }

    if (invoice.paid) return false;

    const now = moment();
    const dueDate = moment(invoice.dueDate);
    const diff = Math.ceil(
      moment.duration(dueDate.startOf('day').diff(now.startOf('day'))).asDays()
    );

    if (params.dueDateCategory === DueDateCategory.TODAY) {
      return diff <= 1;
    }

    if (params.dueDateCategory === DueDateCategory.NEXT_5_DAYS) {
      return diff <= 5;
    }

    if (params.dueDateCategory === DueDateCategory.NEXT_20_DAYS) {
      return diff <= 20;
    }

    if (params.dueDateCategory === DueDateCategory.LATER) {
      return diff > 20;
    }
  };

  const filterInvoicesByKeyword = (invoice: Invoice) => {
    if (params.filterString.trim().length === 0) return true;
    return (
      invoice.companyName
        .toLowerCase()
        .indexOf(params.filterString.toLowerCase()) !== -1
    );
  };

  const result = invoices
    .filter(filterInvoices)
    .filter(filterInvoicesByKeyword);

  return Promise.resolve(result);
};

const createInvoice = async (invoice: Invoice) => {
  await wait(500);
  if (invoice.amount < 1)
    throw new Error('Invoice amount should be at least 0,01 €');
  invoices.push(invoice);
  return Promise.resolve(true);
};

const saveInvoice = async (invoice: Invoice) => {
  await wait(500);
  invoices = invoices.filter(inv => inv.id === invoice.id).concat(invoice);
  return Promise.resolve(true);
};

export default {
  getInvoices,
  createInvoice,
  saveInvoice,
};
