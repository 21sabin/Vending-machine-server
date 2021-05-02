import express from 'express';
import envs from '../config';
import bodyParser from 'body-parser';
import routes from '../routes/appRoute';
import '../common/mongoose';

import './script'

const cors = require('cors');

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api',routes);

app.listen(envs.PORT, () => console.log('server started at port 4000'));