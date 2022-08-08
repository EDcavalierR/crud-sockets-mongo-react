import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { join } from 'path';

const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.static(join(__dirname, '../sockets/build')/* .replace(/\\/g, '/') */));

export default app;