export const projectsFetching = () => {
    return {
        type: 'PROJECTS_FETCHING'
    }
}
export const projectsFetched = (projects) => {
    return {
        type: 'PROJECTS_FETCHED',
        payload: projects
    }
}
export const projectsFetchingError = () => {
    return {
        type: 'PROJECTS_FETCHING_ERROR'
    }
}
export const projectsDelete = (id) => {
    return {
        type: 'PROJECTS_DELETED',
        payload: id
    }
}
export const projectsAdd = (obj) => {
    return {
        type: 'PROJECTS_ADD',
        payload: obj
    }
}
export const projectsFilter = (filter) => {
    return {
        type: 'PROJECTS_FILTER',
        payload: filter
    }
}


export const tasksFetching = () => {
    return {
        type: 'TASKS_FETCHING'
    }
}
export const tasksFetched = (projects) => {
    return {
        type: 'TASKS_FETCHED',
        payload: projects
    }
}
export const tasksFetchingError = () => {
    return {
        type: 'TASKS_FETCHING_ERROR'
    }
}
export const tasksDelete = (id) => {
    return {
        type: 'TASKS_DELETED',
        payload: id
    }
}
export const tasksAdd = (obj) => {
    return {
        type: 'TASKS_ADD',
        payload: obj
    }
}
export const tasksFilter = (filter) => {
    return {
        type: 'TASKS_FILTER',
        payload: filter
    }
}