// MidiStream
// Manages MIDI data

load( "object.js" );
load( "midimessage.js" );
load( "stream.js" );

function MidiStream( tail ) {

	this.ports = [];

	Object.extend( this, new Stream( tail ) );

};

Object.extend( MidiStream.prototype, Stream.prototype );

MidiStream.prototype.addMidiInPort = function( port ) {
	var self = this,
		midi_in = host.getMidiInPort( port );
	try {
		// Add callback to feed messages to stream
		midi_in.setMidiCallback(function( a, b, c ) {
			var m = new MidiMessage( a, b, c );
			m.port = port;
			self.put( m );
		});
		// Save port in array for later use
		this.ports.push( midi_in );
	} catch ( e ) {
		host.errorln( "MidiStream: Couldn't add midi port.");
		host.errorln( e );
		host.errorln(
			"MidiStream: It is possible, that you've assigned a greater " + 
			"port than available in BWS settings. Try restarting the DAW."
		);
	}
};

MidiStream.prototype.filter = function( expr ) {
	if ( typeof expr === "string" ) {
		// TODO: Add string expression handling
		return this;
	}
	return Stream.prototype.filter.apply( this, [ expr ] );
}

MidiStream.prototype.filterNote = function() {
	return this.filter(function( msg ) {
		return msg.isNote();
	});
};

MidiStream.prototype.filterNoteOn = function() {
	return this.filter(function( msg ) {
		return msg.isNoteOn();
	});
};

MidiStream.prototype.filterNoteOff = function() {
	return this.filter(function( msg ) {
		return msg.isNoteOff();
	});
};

MidiStream.prototype.filterCC = function() {
	return this.filter(function( msg ) {
		return msg.isControl();
	});
};

MidiStream.prototype.filterPort = function( port ) {
	return this.filter(function( msg ) {
		return msg.port == port;
	});
};
