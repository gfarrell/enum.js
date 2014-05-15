/* global define, describe, it, expect */
define(['jasmine/boot', 'enum'], function(jasmine, Enum) {
	'use strict';

	describe('Enum.js', function() {
		it('normalises all keys', function() {
			var e = new Enum('First Value', 'second', 'thirdVal', '4');

			expect(e.FIRST_VALUE).toBeDefined();
			expect(e.SECOND).toBeDefined();
			expect(e.THIRD_VAL).toBeDefined();
			expect(e[4]).toBeDefined();

			expect(e['First Value']).not.toBeDefined();
			expect(e.second).not.toBeDefined();
			expect(e.thirdVal).not.toBeDefined();
		});

		it('ignores multiple instances of a key', function() {
			var e = new Enum('One', 'Two', 'Three', 'One');

			expect(e.ONE).toBe(1);
			expect(e.TWO).toBe(2);
			expect(e.THREE).toBe(3);
		});

		it('creates an immutable object', function() {
			var e = new Enum('one', 'two', 'three'),
				err;

			expect(e.ONE).toBe(1);
			try {
				e.ONE = 5;
			} catch(error) {
				err = error;
			}
			expect(e.ONE).toBe(1);
			expect(err).toBeDefined();
		});
	});
});
