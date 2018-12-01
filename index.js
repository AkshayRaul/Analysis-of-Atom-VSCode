import express from 'express';
import morgan from 'morgan';
import path from 'path';

import config from './config';
import api from './src/api';

const PORT = config.PORT;
const app = express();

app.use(morgan('tiny'));

app.use('/api', api);
app.use('*', express.static(path.join(__dirname, 'src/app')));

app.listen(PORT);
