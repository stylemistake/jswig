// Load dependencies
load( "../components/midistream.js" );
load( "../components/mididispatcher.js" );

(function( $ ) {

// $.midi
// MIDI provider
$.midiIn = new MidiStream();
$.midiOut = new MidiDispatcher();

$.midi = $.midiIn;

// Default config
$.config.midi = {
	"ports_in": 0,
	"ports_out": 0,
};

$.events.on( "_jswig_module_init", function() {
	for ( var i = 0; i < $.config.midi.ports_in; i += 1 ) {
		$.midiIn.setMidiInPort( i );
	}
	$.midiOut.start();
});

})( jswig );
