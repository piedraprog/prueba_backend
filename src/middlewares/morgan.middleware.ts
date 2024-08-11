import morgan from 'morgan';
import config from '../config';
import { Logger } from '../utils/logger';

const stream = {
	write:  (message: any) => Logger.http({
		message, 
		file:'morgan', 
		service:'Morgan Middleware'
	}),
};

const skip = () => {
	const env = config.ENV; 
	return env != 'dev';
};

const newMorgan = morgan(
	':method :url [:status] [:res[content-length] kb] - :response-time ms',
	{stream, skip}
);

export const morganMiddleware = newMorgan;