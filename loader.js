loadAPI( 1 );

// Jswig contructor
// TODO: currently unused
var jswig = function() {
	return this;
};

// Assign jswig to a global shortcut name
var $ = jswig;

// Load globals
load( "global/helpers.js" );

// Load basic components
load( "components/array.js" );
load( "components/function.js" );
load( "components/number.js" );
load( "components/object.js" );
load( "components/string.js" );

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
};

// Load modules
$.load([ "midi", "profile" ]);
$.log( "jswig: main modules loaded!" );
