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
Stream.prototype.put = function( item, context ) {
	for ( var i = 0; i < this.consumers.length; i += 1 ) {
		this.consumers[ i ]( item, context );
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

// Repeat incoming data given times
Stream.prototype.repeat = function( num ) {
	var i, s = new this.constructor( this );
	// TODO: Implement lazy evaluation
	if ( num === undefined ) {
		throw Error( "Stream: repeat: infinite loop" );
	}
	if ( num === 0 ) {
		s.filters = function() { return false; };
		return s;
	}
	if ( typeof num === "number" ) {
		for ( i = 0; i < num; i += 1 ) {
			// TODO: What?
		}
	}
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
