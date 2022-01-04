import request from 'supertest';
import { app } from './index';

beforeEach(async () => {
  await wait(5000);
}, 5001)

describe('post endpoints', () => {
  it('should return jwt after user authorization', async () => {
    const res = await request(app).post('/authenticate').send({
      username: 'vlad',
      password: '1111',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  }, 12000);

  it('should return message: wrong user', async () => {
    const res = await request(app).post('/authenticate').send({
      username: 'user',
      password: 'password',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('Incorrect username.');
  }, 12000);
});

describe('get endpoints', () => {
  it('should return product list', async () => {
    const res = await request(app).get('/products');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  }, 12000);

  it('should return category list', async () => {
    const res = await request(app).get('/categories');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  }, 12000);
});

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
