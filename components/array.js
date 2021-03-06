Array.init = function( n, value ) {
	var i, a = new Array( n );
	for ( i = 0; i < n; i += 1 ) {
		a[ i ] = value;
	}
	return a;
};

Array.slice = function( a, b ) {
	return Array.prototype.slice.call( a, b );
}

Array.prototype.reduce = function( fun ) {
	if ( this === void 0 || this === null ) {
		throw TypeError();
	}

	var t = Object( this );
	var len = t.length >>> 0;
	if ( typeof fun !== "function" ) {
		throw TypeError( "No function provided" );
	}

	// no value to return if no initial value and an empty array
	if ( len === 0 && arguments.length === 1 ) {
		throw TypeError();
	}

	var k = 0;
	var accumulator;
	if ( arguments.length >= 2 ) {
		accumulator = arguments[ 1 ];
	} else {
		while ( true ) {
			if ( k in t ) {
				accumulator = t[ k++ ];
				break;
			}

			// if array contains no values, no initial value to return
			if ( ++k >= len ) {
				throw TypeError();
			}
		}
	}

	while ( k < len ) {
		if ( k in t ) {
			accumulator = fun.call( undefined, accumulator, t[ k ], k, t );
		}
		k += 1;
	}

	return accumulator;
};
