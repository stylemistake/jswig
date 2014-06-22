// Load dependencies
load( "../components/midistream.js" );

(function( $ ) {

$.events.on( "_jswig_module_init", function() {
	$.midi = new MidiStream( host.getMidiInPort( 0 ) );
});

})( jswig );
