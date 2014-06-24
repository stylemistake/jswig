## JSWig - Bitwig controller script library

JSWig is a highly modular "one size fits all" javascript library to use
with Bitwig Studio controller scripts, and it doesn't get in front of your
workflow!

In fact, it is also a set of stand-alone, reusable components that can be used
as a foundation for your own applications.


### Status

It is still in development, as this README file, and not suitable to use in
production.

If you have some cool components that can have a good use in JSWig as a
stand-alone component or as a module, send pull requests. I'd be happy to pull
one!

All documentation will be provided later.


### Sample code

```
load( "vendor/jswig/loader.js" );

$.init({
	"name": "Some controller",
	"uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
	// Replace with your UUID
	"midi": {
		"ports_in": 1,
		"ports_out": 1,
	},
});

$.ready(function() {
	$.midi.filterCC()
		.filter(function( msg ) {
			return msg.value.inRange( 0x20, 0x60 );
		})
		.map(function( msg ) {
			msg.channel += msg.value % 7;
			return msg;
		})
		.each(function( msg ) {
			$.log( msg );
		});
	$.midi.filterNote()
		.each(function( msg ) {
			$.log( msg );
		});
});
```


### Contacts

Email: stylemistake@gmail.com

Web: [stylemistake.com](http://stylemistake.com)
