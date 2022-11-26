import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import {Link} from 'react-router-dom';

import { tasksFetching, tasksFetched, tasksFetchingError, tasksDelete } from '../../actions';

import './TaskPageItem.css';

import cross from '../../assets/cross.png';

const TaskPageItem = (projectId) => {
    const {tasks} = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const {request} = useHttp();

    let queueFiltredTasksId = tasks.filter(el => el.projectId === projectId.projectId);
    let queueFiltredTasks = queueFiltredTasksId.filter(el => el.status === "Queue");

    let developmentFiltredTasksId = tasks.filter(el => el.projectId === projectId.projectId);
    let developmentFiltredTasks = developmentFiltredTasksId.filter(el => el.status === "Development");

    let doneFiltredTasksId = tasks.filter(el => el.projectId === projectId.projectId);
    let doneFiltredTasks = doneFiltredTasksId.filter(el => el.status === "Done");

    useEffect(() => {
        dispatch(tasksFetching());
        request("http://localhost:3001/taskSelection")
            .then(data => dispatch(tasksFetched(data)))
            .catch(() => dispatch(tasksFetchingError()))
        
        // eslint-disable-next-line
    }, []);

    const getTimeAtWork = (data) => {
        const t = Date.parse(new Date()) - Date.parse(data);
        const days = Math.floor((t / (1000 * 60 * 60 * 24)));
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((t / (1000 * 60)) % 60);
        const seconds = Math.floor((t / (1000)) % 60);
        return [days, hours, minutes, seconds];
    }
    const getTimeRemaining = (data) => {
        const time = getTimeAtWork(data);
        return `дней ${time[0]} часов ${time[1]} минут ${time[2]} секунд ${time[3]}`
    }
    const toLocaleDateString = (date) => {
        return (new Date(date)).toLocaleDateString();
    }
    const toLocaleTimeString = (date) => {
        return (new Date(date)).toLocaleTimeString();
    }

    const onDelete = (id) => {
        console.log(id)
        request(`http://localhost:3001/taskSelection/${id}`, 'DELETE')
            .then(() => dispatch(tasksDelete(id)))
            .catch(() => dispatch(tasksFetchingError()))
    }

    const renderTask = (arr) => {
        if (arr.length === 0) {
            return <h5>Задач пока нет</h5>
        }

        return arr.map(({id, header, description, dateOfCreation, expirationDate}, i) => {
            console.log()
            return (
                <>
                    <div className='task' key={id}>
                        <p className="task-number">Задача № {i + 1}</p>
                        <h3 className="task-title">{header}</h3>
                        <p className="task-text">{description}</p>
                        <p className="task-date">
                            Дата создания {`${toLocaleDateString(dateOfCreation)}, ${toLocaleTimeString(dateOfCreation)}`}</p>
                        <p className="task-date">
                            Время в работе: {getTimeRemaining(dateOfCreation)}</p>
                        <p className="task-date">
                            Дата окончания: {expirationDate}</p>


                        <button onClick={() => onDelete(id)} className='delate_task'>
                            <img src={cross} alt="cross" />
                        </button>
                    </div>
                    
                </>
            )
        })
    }
    const elQueue = renderTask(queueFiltredTasks);
    const elDevelopment = renderTask(developmentFiltredTasks);
    const elDone = renderTask(doneFiltredTasks);

    return (
        <>
             <div className='container'>
                 <div className='task_div'>
                     <h2>Queue</h2>
                     <div className='task_column'>
                        {elQueue}
                     </div>
                 </div>
                 <div className='task_div'>
                     <h2>Development</h2>
                     <div className='task_column'>
                        {elDevelopment}
                     </div>
                 </div>
                 <div className='task_div'>
                     <h2>Done</h2>
                     <div className='task_column'>
                        {elDone}
                     </div>
                 </div>
             </div>
        </>
     )
}
export default TaskPageItem;