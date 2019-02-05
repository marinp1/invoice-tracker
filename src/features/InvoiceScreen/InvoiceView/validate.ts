import IBAN from 'iban';
import { InvoiceFormData } from './InvoiceForm';

const validate = (values: InvoiceFormData) => {
  const errors: Partial<{
    companyName: string;
    iban: string;
    reference: string;
    message: string;
    category: string;
    dueDate: string;
    amount: string;
    paid: string;
  }> = {};

  if (!values.companyName) {
    errors.companyName = 'Required';
  } else if (values.companyName.length > 64) {
    errors.companyName = 'Must be 64 characters or less';
  }

  if (values.iban && !IBAN.isValid(values.iban)) {
    errors.iban = 'IBAN should be in valid format';
  }

  if (values.reference && !/^[0-9]*$/i.test(values.reference)) {
    errors.reference = 'Reference should contain only numbers';
  }

  if (!values.amount) {
    errors.amount = 'Required';
  } else if (values.amount < 1) {
    errors.amount = 'Amount should be at least 0.01 €';
  }

  if (!values.dueDate) {
    errors.dueDate = 'Required';
  }

  if (!values.category) {
    errors.category = 'Required';
  }

  return errors;
};

export default validate;
