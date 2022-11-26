import {useHttp} from '../../hooks/http.hook';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { projectsFetching, projectsFetched, projectsFetchingError } from '../../actions';

import StartPageItem from '../startPageItem/StartPageItem';
import ProjectsAddForm from '../projectAddForm/ProjectAddForm';

import './StartPage.css';
// import Spinner from '../spinner/Spinner';

const StartPage = () => {
    const {projects} = useSelector(state => state.projects);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const [showModal, setShowModal] = useState(false);
    // const [showTrigger, setShowTrigger] = useState(true);
    

    useEffect(() => {
        dispatch(projectsFetching());
        request("http://localhost:3001/projectSelection")
            .then(data => dispatch(projectsFetched(data)))
            .catch(() => dispatch(projectsFetchingError()))
        
        // props.setShowHeroes(showHeroes => !showHeroes)
        
        // eslint-disable-next-line
    }, []);

    const renderProject = (arr) => {
        if (arr.length === 0) {
            return <h5>Проектов пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <StartPageItem key={id} {...props} id={id}/>
        })
    }
    const elements = renderProject(projects);


    return (
        <> 
            <h2>Страница с выбором проекта</h2>
            {elements}
            <button className='add_project' onClick={() => setShowModal(showModal => !showModal)}>Добавить проект</button>
            {showModal ? 
                <ProjectsAddForm setShowModal={setShowModal}/> : null
            }

            
        </>
    )
}
export default StartPage;