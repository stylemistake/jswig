// Load dependencies
load( "../components/eventmanager.js" );

(function( $ ) {

// $.events
$.events = new EventManager();

// $.ready
$.ready = function( f ) {
	$.events.on( "ready", f );
	return $;
};

// $.exit
$.exit = function( f ) {
	$.events.on( "exit", f );
	return $;
};

})( jswig );
