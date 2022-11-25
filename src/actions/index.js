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