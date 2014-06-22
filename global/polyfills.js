// Polyfills

// All polyfills here enable non-available

Object.keys = (function() {
	var hasOwnProperty = Object.prototype.hasOwnProperty,
		hasDontEnumBug = !({ toString: null }).propertyIsEnumerable("toString"),
		dontEnums = [
			"toString", "toLocaleString", "valueOf", "hasOwnProperty",
			"isPrototypeOf", "propertyIsEnumerable", "constructor"
		],
		dontEnumsLength = dontEnums.length;
	return function ( obj ) {
		if ( typeof obj !== "object" && ( typeof obj !== "function" || obj === null ) ) {
			throw new TypeError( "Object.keys called on non-object" );
		}
		var result = [], prop, i;
		for ( prop in obj ) if ( hasOwnProperty.call( obj, prop ) ) result.push( prop );
		if ( hasDontEnumBug ) {
			for ( i = 0; i < dontEnumsLength; i += 1 ) {
				if ( hasOwnProperty.call( obj, dontEnums[i] ) ) result.push( dontEnums[i] );
			}
		}
		return result;
	};
}());

Object.values = function( o ) {
	return Object.keys( o ).map(function( p ) {
		return o[ p ];
	});
}

Object.defineProperty = function( o, prop, data ) {
	if ( o !== Object( o ) ) {
		throw TypeError( "Object.defineProperty called on non-object" );
	}
	if ( "get" in data ) {
		Object.prototype.__defineGetter__.call( o, prop, data.get );
	}
	if ( "set" in data ) {
		Object.prototype.__defineSetter__.call( o, prop, data.set );
	}
	if ( "value" in data ) {
		o[ prop ] = data.value;
	}
	return o;
};

// Object.create = function ( prototype, properties ) {
// 	if ( typeof prototype !== "object" ) {
// 		throw TypeError();
// 	}
// 	function ObjectCtor() {}
// 	ObjectCtor.prototype = prototype;
// 	var o = new ObjectCtor();
// 	if ( prototype ) {
// 		o.constructor = ObjectCtor;
// 	}
// 	if ( properties !== undefined ) {
// 		if ( properties !== Object( properties ) ) {
// 			throw TypeError();
// 		}
// 		Object.defineProperties( o, properties );
// 	}
// 	return o;
// };

Array.prototype.reduce = function ( fun ) {
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
