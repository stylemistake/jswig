// Timer
// Extends default BWS timers with additional features

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

// Typical setTimeout
// .setTimeout( fun, timeout );
// .setTimeout( fun, args, timeout );
// .setTimeout( fun, context, args, timeout );
Timer.setTimeout = function( fun, a, b, c ) {
	var args, timeout, context, timer;
	if ( arguments.length === 4 ) {
		context = a;
		args = b;
		timeout = c;
	} else if ( arguments.length === 3 ) {
		args = a;
		timeout = b;
	} else if ( arguments.length === 2 ) {
		timeout = a;
	} else {
		throw Error( "Invalid parameters" );
	}
	timer = new Timer( timeout );
	return timer.once( fun, context, args );
};
