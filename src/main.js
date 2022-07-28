import { launch } from './index';
let port = process.env.PORT ;
launch({
  host: 'localhost',
  protocol: 'http',
  port: port,
});
