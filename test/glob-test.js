
var glob = require( 'promise-glob-file' );

glob( '../../node_modules/**/*package.json' ).done(function ( aGlobs ) {
    console.log( aGlobs );
    
});