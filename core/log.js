(function( $ ) {

// $.log
$.log = function( data ) {
	// TODO: better logging and data formatting
	if ( data.toString === Object.prototype.toString ) {
		data = JSON.stringify( data, null, 4 );
	}
	println( data );
	return $;
};

})( jswig );
