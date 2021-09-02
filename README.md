
<div style="text-align:center">
	<h1> dame </h1>
	<img height="256px" src="https://i.gyazo.com/a3bf515efe3dc7a505dc2d6999c9fefc.png" />
</div>


[![dame package size](https://packagephobia.now.sh/badge?p=dame)](https://packagephobia.now.sh/result?p=dame) [![dame package size minzipped](https://badgen.net/bundlephobia/minzip/dame)](https://badgen.net/bundlephobia/minzip/dame) [![dame dependency count](https://badgen.net/bundlephobia/dependency-count/dame)](https://badgen.net/bundlephobia/dependency-count/dame)
[![Coverage Status](https://coveralls.io/repos/github/Icaruk/dame/badge.svg?branch=master)](https://coveralls.io/github/Icaruk/dame?branch=master)

<br>

**dame** minimalistic HTTP client for the browser and Node.js

- 🚀 Lightweight
- ⚪️ Zero dependencies.
- 😀 **Easy** to use.
- 🟢 **Node** (http & https) and 💻 **browser** (Fetch).
- 👉 **Promise** API.
- ⌛ Custom **timeout**.
- 📄 Automatic transforms to **JSON** data.
- ⏭ Follows **redirects**.

<br>

📃 [Changelog](https://github.com/Icaruk/dame/releases)


<br><br>



# Table of contents

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

- [Table of contents](#table-of-contents)
- [Import](#import)
- [Basic examples](#basic-examples)
- [Response object](#response-object)
- [Methods](#methods)
	- [get](#get)
	- [post, put, delete, patch](#post-put-delete-patch)
- [Config](#config)
- [Creating an instance](#creating-an-instance)
	- [Examples](#examples)
	- [Editing an instance](#editing-an-instance)
- [Special statuses](#special-statuses)
- [dame vs. others](#dame-vs-others)
- [<a name='table-of-contents'></a>☝ Return to top](#-return-to-top)

<!-- /code_chunk_output -->



<br><br>



# Import

```js
const dame = require("dame");
```



<br><br>



# Basic examples

**GET**
```js
let {response} = dame.get("https://rickandmortyapi.com/api/location/1");
```

**POST**
```js
let {response} = dame.post("https://your.api.com/login", {
	username: "Username",
	password: "****",
});
```



<br><br>



# Response object

```js
{
	isError: false,
	code: 200,
	status: "OK",
	response: {...},
	error: null,
	redirectCount: 3,
}
```

- **isError** `boolean`: True if code is >= 200 and < 300 (this is configurable).
- **code** `number`: Status code.
- **status** `string`: Status.
- **response** `any`: Response of the request.
- **error** `any`: If there was any error during the request it will be here.
- **redirectCount** `number`: How many redirects have been followed. Not present if there have been no redirects.

<br>

The response can be destructured like this:


```js
let {isError, code, status, response} = dame.get("https://rickandmortyapi.com/api/location/1");
```



<br><br>



# Methods

## get

```js
const {response} = dame.get(url, config);
```

- **url** `string`: Full URL or path.
	- If you set a `baseUrl`, this `url` will be concatenated to it: `baseUrl + url`.
	- If `url` starts with `"http://"` or `"https://"` the `baseUrl` from config will be ignored and url will be treated like a full url.
- **config** `object`: See [Config](#config).



<br><br>



## post, put, delete, patch

```js
const {response} = dame.post(url, body, config);
```


- **url** `string`:See [get](#get).
- **body** `object`: The request body.
- **config** `object`: See [Config](#config).



<br><br>



# Config

- **baseUrl** `string`: Base URL that will be concatenated with the `url` of the requests.
- **headers** `object`: Headers that will be attached to the request.
- **timeout** `object`: Number of miliseconds that must pass before timeout the request.
- **checkIsError** `function<boolean>`: Function that will receive the status code (`number`) and must return `boolean`. Default `isError = !(code >= 200 && < 300)`.
- Any option that fits on [request](https://nodejs.org/api/https.html#https_https_request_url_options_callback) or [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).
- **maxRedirects** `number`: Max redirects to follow. Default 20. Use 0 to disable redirects.
- **responseType** `"arraybuffer" | "stream" | "json" | "text"`: **Browser only**. Default `"json"`. Type of the data that the server will respond with.



<br><br>



# Creating an instance

```js
const dameInstance = dame.new(config, instanceName?);
```

- **config** `object`: See [Config](#config).
- **instanceName** `string`: (optional) If filled, this instance will be saved on `dame.instances.<instanceName>`.

---

Removing a saved instance:
```js
delete dame.instances.<instanceNameToRemove>
```



<br>



## Examples

Set base URL
```js
const yourApi = dame.new({
	"baseUrl": "http://localhost:3000",
});
```

Set headers
```js
const yourApi = dame.new({
	"headers": {
		Authorization: "Bearer abc.123"
	}
});
```


<br>


## Editing an instance

```js
yourApi.headers.Authorization: "Bearer new.token";
```



<br><br>



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



<br><br>



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



<br><br>



#  <a name='table-of-contents'></a>[☝ Return to top](#table-of-contents)


