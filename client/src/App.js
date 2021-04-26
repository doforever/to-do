import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {

  state = {
    tasks: [],
    taskName: '',
  }

  componentDidMount() {
    this.socket = io('http://localhost:8000');
  }

  removeTask = id => {
    this.setState({
      tasks: this.state.tasks.filter((task, i) => i !== id),
    });
    this.socket.emit('removeTask', id);
  }

  addTask = task => {
    this.setState({
      tasks: [...this.state.tasks, task],
    });
  }

  submitForm = event => {
    event.preventDefault();
    this.addTask(this.state.taskName);
    this.socket.emit('addTask', this.state.taskName);
    this.setState({taskName: ''});
  }

  render() {
    return (
      <div className="App">

        <header>
          <h1>ToDoList.app</h1>
        </header>

        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>

          <ul className="tasks-section__list" id="tasks-list">
            {this.state.tasks.map((task, i) => (
              <li key={i} class="task">{task}<button onClick={() =>this.removeTask(i)} class="btn btn--red">Remove</button></li>
            ))}
          </ul>

          <form id="add-task-form" onSubmit={event => this.submitForm(event)}>
            <input 
              className="text-input" 
              autoComplete="off" 
              type="text" 
              placeholder="Type your description" 
              id="task-name"
              onChange={event => this.setState({ taskName: event.target.value })}
              value={this.state.taskName}
            />
            <button className="btn" type="submit">Add</button>
          </form>

        </section>
      </div>
    );
  };

};

export default App;
