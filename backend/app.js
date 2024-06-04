const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const sensorRoutes = require('./routes/sensorRoutes');
const actionRoutes = require('./routes/actionRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/sensor', sensorRoutes);
app.use('/action', actionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
