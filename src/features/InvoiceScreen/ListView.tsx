import * as React from 'react';
import * as glamor from 'glamor';

import { PhotonIcon } from '../../types';

const largeIconCss = glamor.css({
  fontSize: '36px',
  margin: 0,
  marginRight: '1rem !important',
  marginTop: '-0.5rem',
  marginBottom: '-0.5rem',
});

const LargeIcon: React.SFC<{ iconName: PhotonIcon }> = ({ iconName }) => (
  <div
    className={`img-circle media-object pull-left ${iconName} ${largeIconCss} `}
  />
);

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
        <li className="list-group-item">
          <LargeIcon iconName={PhotonIcon.Droplet} />
          <div className="media-body">
            <strong>Name of company</strong>
            <p>20.02.2019</p>
            <p>40,00 €</p>
          </div>
        </li>
        <li className="list-group-item">
          <img
            className="img-circle media-object pull-left"
            src="/assets/img/avatar2.png"
            width="32"
            height="32"
          />
          <div className="media-body">
            <strong>List item title</strong>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </li>
        ...
      </ul>
    );
  }
}

export default ListView;
