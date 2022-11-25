import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

import './TaskPage.css';

const TaskPage = () => {
    const {id} = useParams();


    return (
        <>
            <Link to="/" className='task_link'>Главная</Link>
            <h2>Страница с задачами</h2>
            <p>{id}</p>
        </>
    )
}
export default TaskPage;