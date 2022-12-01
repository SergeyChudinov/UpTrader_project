import {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import { activeFilterChanged } from '../../actions';
import TaskAddForm from '../taskAddForm/TaskAddForm';
import TaskEditingForm from '../taskEditingForm/TaskEditingForm';
import TaskPageItem from '../taskPageItem/TaskPageItem';

import './TaskPage.css';

const TaskPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showEditingModal, setShowEditingModal] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const {filters, activeFilter} = useSelector(state => state.tasks);



    const elements = () => {
        const btns = filters.map((btn, i) => {
            const btnClass = classNames('filter_btn', btn, {
                'active': btn === activeFilter
            });
            return (
                <button key={i + 1} onClick={() => dispatch(activeFilterChanged(btn))}
                    className={btnClass}>  
                        {btn}
                </button>
            )       
        })

        return (
            <div className="filter_card">
                <div className="filter_body">
                    <p className="filter_text">Отфильтруйте задачи по приоритету</p>
                    <div className="filter_btns">
                        {btns}
                    </div>
                </div>
            </div>
        )     
    }
    const element = elements();

    return (
        <>
            <Link to="/" className='task_link'>Главная</Link>
            <h2 className='task_header'>Страница с задачами</h2>
            {element}    

            {<TaskPageItem key={id} projectId={id} setShowEditingModal={setShowEditingModal} setTaskId={setTaskId}/>}

            <button className='add_project' onClick={() => setShowModal(showModal => !showModal)}>Добавить задачу</button>
            {showModal ? 
                <TaskAddForm projectId={id} setShowModal={setShowModal}/> : null
            }
            {showEditingModal ? 
                <TaskEditingForm projectId={id} setShowEditingModal={setShowEditingModal} id={taskId}/> : null
            }
        </>
    )
}
export default TaskPage;