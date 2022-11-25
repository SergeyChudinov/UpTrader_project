const initialState = {
    projects: [],
    heroesLoadingStatus: 'idle',
    filters: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PROJECTS_FETCHING':
            return {
                ...state
            }
        case 'PROJECTS_FETCHED':
            return {
                ...state,
                projects: action.payload
            }
        case 'PROJECTS_FETCHING_ERROR':
            return {
                ...state
            }
        case 'PROJECTS_DELETED':
            return {
                ...state,
                projects: state.projects.filter(el => el.id !== action.payload)
            }
        case 'PROJECTS_ADD':
            return {
                ...state,
                projects: [...state.projects, action.payload]
            }
        case 'PROJECTS_FILTER':
            return {
                ...state,
                filters: action.payload
            }          
        default: return state
    }
}

export default reducer;