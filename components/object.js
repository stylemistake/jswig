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
};

Object.defineProperties = function( o, properties ) {
	if ( o !== Object( o ) ) {
		throw TypeError( "Object.defineProperties called on non-object" );
	}
	for ( var name in properties ) {
		if ( Object.prototype.hasOwnProperty.call( properties, name ) ) {
			Object.defineProperty( o, name, properties[ name ] );
		}
	}
	return o;
};

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

Object.create = function( prototype, properties ) {
	if ( typeof prototype !== "object" ) {
		throw TypeError();
	}
	/** @constructor */
	function Ctor() {}
	Ctor.prototype = prototype;
	var o = new Ctor();
	if ( prototype ) {
		o.constructor = Ctor;
	}
	if ( properties !== undefined ) {
		if ( properties !== Object( properties ) ) {
			throw TypeError();
		}
		Object.defineProperties( o, properties );
	}
	return o;
};

Object.extend = function( a, b ) {
	Object.keys( b ).forEach(function( i ) {
		if ( b.hasOwnProperty( i ) ) {
			a[ i ] = b[ i ];
		}
	});
	return a;
};

Object.linkProperty = function( o, a, b ) {
	Object.defineProperty( o, b, {
		"get": function() {
			return this[ a ];
		},
		"set": function( value ) {
			this[ a ] = value;
		}
	});
};
