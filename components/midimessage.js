load( "number.js" );
load( "object.js" );


// MidiMessage
// Midi message object with virtual parameters

function MidiMessage() {
	// Apply message props to object
	// Missing parts are lazily calculated via prototype getters and setters
	if ( typeof arguments[ 0 ] === "object" ) {
		for ( var i in arguments[ 0 ] ) {
			this[ i ] = arguments[ 0 ][ i ];
		}
	} else {
		this.status = arguments[ 0 ];
		this.data1 = arguments[ 1 ];
		this.data2 = arguments[ 2 ];
	}
}



// Virtual props

Object.defineProperty( MidiMessage.prototype, "type", {
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

Object.defineProperty( MidiMessage.prototype, "channel", {
	"get": function() {
		return ( this.status & 0x0F ) + 1;
	},
	"set": function( value ) {
		this.status = ( this.status & 0xF0 ) + value - 1;
	}
});

Object.defineProperty( MidiMessage.prototype, "relative", {
	"get": function() {
		return ( this.data2 < 0x40 ? this.data2 : this.data2 - 0x80 );
	},
	"set": function( value ) {
		this.data2 += value;
		this.data2 &= 0x7F;
	}
});

Object.linkProperty( MidiMessage.prototype, "data1", "cc" );
Object.linkProperty( MidiMessage.prototype, "data1", "note" );
Object.linkProperty( MidiMessage.prototype, "data2", "value" );



// Prototype methods

MidiMessage.prototype.isValid = function() {
	return !( isNaN( this.status ) && isNaN( this.data1 ) && isNaN( this.data2 ) );
};

MidiMessage.prototype.isNote = function() {
	return inRange( this.status, 0x80, 0x9f );
};

MidiMessage.prototype.isNoteOff = function() {
	return inRange( this.status, 0x80, 0x8f );
};

MidiMessage.prototype.isNoteOn = function() {
	return inRange( this.status, 0x90, 0x9f );
};

MidiMessage.prototype.isKeyPressure = function() {
	return inRange( this.status, 0xa0, 0xaf );
};

MidiMessage.prototype.isControl = function() {
	return inRange( this.status, 0xb0, 0xbf );
};

MidiMessage.prototype.isProgramChange = function() {
	return inRange( this.status, 0xc0, 0xcf );
};

MidiMessage.prototype.isChannelPressure = function() {
	return inRange( this.status, 0xd0, 0xdf );
};

MidiMessage.prototype.isPitchbend = function() {
	return inRange( this.status, 0xe0, 0xef );
};

MidiMessage.prototype.isAftertouch = function() {
	return this.isKeyPressure() || this.isChannelPressure();
};

MidiMessage.prototype.toString = function() {
	if ( !this.isValid() ) {
		return "Invalid MIDI message";
	}
	var s = "MIDI: ";
	if ( this.port !== undefined ) {
		s += "p" + this.port + " ";
	}
	s += "c" + this.channel + ", ";
	s += this.status + " " + this.data1 + " " + this.data2 + ", ";
	s += "[" +
		this.status.toHex() + " " +
		this.data1.toHex() + " " +
		this.data2.toHex() + "]";
	return s;
};

MidiMessage.prototype.toHashString = function() {
	var s = "m" + this.status + "_" + this.data1
	if ( this.port !== undefined ) {
		s += "_" + this.port;
	}
	return s;
};
