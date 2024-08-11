export const getPagination = (size: number,page: number) =>{
	const limit = size ? + size : 20;
	const offset = page ? page * limit : 0;
	return {limit, offset};
};