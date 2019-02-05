import * as React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm, ConfigProps } from 'redux-form';

import DatePicker from './DatePicker';
import ListSelector from './ListSelector';
import IbanInput from './IbanInput';
import CurrencyInput from './CurrencyInput';
import Toggle from './Toggle';
import CustomButton from '../../Utils/CustomButton';
import { ButtonContainer } from './styled';

import { InvoiceThunkDispatch } from '../invoiceActions';
import validate from './validate';

import { OpenInvoice, Category } from '../../../types/invoice';
import AppState from '../../../types/state';
import { COLORS } from '../../../styles';

const renderField: React.SFC<any> = ({
  input,
  name,
  label,
  type,
  Component,
  meta: { touched, error, warning, initial },
}) => (
  <div className="form-group">
    <label
      htmlFor={name}
      style={{ color: COLORS.MAIN_BLACK, fontSize: '110%', fontWeight: 'bold' }}
    >
      {label}
    </label>
    {type ? (
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control"
      />
    ) : (
      <Component
        onChange={input.onChange}
        className="form-control"
        initialValue={initial}
      />
    )}
    {touched &&
      ((error && (
        <span
          style={{
            color: COLORS.MAIN_RED,
          }}
        >
          {error}
        </span>
      )) ||
        (warning && <span>{warning}</span>))}
  </div>
);

export interface InvoiceFormData {
  companyName: string;
  iban: string;
  reference: string;
  message: string;
  category: string;
  dueDate: Date;
  amount: number;
  paid: boolean;
}

interface CustomProps {
  selectedInvoice: OpenInvoice;
  formName: string;
}

interface DispatchProps {
  onSubmit: (
    formData: InvoiceFormData,
    dispatch: InvoiceThunkDispatch,
    props: CustomProps
  ) => void;
}

type Props = CustomProps & InjectedFormProps<InvoiceFormData, CustomProps>;

const InvoiceForm: React.SFC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      <form onSubmit={props.handleSubmit}>
        <Field
          name="paid"
          component={props => (
            <Toggle
              onChange={props.input.onChange}
              value={props.input.value}
              initialValue={props.meta.initial}
              name="paid"
              label="Paid"
              {...props}
            />
          )}
        />
        <Field
          name="companyName"
          type="text"
          component={renderField}
          label="Recipient"
        />
        <Field
          name="iban"
          component={renderField}
          label="IBAN"
          Component={IbanInput}
        />
        <Field
          name="reference"
          type="text"
          pattern="[0-9]"
          component={renderField}
          label="Reference number"
          maxLength={64}
        />
        <Field
          name="message"
          type="text"
          component={renderField}
          label="Message"
          maxLength={64}
        />
        <Field
          name="dueDate"
          component={renderField}
          label="Due date"
          Component={DatePicker}
        />
        <Field
          name="category"
          component={renderField}
          label="Category"
          Component={ListSelector}
        />
        <Field
          name="amount"
          component={renderField}
          label="Amount"
          Component={CurrencyInput}
        />
        <ButtonContainer>
          <CustomButton type="button" theme="primary" onClick={props.reset}>
            CLEAR
          </CustomButton>
          <CustomButton type="submit" theme="success" id="create-button">
            {props.selectedInvoice.name === 'New invoice'
              ? 'CREATE INVOICE'
              : 'SAVE INVOICE'}
          </CustomButton>
        </ButtonContainer>
      </form>
    </React.Fragment>
  );
};

const ReduxForm = reduxForm<InvoiceFormData, CustomProps>({
  validate,
})(InvoiceForm);

const mapStateToProps = (
  state: AppState | {},
  props: CustomProps | {}
): ConfigProps<InvoiceFormData, CustomProps> => ({
  initialValues: {
    companyName: (props as CustomProps).selectedInvoice.companyName || '',
    paid: (props as CustomProps).selectedInvoice.paid || false,
    reference: (props as CustomProps).selectedInvoice.reference || '',
    message: (props as CustomProps).selectedInvoice.message || '',
    iban: (props as CustomProps).selectedInvoice.iban || '',
    category: (props as CustomProps).selectedInvoice.category || '',
    amount: (props as CustomProps).selectedInvoice.amount || 0,
    dueDate: (props as CustomProps).selectedInvoice.dueDate
      ? new Date((props as CustomProps).selectedInvoice.dueDate)
      : new Date(),
  },
  form: (props as CustomProps).formName,
  touchOnChange: true,
  touchOnBlur: true,
});

function mapDispatchToProps(dispatch: InvoiceThunkDispatch): DispatchProps {
  return {
    onSubmit: (
      formData: InvoiceFormData,
      dispatch: InvoiceThunkDispatch,
      props: CustomProps
    ) => {
      /*
      dispatch(signUp(formData));
      */
      console.log(formData);
    },
  };
}

export default connect<ConfigProps<InvoiceFormData, CustomProps>>(
  mapStateToProps,
  mapDispatchToProps
)(ReduxForm);
