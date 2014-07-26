// Stream
// Manages async data in a lazy way with an MQ-like interface
// with filters and more.

load( "object.js" );

function Stream( parent ) {
	this.parent = parent;
	this.modifiers = {};
	this.consumers = [];
}

(function() {

	// Create a consumer function with recursively mapped modifiers
	// All stream manipulating logic is here
	Stream.createConsumer = function( callback, modifiers ) {
		// Define default consumer
		var consumer = function( item, context ) {
			var status = callback( item, context );
			if ( status === undefined ) return true;
			return status;
		}

		if ( modifiers === undefined ) {
			return consumer;
		}

		// Apply modifiers to our consumer
		if ( typeof modifiers.filter === "function" ) {
			consumer = applyFilter( consumer, modifiers.filter );
		}
		if ( typeof modifiers.map === "function" ) {
			consumer = applyMap( consumer, modifiers.map );
		}
		if ( typeof modifiers.repeat === "number" ) {
			consumer = applyRepeat( consumer, modifiers.repeat );
		}
		if ( typeof modifiers.take === "number" ) {
			consumer = applyTake( consumer, modifiers.take );
		}
		if ( typeof modifiers.skip === "number" ) {
			consumer = applySkip( consumer, modifiers.skip );
		}
		return consumer;
	};

	function applyFilter( consumer, fun ) {
		return function( item, context ) {
			if ( fun( item ) ) {
				return consumer( item, context );
			} else {
				return false;
			}
		}
	}

	function applyMap( consumer, fun ) {
		return function( item, context ) {
			return consumer( fun( item ), context );
		}
	}

	function applyRepeat( consumer, num ) {
		return function( item, context ) {
			for ( var i = 0; i < num; i += 1 ) {
				if ( consumer( item, context ) === false ) {
					return false;
				}
			}
			return true;
		}
	}

	function applyTake( consumer, num ) {
		return function( item, context ) {
			if ( num > 0 ) {
				num -= 1;
				return consumer( item, context );
			}
			return false;
		}
	}

	function applySkip( consumer, num ) {
		return function( item, context ) {
			if ( num > 0 ) {
				num -= 1;
				return true;
			}
			return consumer( item, context );
		}
	}

})();



// Append data to stream
Stream.prototype.push = function( item, context ) {
	for ( var i = 0; i < this.consumers.length; i += 1 ) {
		this.consumers[ i ]( item, context );
	}
	return this;
};

// Filter data before giving to consumers
Stream.prototype.filter = function( fun ) {
	var s = new this.constructor( this );
	s.modifiers.filter = fun;
	return s;
};

Stream.prototype.where = function( a, b ) {
	if ( typeof a === "object" ) {
		// TODO: Catch illegal items
		return this.filter( function( item ) {
			var status = true;
			Object.keys( a ).forEach( function( i ) {
				if ( item[ i ] != a[ i ] ) {
					return status = false;
				}
			});
			return status;
		});
	} else
	if ( typeof a === "string" ) {
		// TODO: Catch illegal items
		return this.filter( function( item ) {
			return item[ a ] == b;
		});
	}
	return this;
};

// Map
Stream.prototype.map = function( fun ) {
	var s = new this.constructor( this );
	if ( typeof fun !== "function" ) {
		// Return the given value
		s.modifiers.map = function() {
			return fun;
		}
	} else {
		// Return mapped value
		s.modifiers.map = fun;
	}
	return s;
};

Stream.prototype.invoke = function( name, args ) {
	var s = new this.constructor( this );
	s.modifiers.map = function( item ) {
		return item[ name ].apply( item, args );
	}
	return s;
}

// Repeat incoming data given times
Stream.prototype.repeat = function( num ) {
	if ( num === undefined ) {
		num = Infinity;
	}
	var s = new this.constructor( this );
	s.modifiers.repeat = num;
	return s;
};

// Repeat incoming data given times
Stream.prototype.take = function( num ) {
	var s = new this.constructor( this );
	s.modifiers.take = num;
	return s;
};

// Repeat incoming data given times
Stream.prototype.skip = function( num ) {
	var s = new this.constructor( this );
	s.modifiers.skip = num;
	return s;
};

// Consumers

// Add consumer, which is called on every message
Stream.prototype.each = function( callback ) {
	var consumer = Stream.createConsumer( callback, this.modifiers );
	this.consumers.push( consumer );
	if ( this.parent !== undefined ) {
		this.parent.each( consumer );
	}
	return this;
};

// Add consumer, which is called once
Stream.prototype.once = function( callback ) {
	this.modifiers.take = 1;
	var consumer = Stream.createConsumer( callback, this.modifiers );
	this.consumers.push( consumer );
	if ( this.parent !== undefined ) {
		this.parent.once( consumer );
	}
	return this;
};
