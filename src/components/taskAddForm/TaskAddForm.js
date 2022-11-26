import {useHttp} from '../../hooks/http.hook';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import { tasksFetchingError, tasksAdd } from '../../actions';

import './TaskAddForm.css';
import cross from '../../assets/cross.png';
// import Spinner from '../spinner/Spinner';

const TaskAddForm = (props) => {
    const dispatch = useDispatch();
    const {request} = useHttp();

    const [headerTask, setHeaderTask,] = useState('');
    const [descriptionTask, setDescriptionTask,] = useState('');
    const [expirationDateTask, setExpirationDateTask] = useState('');

    // const [statusTask, setStatusTask] = useState('');
    
    // const [showModal, setShowModal] = useState(props.show);

    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = {
            id: uuidv4(),
            header: `${headerTask}`,
            description: `${descriptionTask}`,
            dateOfCreation: new Date(),
            expirationDate: expirationDateTask,

            projectId: props.projectId,
            status: "Queue"
        }
        const json = JSON.stringify(obj)
        request(`http://localhost:3001/taskSelection`, 'POST', json)
            .then(data => dispatch(tasksAdd(data)))
            .catch(() => dispatch(tasksFetchingError()))
    }

    const renderItems = () => {
        return (
            <div className='modal'>
                <div className='modal_block'>
                    <button className='close_modal' onClick={() => props.setShowModal(false)}>
                        <img src={cross} alt="cross" />
                    </button>
                    <form onSubmit={(e) => handleSubmit(e)}
                        className="task_form">
                        <div className="task_setName">
                            <label htmlFor="name" className="task_label">Имя нового задания</label><br />
                            <input onChange={(e) => setHeaderTask(e.target.value)}
                                className="task_input"
                                required
                                type="text" 
                                name="name"/>
                        </div>
            
                        <div className="task_setDescription">
                            <label htmlFor="text" className="task_label">Описание</label><br />
                            <textarea onChange={(e) => setDescriptionTask(e.target.value)}
                                className="task_input" 
                                required
                                name="text"/>
                        </div>

                        <div className="task_setExpirationDate">
                            <label htmlFor="text" className="task_label">Дата окончания</label><br />
                            <input onChange={(e) => setExpirationDateTask(e.target.value)}
                                className="task_input" 
                                required
                                type="date" 
                                name="text"/>
                        </div>

                        {/* <div className="form_setColumn">
                            <label htmlFor="text" className="task_label">Статус</label><br />
                            <textarea onChange={(e) => setStatusTask(e.target.value)}
                                required
                                name="text" 
                                className="task_input" 
                                id="text" />
                        </div> */}
            
                        <button type="submit" className="task_button">Создать</button>
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