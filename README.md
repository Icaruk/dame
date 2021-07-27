
<div style="text-align:center">
	<h1> dame </h1>
	<img height="256px" src="https://i.gyazo.com/a3bf515efe3dc7a505dc2d6999c9fefc.png" />
</div>


[![dame package size](https://packagephobia.now.sh/badge?p=dame)](https://packagephobia.now.sh/result?p=dame) [![dame package size minzipped](https://badgen.net/bundlephobia/minzip/dame)](https://badgen.net/bundlephobia/minzip/dame)
[![dame dependency count](https://badgen.net/bundlephobia/dependency-count/dame)](https://badgen.net/bundlephobia/dependency-count/dame)


**dame** minimalistic HTTP client for the browser and Node.js

- 🚀 Lightweight.
- ⚪️ Zero dependencies.


<br>



<!-- TOC ignore:true -->
# Table of contents


<!-- TOC -->

- [Features](#features)
- [Import](#import)
- [Basic examples](#basic-examples)
- [Methods](#methods)
	- [get](#get)
	- [post, put, delete, patch](#post-put-delete-patch)
	- [setConfig](#setconfig)
		- [Usage](#usage)
		- [Examples](#examples)
	- [getConfig](#getconfig)
- [dame vs. others](#dame-vs-others)
- [<a name='table-of-contents'></a>☝ Return to top](#a-nametable-of-contentsa-return-to-top)

<!-- /TOC -->



<br><br><br>



# Features

- **Node** (http & https) and **browser** (Fetch).
- **Promise** API.
- **Offline** detection.
- Distinction between offline and no response.
- Custom **timeout**.
- Automatic transforms to **JSON** data.
- **Config groups** for base URL, authorization headers and timeout.



<br><br><br>



# Import

```js
const dame = require("dame");
```



<br><br><br>



# Basic examples

`GET`
```js
let {response, isError} = dame.get("https://rickandmortyapi.com/api/location/1");
```

`POST`
```js
let {response, isError} = dame.post("https://your.api.com/login", {
	username: "Username",
	password: "****",
});
```



<br><br><br>



# Methods

## `get`

```js
const {response} = dame.get(url, options);
// or
const {response} = dame.get(url, configGroup, options);
```

Param | Type | Description
:---: | :---: | :---:
**url** | `string` | Full URL or path. If it starts with `http` or `https` it will be treated as full URL. Otherwise it will be concatenated with `baseUrl` from config.
**configGroup** | `object` | Skip this param if you want to use "default" configGroup.
**options** | `object` | Options: {headers}



<br>



## `post`, `put`, `delete`, `patch`

```js
const {response} = dame.post(url, body, options);
// or
const {response} = dame.post(url, body, configGroup, options);
```


Param | Type | Description
:---: | :---: | :---:
**url** | `string` | Full URL or path. If it starts with `http` or `https` it will be treated as full URL. Otherwise it will be concatenated with `baseUrl` from config.
**body** | `object` | Request body.
**configGroup** | `object` | Skip this param if you want to use "default" configGroup.
**options** | `object` | Options: {headers}



<br>



## `setConfig`

- They key `baseUrl` from the `default` config group will be used as base URL.
- They key `headers` from the `default` config group will be used as headers.
- They key `timeout` from the `default` config group will be used as default timeout.



### Usage

```js
dame.setConfig("configGroup", "key", "data");
```

Param | Type | Description
:---: | :---: | :---:
**configGroup** | `string` | Default is `default`.
**key** | `object` | `baseUrl` or  `headers`
**data** | `object` | value

<br>

### Examples

```js

// Set default base URL and auth
dame.setConfig("default", "baseUrl", "http://localhost:3000");
dame.setConfig("default", "headers", {
	Authorization: "Bearer your_token"
});

// Using default config

dame.get("/endpoint");
// http://localhost:3000/endpoint
// Authorization: "Bearer your_token".

```

```js
// Set base URL and auth
dame.setConfig("rick", "baseUrl", "https://rickandmortyapi.com/api");
dame.setConfig("rick", "headers", {
	Authorization: "Bearer another_token"
});

// Using rick config

dame.get("/character/12");
// https://rickandmortyapi.com/api/character/12
// Authorization: "Bearer another_token".

```



## `getConfig`

```js
dame.getConfig(); // all
dame.getConfig("default"); // get default config
dame.getConfig("yourConfig"); // get yourConfig config
```



<br><br><br>



# Custom statuses

## Timeout

```js
{
	isError: true,
	code: 0,
	status: 'Timed out',
	response: null
}
```

## No response

```js
{
	isError: true,
	code: -1,
	status: "No response from server",
	response: null
}
```

## Offline

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


