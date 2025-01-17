const express = require('express');
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');
const bodyParser = require('body-parser');

const obituaryRoutes = require('./routes/obituaryRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/publications', publicationRoutes);
app.use('/obituaries', obituaryRoutes);
app.use('/oauth', authRoutes);

app.listen(3000, () => {
  console.log('API documentation available at http://localhost:3000/api-docs');
});