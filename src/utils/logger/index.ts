import { buildDevLog } from './dev.logger';
import { buildProdLogger } from './prod.logger'; 

import config from '../../config';

let newLogger;

if (config.ENV === 'dev') {
	newLogger = buildDevLog;
} else {
	newLogger = buildProdLogger;
}


export const Logger = newLogger; 