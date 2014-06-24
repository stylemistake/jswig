// Load dependencies
load( "../components/json.js" );
load( "../components/array.js" );

(function( $ ) {

function getString( args ) {
	var str = "";
	args.forEach(function( data, i ) {
		if ( data.toString === Object.prototype.toString ) {
			data = JSON.stringify( data, null, 4 );
		}
		if ( i !== args.length - 1 ) {
			data += ", ";
		}
		str += data;
	});
	return str;
}

// $.log
$.log = function() {
	var args = Array.slice( arguments );
	host.println( getString( args ) );
	return $;
};

$.log.error = function() {
	var args = Array.slice( arguments );
	host.errorln( getString( args ) );
	return $;
}

})( jswig );
