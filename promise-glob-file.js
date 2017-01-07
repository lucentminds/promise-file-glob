/**
 * 01-04-2017
 * The best app ever..
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */

var glob = require( 'glob' );
var resolvePath = require( 'promise-resolve-path' );
var Q = require( 'q' );

var resolveGlob = module.exports = function( patterns, lExists ){// jshint ignore:line
    var deferred = Q.defer();
    var i, l;
    var aPatterns;
    var aPromises;

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
        aPromises.push( globOnePath( aPatterns[ i ] ) );
    }// /for()

    // Either wait for all paths to be resolved or reject one.
    Q.all( aPromises )
    .then( function( aGlobbed ){
        // All globbed.
        var i, l, aGlobs = [];

        // Loop over each glob array.
        for( i = 0, l = aGlobbed.length; i < l; i++ ) {
            aGlobs = aGlobs.concat( aGlobbed[ i ] );
        }// /for()


        return resolvePath( aGlobs );
    })
    .then( function( aResolved ){
        // All resolved.
        deferred.resolve( aResolved );
    })
    .fail( function( err ){            
        // One rejected.
        deferred.reject( err );
    });


    return deferred.promise;
};// /glob`()

/** 
 * This function asychronously resolves one path string.
 */
var globOnePath = function( cPattern ) {
    var deferred = Q.defer();

    glob( cPattern, {}, function( err, aFiles ){
        if( err ) {
            return deferred.reject( err );
        }
    
        deferred.resolve( aFiles );
    });

    return deferred.promise;
};// /globOnePath()