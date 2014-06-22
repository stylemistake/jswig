// Stream
// Manages async data in a lazy way with an MQ-like interface
// with filters and more.

function Stream() {

	this.filters = [];
	this.consumers = [];

}

Stream.prototype = (function() {

	// Append data to stream
	this.append = function( item, context ) {
		var i, args = Array.prototype.slice.call( arguments, 0 );
		for ( i = 0; i < this.filters.length; i += 1 ) {
			if ( ! this.filters[ i ]( item ) ) {
				return this;
			}
		}
		for ( i = 0; i < this.consumers.length; i += 1 ) {
			this.consumers[ i ]( item, context );
		}
		return this;
	};

	// Filter data before giving to consumers
	this.filter = function( f ) {
		var s = Object.create( this, {
			"filters": this.filters.concat( f )
		});
		$.log( this.filters );
		return s;
	};

	// Add consumer
	this.consume = function( f ) {
		this.consumers.push( f );
		return this;
	};

	// Add provider
	this.provide = function( f ) {
		// Passes a callback to provider
		f( this.append );
		return this;
	};

	return this;

})();
