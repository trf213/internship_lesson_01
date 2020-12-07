
import { useState, useEffect } from 'react'
import '../App.css';

const Todo = () => {

    const [title, setTitle] = useState('')
    const [tasks, setTasks] = useState([])
    const [editableRowIndex, setEditableRow] = useState(-1)
    const [editableField, setEditableField] = useState('')


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
        setTasks([...tasks, title])
        setTitle('')
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
        // console.log(todoIndex)
        // console.log([...tasks.filter((item, index) => index !== todoIndex)])
        //TODO: Remove todo using es6 filter
        setTasks([...tasks.filter((item, index) => index !== todoIndex)])
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
                {tasks?.length > 0 ? tasks.map((task, index) => (
                    <li
                        style={{ display: 'flex', justifyContent: 'space-between' }}
                        key={index}
                    >
                        <input
                            type='text'
                            defaultValue={task}
                            disabled={index !== editableRowIndex}
                            onChange={handleEditFieldChange}
                        />
                        <div>
                            {index !== editableRowIndex ? (
                                <>
                                    <button type="button" onClick={() => toggleEditMode(index)}>Edit</button>
                                    <button type="button" onClick={() => handleRemove(index)}>Delete</button>
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

export default Todo;
