import express from 'express';
import { register } from 'prom-client';
import { MetricsService } from './metricsService';

const app = express();
const metricsService = new MetricsService();

app.use((req, res, next) => {
  metricsService.httpRequests.inc({ 
    method: req.method, 
    route: req.path,
    status_code: res.statusCode.toString() 
  });

  const end = metricsService.responseDuration.startTimer({ method: req.method, route: req.path });
  res.on('finish', () => {
    end();
  });

  next();
});

app.post('/user/login', (req, res) => {
  metricsService.activeUsers.inc();
  res.send("Usuário logado!");
});

app.get('/example', (req, res) => {
  res.send("Métrica com injeção de dependência registrada!");
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
