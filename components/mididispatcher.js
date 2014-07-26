load( "midimessage.js" );
load( "dispatcher.js" );


// MidiDispatcher
// Dispatch MIDI messages in an optimized for IO manner.

function MidiDispatcher() {
	Dispatcher.call( this );
	// Default timer interval
	this.setInterval( 100 );
	// Generic MIDI output
	this.setReceiver(function( msg ) {
		host.getMidiOutPort( msg.port )
			.sendMidi( msg.status, msg.data1, msg.data2 );
	});
}



// Prototype methods

// Inherit Stream prototype methods
Object.extend( MidiDispatcher.prototype, Dispatcher.prototype );

// Add MIDI message to the queue
MidiDispatcher.prototype.add = function( msg ) {
	if ( typeof msg === "object" ) {
		return Dispatcher.prototype.add.call( this, msg.toHash(), msg );
	} else {
		return Dispatcher.prototype.add.apply( this, arguments );
	}
};

MidiDispatcher.prototype.queue = MidiDispatcher.prototype.add;

// Send MIDI message without queueing
MidiDispatcher.prototype.send = function( msg ) {
	if ( typeof msg === "object" ) {
		return Dispatcher.prototype.send.call( this, msg.toHash(), msg );
	} else {
		return Dispatcher.prototype.send.apply( this, arguments );
	}
};

// Remove MIDI message from the queue
MidiDispatcher.prototype.remove = function( msg ) {
	return Dispatcher.prototype.clear.call( this, msg.toHash() );
};
