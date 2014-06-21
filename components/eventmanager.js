function EventManager() {

	var self = this,
		events = {};

	this.on = function( name, callback ) {
		if ( events[ name ] === undefined ) {
			events[ name ] = [];
		}
		events[ name ].push( callback );
	}

	this.off = function( name, callback ) {
		var i, handlers = events[ name ];
		if ( handlers === undefined ) {
			return self;
		}
		if ( callback === undefined ) {
			delete events[ name ];
			return self;
		}
		for ( i = 0; i < handlers.length; i += 1 ) {
			if ( handlers[ i ] === callback ) {
				delete events[ name ][ i ];
			}
		}
	}

	this.trigger = function( name, _args ) {
		var i, handlers = events[ name ],
			args = Array.prototype.slice.call( arguments, 1 );
		if ( handlers === undefined ) {
			return self;
		}
		for ( i = 0; i < handlers.length; i += 1 ) {
			if ( handlers[ i ] !== undefined ) {
				handlers[ i ].apply( this, args );
			}
		}
	}

}
