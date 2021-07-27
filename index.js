var __require=x=>{if(typeof require!="undefined")return require(x);throw new Error('Dynamic require of "'+x+'" is not supported')};var __commonJS=(cb,mod)=>function(){return mod||(0,cb[Object.keys(cb)[0]])((mod={exports:{}}).exports,mod),mod.exports};var require_buildUrl=__commonJS({"utils/buildUrl.js"(exports,module){module.exports=function(url,config={}){if(!url)return"";if(url.startsWith("http://")||url.startsWith("https://"))return url;let configBaseUrl=config.baseUrl;return configBaseUrl?configBaseUrl+url:url}}});var require_buildHeaders=__commonJS({"utils/buildHeaders.js"(exports,module){module.exports=function(headers,config={}){let configHeaders=config.headers;return headers&&configHeaders?{...configHeaders,...headers}:configHeaders}}});var require_canReachGoogle=__commonJS({"utils/canReachGoogle.js"(exports,module){var dns=__require("dns");module.exports=function(){return new Promise(resolve=>{try{dns.lookup("google.com",function(err2){err2&&err2.code==="ENOTFOUND"?resolve(!1):resolve(!0)})}catch(err2){console.log(err2),resolve(!1)}})}}});var require_requestNode=__commonJS({"utils/requestNode.js"(exports,module){var canReachGoogle=require_canReachGoogle(),https=__require("https"),http=__require("http");module.exports=function({method,fullUrl,headers,body}){if(!["GET","POST","PUT","DELETE","PATCH"].includes(method))return console.log(`Method ${method} is not valid.`);let protocol;if(fullUrl.startsWith("https"))protocol=https;else if(fullUrl.startsWith("http"))protocol=http;else return console.log(`Protocol not valid. URL: ${fullUrl}`);let options={method,headers};return new Promise(resolve=>{try{let req=protocol.request(fullUrl,options,res=>{let data=[];res.on("data",chunk=>data.push(chunk)),res.on("end",()=>{data=Buffer.concat(data).toString();try{data=JSON.parse(data)}catch(e){}let is200=res.statusCode>=200&&res.statusCode<300;resolve({isError:!is200,code:res.statusCode,status:res.statusMessage,response:data})})});req.on("error",async err2=>{await canReachGoogle()?resolve({isError:!0,code:-1,status:"No response from server",response:null,error:err2}):resolve({isError:!0,code:-2,status:"No internet connection",response:null,error:err2})}),body&&req.write(body),req.end()}catch(err2){resolve({isError:!0,code:-999,status:"Exception",response:null,error:err2})}})}}});var require_requestWeb=__commonJS({"utils/requestWeb.js"(exports,module){module.exports=function({method,fullUrl,headers,body}){return["GET","POST","PUT","DELETE","PATCH"].includes(method)?window.navigator.onLine?new Promise(async resolve=>{try{let options={method,headers};method!=="GET"&&(options.body=body);let res=await fetch(fullUrl,options),json=await res.json(),is200=res.status>=200&&res.status<300;resolve({isError:!is200,code:res.status,status:res.statusText,response:json})}catch(err2){resolve({isError:!0,code:-1,status:"No response from server",response:null,error:err2})}}):{isError:!0,code:-2,status:"No internet connection",response:null,error:err}:console.log(`Method ${method} is not valid.`)}}});var require_raceTimeout=__commonJS({"utils/raceTimeout.js"(exports,module){module.exports=function(promise,timeout,config){let _timeout=timeout;return!_timeout&&config.timeout&&(_timeout=config.timeout),_timeout?Promise.race([new Promise(resolve=>{setTimeout(()=>resolve({isError:!0,code:0,status:"Timed out",response:null}),_timeout)}),promise]):promise}}});var require_dame=__commonJS({"lib/dame.js"(exports,module){var buildUrl=require_buildUrl(),buildHeaders=require_buildHeaders(),requestNode=require_requestNode(),requestWeb=require_requestWeb(),raceTimeout=require_raceTimeout(),config={},dame={get:function(){let url=arguments[0],configGroup="default",options;typeof arguments[1]=="string"?(configGroup=arguments[1],options=arguments[2]):options=arguments[1],options||(options={});let fullUrl=buildUrl(url,config[configGroup]),headers=buildHeaders(options.headers,config[configGroup]),promise;return typeof window!="undefined"?promise=requestWeb({method:"GET",fullUrl,headers}):promise=requestNode({method:"GET",fullUrl,headers}),raceTimeout(promise,options.timeout,config[configGroup])},post:function(){let url=arguments[0],body=JSON.stringify(arguments[1]),configGroup=null,options=null;typeof arguments[2]=="string"?(configGroup=arguments[2],options=arguments[3]):(configGroup="default",options=arguments[2]),configGroup||(configGroup="default"),options||(options={});let fullUrl=buildUrl(url,config[configGroup]),headers=buildHeaders(options.headers,config[configGroup]),promise;return typeof window!="undefined"?promise=requestWeb({method:"POST",fullUrl,headers:{...headers,"Content-Type":"application/json","Content-Length":body.length},body}):promise=requestNode({method:"POST",fullUrl,headers:{...headers,"Content-Type":"application/json","Content-Length":body.length},body}),raceTimeout(promise,options.timeout,config[configGroup])},put:function(){let url=arguments[0],body=JSON.stringify(arguments[1]),configGroup=null,options=null;typeof arguments[2]=="string"?(configGroup=arguments[2],options=arguments[3]):(configGroup="default",options=arguments[2]),configGroup||(configGroup="default"),options||(options={});let fullUrl=buildUrl(url,config[configGroup]),headers=buildHeaders(options.headers,config[configGroup]),promise;return typeof window!="undefined"?promise=requestWeb({method:"PUT",fullUrl,headers:{...headers,"Content-Type":"application/json","Content-Length":body.length},body}):promise=requestNode({method:"PUT",fullUrl,headers:{...headers,"Content-Type":"application/json","Content-Length":body.length},body}),raceTimeout(promise,options.timeout,config[configGroup])},patch:function(){let url=arguments[0],body=JSON.stringify(arguments[1]),configGroup=null,options=null;typeof arguments[2]=="string"?(configGroup=arguments[2],options=arguments[3]):(configGroup="default",options=arguments[2]),configGroup||(configGroup="default"),options||(options={});let fullUrl=buildUrl(url,config[configGroup]),headers=buildHeaders(options.headers,config[configGroup]),promise;return typeof window!="undefined"?promise=requestWeb({method:"PATCH",fullUrl,headers:{...headers,"Content-Type":"application/json","Content-Length":body.length},body}):promise=requestNode({method:"PATCH",fullUrl,headers:{...headers,"Content-Type":"application/json","Content-Length":body.length},body}),raceTimeout(promise,options.timeout,config[configGroup])},delete:function(){let url=arguments[0],body=JSON.stringify(arguments[1]),configGroup=null,options=null;typeof arguments[2]=="string"?(configGroup=arguments[2],options=arguments[3]):(configGroup="default",options=arguments[2]),configGroup||(configGroup="default"),options||(options={});let fullUrl=buildUrl(url,config[configGroup]),headers=buildHeaders(options.headers,config[configGroup]),promise;return typeof window!="undefined"?promise=requestWeb({method:"DELETE",fullUrl,headers:{...headers,"Content-Type":"application/json","Content-Length":body.length},body}):promise=requestNode({method:"DELETE",fullUrl,headers:{...headers,"Content-Type":"application/json","Content-Length":body.length},body}),raceTimeout(promise,options.timeout,config[configGroup])},setConfig:(configGroup,key,value)=>{config[configGroup]||(config[configGroup]={}),config[configGroup][key]=value},getConfig:configGroup=>configGroup?config[configGroup]:config};module.exports=dame}});export default require_dame();
