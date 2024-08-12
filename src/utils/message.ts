type InfoMessages = {
    successCreating: string,
    successFetching: string,
    successDeleting: string,
    sucesssUpdating: string,
    successRestoring: string,

    errorCreating: string,
    errorDeleting: string,
    errorUpdating: string,	
    errorFetching: string,
    errorFetchingById: string,
    errorRestoring: string,

    errorKeyMissing: string,
    errorInvalidKey: string,

    accessDenied: string,
    tokenNotFound: string,
    notFound: string,
    contentEmpty: string,
    unauthorized: string,
    invalidData: string,
    alredyExists: string
}

export const INFO_MSG: InfoMessages = {
	successCreating: 'Resource successfully created.',
    successFetching: 'Resources successfully retrieved.',
    successDeleting: 'Resource successfully deleted.',
    sucesssUpdating: 'Resource successfully updated.',
    successRestoring: 'Resource successfully restored.',

    errorCreating: 'Error creating the resource.',
    errorDeleting: 'Error deleting the resource.',
    errorFetching: 'Error fetching the resources.',
    errorUpdating: 'Error updating the resource.',
    errorRestoring: 'Error restoring the resource.',

    errorFetchingById: 'Error fetching the resource by ID.',
    errorKeyMissing: 'Required key is missing.',
    errorInvalidKey: 'Invalid key provided.',

    accessDenied: 'Access denied.',
    tokenNotFound: 'Token not found.',
    notFound: 'Resource not found.',
    contentEmpty: 'No content provided.',
    unauthorized: 'Unauthorized access.',
    invalidData: "Invalid data provided.",
    alredyExists: "alredy exists."
};