/* eslint-disable */
const assert = require(`chai`).assert;
const imgThumbnail = require(`../../src/img-thumbnail/img-thumbnail`);

/**@test {imgTumbnail} */
describe(`Download and resize images`, function() {

    /**@test {imgThumbnail#downloadImage} */
    describe(`#downloadImage()`, function() {
        // let filename;
        // let format;
        // beforeEach(function(done) {
        //     imgThumbnail.downloadImage(`https://images.pexels.com/photos/984539/pexels-photo-984539.jpeg`,`board`,(filename, format) => {
        //         filename = filename;
        //         format = format;
        //         done();
        //     });
        // });

        // it(`filename and format must be strings`, function() {
        //     assert.typeOf(filename, `string`);
        //     assert.typeOf(format, `string`);
        // });

        // it(`filename must not contain .`, function() {
        //     assert.notInclude(filename, `.`)
        // });

        // it(`format must be png|jpg|jpeg`, function() {
        //     assert.oneOf(format, [`png`,`jpg`,`jpeg`]);
        // });

        // it(`format must have a minimum length of 3 and a maximium length of 4`, function() {
        //     assert.isAbove(format.length, 2);
        //     assert.isBelow(format.length, 5);
        // });
    });
});
