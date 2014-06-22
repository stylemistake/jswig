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

Number.prototype.inRange = function( a, b ) {
	var value = this.valueOf();
	return ( value >= a ) && ( value <= b );
};

Object.linkProperty = function( o, a, b ) {
	Object.defineProperty( o, b, {
		"get": function() {
			return o[ a ];
		},
		"set": function( value ) {
			o[ a ] == b;
		}
	});
};
