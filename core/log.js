(function( $ ) {

// $.log
$.log = function( data ) {
	// TODO: better logging and data formatting
	if ( typeof data === "object" ) {
		data = JSON.stringify( data, null, 4 );
	}
	println( data );
	return $;
};

})( jswig );
