import express from 'express';
import cors from 'cors';
import { authRoute, getDataRoute } from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/data', getDataRoute);

app.get('*', (_, res) => res.sendStatus(404));
app.post('*', (_, res) => res.sendStatus(404));

export default app;
