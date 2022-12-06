import {useHttp} from '../../hooks/http.hook';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { tasksFetching, tasksFetched, tasksFetchingError, tasksDelete, tasksUbdate } from '../../actions';

import { useMemo } from 'react';

import './TaskPageItem.css';

import cross from '../../assets/cross.png';
import gear from '../../assets/gear.png';
import Spinner from '../spinner/Spinner';

const TaskPageItem = (props) => {
    const {tasks, taskLoadingStatus, activeFilter} = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [taskId, setTaskId] = useState(null);
    const [updateTask, seUpdateTask] = useState(props.updateTask);
    
    let filtredTasksId = tasks.filter(el => el.projectId === props.projectId);
    let queueFiltredTasks = (filtredTasksId.filter(el => el.status === "Queue"));
    let developmentFiltredTasks = filtredTasksId.filter(el => el.status === "Development");
    let doneFiltredTasks = filtredTasksId.filter(el => el.status === "Done");

    const filtePost = (items, filter) => {
        switch (filter) {
            case 'low':
                return items.filter(item => item.priority === 'low');
            case 'medium':
                return items.filter(item => item.priority === 'medium');
            case 'high':
                return items.filter(item => item.priority === 'high');   
            default:
                return items;             
        }
    }
    const filtredQueue = filtePost(queueFiltredTasks, activeFilter).sort(function(a, b) {
        return new Date(a.dateOfCreation) - new Date(b.dateOfCreation);
    });
    const filtredDevelopment = filtePost(developmentFiltredTasks, activeFilter).sort(function(a, b) {
        return new Date(a.dateOfCreation) - new Date(b.dateOfCreation);
    });
    const filtredDone = filtePost(doneFiltredTasks, activeFilter).sort(function(a, b) {
        return new Date(a.dateOfCreation) - new Date(b.dateOfCreation);
    });

  

    const searchEmp = (items, term) => {

        if (typeof(term) === 'string' && term.length === 0) {
            return items
        }
        const regExp = new RegExp(term, 'i');
        return items.filter((item) => {
            return regExp.test(item.header) || regExp.test(item.id)
        })
    }
    
    const searchQueue = searchEmp(filtredQueue, props.term);
    const searchDevelopment = searchEmp(filtredDevelopment, props.term);
    const searchDone = searchEmp(filtredDone, props.term);

    useEffect(() => {
        dispatch(tasksFetching());
        request("http://localhost:3001/taskSelection")
            .then(data => dispatch(tasksFetched(data)))
            .catch(() => dispatch(tasksFetchingError()))
    }, [updateTask]);

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
        return `дней: ${time[0]} часов: ${time[1]} `  // минут: ${time[2]} секунд: ${time[3]}
    }
    const toLocaleDateString = (date) => {
        return (new Date(date)).toLocaleDateString();
    }
    const toLocaleTimeString = (date) => {
        return (new Date(date)).toLocaleTimeString();
    }

    const onDelete = (id) => {
        request(`http://localhost:3001/taskSelection/${id}`, 'DELETE')
            .then(() => dispatch(tasksDelete(id)))
            .catch(() => dispatch(tasksFetchingError()));
    }

    const onDrop  = (e) => {
        if (e.target.closest('.task_column') && taskId) {
            const status = e.target.closest('.task_column').getAttribute('data-status');

            const json = JSON.stringify({status: status})
            request(`http://localhost:3001/taskSelection/${taskId}`, 'PATCH', json)
                .then((data) => dispatch(tasksUbdate(data, taskId)))
                .catch(() => dispatch(tasksFetchingError()));
                setTaskId(null);
        }
    };
    function dragover_handler(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }
    const showEditingModal = (id) => {
        props.setShowModal(true);
        props.setTaskId(id)
    }
    
    const renderTask = (arr) => {
        if (taskLoadingStatus === "loading") {
            return <Spinner/>;
        } else if (taskLoadingStatus === "error") {
            return <h5>Ошибка загрузки</h5>
        }

        if (arr.length === 0) {
            return <h5>Задач пока нет</h5>
        }

        return arr.map(({id, header, description, dateOfCreation, expirationDate, priority, status, taskParentId, attachedFiles}) => {
            if (priority === '') {
                priority = 'witout_priority'
            }
            const taskNumberClass = classNames("task_top border_none", priority);


            let taskClass = 'task';
            if (taskParentId) {
                taskClass = 'sub_task';
            }

            // console.log(getTimeRemaining(dateOfCreation))
            // console.log(dateOfCreation)
            return (
                <>
                    <div className={taskClass} key={id}
                        onDrag={() => setTaskId(id)}
                        draggable="true">
                        <div className={taskNumberClass}>
                            <p className="task_number">Задача № {id}</p>
                        </div>
                        <div className="task_bottom">
                            <h3 className="task_title">{header}</h3>
                            <p className="task_text">{description}</p>

                            {!taskParentId ?
                                <>
                                    <p className="task_date">
                                        Дата создания {`${toLocaleDateString(dateOfCreation)}, ${toLocaleTimeString(dateOfCreation)}`}</p>
                                    <p className="task_date">
                                        Время в работе: {getTimeRemaining(dateOfCreation)}</p>
                                    <p className="task_date">
                                        Дата окончания: {expirationDate}</p>
                                </>  
                            : null}

                            {attachedFiles[0] ? 
                                <>
                                    <div className="task_file">
                                        <p>Файлы:</p>
                                        <p>{attachedFiles[0].name}</p>
                                    </div>
                                </>
                            : null}

                            <button onClick={() => onDelete(id)} className='delate_task'>
                                <img src={cross} alt="cross" />
                            </button>
                            <button onClick={() => showEditingModal(id)} className='gear_open'>
                                <img src={gear} alt="gear" />
                            </button>
                        </div>                        
                    </div>
                    
                </>
            )
        })
    }
    const elQueue = renderTask(searchQueue);
    const elDevelopment = renderTask(searchDevelopment);
    const elDone = renderTask(searchDone);

    return (
        <>
             <div key={props.projectId} className='container'>
                 <div className='task_div'>
                     <h2>Queue</h2>
                     <div className='task_column' data-status="Queue"  onDrop={(e) => onDrop(e)}
                     onDragOver={(e) => dragover_handler(e)}>
                        {elQueue}
                     </div>
                 </div>
                 <div className='task_div'>
                     <h2>Development</h2>
                     <div className='task_column' data-status="Development"  onDrop={(e) => onDrop(e)}
                     onDragOver={(e) => dragover_handler(e)}>
                        {elDevelopment}
                     </div>
                 </div>
                 <div className='task_div'>
                     <h2>Done</h2>
                     <div className='task_column' data-status="Done"  onDrop={(e) => onDrop(e)}
                     onDragOver={(e) => dragover_handler(e)}>
                        {elDone}
                     </div>
                 </div>
             </div>
        </>
    )
}
export default TaskPageItem;