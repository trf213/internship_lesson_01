
import { useState, useEffect } from 'react'
import db from './config/firebase'

import './App.css';


const App = () => {

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [editableRowIndex, setEditableRow] = useState(-1)
  const [editableField, setEditableField] = useState('')


  useEffect(() => {
    //Check for existing data
    //TODO: Improve this!
    db.collection("todos")
      .onSnapshot(function (querySnapshot) {
        let tempTasks = []
        querySnapshot.forEach((doc) => {
          tempTasks = [...tempTasks, { id: doc.id, title: doc.data().title }]
        });
        // console.log(tempTasks)
        setTasks(tempTasks)
      });

  }, [])

  //UseEffect re-renders application whenever dependency objects are changed
  //TODO: Fix this!
  // useEffect(() => {

  //   //Save to firebase whenever new task is added

  //   //Save to firebase whenever existing task is updated

  // }, [tasks])

  //Update the state object whenever the field is changed
  const handleFieldChange = (e) => {
    const { value } = e.target
    // console.log(value)
    setTask(value)
  }

  const handleEditFieldChange = (e) => {
    const { value } = e.target
    // console.log(value)
    setEditableField(value)
  }

  //Handles saving to the tasks array
  const handleSubmit = () => {
    console.log('handle submit', task)
    //TODO: Why didn't it re-render when creating the temp container??
    // console.log(...tasks)
    // setTasks([...tasks, { title: task }])
    const newTask = { title: task }
    //TODO: Does this need to be here or is there a better way?
    db.collection("todos").add(newTask)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    setTask('')
  }

  const toggleEditMode = (todoIndex) => {
    //TODO: Edit todo using the es6 find
    // console.log(tasks.findIndex((item, index) => todoIndex === index))
    setEditableRow(todoIndex)
  }

  const handleSave = () => {
    console.log('handle save', editableField)

    const replaceIndex = tasks.findIndex((item, index) => editableRowIndex === index)
    tasks[replaceIndex] = editableField
    console.log(tasks)
    setTasks([...tasks])
    setEditableRow(-1)

  }

  const handleRemove = (todoIndex) => {
    //TODO: Remove todo using es6 filter
    setTasks([...tasks.filter((item, index) => index !== todoIndex)])
  }

  return (
    <div className="App">
      <div>
        <input
          type='text'
          name="task_title"
          value={task}
          placeholder="Add task here"
          onChange={handleFieldChange}
        />
        <button type="button"
          onClick={handleSubmit}>
          Add task
          </button>
      </div>

      <ul style={{ listStyle: 'none' }}>
        {tasks?.length > 0 ? tasks.map((task, index) => (
          <li
            style={{ display: 'flex', justifyContent: 'space-between' }}
            key={task.id}
          >
            <input
              type='text'
              defaultValue={task.title}
              disabled={index !== editableRowIndex}
              onChange={handleEditFieldChange}
            />
            <div>
              {index !== editableRowIndex ? (
                <>
                  <button type="button" onClick={() => toggleEditMode(index)}>Edit</button>
                  <button type="button" onClick={handleRemove}>Delete</button>
                </>
              ) : (
                  <button type="button" onClick={handleSave}>Save Changes</button>
                )}

            </div>
          </li>
        )) : "Nothing in list"}
      </ul>
    </div>
  );
}

export default App;
