// Initialize entrypoints outside of closure
var init, exit;

load( "../components/object.js" );

(function( $ ) {

// $.config
// Shared config to provide configuration for modules.
// These are bare defaults.
$.config = {
	// Default controller config
	"vendor": "Misc",
	"version": "0.1",
	"midi": {
		"ports_in": 0,
		"ports_out": 0,
	},
	// TODO: Module list
	// "path": "vendor/jswig/"
	// "modules": [],
};

// $.init
$.init = function( config ) {
	if ( typeof config !== "object" ) {
		throw new TypeError( "Config object expected" );
	}

	// Main config items
	if ( config.uuid === undefined ) {
		throw new Error( "config.uuid is required" );
	}
	if ( config.name === undefined ) {
		throw new Error( "config.name is required" );
	}

	// TODO: Verify UUID and midi ports

	// Merge global config with provided config
	Object.extend( $.config, config );

	// Basic initialization
	host.defineController(
		$.config.vendor, $.config.name,
		$.config.version, $.config.uuid.toUpperCase()
	);
	host.defineMidiPorts(
		$.config.midi.ports_in,
		$.config.midi.ports_out
	);

	// TODO: Load modules
	// $.log( "jswig: loading extra modules..." );
	// $.config.modules.forEach(function( module ) {
	// 	$.log( "jswig: " + module );
	// 	load( "modules/" + module + ".js" );
	// });

	// Extra initialization on init
	$.events.on( "_jswig_core_init", function() {
		// TODO: extra initialization
	});

	init = function() {
		$.log( "jswig: initializing..." );
		$.events.trigger( "_jswig_core_init" );
		$.events.trigger( "_jswig_module_init" );
		$.log( "jswig: ready!" );
		$.events.trigger( "ready", $ );
	}

	return $;
};

})( jswig );
