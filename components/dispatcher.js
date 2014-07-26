load( "timer.js" );


// Dispatcher
// Put data to dispatch it later in an optimized for IO manner.

function Dispatcher() {
	this.queue = {};
	this.timer = new Timer( 500 );
	this.callbacks = [];
}



// Configurational methods

Dispatcher.prototype.setReceiver = function( fun ) {
	if ( typeof fun !== "function" ) {
		throw TypeError( "Not a function" );
	}
	this.callbacks.push( fun );
	return this;
};

Dispatcher.prototype.setInterval = function( interval ) {
	if ( typeof interval !== "number" ) {
		throw TypeError( "Not a number" );
	}
	this.timer.interval = interval;
	return this;
};



// Core methods

Dispatcher.prototype.add = function( key, data ) {
	this.queue[ key ] = data;
	return this;
};

Dispatcher.prototype.send = function( key, data ) {
	delete this.queue[ key ];
	for ( var i = 0; i < this.callbacks.length; i += 1 ) {
		this.callbacks[ i ]( data );
	}
	return this;
};

Dispatcher.prototype.clear = function( key ) {
	if ( key === undefined ) {
		// Clear all queue
		for ( var i in queue ) {
			delete queue[ i ];
		}
	} else {
		// Clear only one key
		delete queue[ key ];
	}
	return this;
};

Dispatcher.prototype.flush = function() {
	for ( var i in this.queue ) {
		this.send( i, this.queue[ i ] );
	}
	return this;
};

Dispatcher.prototype.start = function() {
	// Start timer
	this.timer.start( this.flush, this );
	return this;
};

Dispatcher.prototype.stop = function() {
	this.timer.stop();
	return this;
};
