import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { tasksFetchingError, tasksUbdate } from '../../actions';

import './TaskEditingForm.css';
import cross from '../../assets/cross.png';

const TaskEditingForm = (props) => {
    const {tasks} = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const {request} = useHttp();

    let foundTask = tasks.find(el => el.id === props.id);

    const [headerTask, setHeaderTask,] = useState(foundTask.header);
    const [descriptionTask, setDescriptionTask,] = useState(foundTask.description);
    const [expirationDateTask, setExpirationDateTask] = useState(foundTask.expirationDate);
    const [priorityTask, setPriorityTask] = useState(foundTask.priority);
    const [attachedFilesTask, setAttachedFilesTask] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('attachedFiles', attachedFilesTask)

        const obj = {
            id: props.id,
            header: `${headerTask}`,
            description: `${descriptionTask}`,
            dateOfCreation: foundTask.dateOfCreation,
            expirationDate: `${expirationDateTask}`,
            priority: `${priorityTask}`,
            attachedFiles: attachedFilesTask,

            projectId: props.projectId,
            taskParentId: foundTask.taskParentId ? foundTask.taskParentId : null,
            status: foundTask.status
        }
        const json = JSON.stringify(obj)
        request(`http://localhost:3001/taskSelection/${props.id}`, 'PUT', json)
            .then(data => dispatch(tasksUbdate(data, props.id)))
            .catch(() => dispatch(tasksFetchingError()));
        document.querySelector('.close_modal').click();
    }

    const setHeader = (value) => {
        setHeaderTask(value);
        foundTask.header = value;
    }
    const setDescription = (value) => {
        setDescriptionTask(value);
        foundTask.description = value;
    }
    const setExpirationDate = (value) => {
        setExpirationDateTask(value);
        foundTask.expirationDate = value;
    }
    const setPriority = (value) => {
        setPriorityTask(value);
        foundTask.priority = value;
    }
    const setAttachedFiles = (e) => {
        const obj = {
            id: uuidv4(),
            name: e.target.files[0].name
        };
        // setAttachedFilesTask(...attachedFilesTask, obj);
        setAttachedFilesTask(attachedFilesTask => [...attachedFilesTask, obj])
        foundTask.attachedFiles.push(obj);
        // setCharList(charList => [...charList, ...newCharList])

        let dots;
        const arr = e.target.files[0].name.split('.');
        arr[0].length > 6 ? dots = '...' : dots = '.';
        const name = arr[0].substring(0, 7) + dots + arr[1];
        e.target.previousElementSibling.textContent = name;
    }

    const addSubtask = () => {
        props.setSubtaskId(uuidv4());
        props.setShowModal(false);
        props.setShowModal(true);
    }

    const closeModal = () => {
        props.setShowModal(false);
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
                            <input onChange={(e) => setHeader(e.target.value)}
                                className="task_input"
                                required
                                type="text" 
                                name="name"
                                value={foundTask.header}/>   
                        </div>
            
                        <div className="task_setDescription">
                            <label htmlFor="text" className="task_label">Описание</label><br />
                            <textarea onChange={(e) => setDescription(e.target.value)}
                                className="task_input" 
                                required
                                name="text"
                                value={foundTask.description}/>
                        </div>

                        {!foundTask.taskParentId ?
                            <>
                                <div className="task_setExpirationDate">
                                    <label htmlFor="text" className="task_label">Дата окончания</label><br />
                                    <input onChange={(e) => setExpirationDate(e.target.value)}
                                        className="task_input" 
                                        required
                                        type="date" 
                                        name="text"
                                        value={foundTask.expirationDate}/>
                                </div>

                                <div className="task_riority">
                                    <label htmlFor="text" className="task_label">Приоритет</label><br />
                                    <select onChange={(e) => setPriority(e.target.value)}
                                        className="task_input" 
                                        required
                                        type="date" 
                                        name="text"
                                        value={foundTask.priority}>
                                        <option value="all">Нет</option>
                                        <option value="low">Низкий</option>
                                        <option value="medium">Средний</option>
                                        <option value="high">Высокий</option>
                                    </select>
                                </div>
                            </>  
                        : null}




                        <div className="file_upload">
							<button type="button">Загрузить файл</button>
							<div className="file_name">
                                <div>Файл не выбран</div>
                            </div>
							<input onInput={(e) => setAttachedFiles(e)} className="inputPreview" type="file" name='upload' multiple accept="image/*"/>
						</div>

                        {foundTask.attachedFiles[0] ? 
                            <>
                                <div>{foundTask.attachedFiles[0].name}</div>
                            </>
                            : null
                        }

                        {!foundTask.taskParentId ? 
                            <>
                                <button onClick={addSubtask}>добавить подзадачу</button><br/>
                            </>     
                            : null}

                        <button type="submit" className="task_button">Изменить</button>
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
export default TaskEditingForm;