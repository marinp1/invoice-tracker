import * as React from 'react';
import { Category } from '../../types/invoice';
import ListViewElement from './ListViewElement';

class ListView extends React.Component<{}, {}> {
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
        <ListViewElement
          id="1"
          category={Category.Soccer}
          companyName="Company name"
          amount={4000}
          dueDate={'2019-02-02'}
        />
        <ListViewElement
          id="1"
          category={Category.Misc}
          companyName="Company name"
          amount={4000}
          dueDate={'2019-02-03'}
        />
        <ListViewElement
          id="1"
          category={Category.Rent}
          companyName="Company name"
          amount={4000}
          dueDate={'2019-02-04'}
        />
        <ListViewElement
          id="1"
          category={Category.Electricity}
          companyName="Company name"
          amount={4000}
          dueDate={'2019-02-05'}
        />
        <ListViewElement
          id="1"
          category={Category.Internet}
          companyName="Company name"
          amount={4000}
          dueDate={'2019-02-06'}
        />
        <ListViewElement
          id="1"
          category={Category.Friend}
          companyName="Company name"
          amount={4000}
          dueDate={'2019-03-06'}
        />
      </ul>
    );
  }
}

export default ListView;
