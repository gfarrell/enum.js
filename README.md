Enum.js
=======

Sometimes we want immutable enums in Javascript, but standard objects are not really ideal for this, and can be accidentally modified.

Enum.js solves this problem by providing a factory function to generate immutable enums (where possible in the browser). If a browser does not support the methods used, then Enum.js will fall back to using mutable objects.

Using Enum.js is quite simple:

	var Enum = require('enum');
	var MyEnum = new Enum('First Value', 'Second', 'thirdVal', '4');

This will give you an object with the following key-value pairings:

    MyEnum.FIRST_VALUE;	// 1
    MyEnum.SECOND;		// 2
    MyEnum.THIRD_VAL;	// 3
    MyEnum.4;			// 4
    
Enum.js automatically underscores and capitalises the entire key, to make sure it's standard.

If you should try to specify a key twice, Enum.js will only use the first instance of it.