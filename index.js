import express from 'express';
import proxyRoute from './routes/proxy.js';
import scriptRoute from './routes/script.js';

const app = express();
const PORT = process.env.PORT || 3001;
const allowedOrigins = (process.env.CORS_ALLOW_ORIGIN || '').split(',');

app.use((req, res, next) => {
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/', proxyRoute);
app.use('/', scriptRoute);

app.listen(PORT, () => {
  console.log(`Server running, listening on port ${PORT}`);
});
