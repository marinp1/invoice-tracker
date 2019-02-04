import * as React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm, ConfigProps } from 'redux-form';

import CustomButton from '../../Utils/CustomButton';
import { ButtonContainer } from './styled';

import { InvoiceThunkDispatch } from '../invoiceActions';
import validate from './validate';

import { OpenInvoice, Category } from '../../../types/invoice';
import AppState from '../../../types/state';
import { COLORS } from '../../../styles';

const renderGeneralField: React.SFC<any> = ({
  input,
  name,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div className="form-group">
    <label
      htmlFor={name}
      style={{ color: COLORS.PURE_WHITE, fontSize: '110%', fontWeight: 'bold' }}
    >
      {label}
    </label>
    <input
      {...input}
      placeholder={label}
      type={type}
      className="form-control"
    />
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
  category: string;
  dueDate: string;
  amount: number;
  paid: boolean;
}

interface CustomProps {
  selectedInvoice: OpenInvoice;
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
          name="companyName"
          type="text"
          component={renderGeneralField}
          label="Recipient"
        />
        <Field
          name="dueDate"
          type="date"
          component={renderGeneralField}
          label="Due date"
        />
        <Field
          name="amount"
          type="number"
          component={renderGeneralField}
          label="Amount"
        />
        <ButtonContainer>
          <CustomButton type="button" theme="default" onClick={props.reset}>
            CLEAR
          </CustomButton>
          <CustomButton type="submit" theme="success">
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
  initialValues: {},
  form: 'invoice-form',
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
