import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Elysian Fields API Doc',
          version: '1.0.0',
        },
      },
    })
  )
  .get('/', () => 'hi')
  .post('/hello', () => 'world')
  .get('/', () => 'Hello Elysia')
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
