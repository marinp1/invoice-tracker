import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import { FirstItemContainer } from './styled';

import ListViewElement from './ListViewElement';
import CustomButton from '../../Utils/CustomButton';

import {
  InvoiceThunkDispatch,
  filterInvoicesByKeyword,
  createTemporaryInvoice,
  selectInvoice,
  unselectInvoice,
} from '../invoiceActions';

import { Invoice, DueDateCategory } from '../../../types/invoice';
import AppState from '../../../types/state';

interface ReduxStateProps {
  selectedDueDateCategory: DueDateCategory;
  selectedInvoiceId: string | null;
  invoices: Invoice[];
  filterString: string;
}

interface ReduxDispatchProps {
  filterByKeyword: (keyword: string) => void;
  createTemporaryInvoice: () => void;
  selectInvoice: (id: string) => void;
  unselectInvoice: (id: string) => void;
}

interface State {
  filterValue: string;
}

class ListView extends React.Component<
  ReduxStateProps & ReduxDispatchProps,
  State
> {
  state: State = {
    filterValue: '',
  };

  filterInvoices = (invoice: Invoice) => {
    if (this.props.selectedDueDateCategory === DueDateCategory.ALL) {
      return true;
    }

    if (this.props.selectedDueDateCategory === DueDateCategory.UNPAID) {
      return !invoice.paid;
    }

    if (this.props.selectedDueDateCategory === DueDateCategory.PAID) {
      return invoice.paid;
    }

    if (invoice.paid) return false;

    const now = moment();
    const dueDate = moment(invoice.dueDate);
    const diff = Math.ceil(
      moment.duration(dueDate.startOf('day').diff(now.startOf('day'))).asDays()
    );

    if (this.props.selectedDueDateCategory === DueDateCategory.TODAY) {
      return diff <= 1;
    }

    if (this.props.selectedDueDateCategory === DueDateCategory.NEXT_5_DAYS) {
      return diff <= 5;
    }

    if (this.props.selectedDueDateCategory === DueDateCategory.NEXT_20_DAYS) {
      return diff <= 20;
    }

    if (this.props.selectedDueDateCategory === DueDateCategory.LATER) {
      return diff > 20;
    }
  };

  filterInvoicesByKeyword = (invoice: Invoice) => {
    if (this.props.filterString.trim().length === 0) return true;
    return (
      invoice.companyName
        .toLowerCase()
        .indexOf(this.props.filterString.toLowerCase()) !== -1
    );
  };

  debouncedSearch = _.debounce(this.props.filterByKeyword, 100);

  render() {
    return (
      <ul
        className="list-group"
        onClick={() => unselectInvoice(String(this.props.selectedInvoiceId))}
      >
        <li className="list-group-header">
          <FirstItemContainer>
            <input
              className="form-control"
              type="text"
              placeholder="Filter bills"
              value={this.state.filterValue}
              onChange={event => {
                this.setState({
                  filterValue: event.target.value,
                });
                this.debouncedSearch(event.target.value);
              }}
            />
            <CustomButton
              theme="primary"
              onClick={this.props.createTemporaryInvoice}
            >
              +
            </CustomButton>
          </FirstItemContainer>
        </li>
        {this.props.invoices
          .filter(this.filterInvoices)
          .filter(this.filterInvoicesByKeyword)
          .map(invoice => (
            <ListViewElement
              onClick={this.props.selectInvoice}
              selected={this.props.selectedInvoiceId === invoice.id}
              filterKeyword={this.props.filterString}
              key={invoice.id}
              {...invoice}
            />
          ))}
      </ul>
    );
  }
}

const mapStateToProps = (state: AppState): ReduxStateProps => ({
  selectedDueDateCategory: state.invoice.selectedDueDateCategory,
  invoices: state.invoice.invoices,
  filterString: state.invoice.filterString,
  selectedInvoiceId: state.invoice.selectedInvoiceId,
});

const mapDispatchToProps = (
  dispatch: InvoiceThunkDispatch
): ReduxDispatchProps => ({
  filterByKeyword: (keyword: string) => {
    dispatch(filterInvoicesByKeyword(keyword));
  },
  createTemporaryInvoice: () => {
    dispatch(createTemporaryInvoice());
  },
  selectInvoice: (id: string) => {
    dispatch(selectInvoice(id));
  },
  unselectInvoice: (id: string) => {
    dispatch(unselectInvoice(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView);
