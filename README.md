## JSWig - Bitwig controller script library

JSWig is a highly modular "one size fits all" javascript library to use
with Bitwig Studio controller scripts, and it doesn't get in front of your
workflow!

In fact, it is also a set of stand-alone, reusable components that can be used
as a foundation for your own applications.


### Status

It is still in development, as this README file. All documentation will be
provided later.


### Sample code

```
load( "jswig/loader.js" );

$.init({
	"name": "Some controller",
	"uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
	// Replace with your UUID
});

$.ready(function() {
	$.log( "Hello world!" );
});
```


### Contacts

Email: stylemistake@gmail.com

Web: [stylemistake.com](http://stylemistake.com)
