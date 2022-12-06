const initialState = {
    tasks: [],
    taskLoadingStatus: 'idle',
    filters: ['all', 'low', 'medium', 'high'],
    activeFilter: 'all'
}

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TASKS_FETCHING':
            return {
                ...state,
                taskLoadingStatus: 'loading'
            }
        case 'TASKS_FETCHED':
            return {
                ...state,
                tasks: action.payload,
                taskLoadingStatus: 'idle'
            }
        case 'TASKS_FETCHING_ERROR':
            return {
                ...state,
                taskLoadingStatus: 'error'
            }
        case 'TASKS_DELETED':
            return {
                ...state,
                tasks: state.tasks.filter(el => el.id !== action.payload),
                taskLoadingStatus: 'idle'
            }
        case 'TASKS_DELETED_ALL':
            return {
                ...state,
                tasks: state.tasks.filter(el => el.projectId !== action.payload),
                taskLoadingStatus: 'idle'
            }    
        case 'TASKS_ADD': 
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                taskLoadingStatus: 'idle'
            }
        case 'TASKS_FILTER':
            return {
                ...state,
                // filters: action.payload,
                taskLoadingStatus: 'idle'
            }
        case 'TASKS_UBDATE':
            return {
                ...state,
                tasks: state.tasks.map(
                    (task) => task.id === action.taskId ? action.payload
                                            : task
                ),
                taskLoadingStatus: 'idle'
            }
        case 'TASKS_PUT':
            return {
                ...state,
                tasks: state.tasks.map(
                    (task) => task.id === action.taskId ? action.payload
                                            : task
                ),
                taskLoadingStatus: 'idle'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                taskLoadingStatus: 'idle'   
            }          
        default: return state
    }
}

export default tasksReducer;