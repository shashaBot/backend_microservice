/* eslint-disable */
const assert = require(`chai`).assert;
const jwt = require(`../../src/auth/jsonwebtoken`);
const config = require(`../../src/config/config`);

const testUser = {
  username: 'test_user',
  password: 'test_pass',
}

let result = jwt.getToken({ username: testUser.username });

/**
 *@test {jwt}
 */
describe(`Generate and decode a token`, function() {
    /**@test {jwt#getToken} */
    describe(`#getToken()`, function() {
        it(`should return a token when passed a payload which should be of type string`, function() {
            assert.typeOf(result, `string`, `Expected the token to be a string`);
        });

        it(`should be an array and length should be 3 when it is splited into an array using the (.) as the reference`, function() {
            let splited = result.split(`.`);
            assert.isArray(splited);
            assert.lengthOf(splited, 3, `Expected the splitted token to have three subparts`);
        });
    });

    /**@test {jwt#decodeToken} */
    describe(`#decodeToken()`, function() {
        it(`should return back the payload when the token is decoded`, function() {
            jwt.decodeToken(result, (err, payload) => {
                assert.typeOf(payload, `Object`, `Expected the decoded payload to be an object`);
                assert.equal(payload.username, testUser.username, `Expected username from payload to match provided username: ${testUser.username}`);
            });
        });
    });
});

describe(`Generate token with invalid payload`, () => {
    let result;
    beforeEach((done) => {
        result = jwt.getToken({user: 'testing'})
        done();
    })
    it('should give error for empty payload', (done) => {
        jwt.decodeToken(result, (err, payload) => {
            assert.exists(err);
            // assert.hasAnyKeys('err', 'message')
            done();
        })
    })
})
