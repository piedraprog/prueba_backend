import winston, { format, Logger, transports } from 'winston';

const myCustomslevels: {
	levels: Record<string, number>;
	colors: Record<string, string>;
} = {
	levels: {
		emerg: 0,
		error: 1,
		warn: 2,
		http: 3,
		info: 4,
		debug: 5,
	},
	colors: {
		emerg: 'red',
		error: 'red',
		warn: 'yellow',
		http: 'blue',
		info: 'green',
		debug: 'white',
	},
};
winston.addColors(myCustomslevels.colors);


const logFormat = format.printf(
	({ level, message, timestamp, stack, file, service }: winston.Logform.TransformableInfo & { file?: string, service?: string }) => {
		return `[${timestamp}][${file}][${service}] ${level}: ${stack || message}`;
	}
);

export const buildDevLog: Logger = winston.createLogger({
	levels: myCustomslevels.levels,
	format: format.combine(
		format.colorize({
			all: true,
		}),
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		logFormat
	),
	transports: [
		new transports.Console(),
		// new winston.transports.File({
		// 	level:'warn',
		// 	filename:'src/logs/warningLog.log',
		// 	format: format.combine(
		// 		format.timestamp(),
		// 		format.json()
		// 	)
		// }),
		// new winston.transports.File({
		// 	level:'error',
		// 	filename:'src/logs/errorLog.log',
		// 	format: format.combine(
		// 		format.timestamp(),
		// 		format.json(),
		// 	)
		// })
	],
});