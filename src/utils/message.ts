type InfoMessages = {
    errorDeleting: string;
    errorFetching: string;
    errorFetchingOneMomentById: string;
    errorPosting: string;
    errorKeyMissing: string;
    errorInvalidKey: string;
    accessDenied: string;
    tokenNotFound: string;
    userNotFound: string;
    contentEmpty: string;
    unauthorized: string;
    successRegistering: string;
    successDeleting: string;
};

export const INFO_MSG: InfoMessages = {
	errorDeleting :'something goes wrong deleting the data',
	errorFetching: 'something goes wrong fetching data',
	errorFetchingOneMomentById: 'something goes wrong fetching the data',
	errorPosting: 'something goes wrong posting the data',
	errorKeyMissing: 'fetch Key is missing, consult the documentation',
	errorInvalidKey: 'Invalid key on request body, consult documentation',
	
	accessDenied: 'Error access denied',
	tokenNotFound: 'Missing token on request body',
	userNotFound: 'User not found or does not exist',
	contentEmpty: 'Content can not be empty',
	
	unauthorized: 'without authorization to make this request, please contact support to resolve this issue',
	
	successRegistering: 'Registered successfully',
	successDeleting: 'Delete successfully',
};

console.log(INFO_MSG.accessDenied)