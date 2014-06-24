Number.prototype.inRange = function( a, b ) {
	var value = this.valueOf();
	return ( value >= a ) && ( value <= b );
};

Number.prototype.toHex = function() {
	var upper = ( this.valueOf() >> 4 ) & 0x0F,
		lower = this.valueOf() & 0x0F;
	return upper.toString( 16 ) + lower.toString( 16 );
};
