import React from 'react';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';

class PersonsTableInputRow extends React.Component {
  initialState = {
    name: '',
    job: '',
  };

  state = this.initialState;

  getIsBtnDisabled() {
    const { name, job } = this.state;
    return [name, job].some((e) => ("" + e).trim() === "");
  }

  // ここを単純にクラスメソッド（例：`handleChange() { ... }`）とすると、このメソッドが
  // イベントハンドラとして呼び出される時に`this`が未割り当てになる。
  // thisを割り当てる方法の1つが、
  // このメソッドをclass-field-methodとすることである（handleChangeというクラスフィールドにメソッドを代入している）。
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    this.props.onAddItem(this.state.name, this.state.job);
    this.setState(this.initialState);
  }

  render() {
    const { name, job } = this.state;
    return (
      <tr className="persons-table__input-row">
        <th>Generated Automatically</th>
        <th><input type="text" name="name" value={name} onChange={this.handleChange} /></th>
        <th><input type="text" name="job" value={job} onChange={this.handleChange} /></th>
        <th>
          <button type="button" disabled={this.getIsBtnDisabled()} onClick={this.handleClick}>
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        </th>
      </tr>
    );
  }
}

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

const PersonsTable = ({ items, onAddItem, onRemoveItem }) => {
  const dataRowDoms = items.map((item) => (
    <PersonsTableDataRow
      key={item.id}
      item={item}
      onRemoveItem={onRemoveItem}
    />
  ));
  return (
    <div className="persons-table">
      <table>
        <thead className="persons-table__head">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Job</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody className="persons-table__body">
          <PersonsTableInputRow onAddItem={onAddItem} />
          {dataRowDoms}
        </tbody>
      </table>
    </div>
  );
}

export { PersonsTable };
