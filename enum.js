/**
 * Enum.js
 * Javascript Enum objects
 *
 * @licence MIT
 * @author  Gideon Farrell <me@gideonfarrell.co.uk>
 * @url     https://github.com/gfarrell/enum.js
 */
/*
	Copyright (c) 2014 Gideon Farrell
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/
/* global define */
define(function() {
	'use strict';
	
	var processKey = function(k) {
		var r = k.replace(/(\s|-)+/g, '_'); 		  // spaces and hyphens to underscores
		r = r.replace(/([a-z])([A-Z])/g, '$1 $2'); // de-camelcase
		r = r.toUpperCase();

		return r;
	};

	var Enum = function() {
		var e     = {},  // the enumerator object
			args  = Array.prototype.slice.apply(arguments),
			count = args.length;

		// Iterate over the args, and add them as enum keys
		var index = 1;
		for(var i = 0; i < count; i++) {
			var key = processKey(args[i]);
			if(e.hasOwnProperty(key)) {
				continue;
			} else {
				if(typeof Object.defineProperty == 'function') {
					// Javascript 1.8.5, use defineProperty
					Object.defineProperty(e, key, {configurable: false, enumerable: true, value: index, writable: false});
				} else if(typeof e.__defineGetter__ == 'function' && typeof e.__defineSetter__ == 'function') {
					// This is non-standard, but we'll use it if defineProperty fails
					// (it has to be present though)
					e.__defineGetter__(key, function() { return index; });
					e.__defineSetter__(key, function() { return false; });
				} else {
					// if all else fails, it won't be immutable, but we'll be graceful about it
					e[key] = index;
				}
				index++;
			}
		}

		return e;
	};

	return Enum;
});