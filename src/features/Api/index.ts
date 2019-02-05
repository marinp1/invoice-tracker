// Temporary api mockup

import {
  Invoice,
  DueDateCategory,
  Category,
  FilterParameters,
  CountMapType,
} from '../../types/invoice';

import { filterInvoices } from '../../utils';

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
  const filterInvoicesByKeyword = (invoice: Invoice) => {
    if (params.filterString.trim().length === 0) return true;
    return (
      invoice.companyName
        .toLowerCase()
        .indexOf(params.filterString.toLowerCase()) !== -1
    );
  };

  const result = invoices
    .filter(inv => filterInvoices(params.dueDateCategory, inv))
    .filter(filterInvoicesByKeyword);

  const countMap: CountMapType = {};
  Object.values(DueDateCategory).forEach((val: DueDateCategory) => {
    countMap[val] = invoices.filter(inv => filterInvoices(val, inv)).length;
  });

  await wait();

  return Promise.resolve({
    invoices: result,
    countMap,
  });
};

const createInvoice = async (invoice: Invoice) => {
  if (invoice.amount < 1)
    throw new Error('Invoice amount should be at least 0,01 €');
  invoices.push(invoice);
  await wait();
};

const saveInvoice = async (invoice: Invoice) => {
  invoices = invoices.filter(inv => inv.id !== invoice.id).concat(invoice);
  await wait();
};

export default {
  getInvoices,
  createInvoice,
  saveInvoice,
};
