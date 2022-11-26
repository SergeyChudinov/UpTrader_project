import {useHttp} from '../../hooks/http.hook';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import { projectsFetchingError, projectsAdd } from '../../actions';

import './ProjectAddForm.css';
import cross from '../../assets/cross.png';
// import Spinner from '../spinner/Spinner';

const ProjectsAddForm = (props) => {
    const dispatch = useDispatch();
    const {request} = useHttp();

    const [nameProject, setNameProject] = useState('');
    const [descriptionProject, setDescriptionProject] = useState('');
    
    // const [showModal, setShowModal] = useState(props.show);

    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = {
            id: uuidv4(),
            name: `${nameProject}`,
            description: `${descriptionProject}`
        }
        const json = JSON.stringify(obj)
        request(`http://localhost:3001/projectSelection`, 'POST', json)
            .then(data => dispatch(projectsAdd(data)))
            .catch(() => dispatch(projectsFetchingError()))
    }

    const renderItems = () => {
        return (
            <div className='modal'>
                <div className='modal_block'>
                    <button className='close_modal' onClick={() => props.setShowModal(false)}>
                        <img src={cross} alt="cross" />
                    </button>
                    <form onSubmit={(e) => handleSubmit(e)}
                        className="form_border">
                        <div className="form_setName">
                            <label htmlFor="name" className="form_setName_label">Имя нового проекта</label><br />
                            <input onChange={(e) => setNameProject(e.target.value)}
                                className="form_setName_input"
                                required
                                type="text" 
                                name="name" 
                                id="name"/>
                        </div>
            
                        <div className="form_setDescription">
                            <label htmlFor="text" className="form_setDescription_label">Описание</label><br />
                            <textarea onChange={(e) => setDescriptionProject(e.target.value)}
                                required
                                name="text" 
                                className="form_setDescription_input" 
                                id="text" />
                        </div>
            
                        <button type="submit" className="form_button">Создать</button>
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
export default ProjectsAddForm;