// Initialize entrypoints outside of closure
var init, exit;

(function( $ ) {

// $.init
$.init = function( config ) {
	if ( typeof config !== "object" ) {
		return $;
	}
	if ( config.uuid === undefined ) {
		throw new Error( "UUID is required" );
	}
	if ( config.name === undefined ) {
		throw new Error( "Name is required" );
	}
	if ( config.vendor === undefined ) {
		config.vendor = "Misc";
	}
	if ( config.version === undefined ) {
		config.version = "0.1";
	}
	if ( config.midi_in_ports === undefined ) {
		config.midi_in_ports = 0;
	}
	if ( config.midi_out_ports === undefined ) {
		config.midi_out_ports = 0;
	}

	host.defineController(
		config.vendor, config.name,
		config.version, config.uuid.toUpperCase()
	);
	host.defineMidiPorts( config.midi_in_ports, config.midi_out_ports );

	$.events.on( "_jswig_core_init", function() {
		// TODO: extra initialization
	});

	init = function() {
		$.application = host.createApplication();
		$.transport = host.createTransport();
		$.events.trigger( "_jswig_core_init" );
		$.events.trigger( "_jswig_module_init" );
		$.log( "jswig loaded" );
		$.events.trigger( "ready", $ );
	}

	return $;
};

})( jswig );
