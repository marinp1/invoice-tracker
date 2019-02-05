import * as React from 'react';
import { connect } from 'react-redux';
import posed from 'react-pose';
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
  pose: 'open' | 'closed';
}

const Parent = posed.div({
  open: { opacity: 1, delayChildren: 200, staggerChildren: 50 },
  closed: { opacity: 0, delay: 300 },
});

class ListView extends React.Component<
  ReduxStateProps & ReduxDispatchProps,
  State
> {
  state: State = {
    filterValue: '',
    pose: 'closed',
  };

  debouncedSearch = _.debounce(this.props.filterByKeyword, 100);

  componentDidMount() {
    this.setState({
      pose: 'open',
    });
  }

  componentDidUpdate() {
    const invoices = this.props.invoices;
    if (!invoices.find(inv => inv.id === this.props.selectedInvoiceId)) {
      this.props.unselectInvoice(String(this.props.selectedInvoiceId));
    }
  }

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
        <Parent pose={this.state.pose}>
          {_.sortBy(this.props.invoices, ['dueDate', 'companyName']).map(
            invoice => (
              <ListViewElement
                onClick={this.props.selectInvoice}
                selected={this.props.selectedInvoiceId === invoice.id}
                filterKeyword={this.props.filterString}
                key={invoice.id}
                {...invoice}
              />
            )
          )}
        </Parent>
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
