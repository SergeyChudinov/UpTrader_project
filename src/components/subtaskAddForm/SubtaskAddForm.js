import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { tasksFetchingError, tasksAdd } from '../../actions';

import './SubtaskAddForm.css';

import cross from '../../assets/cross.png';

const SubtaskAddForm = (props) => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const {tasks,} = useSelector(state => state.tasks);
    const [headerTask, setHeaderTask,] = useState('');
    const [descriptionTask, setDescriptionTask,] = useState('');
    const [expirationDateTask, setExpirationDateTask] = useState('');

    const foundTask = tasks.find(el => el.id === props.id);
    console.log(foundTask)

    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = {
            id: uuidv4(),
            header: `${headerTask}`,
            description: `${descriptionTask}`,
            dateOfCreation: foundTask.dateOfCreation,
            expirationDate: `${expirationDateTask}`,
            priority: foundTask.priority,
            attachedFiles: [],

            projectId: props.projectId,
            taskParentId: props.id,
            status: "Queue"
        }
        const json = JSON.stringify(obj)
        request(`http://localhost:3001/taskSelection`, 'POST', json)
            .then(data => dispatch(tasksAdd(data)))
            .catch(() => dispatch(tasksFetchingError()));
        document.querySelector('.close_modal').click();
    }

    const closeModal = () => {
        props.setShowModal(false);
        props.setSubtaskId(null);
        props.setTaskId(null);
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
                            <label htmlFor="name" className="task_label">Заголовок</label><br />
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

                        {/* <div className="task_setExpirationDate">
                            <label htmlFor="text" className="task_label">Дата окончания</label><br />
                            <input onChange={(e) => setExpirationDateTask(e.target.value)}
                                className="task_input" 
                                required
                                type="date" 
                                name="text"/>
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
export default SubtaskAddForm;



// {!foundTask.taskParentId ?
//     <>
//         <div className="task_setExpirationDate">
//             <label htmlFor="text" className="task_label">Дата окончания</label><br />
//             <input onChange={(e) => setExpirationDate(e.target.value)}
//                 className="task_input" 
//                 required
//                 type="date" 
//                 name="text"
//                 value={foundTask.expirationDate}/>
//         </div>

//         <div className="task_riority">
//             <label htmlFor="text" className="task_label">Приоритет</label><br />
//             <select onChange={(e) => setPriority(e.target.value)}
//                 className="task_input" 
//                 required
//                 type="date" 
//                 name="text"
//                 value={foundTask.priority}>
//                 <option value="all">Нет</option>
//                 <option value="low">Низкий</option>
//                 <option value="medium">Средний</option>
//                 <option value="high">Высокий</option>
//             </select>
//         </div>
//     </>  
// : null}