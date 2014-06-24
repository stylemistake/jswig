// EventManager

function EventManager() {

	this.events = {};

}

EventManager.prototype = (function() {

	this.on = function( name, callback ) {
		if ( this.events[ name ] === undefined ) {
			this.events[ name ] = [];
		}
		this.events[ name ].push( callback );
	};

	this.off = function( name, callback ) {
		var i, handlers = this.events[ name ];
		if ( handlers === undefined ) {
			return this;
		}
		if ( callback === undefined ) {
			delete this.events[ name ];
			return this;
		}
		for ( i = 0; i < handlers.length; i += 1 ) {
			if ( handlers[ i ] === callback ) {
				delete this.events[ name ][ i ];
			}
		}
	};

	this.trigger = function( name, _args ) {
		var i, handlers = this.events[ name ],
			args = Array.prototype.slice.call( arguments, 1 );
		if ( handlers === undefined ) {
			return this;
		}
		for ( i = 0; i < handlers.length; i += 1 ) {
			if ( handlers[ i ] !== undefined ) {
				handlers[ i ].apply( this, args );
			}
		}
		return this;
	};

	return this;

})();
