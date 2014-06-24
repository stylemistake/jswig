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
