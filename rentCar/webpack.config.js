onst path = require ('path');
module.exports = {
    entry: './src/js/file.js',
    output:{
        path: path.resolve(_dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    mode:'development'
};