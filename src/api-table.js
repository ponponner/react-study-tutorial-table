import React from 'react';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const PersonsTableDataRow = ({ item, onRemoveItem }) => {
  return (
    <tr className="persons-table__data-row">
      <td className="persons-table__data-id">{item.id}</td>
      <td className="persons-table__data-name">{item.name}</td>
      <td className="persons-table__data-job">{item.job}</td>
      <td className="persons-table__data-remove-btn">
        <button onClick={() => onRemoveItem(item.id)}>
          <FontAwesomeIcon icon={faUserMinus} />
        </button>
      </td>
    </tr>
  );
}

class ApiTable extends React.Component {
  state = { items: [] };

  componentDidMount() {
    this.handleFetchRondom();
  }

  handleFetchRondom = async () => {
    const prevState = this.state;
    const url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=Seona+Dancing&format=json&origin=*&limit=1";
    fetch(url)
      .then((res) => res.json())
      .then((item) => {
        this.setState({
          items: [...prevState.items, item],
        });
      });
  }

  render() {
    const state = this.state;
    return (
      <div className="api-table">
        <table>
          <thead className="api-table__head">
            <tr>
              <th>0</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
            </tr>
          </thead>
          <tbody className="api-table__body">
            {this.state.items.map((e, i) => (
              <tr key={i}>
                {e.map((f, j) => (
                  <td key={j}>{f}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td>
                <button onClick={this.handleFetchRondom}>
                  Add item by random-retch
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export { ApiTable };
