/**
 * 01-04-2017
 * NodeJs module that resolves a glob file path or a list of glob file paths.
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */

const {glob} = require( 'glob' );

async function resolve_glob( patterns, o_options ){// jshint ignore:line
    const deferred = defer();
    var i, l;
    var a_patterns;
    var a_promises;

    o_options = o_options || {};

    switch( true ) {
    case ( typeof patterns === 'string' ):
        a_patterns = [patterns];
        break;

    case Array.isArray( patterns ):
        // Determines a clone of the original array.
        a_patterns = patterns.slice( 0 );
        break;

    default:
        deferred.reject( 'Invalid pattern argument: '.concat( patterns ) );
        return deferred.promise;

    }// /switch()

    // Determines the list of promises received from resolveOnePath.
    a_promises = [];

    /** 
     * Loop over each source path and resolve it.
     */
    for( i = 0, l = a_patterns.length; i < l; i++ ) {
        a_promises.push( globOnePath( a_patterns[ i ], o_options ) );
    }// /for()

    // Either wait for all paths to be resolved or reject one.
    try{
        const a_globbed = await Promise.all( a_promises );

        // All globbed.
        var i, l, a_globs = [];

        // Loop over each glob array.
        for( i = 0, l = a_globbed.length; i < l; i++ ) {
            a_globs = a_globs.concat( a_globbed[ i ] );
        }// /for()

        // All resolved.
        deferred.resolve( a_globs );
    }
    catch( err ){
        // One rejected.
        deferred.reject( err );
    }


    return deferred.promise;
};// /glob()

/** 
 * This function asychronously resolves one path string.
 */
async function globOnePath( c_pattern, o_options ) {
    const a_files = await glob( c_pattern, o_options );

    return a_files;
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
        reject: reject,
    };

    return o_deferred;
}// /defer()

module.exports = resolve_glob;
