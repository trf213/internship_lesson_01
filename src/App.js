import { useState, useEffect } from 'react'
import './App.css';

const App = () => {

  const [title, setTitle] = useState('')
  const [tasks, setTasks] = useState([])
  const [editableRowIndex, setEditableRow] = useState(-1)
  const [editableField, setEditableField] = useState('')


  useEffect(() => {
    //Check if localstorage is
    const storedTasks = JSON.parse(window.localStorage.getItem('tasks'))
    console.log(storedTasks)
    if (storedTasks != null &&storedTasks.length > 0) {
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
     console.log(value)
    setTitle(value)
  }

  const handleEditFieldChange = (e) => {
    const { value } = e.target
    // console.log(value)
    setEditableField(value)
  }

  //Handles saving to the tasks array
  const handleSubmit = () => {
    console.log('handle submit', title)
    //TODO: Why didn't it re-render when creating the temp container??
    // console.log(...tasks)
    if (title !== ''&& !tasks.some((item) => item === title))
    {
      setTasks([...tasks, title])
      setTitle('')
    }
  }

  const handleEdit = (item) => {
    //TODO: Edit todo using the es6 find
    const fakeTask = tasks
    const index =  fakeTask.findIndex((element)=>element===item);
    
    if (title !== '' && index !== null  && index >= 0 )
    {
      console.log('Editted')
      fakeTask[index]= title;
      setTasks(fakeTask)
      setTitle('');
    }

  }

  const handleRemove = (item) => {
    //TODO: Remove todo using es6 filter
    const filtered = tasks.filter(value => value !== item);
    setTasks(filtered);
  }

  return (
    <div className="App  flex flex-col text-black py-10">
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

      <ul>
        {tasks?.length > 0 ? tasks.map((item, index) => (
          <li key={index} className='my-5 flex flex-row justify-evenly'>
            {item}
            <div>
            <button type="button" className='rounded-lg border-green-500 bg-green-500 px-5 py-1 mx-5' onClick={() => handleEdit(item)}>Edit</button>
            <button type="button" className='rounded-lg border-red-500 bg-red-500 px-5 py-1 mx-5' onClick={() => handleRemove(item)}>Delete</button>
            </div>
           
          </li>
        )) : "Nothing in list"}
      </ul>
    </div>
  );
}

export default App;
