import React from 'react';
import ReactDOM from 'react-dom';
import { nanoid } from 'nanoid';
import './index.css';
import { PersonsTable } from './person-table';
import { ApiTable } from './api-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    const persons = [
      {
        name: 'Alice',
        job: 'Mage',
      },
      {
        name: 'Bob',
        job: 'Warrior',
      },
      {
        name: 'Cathy',
        job: 'Rouge'
      },
    ].map((item) => Object.assign(item, { id: this.genPersonId() }));
    this.state = {
      persons,
    };
  }

  genPersonId = () => { return nanoid(); }

  // handlePerson[Add/Remove/Edit]という感じに、探しやすい分類にしたいのでこの語順。
  handlePersonAdd = (name, job) => {
    const { persons } = this.state;
    const newPerson = {
      id: nanoid(),
      name: name.trim(),
      job: job.trim(),
    };
    this.setState({ persons: [...persons, newPerson] });
  }

  handlePersonRemove = (personId) => {
    const { persons } = this.state;
    const changed = persons.filter((person) => person.id !== personId);
    this.setState({ persons: changed });
  }

  render() {
    return (
      <div className="App">
        <PersonsTable
          items={this.state.persons}
          onRemoveItem={this.handlePersonRemove}
          onAddItem={this.handlePersonAdd}
        />
        <ApiTable />
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
