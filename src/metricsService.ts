    import { Counter, Gauge, Histogram } from 'prom-client';

    export class MetricsService {
    public httpRequests: Counter<string>;
    public responseDuration: Histogram<string>;
    public activeUsers: Gauge<string>;


    constructor() {
        this.httpRequests = new Counter({
        name: 'http_requests_total',
        help: 'Total de requisições HTTP',
        labelNames: ['method', 'route', 'status_code'],
        });

        this.responseDuration = new Histogram({
        name: 'http_response_duration_seconds',
        help: 'Duração das respostas HTTP em segundos',
        labelNames: ['method', 'route'],
        buckets: [0.1, 0.5, 1, 2, 5],
        });

        this.activeUsers = new Gauge({
            name: 'active_users',
            help: 'Número de usuários ativos no momento',
        });
    }
    }
