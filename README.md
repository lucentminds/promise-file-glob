# promise-file-glob
NodeJs module that resolves a glob string or a list of glob strings.

## Installation

Install by npm.

```js
npm install git+https://github.com/lucentminds/promise-file-glob.git
```

### Useage:

```js
var glob = require( 'promise-file-glob' );

var aPaths = [
    '.',
    '..',
    './documents/test.txt'
];

glob( ['**/*.js', '**/*.md'] )
.then(function( aGlobbed ){

    console.log( 'All files globbed!' );

})
.fail(function( err ){

    console.log( 'Oops!' );

});
```

Or for a single glob.

```js
glob( '**/*.js', true )
.then(function( aGlobbed ){

    console.log( 'All files globbed!' );

})
.fail(function( err ){

    console.log( 'Oops!' );

});
```