// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if ( !Object.keys ) {
	Object.keys = (function() {
		"use strict";
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({toString: null}).propertyIsEnumerable("toString"),
			dontEnums = [
				"toString", "toLocaleString", "valueOf", "hasOwnProperty",
				"isPrototypeOf", "propertyIsEnumerable", "constructor"
			],
			dontEnumsLength = dontEnums.length;
		return function ( obj ) {
			if ( typeof obj !== "object" && (typeof obj !== "function" || obj === null) ) {
				throw new TypeError("Object.keys called on non-object");
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
}

String.prototype.toBytes = function() {
	var bytes = [];
	for ( var i = 0; i < this.length; i += 1 ) {
		bytes.push( this.charCodeAt( i ) );
	}
	return bytes;
};

String.fromBytes = function( bytes ) {
	var result = "";
	for ( var i = 0; i < bytes.length; i += 1 ) {
		result += String.fromCharCode( bytes[i] );
	}
	return result;
};
