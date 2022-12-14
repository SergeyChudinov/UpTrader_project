import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { tasksFetchingError, tasksAdd } from '../../actions';

import './TaskAddForm.css';

import cross from '../../assets/cross.png';

const TaskAddForm = (props) => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [headerTask, setHeaderTask,] = useState('');
    const [descriptionTask, setDescriptionTask,] = useState('');
    const [expirationDateTask, setExpirationDateTask] = useState('');
    const [priorityTask, setPriorityTask] = useState('');
    const [updateTask, setUpdateTask] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = {
            header: `${headerTask}`,
            description: `${descriptionTask}`,
            dateOfCreation: new Date(),
            expirationDate: `${expirationDateTask}`,
            priority: `${priorityTask}`,
            attachedFiles: [],
            status: "Queue",
            projectId: props.projectId,
            taskParentId: null           
        }
        const json = JSON.stringify(obj)
        request(`http://localhost:3001/taskSelection`, 'POST', json)
            .then(data => dispatch(tasksAdd(data)))
            .catch(() => dispatch(tasksFetchingError()));
        document.querySelector('.close_modal').click();
        setTimeout(() => {
            props.setUpdateTask({})
            setUpdateTask({})
        }, 500) 
    }

    const closeModal = () => {
        props.setShowModal(false);
    }

    const renderItems = () => {
        return (
            <div className='modal'>
                <div className='modal_block'>
                    <button className='close_modal' onClick={closeModal}>
                        <img src={cross} alt="cross" />
                    </button>
                    <form onSubmit={(e) => handleSubmit(e)}
                        className="task_form">
                        <div className="task_setName">
                            <label htmlFor="name" className="task_label">??????????????????</label><br />
                            <input onChange={(e) => setHeaderTask(e.target.value)}
                                className="task_input"
                                required
                                type="text" 
                                name="name"/>
                        </div>
            
                        <div className="task_setDescription">
                            <label htmlFor="text" className="task_label">????????????????</label><br />
                            <textarea onChange={(e) => setDescriptionTask(e.target.value)}
                                className="task_input" 
                                required
                                name="text"/>
                        </div>

                        <div className="task_setExpirationDate">
                            <label htmlFor="text" className="task_label">???????? ??????????????????</label><br />
                            <input onChange={(e) => setExpirationDateTask(e.target.value)}
                                className="task_input" 
                                required
                                type="date" 
                                name="text"/>
                        </div>

                        <div className="task_riority">
                            <label htmlFor="text" className="task_label">??????????????????</label><br />
                            <select onChange={(e) => setPriorityTask(e.target.value)}
                                className="task_input" 
                                required
                                type="date" 
                                name="text">
                                <option value="all">??????</option>
                                <option value="low">????????????</option>
                                <option value="medium">??????????????</option>
                                <option value="high">??????????????</option>
                            </select>
                        </div>
            
                        <button type="submit" className="task_button">??????????????</button>
                    </form>
                </div>
            </div>
        )
    }
    const items = renderItems()

    return (
        <> 
            {items}
        </>
    )
}
export default TaskAddForm;