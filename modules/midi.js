// Load dependencies
load( "../components/object.js" );
load( "../components/midistream.js" );
load( "../components/mididispatcher.js" );

(function( $ ) {

// $.midi
// MIDI provider
$.midi = {};
$.midi.input = new MidiStream();
$.midi.output = new MidiDispatcher();

// Default config
var config = {
	"ports_in": 0,
	"ports_out": 0,
};

// Module pre-init
$.events.on( "_jswig_module_pre_init", function() {
	// Merge config
	$.config.midi = Object.extend( config, $.config.midi );
});

// Module init
$.events.on( "_jswig_module_init", function() {
	for ( var i = 0; i < $.config.midi.ports_in; i += 1 ) {
		$.midi.input.setMidiInPort( i );
	}
	$.midi.output.start();
});

})( jswig );
