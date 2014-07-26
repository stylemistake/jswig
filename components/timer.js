// Timer
// Extends default BWS scheduleTask with additional features like context
// passing, interval timers, stopping and restarting timers in progress.

function Timer( interval ) {
	this.interval = interval;
	this.running = false;
}



// Prototype methods

Timer.prototype.start = function( fun, context, args ) {
	if ( this.running ) {
		return this;
	}
	var self = this;
	this.running = true;
	(function loop() {
		if ( self.running ) {
			fun.apply( context, args );
			host.scheduleTask( loop, [], self.interval );
		}
	})();
	return this;
};

Timer.prototype.once = function( fun, context, args ) {
	if ( this.running ) {
		return this;
	}
	var self = this;
	this.running = true;
	host.scheduleTask( function() {
		if ( self.running ) {
			fun.apply( context, args );
		}
	}, [], this.interval );
	return this;
};

Timer.prototype.stop = function() {
	this.running = false;
	return this;
};



// Static functions

// Typical timer as setTimeout in normal JS engines.
// .timeout( fun, timeout );
// .timeout( fun, args, timeout );
// .timeout( fun, context, args, timeout );
Timer.timeout = function( fun, a, b, c ) {
	if ( arguments.length === 4 ) {
		return ( new Timer( c ) ).once( fun, a, b );
	} else if ( arguments.length === 3 ) {
		return ( new Timer( b ) ).once( fun, undefined, a );
	} else if ( arguments.length === 2 ) {
		return ( new Timer( a ) ).once( fun );
	} else {
		throw Error( "Invalid parameters" );
	}
};

// Typical timer as setInterval in normal JS engines.
// The only difference is that it does first iteration instantly.
// .interval( fun, timeout );
// .interval( fun, args, timeout );
// .interval( fun, context, args, timeout );
Timer.interval = function( fun, a, b, c ) {
	if ( arguments.length === 4 ) {
		return ( new Timer( c ) ).start( fun, a, b );
	} else if ( arguments.length === 3 ) {
		return ( new Timer( b ) ).start( fun, undefined, a );
	} else if ( arguments.length === 2 ) {
		return ( new Timer( a ) ).start( fun );
	} else {
		throw Error( "Invalid parameters" );
	}
};
