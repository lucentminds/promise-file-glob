# promise-glob-file
NodeJs module that resolves a glob file path or a list of glob file paths.

### Useage:

```js
var glob = require( 'promise-glob-file' );

var aPaths = [
    '.',
    '..',
    './documents/test.txt'
];

glob( ['**/*.js"', '**/*.md'] )
.then(function( aGlobbed ){

    console.log( 'All files globbed!' );

})
.fail(function( err ){

    console.log( 'Oops!' );

});
```

Or for a single glob.

```js
glob( '**/*.js"', true )
.then(function( aGlobbed ){

    console.log( 'All files globbed!' );

})
.fail(function( err ){

    console.log( 'Oops!' );

});
```