import { InvoiceFormData } from './InvoiceForm';

const validate = (values: InvoiceFormData) => {
  const errors: Partial<{
    companyName: string;
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

  if (!values.amount) {
    errors.amount = 'Required';
  } else if (values.amount < 1) {
    errors.amount = 'Amount should be at least 0.01 €';
  }

  return errors;
};

export default validate;
