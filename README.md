
<div style="text-align:center">
	<h1> dame </h1>
	<img height="256px" src="https://i.gyazo.com/a3bf515efe3dc7a505dc2d6999c9fefc.png" />
</div>


[![dame package size](https://packagephobia.now.sh/badge?p=dame)](https://packagephobia.now.sh/result?p=dame) [![dame package size minzipped](https://badgen.net/bundlephobia/minzip/dame)](https://badgen.net/bundlephobia/minzip/dame)
[![dame dependency count](https://badgen.net/bundlephobia/dependency-count/dame)](https://badgen.net/bundlephobia/dependency-count/dame)


**dame** minimalistic HTTP client for the browser and Node.js

- 🚀 Lightweight
- ⚪️ Zero dependencies.
- 😀 **Easy** to use.
- 🟢 **Node** (http & https) and 💻 **browser** (Fetch).
- 👉 **Promise** API.
- 🔌 **Offline** detection.
- 😶 Distinction between offline and no response.
- ⌛ Custom **timeout**.
- 🎯 Automatic transforms to **JSON** data.
- 📁 **Config groups** for base URL, headers and timeout.



<br><br><br>



# Table of contents

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

- [Table of contents](#table-of-contents)
- [Import](#import)
- [Basic examples](#basic-examples)
- [Response object](#response-object)
- [Methods](#methods)
  - [`get`](#get)
  - [`post`, `put`, `delete`, `patch`](#post-put-delete-patch)
- [Options](#options)
- [Config](#config)
  - [Config examples](#config-examples)
  - [Getting the config](#getting-the-config)
- [Special statuses](#special-statuses)
- [dame vs. others](#dame-vs-others)
- [☝ Return to top](#a-nametable-of-contentsa-return-to-toptable-of-contents)

<!-- /code_chunk_output -->



<br><br><br>



# Import

```js
const dame = require("dame");
```



<br><br><br>



# Basic examples

`GET`
```js
let {response} = dame.get("https://rickandmortyapi.com/api/location/1");
```

`POST`
```js
let {response} = dame.post("https://your.api.com/login", {
	username: "Username",
	password: "****",
});
```



<br><br><br>



# Response object

```js
{
	isError: false,
	code: 200,
	status: "OK",
	response: {...},
	error: null
}
```

- **isError** `boolean`: True if code is >= 200 and < 300.
- **code** `number`: Status code.
- **status** `string`: Status.
- **response** `any`: Response of the request.
- **error** `any`: If there was any error during the request it will be here.

<br>

The response can be destructured like this:


```js
let {isError, code, status, response} = dame.get("https://rickandmortyapi.com/api/location/1");
```



<br><br><br>



# Methods

## `get`

```js
const {response} = dame.get(url, options);
// or
const {response} = dame.get(url, configGroup, options);
```

- **url** `string`: Full URL or path.
	- If you set a `baseUrl`, this `url` will be concatenated to it: `baseUrl + url`.
	- If `url` starts with `"http://"` or `"https://"` the `baseUrl` from config will be ignored and url will be treated like a full url.
<br>
- **configGroup** `object` [optional]: Config group you want to use. If you skip this param "default" configGroup will be used.
<br>
- **options** `object`: See Options section.



<br>



## `post`, `put`, `delete`, `patch`

```js
const {response} = dame.post(url, body, options);
// or
const {response} = dame.post(url, body, configGroup, options);
```


- **url** `string`: Full URL or path.
	- If you set a `baseUrl`, this `url` will be concatenated to it: `baseUrl + url`.
	- If `url` starts with `"http://"` or `"https://"` the `baseUrl` from config will be ignored and url will be treated like a full url.
<br>
- **body** `object`: The request body.
<br>
- **configGroup** `object` [optional]: Config group you want to use. If you skip this param "default" configGroup will be used.
<br>
- **options** `object`: See Options section.



<br><br><br>



# Options

- **baseUrl** `string`: Base URL that will be concatenated with the `url` of the requests.
- **headers** `object`: Headers that will be attached to the request.
- **configGroup** `string`: Config group that will be used. If skipped `"default"` will be used.
- **timeout** `object`: Number of miliseconds that must pass before timeout the request.
- **checkIsError** `function<boolean>`: Function that will receive the status code (`number`) and must return `boolean`. Default `isError = !(code >= 200 && < 300)`.


> If you are using a configGroup, the options you set on the request will take preference over the configGroup.



<br><br><br>



# Config

The config groups are pre-setted options, explained above.

<br>

**Usage**

```js
dame.setConfig("configGroup", "key", "data");
```

Param | Type | Description
:---: | :---: | :---:
**configGroup** | `string` | Default is `"default"`.
**key** | `object` | Same as the options.
**data** | `object` | value


<br>


## Config examples


Set default base URL and auth
```js
dame.setConfig("default", "baseUrl", "http://localhost:3000");
dame.setConfig("default", "headers", {
	Authorization: "Bearer your_token"
});
```

Using default config
```js
dame.get("/endpoint");
// The full URL will be ---> http://localhost:3000/endpoint
// The headers will be ---> Authorization: "Bearer your_token".
```


Set another configGroup
```js
dame.setConfig("myConfigGroup", "baseUrl", "https://rickandmortyapi.com/api");
dame.setConfig("myConfigGroup", "headers", {
	Authorization: "Bearer your_token"
});
```

Using `"myConfigGroup"` config
```js
dame.get("/character/12", "myConfigGroup");
// The full URL will be ---> https://rickandmortyapi.com/api/character/12
// The headers will be ---> Authorization: "Bearer your_token".

```



## Getting the config

```js
dame.getConfig(); // all
dame.getConfig("default"); // get default config
dame.getConfig("yourConfig"); // get yourConfig config
```



<br><br><br>



# Special statuses

Timeout
```js
{
	isError: true,
	code: 0,
	status: 'Timed out',
	response: null
}
```

No response
```js
{
	isError: true,
	code: -1,
	status: "No response from server",
	response: null
}
```

Offline
```js
{
	isError: true,
	code: -2,
	status: "No internet connection",
	response: null
}
```



<br><br><br>



# dame vs. others


Package | Browser + Node 		| Dependencies 	| Size
:---: 	| :---: 				| :---:			| :---:
**dame** 	|	✅ | **0** 	| [![dame package size](https://packagephobia.now.sh/badge?p=dame)](https://packagephobia.now.sh/result?p=dame)
phin 		|	❌ | ![](https://badgen.net/bundlephobia/dependency-count/phin) 		| [![phin package size](https://packagephobia.now.sh/badge?p=phin)](https://packagephobia.now.sh/result?p=phin)
node-fetch 	|	❌ | ![](https://badgen.net/bundlephobia/dependency-count/node-fetch) 	| [![node-fetch package size](https://packagephobia.now.sh/badge?p=node-fetch)](https://packagephobia.now.sh/result?p=node-fetch)
axios 		|	✅ | ![](https://badgen.net/bundlephobia/dependency-count/axios)		| [![axios package size](https://packagephobia.now.sh/badge?p=axios)](https://packagephobia.now.sh/result?p=axios)
got 		|	❌ | ![](https://badgen.net/bundlephobia/dependency-count/got) 		| [![got package size](https://packagephobia.now.sh/badge?p=got)](https://packagephobia.now.sh/result?p=got)
superagent 	|	✅ | ![](https://badgen.net/bundlephobia/dependency-count/superagent)		| [![superagent package size](https://packagephobia.now.sh/badge?p=superagent)](https://packagephobia.now.sh/result?p=superagent)
request 	|	❌ | ![](https://badgen.net/bundlephobia/dependency-count/request) 		| [![request package size](https://packagephobia.now.sh/badge?p=request)](https://packagephobia.now.sh/result?p=request)



<br><br><br>



#  <a name='table-of-contents'></a>[☝ Return to top](#table-of-contents)


