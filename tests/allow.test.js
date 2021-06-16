
const {validame, validameConfig, validameUtils} = require("../index");


describe("allow", () => {
	
	[
		["a", "abcd"],
		["A", "ABCD"],
		["1", "1234"],
		["2", "1234"],
		["2", "12.34"],
		["2", "12,34"],
		["a A", "ABcd"],
		["a A", "abCD"],
		["a 1", "abc123"],
		["A 1", "ABC123"],
		["a A 1", "abCD123"],
		["a A 1 _", "abCD 123"],
		["a A 1 _ !", "abCD 123 !! $ €"],
		["a A 1 _ ! ñ", "áéíóúñ abCD 123 !! $ €"],
	].forEach( _x => {
		
		test(_x[0], () => {
			expect(
				validame(_x[1], {
					allow: _x[0]
				})
			).toBe("");
		});
		
	});
	
	
	
	[
		["a", "abcd A1ñ!"],
		["A", "ABCD A1ñ!"],
		["1", "1234 A1ñ!"],
		["2", "12.34 A1ñ!"],
		["2", "12,34 A1ñ!"],
		["a A", "ABcd A1ñ!"],
		["a A", "abCD A1ñ!"],
		["a 1", "abc123 A1ñ!"],
		["A 1", "ABC123 A1ñ!"],
		["a A 1", "abCD123 A1ñ!"],
		["a A 1 _", "abCD 123 A1ñ!"],
		["a A 1 _ !", "abCD 123 !! $ € ñ"],
		["a A 1 _ ! ñ", "áéíóúñ abCD 123 !! $ € 字"],
	].forEach( _x => {
		
		test(_x[0], () => {
			expect(
				validame(_x[1], {
					allow: _x[0]
				})
			).not.toBe("");
		});
		
	});
	
	
});