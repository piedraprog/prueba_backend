import { Logger } from './utils/logger';
import app from './app';
import './database/db';

app.listen(app.get('port'), () => {
  Logger.info({
    message:`server on port, ${app.get('port')}`, 
    file: 'index.js',
    service: 'server'
  });  
})