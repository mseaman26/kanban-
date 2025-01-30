import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// Workaround for __dirname in ES modules using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serving static files from the client build directory
app.use(express.static(join(__dirname, '../client/dist')));

app.use(express.json());
app.use(routes);

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '../client/dist/index.html'));  // Serve the index.html of your React app
});

sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
