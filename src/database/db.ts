import mongoose from 'mongoose';
import config from '../config';
import { Logger } from '../utils/logger';

(async (): Promise<void> => {
    try {
        const db = await mongoose.connect(config.MONGO_URL);
        Logger.info({
            message: `Connected to database: ${db.connection.name}`,
            file: 'db.ts',
            service: 'db connection'
        });
    } catch (error) {
        Logger.error({
            message: `Error connecting to database: ${error}`,
            file: 'db.ts',
            service: 'db connection'
        });
        process.exit(1);
    }
})();
