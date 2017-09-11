# client-detect
获取客户端信息

# Install
```
   npm install --save client-detect
```

# Examples
```js
   var clientDetect = require('client-detect'); 

   console.dir(clientDetect);

   //结果
   {
     "deviceBrand":"黑莓",
     "screen":{
        "width":720,
        "height":1280,
        "resStr":"720x1280",
        "colorDepth":24,
        "orientation":{},
        "pixelDepth":24
     },
     "browser":{
        "name":"Safari",
        "version":"10.0.9.2372"
     },
     "os":{
        "name":"BlackBerry",
        "version":"10.0.9.2372"
     },
     "isWx":false
   }   

```