// MidiMessage
// Midi message object with virtual parameters

function MidiMessage() {

	var args = Array.prototype.slice.call( arguments, 0 );

	// Apply message props to object
	// Missing parts are lazily calculated via prototype getters and setters
	if ( typeof args[ 0 ] === "object" ) {
		for ( var i in args[ 0 ] ) {
			this[ i ] = message[ i ];
		}
	} else {
		this.status = args[ 0 ];
		this.data1 = args[ 1 ];
		this.data2 = args[ 2 ];
	}

}

MidiMessage.prototype = (function() {

	this.isNote = function() {
		return inRange( this.status, 0x80, 0x9f );
	};

	this.isNoteOff = function() {
		return inRange( this.status, 0x80, 0x8f );
	};

	this.isNoteOn = function() {
		return inRange( this.status, 0x90, 0x9f );
	};

	this.isKeyPressure = function() {
		return inRange( this.status, 0xa0, 0xaf );
	};

	this.isControl = function() {
		return inRange( this.status, 0xb0, 0xbf );
	};

	this.isProgramChange = function() {
		return inRange( this.status, 0xc0, 0xcf );
	};

	this.isChannelPressure = function() {
		return inRange( this.status, 0xd0, 0xdf );
	};

	this.isPitchbend = function() {
		return inRange( this.status, 0xe0, 0xef );
	};

	this.isAftertouch = function() {
		return this.isKeyPressure() || this.isChannelPressure();
	};

	// this.toString = function() {
	// 	return "MIDI: " +
	// 		this.status.toHex() + " " +
	// 		this.data1.toHex() + " " +
	// 		this.data2.toHex();
	// };

	Object.defineProperty( this, "type", {
		"get": function() {
			if ( this.isNote() ) return "note";
			if ( this.isControl() ) return "cc";
			if ( this.isProgramChange() ) return "pc";
			if ( this.isKeyPressure() ) return "kp";
			if ( this.isChannelPressure() ) return "kp";
			if ( this.isPitchbend() ) return "pb";
			return null;
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

	return this;

})();