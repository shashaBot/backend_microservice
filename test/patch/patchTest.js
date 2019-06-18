/* eslint-disable */
const assert = require(`chai`).assert
const patch = require(`../../src/patch/patch`);

/**@test {patch} */
describe(`patching and validation of json patches`, function() {
    /**@test {patch#applyPatch} */
    describe(`#applyPatch()`, function () {
        let patchedData = patch.applyPatch({ firstName: "Albert", contactDetails: { phoneNumbers: [] } }, [ { op: "replace", path: "/firstName", value: "Joachim" },{ op: "add", path: "/lastName", value: "Wester" },{ op: "add", path: "/contactDetails/phoneNumbers/0", value: { number: "555-123" }  }]);

        it(`should apply the patch to the doc and return a patched object`, function() {
            assert.isObject(patchedData);
            assert.deepEqual(patchedData, { "firstName": "Joachim","contactDetails": { "phoneNumbers": [{ "number": "555-123" }] },"lastName": "Wester" });
        });
    });

    let isValid;
    beforeEach(function(done) {
        patch.validatePatch({ firstName: "Albert", contactDetails: { phoneNumbers: [] } }, [ { op: "replace", path: "/firstName", value: "Joachim" },{ op: "add", path: "/lastName", value: "Wester" },{ op: "add", path: "/contactDetails/phoneNumbers/0", value: { number: "555-123" }  }], (res) => {
            isValid = res;
            done();
        });
    });
    /**@test {patch#validatePatch} */
    describe(`#validatePatch()`, function() {
        it(`should return a boolean`, function() {
            assert.isBoolean(isValid);
        });
    });
});
