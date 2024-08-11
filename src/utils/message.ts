type InfoMessages = {
    successCreating: string,
    successFetching: string,
    successDeleting: string,
    sucesssUpdating: string,

    errorCreating: string,
    errorDeleting: string,
    errorFetching: string,
    errorFetchingById: string,

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

    errorCreating: 'Error creating the resource.',
    errorDeleting: 'Error deleting the resource.',
    errorFetching: 'Error fetching the resources.',

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