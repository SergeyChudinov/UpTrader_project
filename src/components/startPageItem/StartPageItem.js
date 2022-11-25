import {useHttp} from '../../hooks/http.hook';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";

import {Link} from 'react-router-dom';

import { projectsFetchingError, projectsDelete } from '../../actions';

import './StartPageItem.css';

import cross from '../../assets/cross.png';

const StartPageItem = ({name, description, id}) => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const navigate = useNavigate();

    const onDelete = (id) => {
        
        request(`http://localhost:3001/projectSelection/${id}`, 'DELETE')
            .then(() => dispatch(projectsDelete(id)))
            .catch(() => dispatch(projectsFetchingError()))
    }
    const openProject = (e) => {
        if (e.target.tagName === 'IMG') return;
        navigate(`/task/${id}`);
    };

    return (
        <div onClick={(e) => openProject(e)} className="card_link">
            <li 
                className={`card`}>

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

export default StartPageItem;


// to={`/task/${id}`} key={id}