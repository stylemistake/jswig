// Load dependencies
load( "../components/midistream.js" );

(function( $ ) {

// $.midi
// MIDI provider
$.midi = new MidiStream();

// Default config
$.config.midi = {
	"ports_in": 0,
	"ports_out": 0,
};

$.events.on( "_jswig_module_init", function() {
	for ( var i = 0; i < $.config.midi.ports_in; i += 1 ) {
		$.midi.addMidiInPort( i );
	}
});

})( jswig );
