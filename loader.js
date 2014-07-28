loadAPI( 1 );

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
load( "core/loader.js" );

$.log( "jswig: core modules loaded!" );
