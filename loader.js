loadAPI( 1 );

load( "global/polyfills.js" );
load( "global/extensions.js" );
load( "global/json.js" );
load( "global/helpers.js" );

// Jswig contructor
// TODO: currently unused
var jswig = function() {
	return this;
};

// Assign jswig to a global shortcut name
var $ = jswig;

// Load components
// none

// Load core modules
load( "core/init.js" );
load( "core/events.js" );
load( "core/log.js" );

// Load optional modules
load( "modules/midi.js" );
