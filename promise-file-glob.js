/**
 * 01-04-2017
 * NodeJs module that resolves a glob file path or a list of glob file paths.
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */

const {glob} = require( 'glob' );

function resolveGlob( patterns, oOptions ){// jshint ignore:line
    var deferred = defer();
    var i, l;
    var aPatterns;
    var aPromises;

    oOptions = oOptions || {};

    switch( true ) {
    case ( typeof patterns === 'string' ):
        aPatterns = [patterns];
        break;

    case Array.isArray( patterns ):
        // Determines a clone of the original array.
        aPatterns = patterns.slice( 0 );
        break;

    default:
        deferred.reject( 'Invalid pattern argument: '.concat( patterns ) );
        return deferred.promise;

    }// /switch()

    // Determines the list of promises received from resolveOnePath.
    aPromises = [];

    /** 
     * Loop over each source path and resolve it.
     */
    for( i = 0, l = aPatterns.length; i < l; i++ ) {
        aPromises.push( globOnePath( aPatterns[ i ], oOptions ) );
    }// /for()

    // Either wait for all paths to be resolved or reject one.
    Promise.all( aPromises )
    .then( function( aGlobbed ){
        // All globbed.
        var i, l, aGlobs = [];

        // Loop over each glob array.
        for( i = 0, l = aGlobbed.length; i < l; i++ ) {
            aGlobs = aGlobs.concat( aGlobbed[ i ] );
        }// /for()

        // All resolved.
        deferred.resolve( aGlobs );
    })
    .catch( function( err ){
        // One rejected.
        deferred.reject( err );
    });


    return deferred.promise;
};// /glob()

/** 
 * This function asychronously resolves one path string.
 */
function globOnePath( cPattern, oOptions ) {
    var deferred = defer();

    glob( cPattern, oOptions, function( err, aFiles ){
        if( err ) {
            return deferred.reject( err );
        }
    
        deferred.resolve( aFiles );
    });

    return deferred.promise;
};// /globOnePath()

function defer(){
    let resolve, reject;
    const o_promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    const o_deferred = {
        promise: o_promise,
        resolve: resolve,
        reject: reject
    };

    return o_deferred;
}// /defer()

module.exports = resolveGlob