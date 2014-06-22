function MidiMessage() {

	var self = this,
		args = Array.prototype.slice.call( arguments, 0 ),
		message;

	if ( typeof args[0] === "object" ) {
		message = args[0];
	} else {
		message = {
			"status": args[0],
			"data1": args[1],
			"data2": args[2]
		};
	}

	function isNote( status ) {
		return inRange( status, 0x80, 0x9f );
	}

	function isNoteOn( status ) {
		return inRange( status, 0x90, 0x9f );
	}

	function isNoteOff( status ) {
		return inRange( status, 0x80, 0x8f );
	}

	function isControl( status ) {
		return inRange( status, 0xb0, 0xbf );
	}

	function toRelative( data2 ) {
		return ( data2 < 0x40 ? data2 : data2 - 0x80 );
	}

	Object.defineProperty( this, "type", {
		"get": function() {
			if ( this.status.inRange( 0x80, 0x9f ) ) {
				return "note";
			}
		}
	});

	Object.defineProperty( this, "channel", {
		"get": function() {
			return ( this.status & 0x0F ) + 1;
		},
		"set": function( value ) {
			this.status = ( this.status & 0xF0 ) + value - 1;
		}
	});

	Object.defineProperty( this, "relative", {
		"get": function() {
			return ( this.data2 < 0x40 ? this.data2 : this.data2 - 0x80 );
		},
		"set": function( value ) {
			this.data2 += value;
			this.data2 &= 0x7F;
		}
	});

	Object.linkProperty( this, "data1", "cc" );
	Object.linkProperty( this, "data1", "note" );
	Object.linkProperty( this, "data2", "value" );

	// Apply message props to publish them in object
	// and also calculate missing parts
	for ( var i in message ) {
		this[ i ] = message[ i ];
	}

}
