import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {

  state = {
    tasks: [],
    taskName: '',
  }

  componentDidMount() {
    this.socket = io('ws://localhost:8000', { transports: ["websocket"] });
    this.socket.on('addTask', task => this.addTask(task));
    this.socket.on('removeTask', id => this.removeTask(id));
    this.socket.on('updateData', data => this.updateTasks(data));
  }

  updateTasks = newTasks => {
    this.setState({tasks: newTasks});
  }

  removeTask = (id, own = false)=> {
    this.setState({
      tasks: this.state.tasks.filter((task, i) => i !== id),
    });
    if(own) {
      this.socket.emit('removeTask', id);
    }
  }

  addTask = task => {
    this.setState({
      tasks: [...this.state.tasks, task],
    });
  }

  submitForm = event => {
    event.preventDefault();
    if (this.state.taskName) { 
      this.addTask(this.state.taskName);
      this.socket.emit('addTask', this.state.taskName);
      this.setState({taskName: ''});
    }
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
              <li key={i} className="task">
                {task}
                <button onClick={() =>this.removeTask(i, true)} className="btn btn--red">Remove</button>
              </li>
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
