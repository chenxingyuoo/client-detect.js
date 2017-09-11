/**
 * Created on 2017/9/8.
 */

(function () {
  'use strict';

  var hasOwnProp = Object.prototype.hasOwnProperty;
  var ua = window.navigator.userAgent;

  //设备
  var phones = {
    'iPhone': '\\biPhone\\b|\\biPod\\b',                //iPhone
    'iPad': 'iPad|iPad.*Mobile',                        //iPad
    'HTC': 'HTC',                              //HTC
    'Nexus': 'Nexus',                          //谷歌
    'LG': 'LG',                                //LG
    'OPPO': 'OPPO|R7Plus|R7007|R6007|1105|1100|1107|N5117|M571C|X909T|A31|R8207|R833T',  //OPPO
    'vivo': 'vivo',                                    //vivo
    'TCL': 'TCL',                                      //TCL
    '三星': '\\bSamsung\\b|SM-|SCH-|SCH-|GT-|SPH-',    //三星
    '黑莓': 'BlackBerry|\\bBB10\\b|rim[0-9]+',         //黑莓
    '摩托罗拉': 'Motorola',                             //摩托罗拉
    '索尼': 'SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533|F5121', //索尼
    '华硕': 'Asus.*Galaxy|PadFone.*Mobile',                         //华硕
    '诺基亚': 'Nokia|Lumia [0-9]{3,4}|TA-1000 Build/NMF26F|Symbian',        //诺基亚
    '华为': 'HUAWEI|HONOR',                                         //华为
    '小米': 'HM|RedMi|Mi',                                          //小米
    '魅族': 'metal|MRA58K|LMY47D|LRX22C|KOT49H|LMY47I|LMY48W|MX4',  //魅族
    '锤子': 'LMY47V|MXB48T|SANFRANCISCO',              //锤子
    '中兴': 'ZTE',                                     //中兴
    '酷派': 'Coolpad',                                 //酷派
    '联想': 'Lenovo',                                  //联想
    '美图': 'Meitu',                                   //美图
    '优米': 'UIMI',                                    //优米
    '乐视': '\\w{16}1S|\\w{16}2S|Letv|Le X620',        //乐视
    '努比亚': 'NX\\d{3}J',                             //努比亚
    '一加': 'ONEPLUS'                                  //一加
  };

  //系统
  var oss = {
    'Android': 'Android',
    'BlackBerry': 'blackberry|\\bBB10\\b|rim tablet os',
    'Palm': 'PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino',
    'Symbian': 'Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b',
    // 'WindowsMobileOS': 'Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;',
    'WindowsPhone': 'Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;',
    'iOS': '\\biPhone.*Mobile|\\biPod|\\biPad',
    'Mac': 'Mac OS X',
    'Windows' : 'Windows',
    'MeeGo': 'MeeGo',
    'Maemo': 'Maemo',
    'Java': 'J2ME\/|\\bMIDP\\b|\\bCLDC\\b',
    'webOS': 'webOS|hpwOS',
    'Bada': '\\bBada\\b',
    'BREW': 'BREW'
  };

  //平台
  var platforms = {
    'Chrome': 'Chrome',
    'Opera': 'Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR\/[0-9.]+|Coast\/[0-9.]+',
    'Edge': 'Mobile Safari\/[.0-9]* Edge',
    'IE': 'IEMobile|MSIEMobile',
    'Firefox': 'fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS',
    'Safari': 'Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari',
    'UC': 'UC.*Browser|UCWEB',
    'Baidu': 'baidubrowser|baiduboxapp',
    'QQ': 'QQ|TencentTraveler|MQQBrowser',
    'Sogou': '\\bSE\\b|\\bMetaSr\\b|\\bSogouMobileBrowser\\b',
    '360': '360SE',
    'Theworld': 'The world',    //世界之窗
    'Maxthon': 'Maxthon',       //遨游
    'Nokia': 'NokiaBrowser'
  };

  //属性
  var props = {
    'Mobile': 'Mobile\/[VER]',
    'Build': 'Build\/[VER]',
    'Version': 'Version\/[VER]',
    'iPad': 'iPad.*CPU[a-z ]+[VER]',
    'iPhone': 'iPhone.*CPU[a-z ]+[VER]',
    'iPod': 'iPod.*CPU[a-z ]+[VER]',
    'Mac': 'Mac OS X [VER]',
    'Windows' : 'Windows NT [VER]',
    'Chrome': [
      'Chrome\/[VER]',
      'CriOS\/[VER]',
      'CrMo\/[VER]'
    ],
    'Firefox': [
      'Firefox\/[VER]',
      'FxiOS\/[VER]'
    ],
    'Edge': 'Edge\/[VER]',
    'IE': [
      'IEMobile\/[VER];',
      'IEMobile [VER]',
      'MSIE [VER];',
      'Trident\/[0-9.]+;.*rv:[VER]'
    ],
    'Opera': [
      ' OPR\/[VER]',
      'Opera Mini\/[VER]',
      'Version\/[VER]'
    ],
    'UC': 'UC Browser[VER]',
    'QQ': 'MQQBrowser\/[VER]',
    'MicroMessenger': 'MicroMessenger\/[VER]',
    'Baidu': [
      'baiduboxapp\/[VER]',
      'baidubrowser\/[VER]'
    ],
    'Safari': [
      'Version\/[VER]',
      'Safari\/[VER]'
    ],
    'Webkit': 'webkit[ \/][VER]',
    'Gecko': 'Gecko\/[VER]',
    'iOS': ' \\bi?OS\\b [VER][ ;]{1}',
    'Android': 'Android [VER]',
    'BlackBerry': [
      'BlackBerry[\\w]+\/[VER]',
      'BlackBerry.*Version\/[VER]',
      'Version\/[VER]'
    ],
    'Java': 'Java\/[VER]',
    'WindowsPhone': [
      'Windows Phone OS [VER]',
      'Windows Phone [VER]'
    ],
    'WindowsCE': 'Windows CE\/[VER]',
    'WindowsNT': 'Windows NT [VER]',
    'webOS': [
      'webOS\/[VER]',
      'hpwOS\/[VER];'
    ],
    'Nokia': 'NokiaBrowser\/[VER]',   //诺基亚
    'TheWorld': 'CLR [VER]'           //世界之窗
  };


  //把版本对象（props）转换为正则表达式
  function convertVerPropsToRegExp() {
    var key, values, value, i, len, verPos;
    for (key in props) {
      if (hasOwnProp.call(props, key)) {
        values = props[key];
        if (!Array.isArray(values)) {
          values = [values];
        }
        len = values.length;
        for (i = 0; i < len; ++i) {
          value = values[i];
          verPos = value.indexOf('[VER]');
          if (verPos >= 0) {
            value = value.substring(0, verPos) + '([\\w._\\+]+)' + value.substring(verPos + 5);
          }
          values[i] = new RegExp(value, 'i');
        }
        props[key] = values;
      }
    }
  }

  //转换为正则表达式
  function convertPropsToRegExp(object) {
    for (let key in object) {
      if (hasOwnProp.call(object, key)) {
        object[key] = new RegExp(object[key], 'i');
      }
    }
  }

  //找到匹配的一项
  function findMatch(rules, userAgent) {
    for (var key in rules) {
      if (hasOwnProp.call(rules, key)) {
        if (rules[key].test(userAgent)) {
          return key;
        }
      }
    }
    return null;
  }

  //通过字符串获取版本
  function getVersionStr(propertyName, userAgent) {
    var patterns, i, len, match;
    if (hasOwnProp.call(props, propertyName)) {
      patterns = props[propertyName];
      len = patterns.length;
      for (i = 0; i < len; ++i) {
        match = patterns[i].exec(userAgent);
        if (match !== null) {
          return match[1];
        }
      }
    }
    return null;
  }

  //是否为pc端
  function getIsPc(){
    return !(/Android|webOS|iPhone|iPod|iPad|BlackBerry|PlayBook|Tablet|Mobile|Windows Phone|symbianos|MicroMessenger/i.test(ua));
  }

  //是否为微信平台
  function getIsWx(){
    return /MicroMessenger/i.test(ua);
  }

  //获取屏幕信息
  function getScreen () {
    let screen = window.screen;
    let width = screen.width;
    let height = screen.height;

    if (!getIsPc()) {
      width = width * 2;
      height = height * 2;
    }

    return {
      width : width,
      height : height,
      resStr : `${width}x${height}`,
      colorDepth : screen.colorDepth,
      orientation : screen.orientation,
      pixelDepth : screen.pixelDepth
    };
  }

  //初始化
  (function init() {
    //将对象的值转换为正则表达式
    convertVerPropsToRegExp();
    convertPropsToRegExp(phones);
    convertPropsToRegExp(oss);
    convertPropsToRegExp(platforms);
  })();

  //获取值

  let phone = findMatch(phones, ua);           //找出手机品牌
  let screen = getScreen();
  let os = findMatch(oss, ua);                 //找出系统类型
  let osVer;
  if (os) {
    osVer = getVersionStr(os, ua); //找出系统版本
    //兼容对应版本的windows版本
    if (os === 'Windows') {
      let windowsVer = {
        '6.4' : '10',
        '6.3' : '8.1',
        '6.2' : '8',
        '6.1' : '7',
        '6.0' : 'vista',
        '5.1' : 'xp'
      };
      osVer = windowsVer[osVer];
    }
  }
  let browser = findMatch(platforms, ua);      //找出浏览器
  let browserVer = browser ? getVersionStr(browser, ua) : '';  ////找出浏览器版本
  let isWx = getIsWx();

  var clientDetect = {
    terminalBrand : phone,
    screen : screen,
    browser: {
      name: browser,
      version: browserVer
    },
    os: {
      name: os,
      version: osVer
    },
    isWx : isWx
  };

  if (typeof exports === 'object') {
    module.exports = clientDetect;
  } else {
    window.clientDetect = clientDetect;
  }

})();

