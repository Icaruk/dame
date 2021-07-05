var T=o=>{if(typeof require!="undefined")return require(o);throw new Error('Dynamic require of "'+o+'" is not supported')};var f=(o,e)=>()=>(e||o((e={exports:{}}).exports,e),e.exports);var b=f((R,E)=>{E.exports=function(e,t={}){if(!e)return"";if(e.startsWith("http://")||e.startsWith("https://"))return e;let n=t.baseUrl;return n?n+e:e}});var U=f((k,C)=>{C.exports=function(e,t={}){let n=t.headers;return e&&n?{...n,...e}:n}});var w=f((M,N)=>{var S=T("dns");N.exports=function(){return new Promise(e=>{try{S.lookup("google.com",function(t){t&&t.code==="ENOTFOUND"?e(!1):e(!0)})}catch(t){console.log(t),e(!1)}})}});var P=f(($,q)=>{var x=w(),W=T("https"),H=T("http");q.exports=function({method:e,fullUrl:t,headers:n,body:s}){if(!["GET","POST","PUT","DELETE","PATCH"].includes(e))return console.log(`Method ${e} is not valid.`);let r;if(t.startsWith("https"))r=W;else if(t.startsWith("http"))r=H;else return console.log(`Protocol not valid. URL: ${t}`);let u={method:e,headers:n};return new Promise(a=>{try{let d=r.request(t,u,i=>{let c=[];i.on("data",y=>c.push(y)),i.on("end",()=>{if(c=Buffer.concat(c).toString(),c.startsWith("{")&&c.endsWith("}"))try{c=JSON.parse(c)}catch(G){}let y=i.statusCode>=200&&i.statusCode<300;a({isError:!y,code:i.statusCode,status:i.statusMessage,response:c})})});d.on("error",async i=>{await x()?a({isError:!0,code:-1,status:"No response from server",response:null,error:i}):a({isError:!0,code:-2,status:"No internet connection",response:null,error:i})}),s&&d.write(s),d.end()}catch(d){a({isError:!0,code:-999,status:"Exception",response:null,error:d})}})}});var j=f((B,L)=>{L.exports=function({method:e,fullUrl:t,headers:n,body:s}){return["GET","POST","PUT","DELETE","PATCH"].includes(e)?new Promise(async r=>{try{let u={method:e,headers:n};e!=="GET"&&(u.body=s);let a=await fetch(t,u),d=await a.json(),i=a.status>=200&&a.status<300;r({isError:!i,code:a.status,status:a.statusText,response:d})}catch(u){console.log("instanceof: ",u instanceof TypeError),console.log("message: ",u.message),console.log("name: ",u.name),console.log("fileName: ",u.fileName),console.log("lineNumber: ",u.lineNumber),console.log("columnNumber: ",u.columnNumber),console.log("stack: ",u.stack),r({isError:!0,code:-999,status:"Exception",response:null,error:u})}}):console.log(`Method ${e} is not valid.`)}});var J=f((F,O)=>{var g=b(),p=U(),h=P(),m=j(),l={},D={get:function(){let o=arguments[0],e="default",t;typeof arguments[1]=="string"?(e=arguments[1],t=arguments[2]):t=arguments[1],t||(t={});let n=g(o,l[e]),s=p(t.headers,l[e]);return typeof window!="undefined"?m({method:"GET",fullUrl:n,headers:s}):h({method:"GET",fullUrl:n,headers:s})},post:function(){let o=arguments[0],e=JSON.stringify(arguments[1]),t=null,n=null;typeof arguments[2]=="string"?(t=arguments[2],n=arguments[3]):(t="default",n=arguments[2]),t||(t="default"),n||(n={});let s=g(o,l[t]),r=p(n.headers,l[t]);return typeof window!="undefined"?m({method:"POST",fullUrl:s,headers:{...r,"Content-Type":"application/json","Content-Length":e.length},body:e}):h({method:"POST",fullUrl:s,headers:{...r,"Content-Type":"application/json","Content-Length":e.length},body:e})},put:function(){let o=arguments[0],e=JSON.stringify(arguments[1]),t=null,n=null;typeof arguments[2]=="string"?(t=arguments[2],n=arguments[3]):(t="default",n=arguments[2]),t||(t="default"),n||(n={});let s=g(o,l[t]),r=p(n.headers,l[t]);return typeof window!="undefined"?m({method:"PUT",fullUrl:s,headers:{...r,"Content-Type":"application/json","Content-Length":e.length},body:e}):h({method:"PUT",fullUrl:s,headers:{...r,"Content-Type":"application/json","Content-Length":e.length},body:e})},patch:function(){let o=arguments[0],e=JSON.stringify(arguments[1]),t=null,n=null;typeof arguments[2]=="string"?(t=arguments[2],n=arguments[3]):(t="default",n=arguments[2]),t||(t="default"),n||(n={});let s=g(o,l[t]),r=p(n.headers,l[t]);return typeof window!="undefined"?m({method:"PATCH",fullUrl:s,headers:{...r,"Content-Type":"application/json","Content-Length":e.length},body:e}):h({method:"PATCH",fullUrl:s,headers:{...r,"Content-Type":"application/json","Content-Length":e.length},body:e})},delete:function(){let o=arguments[0],e=JSON.stringify(arguments[1]),t=null,n=null;typeof arguments[2]=="string"?(t=arguments[2],n=arguments[3]):(t="default",n=arguments[2]),t||(t="default"),n||(n={});let s=g(o,l[t]),r=p(n.headers,l[t]);return typeof window!="undefined"?m({method:"DELETE",fullUrl:s,headers:{...r,"Content-Type":"application/json","Content-Length":e.length},body:e}):h({method:"DELETE",fullUrl:s,headers:{...r,"Content-Type":"application/json","Content-Length":e.length},body:e})},setConfig:(o,e,t)=>{l[o]||(l[o]={}),l[o][e]=t},getConfig:o=>o?l[o]:l};O.exports=D});export default J();
