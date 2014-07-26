// Load dependencies
load( "../components/json.js" );
load( "../components/array.js" );

(function( $ ) {

// $.log
$.log = function() {
	var args = Array.prototype.slice.call( arguments );
	host.println( getString( args ) );
	return $;
};

$.log.error = function() {
	var args = Array.prototype.slice.call( arguments );
	host.errorln( getString( args ) );
	return $;
};

(function(){
	var queue = [];
	$.log.async = function() {
		var args = Array.prototype.slice.call( arguments );
		queue.push( getString( args ) );
		if ( queue.length === 1 ) {
			host.scheduleTask( function() {
				if ( queue.length > 0 ) {
					host.println( queue.join("\n") );
					queue = [];
				}
			}, [], 0 );
		}
		return $;
	};
})();

// Convert argument list to a human readable string
function getString( args ) {
	var str = "";
	args.forEach(function( data, i ) {
		if ( data === undefined ) {
			data = "undefined";
		} else
		if ( data.toString === Object.prototype.toString ) {
			data = JSON.stringify( data, null, 4 );
		}
		if ( i !== args.length - 1 ) {
			data += ", ";
		}
		str += data;
	});
	return str;
};

})( jswig );
