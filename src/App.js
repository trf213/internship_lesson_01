
import { useState, useEffect } from 'react'
import './App.css';

const App = () => {

  const [title, setTitle] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    //Check if localstorage is
    const storedTasks = JSON.parse(window.localStorage.getItem('tasks'))
    console.log(storedTasks)
    if (storedTasks?.length > 0) {
      setTasks(storedTasks)
    }
  }, [])

  //UseEffect re-renders application whenever dependency objects are changed
  useEffect(() => {

    //Save to localstorage whenever tasks is updated
    if (tasks.length > 0) {
      console.log('save tasks to localstorage')
      window.localStorage.setItem('tasks', JSON.stringify(tasks))
    }

  }, [tasks])

  //Update the state object whenever the field is changed
  const handleFieldChange = (e) => {
    const { value } = e.target
    // console.log(value)
    setTitle(value)
  }

  //Handles saving to the tasks array
  const handleSubmit = () => {
    console.log('handle submit', title)
    //TODO: Why didn't it re-render when creating the temp container??
    // console.log(...tasks)
    setTasks([...tasks, title])
    setTitle('')
  }

  const handleEdit = (todoIndex) => {
    //TODO: Edit todo using the es6 find
    // console.log(tasks.findIndex((item, index) => todoIndex === index))
    const replaceIndex = tasks.findIndex((item, index) => todoIndex === index)
    tasks[replaceIndex] += " edited"
    // console.log(tasks)
    setTasks([...tasks])
  }

  const handleSave = (index) => {
    console.log('handle save')
  }

  const handleRemove = () => {
    //TODO: Remove todo using es6 filter
  }

  return (
    <div className="App">
      <div>
        <input
          type='text'
          name="task_title"
          value={title}
          placeholder="Add task here"
          onChange={handleFieldChange}
        />
        <button type="button"
          onClick={handleSubmit}>
          Add task
          </button>
      </div>

      <ul style={{ listStyle: 'none' }}>
        {tasks?.length > 0 ? tasks.map((item, index) => (
          <li
            style={{ display: 'flex', justifyContent: 'space-between' }}
            key={index}
          >
            {item}
            <div>
              <button type="button" onClick={() => handleEdit(index)}>Edit</button>
              <button type="button" onClick={handleRemove}>Delete</button>
            </div>
          </li>
        )) : "Nothing in list"}
      </ul>
    </div>
  );
}

export default App;
