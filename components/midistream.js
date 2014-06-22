// MidiStream
// Manages MIDI data

load( "midimessage.js" );
load( "stream.js" );

function MidiStream( port ) {

	var self = this;

	this.filters = [];
	this.consumers = [];
	this.port = port;

	this.port.setMidiCallback(function( status, data1, data2 ) {
		printMidi( status, data1, data2 );
		var m = new MidiMessage( status, data1, data2 );
		self.append( m );
	});

};

MidiStream.prototype = Stream.prototype;

MidiStream.prototype.each = function( callback ) {
	this.consume( callback );
	return this;
};
