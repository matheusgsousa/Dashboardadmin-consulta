const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

require('./app/controllers/authController')(app);
// require('./app/controllers/messageController')(app);
require('./app/controllers/pacientController')(app);
require('./app/controllers/schedulingController')(app);


app.listen(3333, () => { console.log('Aplicação rodando na porta 3333') });
