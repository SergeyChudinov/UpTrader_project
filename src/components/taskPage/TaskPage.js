import {  useState } from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import TaskPageItem from '../taskPageItem/TaskPageItem';
import TaskForm from '../taskForm/TaskForm';
import FilterPanel from '../filterPanel/FilterPanel';
import SearchPanel from '../searchPanel/SearchPanel';

import './TaskPage.css';

const TaskPage = () => {
    const {id} = useParams();
    const [showModal, setShowModal] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [subtaskId, setSubtaskId] = useState(null);
    const [term, setTerm] = useState('');
    const [updateTask, setUpdateTask] = useState({});


    const onUpdateSearch = (term) => {
        setTerm(term)
    }

    return (
        <>
            <Link to="/" className='task_link'>Главная</Link>
            <h2 className='task_header'>Страница с задачами</h2>
            <SearchPanel onUpdateSearch={onUpdateSearch}/><br />
            <FilterPanel/> 
            
            <div className='add_task' onClick={() => setShowModal(showModal => !showModal)}>Добавить задачу</div>

            {<TaskPageItem key={id} projectId={id} term={term} setShowModal={setShowModal} setTaskId={setTaskId} updateTask={updateTask}/>}

            {showModal ? 
                <TaskForm projectId={id} id={taskId} subtaskId={subtaskId} setTaskId={setTaskId} setSubtaskId={setSubtaskId} setShowModal={setShowModal} setUpdateTask={setUpdateTask}/> : null
            }

        </>
    )
}
export default TaskPage;