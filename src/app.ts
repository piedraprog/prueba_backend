import express, { Request, Response } from 'express';
import cors from 'cors';
import config from './config';
import { morganMiddleware } from './middlewares/morgan.middleware';
import AppRoutes from './routes';


const app = express();

//SETTINGS
app.set('port', config.PORT);

//MIDDLEWARE
const corsOptions = {};
app.use(cors(corsOptions));

app.use(morganMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// general endpoint && list all the routes
app.get('/', (req: Request, res: Response) => {
  const endpoints: string[] = [];

  // Recorremos las rutas registradas en la aplicación
  req.app._router.stack.forEach((middleware: any) => {
    if (middleware.route) { // Si es una ruta
      const methods = Object.keys(middleware.route.methods).map(method => method.toUpperCase());
      const path = middleware.route.path;
      methods.forEach((method) => {
        endpoints.push(`${method} ${path}`);
      });
    }
  });

  res.json({
    availableEndpoints: endpoints
  });
});


// DOCS ENDPOINT
app.get('/docs', (req, res) => {
  // res.redirect(config.docsUrl);
});

//FUNCTIONAL ROUTES
app.use('/api', AppRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'URL no encontrada' });
});


export default app;
