import { config } from 'dotenv';
config();

export default {
	MONGO_URL: process.env.MONGO_URL || 'mongodb://Localhost/rrhh360',
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'GJ.qCP^B;h`Z_E8AXm7eDu',
	ENV: process.env.npm_lifecycle_event || 'dev', 
	PORT: process.env.PORT || 3000,
};

