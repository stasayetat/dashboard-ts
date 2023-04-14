import { boot } from '../src/main';
import { App } from '../src/app';
import request from 'supertest';
let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register error', async () => {
		const res = await request(application.app).post('/users/register').send({
			email: 'a@a.com',
			password: '1',
		});
		expect(res.statusCode).toBe(422);
	});
	it('Login success', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'stas.yarets@gmail.com',
			password: '1234',
		});
		expect(res.statusCode).toBe(200);
	});
	it('Login error', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'stas.yarets@gmail.com',
			password: '12345',
		});
		expect(res.statusCode).toBe(401);
	});
	it('Info success', async () => {
		const res = await request(application.app)
			.get('/users/info')
			.set({
				Authorization:
					'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0YXMueWFyZXRzQGdtYWlsLmNvbSIsImlhdCI6MTY4MTQ5MDUzNH0.a-hAcTHRdbbPJUK_uCNdX_6VSuO0u9MSlVzIJniX05A',
			})
			.send();
		expect(res.statusCode).toBe(200);
	});
	it('Info error', async () => {
		const res = await request(application.app)
			.get('/users/info')
			.set({
				Authorization:
					'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0YXMueWFyZXRzQGdtYWlsLmNvbSIsImlhdCI6MTY4MTQ5MDUzNH0.a-hAcTHRdbbPJUK_uCNdX_6VSuO0u9MSlVzIJniX05A1',
			})
			.send();
		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
