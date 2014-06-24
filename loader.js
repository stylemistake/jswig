loadAPI( 1 );

load( "global/helpers.js" );

// Jswig contructor
// TODO: currently unused
var jswig = function() {
	return this;
};

// Assign jswig to a global shortcut name
var $ = jswig;

// Load core modules
load( "core/init.js" );
load( "core/events.js" );
load( "core/log.js" );

$.log( "jswig: core modules loaded!" );

// $.load
// Module loader
$.load = function( names, base_dir ) {
	if ( base_dir === undefined ) {
		base_dir = "."
	}
	if ( typeof names === "string" ) {
		names = [ names ];
	}
	names.forEach(function( name ) {
		$.log( "jswig: loading [modules/" + name + ".js]..." );
		load( base_dir + "/modules/" + name + ".js" );
	});
	return $;
}

// Load modules
$.load([ "midi", "profile" ]);
$.log( "jswig: main modules loaded!" );
