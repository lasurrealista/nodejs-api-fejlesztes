const supertest = require('supertest');
const superagent = require('superagent');
const logger = require('./config/logger');

describe('REST API integration tests', () => {
    const insertData = [
        {
            firstName: 'John',
            lastName: 'Test',
            email: 'john@test.com'
        },
        {
            firstName: 'Kate',
            lastName: 'Test',
            email: 'kate@test.com'
        }
    ];

    let lastAccessToken = '';

    beforeEach(done => {
        superagent
            .post('http://localhost:3000/login')
            .send({ username: 'admin', password: 'admin_pw' }) // sends a JSON post body
            .set('Content-Type', `application/json`)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                    return done();
                }
                lastAccessToken = res.body.accessToken;
                done();
            });
    });

    test('GET /person/:id', async () => {
        const randID = Math.round( Math.random() * 100000 );

        const { body } = await superagent
            .post('http://localhost:3000/person')
            .send({last_name: 'Elek', first_name: 'Test', email: `test-${randID}@gmail.com`})
            .set('Authorization', `Bearer ${lastAccessToken}`)
            .set('Content-Type', 'application/json');
        
        superagent
            .get(`http://localhost:3000/person/${body._id}`)
            .set('Authorization', `Bearer ${lastAccessToken}`)
            .set('accept', 'json')
            .end((err, res) => {
                logger.info(JSON.stringify(Object.keys(res)));
                expect(res.body._id).toBe(body._id);
            });
    });
});
