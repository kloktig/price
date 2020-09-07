import http from 'k6/http';
import { check} from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 500 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        { duration: '5s', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<40'], // 99% is less than 40 ms
    },
};

const BASE_URL = 'http://localhost:30000';

export default function() {
    let i = 0
    let result = http.post(`${BASE_URL}/mva/price`, {
        "group": "string",
        "basePrice": i++,
        "dateTime": "2020-09-07T20:33:59.906Z"
    });
    check(result, { 'status was 200': r => r.status === 200 });
}