export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    errors?: any;
}

export const createResponse = <T = any>(
    success: boolean,
    message: string,
    data?: T,
    errors?: any
): ApiResponse<T> => {
    return {
        success,
        message,
        data,
        errors
    };
};