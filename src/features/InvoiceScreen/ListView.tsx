import * as React from 'react';
import { connect } from 'react-redux';
import ListViewElement from './ListViewElement';
import moment from 'moment';

import { Invoice, DueDateCategory } from '../../types/invoice';
import AppState from '../../types/state';

interface ReduxStateProps {
  selectedDueDateCategory: DueDateCategory;
  invoices: Invoice[];
}

class ListView extends React.Component<ReduxStateProps, {}> {
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

    const now = moment();
    const dueDate = moment(invoice.dueDate);
    const diff = Math.ceil(
      moment.duration(dueDate.startOf('day').diff(now.startOf('day'))).asDays()
    );

    if (invoice.paid) return false;

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

  render() {
    return (
      <ul className="list-group">
        <li className="list-group-header">
          <input
            className="form-control"
            type="text"
            placeholder="Filter bills"
          />
        </li>
        {this.props.invoices.filter(this.filterInvoices).map(invoice => (
          <ListViewElement
            key={invoice.id}
            id={invoice.id}
            amount={invoice.amount}
            category={invoice.category}
            companyName={invoice.companyName}
            dueDate={invoice.dueDate}
            paid={invoice.paid}
          />
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state: AppState): ReduxStateProps => ({
  selectedDueDateCategory: state.invoice.selectedDueDateCategory,
  invoices: state.invoice.invoices,
});

export default connect(
  mapStateToProps,
  null
)(ListView);
