// Load dependencies

(function( $ ) {

$.profile = (function() {

	var self = this,
		ts1, ts2, result;

	this.start = function( name ) {
		$.log( "profile: starting \"" + name + "\"" );
		ts1 = new Date();
	}

	this.finish = function() {
		ts2 = new Date();
		result = ts2.getTime() - ts1.getTime();
		$.log( "profile: finished in " + result + "ms" );
	}

	return this;

})();

})( jswig );
