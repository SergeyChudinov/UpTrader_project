const initialState = {
    tasks: []
}

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TASKS_FETCHING':
            return {
                ...state
            }
        case 'TASKS_FETCHED':
            return {
                ...state,
                tasks: action.payload
            }
        case 'TASKS_FETCHING_ERROR':
            return {
                ...state
            }
        case 'TASKS_DELETED':
            return {
                ...state,
                tasks: state.tasks.filter(el => el.id !== action.payload)
            }
        case 'TASKS_ADD':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case 'TASKS_FILTER':
            return {
                ...state,
                filters: action.payload
            }          
        default: return state
    }
}

export default tasksReducer;