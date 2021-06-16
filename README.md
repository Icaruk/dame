
<div style="text-align:center">
	<h1> validame </h1>
	<img src="https://i.gyazo.com/a979d99bac6f4e8d04ee8668634f1cf9.png" />
</div>


[![install size](https://packagephobia.com/badge?p=validame@latest)](https://packagephobia.com/result?p=validame@latest)


**validame** is a javascript **string validator** that returns the error message.

- 🚀 Lightweight (12 kB packed and 53 kB unpacked).
- ⚪️ Zero dependencies.
- 🔧 Totally customizable.
- 🧩 Modular.
- 🌍 Multilanguage.



<br>


<!-- TOC ignore:true -->
# Table of contents
<a id="markdown-table-of-contents" name="table-of-contents"></a>


<!-- TOC -->

- [Import ⬇️](#import-)
- [Basic examples 🔮](#basic-examples-)
- [Usage 🧭](#usage-%F0%9F%A7%AD)
- [Rules 📏](#rules-)
- [allow rule 🏳️](#allow-rule-)
- [allowOr rule 🏳️](#allowor-rule-)
- [Symbols ✳️](#symbols-)
- [Language 🌍](#language-)
- [Editing symbols and rules 🧾](#editing-symbols-and-rules-%F0%9F%A7%BE)
- [Creating your own rules ⚗️](#creating-your-own-rules-)
- [Creating your own symbols ⚗️](#creating-your-own-symbols-)
- [Advanced examples 🔮](#advanced-examples-)

<!-- /TOC -->

<br>



# Import ⬇️
<a id="markdown-import-%E2%AC%87%EF%B8%8F" name="import-%E2%AC%87%EF%B8%8F"></a>

```js
const {validame} = require("validame");
```



<br>



# Basic examples 🔮
<a id="markdown-basic-examples-%F0%9F%94%AE" name="basic-examples-%F0%9F%94%AE"></a>

```js

let error = validame("Dog", {
	min: 4,
});

// error = "It should have 4 minimum characters but it has 3."

```

```js

let error = validame("Dog", {
	min: 2,
	max: 4
});

// error = ""

```

```js

let error = validame("My name is Mike", {
	allow: "1"
});

// error = "It's only allowed: numbers."

```

```js

let error = validame("My name is Mike", {
	allow: "a 1"
});

// error = "It's only allowed: lowercase and numbers."

```

```js

let error = validame("My name is Mike", {
	allow: "aA"
});

// error = "It's only allowed: letters."

```

```js

let error = validame("My name is Mike", {
	min: 4,
	max: 16,
	allow: "a A _"
});

// error = ""

```



<br>



# Usage 🧭
<a id="markdown-usage-%F0%9F%A7%AD" name="usage-%F0%9F%A7%AD"></a>

**Returns** an empty string if the validation is correct, otherwise it returns an string explaining the error.

```js
validame (stringToValidate, rules);
```

- **stringToValidate** `string`: The string you want to validate.
- **rules** `object`: One or more rules, they are defined at `validameConfig.rules`.



<br/>



# Rules 📏
<a id="markdown-rules-%F0%9F%93%8F" name="rules-%F0%9F%93%8F"></a>

```js
{
	// Minimum number of characters
	min: 1,
	
	// Maximum number of characters
	max: 10,
	
	// Exact number of characters
	minMax: 5,
	
	// 0: Empty string or null will return "" (OK).
	// 1: Empty string will return "" (OK) but null will return an error.
	// 2: Empty string OR null will return an error.
	req: 1,
	
	// (Explained below) Contains a list of symbols separated with a space.
	allow: "a A _ 1",
	allowOr: "dni cif",
	
	// Should have 3 uppercase, 2 lowercase and 1 numbers.
	password: [3, 2, 1],
	
	// Pass the validation and skips the next steps if the string matches any word.
 	passWith: ["goodWordOne", "goodWordTwo"], 
	
	
}
```

The rules will be checked in the same order they are listed, example:

```js
{
	min: 5, // first check (if it fails, it stops here)
	max: 10 // second check
}
```



<br>



# allow rule 🏳️
<a id="markdown-allow-rule-%F0%9F%8F%B3%EF%B8%8F" name="allow-rule-%F0%9F%8F%B3%EF%B8%8F"></a>

- The allow rule reads a list of **symbols** *(explained below)*.
- The symbol list must be **separated with spaces**.
  
  > Example: `a A _ !`.

- The validations are done from **left to right**.
- If **one symbol fails** it will return the error and stops the validation, otherwise the next symbol will be read.
  
  > - Example: `"a 1"` (lowercase and numbers) will fail with "Mike123" but pass with "mike123".
  > - Example: `"costlessPrefixEs phoneEs"` will fail with "807456789" because "807" is a paid prefix.
  
- If the symbol list is filled with regex symbols, they all will be read because they can't fail. They make an "allowlist" and will only fail if there is a character outside that allowlist.



<br/>

# allowOr rule 🏳️
<a id="markdown-allowor-rule-%F0%9F%8F%B3%EF%B8%8F" name="allowor-rule-%F0%9F%8F%B3%EF%B8%8F"></a>

- Same mechanics than `allow` rule, but this one needs **all symbols failing** to return an error.
- The returned error it's from the first failed symbol.


> ❌ It only works with **function symbols**, not regex.



<br/>



# Symbols ✳️
<a id="markdown-symbols-%E2%9C%B3%EF%B8%8F" name="symbols-%E2%9C%B3%EF%B8%8F"></a>

Each symbol is unique and has a **regex or function** associated.


- **Regex symbols**:

	> Allow rule with regex symbols describes an allowlist.
	> Examples:
	> - `allow: "a"` with `"mike123"` will fail because numbers are not in the allowlist.
	> - `allow: "a 1"` with `"mike123"` will pass because there are no characters outside the allowlist.
	> - `allow: "a 1"` with `"mike"` will pass because there are no characters outside the allowlist.
	> - `allow: "1 a"` with `"mike"` will pass because there are no characters outside the allowlist.
	
	- `a`: `a-z`
	- `A`: `A-Z`
	- `aA`: `a-zA-Z`
	- `1`: `0-9 (only integers)`
	- `2`: `0-9 (integers or decimals)`
	- `_`: `spaces`
	- `!`: `ºª\!|"@·#€\$%&¬/()=?'¿¡^``\[+]´,{}-_<>~`
	- `ñ`: `áéíóúñ`
	- `Ñ`: `ÑÁÉÍÓÚ`
	- `ñÑ`: `áéíóúñÑÁÉÍÓÚ`
	
<br/>

- **Function symbols**:
	- `phoneEs`: Spanish telephone number.
	- `mobileEs`: Spanish mobile number.
	- `dni`: Valid DNI (spain).
	- `cif`: Valid CIF (spain).
	- `ibanEs`: Spanish IBAN.
	- `email`: Email address.
	- `postalCodeEs`: Spanish postal code.

<br/>

> ✅ If the symbols are **regex**, the error string is built automatically.
> Example, with `"a 1"` the error string will be:
> `It's only allowed: lowercase and numbers`



<br>



# Language 🌍
<a id="markdown-language-%F0%9F%8C%8D" name="language-%F0%9F%8C%8D"></a>

```js
const {validameConfig} = require("validame");

validameConfig.language = "en";
```

It specifies the language of the errors given, default `"es"`.
At the moment the possible options are:
- `es`
- `en`

But you can add your own language and translations.



<br>



# Editing symbols and rules 🧾
<a id="markdown-editing-symbols-and-rules-%F0%9F%A7%BE" name="editing-symbols-and-rules-%F0%9F%A7%BE"></a>

```js
const {validameConfig} = require("validame");

valiadmeConfig.symbols = {...};
valiadmeConfig.rules = {...};
```


## ➡️ `symbols` property

They are used inside `allow` rule. Example: `allow: "aA 1"` (letters and numbers).

- **regex** `regex | function`: Used when the symbol is called.
- **messages** `object`: Messages displayed and his translations.

Examples:

```js
"a": {
	regex: /[a-z]/g,
	messages: {
		name: {
			es: "minúsculas",
			en: "lowercase",
			xx: "here could be placed your own translation",
		}
	},
}
```

```js
"phoneEs": {
	regex: require("./validations/symbols/phone").phoneEs,
	messages: {
		invalid: {
			es: "No es un teléfono español válido",
			en: "It isn't a valid spanish phone",
			xx: "here could be placed your own translation",
		},
		digits: {
			es: "Debe tener 9 dígitos",
			en: "It must have 9 digits",
			xx: "here could be placed your own translation",
		}
	},
}
```



<br/>




## ➡️ `rules` property

- **fnc** `function`: Used when the rule is called.
- The next properties are an `object` with the name of the error message for the rule:

Examples:

```js
allow: {
	fnc: require("./validations/rules/allow"),
	messages: {
		itsOnlyAllowed: {
			es: "Sólo se permite: ",
			en: "It's only allowed: ",
		},
		and: {
			es: " y ",
			en: " and ",
		}
	},
}
```

```js
min: {
	fnc: require("./validations/rules/min"),
	messages: {
		error: {
			es: "Debería tener _%1 caracteres como mínimo pero tiene _%2.",
			en: "It should have _%1 minimum characters but it has _%2.",
		}
	},
}
```

> 🔴 The `_%1` `_%2` (and so on) are replacers.



<br>



# Creating your own rules ⚗️
<a id="markdown-creating-your-own-rules-%E2%9A%97%EF%B8%8F" name="creating-your-own-rules-%E2%9A%97%EF%B8%8F"></a>

```js
// Import
const {validame, validameConfig, validameUtils} = require("validame");

const multiReplace = validameUtils.multiReplace;


// Create the function
const myCustomRule = (stringToValidate, value, config) => {
	
	let upper = new RegExp(`[A-Z]{${value[0]}}`).test(stringToValidate);
	let lower = new RegExp(`[a-z]{${value[1]}}`).test(stringToValidate);
	
	
	if (!upper || !lower) {
		
		// Create message using replacers
		let errorMessage = multiReplace(config.rules.upperAndLower.messages.must[config.language], {
			"_%1": value[0],
			"_%2": value[1],
		});
		
		return errorMessage;
		
		
		// Without multilanguage
		return `It must have at least ${value[0]} uppercase and ${value[1]} lowercase characters`;
		
	};
	
	
	// All OK
	return "";
	
};


// Create your custom rule
validameConfig.rules.upperAndLower = {
	fnc: myCustomRule,
	messages: {
		must: {
			es: "Tiene que tener al menos _%1 mayúsculas y _%2 minúsculas.",
			en: "It must have at least _%1 uppercase and _%2 lowercase characters",
		}
	},
};



// And you can use it now:
let error1 = validame("mike", {
	upperAndLower: [1, 2],
});
// error1 = "It must have at least 1 uppercase and 2 lowercase characters"

let error2 = validame("Mike", {
	upperAndLower: [1, 2],
});
// error2 = ""

```



<br>



# Creating your own symbols ⚗️
<a id="markdown-creating-your-own-symbols-%E2%9A%97%EF%B8%8F" name="creating-your-own-symbols-%E2%9A%97%EF%B8%8F"></a>

```js
// Import
const {validame, validameConfig} = require("validame");


// Create the function
const myCustomSymbol = (stringToValidate, config) => {
	
	// Get the over18 symbol config
	const symbolMessages = config.symbols.over18.messages;
	
	
	// Check if it's a number
	let age = parseInt(stringToValidate);
	if (isNaN(age)) return symbolMessages.number[config.language];
	
	
	// Check if it's over 18
	if (age < 18) return symbolMessages.over[config.language];
	
	
	// All OK
	return "";
	
};


// Create your custom symbol
validameConfig.symbols.over18 = {
	regex: myCustomSymbol,
	messages: {
		number: {
			es: "Tiene que ser un número",
			en: "It must be a number",
		},
		over: {
			es: "Tiene que ser mayor que 18",
			en: "It must be over 18",
		}
	},
};



let error1 = validame("35", {
	allow: "over18",
});
// error1 = ""

let error2 = validame("17", {
	allow: "over18",
});
// error2 = "It must be over 18"

```



<br/>



# Advanced examples 🔮
<a id="markdown-advanced-examples-%F0%9F%94%AE" name="advanced-examples-%F0%9F%94%AE"></a>

```js

let error = validame("Name SurnameOne SurnameTwo", {
	min: 4,
	max: 64,
	allow: "a A _"
});

// error = ""
```

```js

let error = validame("600123456", {
	req: 1,
	allow: "phoneEs"
});

// error = ""
```

```js

let error = validame("", {
	req: 1,
	min: 4,
	max: 64,
	allow: "a A"
});

// error = "It can't be empty."
```

```js

let error = validame("", {
	req: 2,
	min: 4,
	max: 64,
	allow: "a A"
});

// error = "It can't be empty."
```

```js

let error = validame(null, {
	req: 1,
	min: 4,
	max: 64,
	allow: "a A"
});

// error = "It should have 4 minimum characters but it has 0."
```

```js

let error = validame(null, {
	req: 2,
	min: 4,
	max: 64,
	allow: "a A"
});

// error = "It can't be empty."
```


---

###  <a name='table-of-contents'></a>[⏫](#table-of-contents)


