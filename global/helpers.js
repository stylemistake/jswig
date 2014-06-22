function inRange( value, a, b ) {
	return ( value >= a ) && ( value <= b );
}

function setTimeout( fun, time, args ) {
	if ( args === undefined ) args = [];
	host.scheduleTask( fun, args, time );
}

function timestamp() {
	return (new Date()).getTime();
}
