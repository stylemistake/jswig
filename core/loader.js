load( "../components/object.js" );

(function( $ ) {

// $.load
// Module loader
$.load = function( names, path, type ) {
	if ( typeof names === "string" ) {
		names = [ names ];
	}
	if ( typeof path !== "string" ) {
		path = ".";
	}
	if ( typeof type !== "string" ) {
		type = "file";
	}
	names.forEach(function( name ) {
		$.log( "jswig: loading " + type + " [" + name + ".js]..." );
		try {
			load( path + "/" + name + ".js" );
		} catch ( e ) {
			$.log.error( "jswig: failed to load" );
		}
	});
	return $;
};

// 
$.load.module = function( names ) {
	return $.load( names, $.config.loader.path + "/modules", "module" );
};

$.load.component = function( names ) {
	return $.load( names, $.config.loader.path + "/components", "component" );
};

$.load.local = function( names ) {
	return $.load( names, ".", "local file" );
};

// Module config
var config = {
	"path": "vendor/jswig",
	"components": [], // components to load
	"modules": [], // modules to load
	"local": [], // local files to load
};

// Module pre-init
$.events.on( "_jswig_core_pre_init", function() {
	// Merge config
	$.config.loader = Object.extend( config, $.config.loader );
	// Load stuff from config
	if ( $.config.loader.components.length > 0 ) {
		$.load.component( $.config.loader.components );
	}
	if ( $.config.loader.modules.length > 0 ) {
		$.load.module( $.config.loader.modules );
	}
	if ( $.config.loader.local.length > 0 ) {
		$.load.local( $.config.loader.local );
	}
});

})( jswig );
