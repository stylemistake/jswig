// Stream
// Manages async data in a lazy way with an MQ-like interface
// with filters and more.

load( "object.js" );

function Stream( tail ) {

	this.root = tail && tail.root || this;
	this.filters = tail && tail.filters.concat() || [];
	this.mappers = tail && tail.mappers.concat() || [];
	this.consumers = [];

}

// Append data to stream
Stream.prototype.put = function( item ) {
	for ( var i = 0; i < this.consumers.length; i += 1 ) {
		this.consumers[ i ]( item );
	}
	return this;
};

// Filter data before giving to consumers
Stream.prototype.filter = function( fun ) {
	var s = new this.constructor( this );
	s.filters.push( fun );
	return s;
};

// Map
Stream.prototype.map = function( fun ) {
	var s = new this.constructor( this );
	s.mappers.push( fun );
	return s;
};

// Add consumer
Stream.prototype.each = function( callback ) {
	var self = this;
	this.root.consumers.push(function( item ) {
		var i, r;
		// Apply filters
		for ( i = 0; i < self.filters.length; i += 1 ) {
			if ( ! self.filters[ i ]( item ) ) {
				return;
			}
		}
		// Apply mappers
		for ( i = 0; i < self.mappers.length; i += 1 ) {
			r = self.mappers[ i ]( item );
			if ( r === undefined ) {
				r = item;
			}
		}
		// Run callback
		callback( item );
	});
	return this;
};
