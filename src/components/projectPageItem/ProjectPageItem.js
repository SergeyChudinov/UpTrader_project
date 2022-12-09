import {useHttp} from '../../hooks/http.hook';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { projectsFetchingError, projectsDelete, tasksFetchingError, tasksDelete } from '../../actions';

import './ProjectPageItem.css';

import cross from '../../assets/cross.png';

const ProjectPageItem = ({name, description, id}) => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const navigate = useNavigate();

    const onDelete = async (id) => {   
        const childTasks = await request(`http://localhost:3001/taskSelection?projectId=${id}`, 'GET'); 

        request(`http://localhost:3001/projectSelection/${id}`, 'DELETE')
            .then(() => dispatch(projectsDelete(id)))
            .catch(() => dispatch(projectsFetchingError()));

        childTasks.map(task => request(`http://localhost:3001/taskSelection/${task.id}`, 'DELETE')
            .then(() => dispatch(tasksDelete(task.id)))
            .catch(() => dispatch(tasksFetchingError())));
    }
    
    const openProject = (e) => {
        if (e.target.tagName === 'IMG') return;
        navigate(`/task/${id}`);
    };

    return (
        <div onClick={(e) => openProject(e)} className="card_link">
            <li className={`card`}>
                <div className="card-body">                    
                    <h3 className="card-title">{name}</h3>
                    <p className="card-text">{description}</p>
                </div>
                <span>
                    <button className='cross_button' onClick={() => onDelete(id)} type="button">
                        <img src={cross} alt="cross" />
                    </button>
                </span>
            </li>
        </div>       
    )
}

export default ProjectPageItem;


// to={`/task/${id}`} key={id}