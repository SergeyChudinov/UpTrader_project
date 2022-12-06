import TaskAddForm from '../taskAddForm/TaskAddForm';
import TaskEditingForm from '../taskEditingForm/TaskEditingForm';
import SubtaskAddForm from '../subtaskAddForm/SubtaskAddForm';

import './TaskForm.css';

const TaskForm = (props) => {



    const elements = () => {
        if (props.subtaskId) {
            console.log('SubtaskAddForm');
            return (
                <SubtaskAddForm projectId={props.projectId} id={props.id} setTaskId={props.setTaskId} setSubtaskId={props.setSubtaskId} setShowModal={props.setShowModal}/>
            )
        } else if (props.id) {
            console.log('TaskEditingForm');
            return (
                <TaskEditingForm projectId={props.projectId} id={props.id} setTaskId={props.setTaskId} setSubtaskId={props.setSubtaskId} setShowModal={props.setShowModal}/>
            )
        } else {
            console.log('TaskAddForm');
            return (
                <TaskAddForm projectId={props.projectId} id={props.id} setTaskId={props.setTaskId} setShowModal={props.setShowModal}/>
            )
        }
    }
    const element = elements();

    return (
        <> 
            {element} 
        </>
    )
}
export default TaskForm;