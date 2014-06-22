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

Number.prototype.toHex = function() {
	var upper = ( this.valueOf() >> 4 ) & 0x0F,
		lower = this.valueOf() & 0x0F;
	return upper.toString( 16 ) + lower.toString( 16 );
};

Object.linkProperty = function( o, a, b ) {
	Object.defineProperty( o, b, {
		"get": function() {
			return this[ a ];
		},
		"set": function( value ) {
			this[ a ] == value;
		}
	});
};

Array.init = function( n, value ) {
	var i, a = new Array( n );
	for ( i = 0; i < n; i += 1 ) {
		a[ i ] = value;
	}
	return a;
};
