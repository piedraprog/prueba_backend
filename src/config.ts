import { config } from 'dotenv';
config();

export default {
	BASE_URL: process.env.API_URL || 'http://localhost:3000',
	DOCS_URL: process.env.DOCS_URL,
	MONGO_URL: process.env.MONGO_URL || 'mongodb://Localhost/rrhh360',
	JWT_KEY: process.env.JWT_PASS,
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	ENV: process.env.npm_lifecycle_event || 'dev', 
	PORT: process.env.PORT || 3000,
	HOST: process.env.HOST  || 'http://localhost:3000'
};

