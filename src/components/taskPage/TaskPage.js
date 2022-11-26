// import {useHttp} from '../../hooks/http.hook';

import {  useState } from 'react';
// import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

import './TaskPage.css';

import TaskAddForm from '../taskAddForm/TaskAddForm';

import TaskPageItem from '../taskPageItem/TaskPageItem';

const TaskPage = () => {
    const {id} = useParams();
    // const {tasks} = useSelector(state => state.tasks);

    const [showModal, setShowModal] = useState(false);



    return (
        <>
            <Link to="/" className='task_link'>Главная</Link>
            <h2>Страница с задачами</h2>
            <p>{id}</p>
            {<TaskPageItem projectId={id}/>}

            <button className='add_project' onClick={() => setShowModal(showModal => !showModal)}>Добавить задачу</button>
            {showModal ? 
                <TaskAddForm projectId={id} setShowModal={setShowModal}/> : null
            }
        </>
    )
}
export default TaskPage;