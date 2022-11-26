import { createStore, combineReducers } from 'redux';
import projectsReducer from '../reducers/projectReducers/ProjectReducers';
import tasksReducer from '../reducers/taskReducers/TaskReducers';



const reducer = combineReducers({
    projects: projectsReducer,
    tasks: tasksReducer
})

const store = createStore(reducer);

export default store;