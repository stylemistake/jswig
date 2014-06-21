// $.events
(function( $ ) {

	$.events = new EventManager();

	$.ready = function( f ) {
		$.events.on( "ready", f );
		return $;
	};

})( jswig );
