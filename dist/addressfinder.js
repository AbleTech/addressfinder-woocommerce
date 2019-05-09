/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  'Auckland Region': 'AK',
  'Bay of Plenty Region': 'BP',
  'Canterbury Region': 'CT',
  'Gisborne Region': 'GI',
  'Hawke\'s Bay Region': 'HB',
  'Manawatu-Wanganui Region': 'MW',
  'Marlborough Region': 'MB',
  'Nelson Region': 'NS',
  'Northland Region': 'NL',
  'Otago Region': 'OT',
  'Southland Region': 'SL',
  'Taranaki Region': 'TK',
  'Tasman Region': 'TM',
  'Waikato Region': 'WA',
  'Wellington Region': 'WE',
  'West Coast Region': 'WC',
  'No Region (Chatham Islands)': null
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_manager__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__addressfinder_addressfinder_webpage_tools__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__addressfinder_addressfinder_webpage_tools___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__addressfinder_addressfinder_webpage_tools__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




(function (d, w) {
  var WooCommercePlugin =
  /*#__PURE__*/
  function () {
    function WooCommercePlugin() {
      _classCallCheck(this, WooCommercePlugin);

      this.version = "1.3.0"; // Manages the mapping of the form configurations to the DOM. 

      this.PageManager = null; // Manages the form configuraions, and creates any dynamic forms

      this.ConfigManager = null;

      this._initOnDOMLoaded();
    }

    _createClass(WooCommercePlugin, [{
      key: "mutationEventHandler",
      value: function mutationEventHandler() {
        // When the form mutates, reload our form configurations, and reload the form helpers in the page manager.
        var addressFormConfigurations = this.ConfigManager.load();

        if (this.PageManager) {
          this.PageManager.reload(addressFormConfigurations);
        }
      }
    }, {
      key: "_safeParseJSONObject",
      value: function _safeParseJSONObject(jsonObject) {
        if (jsonObject == undefined) {
          return null;
        }

        try {
          jsonObject = JSON.parse(jsonObject);
        } catch (e) {
          if (AFC.debug) {
            alert('Invalid widget option: ' + jsonObject);
          }

          return null;
        }

        return jsonObject;
      }
    }, {
      key: "_initOnDOMLoaded",
      value: function _initOnDOMLoaded(event, repetitions) {
        var _this = this;

        // In WooCommerce/Wordpress a country change event is fired during the DOM loading process.
        // If AddressFinder is added before this event it will clear the user's existing address details from the address fields.
        // This function makes sure AddressFinder is initalised after this event.
        repetitions = repetitions || 10;

        if (d.readyState == "complete" && typeof w.AddressFinder != 'undefined') {
          setTimeout(function () {
            console.log('ready state');

            _this._initPlugin();
          }, 1000);
          return;
        }

        if (repetitions == 0) {
          // if 5 seconds have passed and the DOM still isn't ready, initalise AddressFinder
          console.log('repetition zero');

          this._initPlugin();

          return;
        }

        setTimeout(function () {
          // if less than 5 seconds have passed and the DOM isn't ready, recall the function to check again
          _this._initOnDOMLoaded('ignoredEvent', repetitions - 1);
        }, 1000);
      }
    }, {
      key: "_initPlugin",
      value: function _initPlugin() {
        var parsedWidgetOptions = this._safeParseJSONObject(w.AddressFinderConfig.widget_options);

        var parsedNZWidgetOptions = this._safeParseJSONObject(w.AddressFinderConfig.nz_widget_options);

        var parsedAUWidgetOptions = this._safeParseJSONObject(w.AddressFinderConfig.au_widget_options);

        var widgetConfig = {
          nzKey: w.AddressFinderConfig.key_nz || w.AddressFinderConfig.key || w.AddressFinderConfig.key_au,
          auKey: w.AddressFinderConfig.key_au || w.AddressFinderConfig.key || w.AddressFinderConfig.key_nz,
          nzWidgetOptions: parsedNZWidgetOptions || parsedWidgetOptions || {},
          auWidgetOptions: parsedAUWidgetOptions || parsedWidgetOptions || {},
          defaultCountry: w.AddressFinderConfig.default_country || 'nz',
          debug: w.AddressFinderConfig.debug || false
        };
        this.ConfigManager = new __WEBPACK_IMPORTED_MODULE_0__config_manager__["a" /* default */](); // Watches for any mutations to the DOM, so we can reload our configurations when something changes.

        new __WEBPACK_IMPORTED_MODULE_1__addressfinder_addressfinder_webpage_tools__["MutationManager"]({
          widgetConfig: widgetConfig,
          mutationEventHandler: this.mutationEventHandler.bind(this),
          ignoredClass: "af_list"
        });
        this.PageManager = new __WEBPACK_IMPORTED_MODULE_1__addressfinder_addressfinder_webpage_tools__["PageManager"]({
          addressFormConfigurations: this.ConfigManager.load(),
          widgetConfig: widgetConfig,
          // When an address is selected dispatch this event on all the updated form fields. This tells the store the fields have been changed.
          formFieldChangeEventToDispatch: 'change',
          // An event listener with this event type is attached to country element. When the country changes the active country for the widget is set.
          countryChangeEventToListenFor: 'blur'
        });
        w.AddressFinder._woocommercePlugin = this.PageManager;
      }
    }]);

    return WooCommercePlugin;
  }();

  var s = d.createElement('script');
  s.src = 'https://api.addressfinder.io/assets/v3/widget.js';
  s.async = 1;

  s.onload = function () {
    new WooCommercePlugin();
  };

  d.body.appendChild(s);
})(document, window);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__address_form_config_billing_address__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__address_form_config_shipping_address__ = __webpack_require__(5);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var ConfigManager =
/*#__PURE__*/
function () {
  function ConfigManager() {
    _classCallCheck(this, ConfigManager);
  }

  _createClass(ConfigManager, [{
    key: "load",
    value: function load() {
      // This function is called when the page mutates and returns our form configurations
      var addressFormConfigurations = [__WEBPACK_IMPORTED_MODULE_0__address_form_config_billing_address__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__address_form_config_shipping_address__["a" /* default */]];
      return addressFormConfigurations;
    }
  }]);

  return ConfigManager;
}();



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__region_mappings__ = __webpack_require__(0);

/* harmony default export */ __webpack_exports__["a"] = ({
  label: "Billing Checkout",
  layoutSelectors: ["#billing_address_1"],
  countryIdentifier: '#billing_country',
  searchIdentifier: '#billing_address_1',
  nz: {
    countryValue: "NZ",
    elements: {
      address1: '#billing_address_1',
      suburb: '#billing_address_2',
      city: '#billing_city',
      region: '#billing_state',
      postcode: '#billing_postcode'
    },
    regionMappings: __WEBPACK_IMPORTED_MODULE_0__region_mappings__["a" /* default */]
  },
  au: {
    countryValue: "AU",
    elements: {
      address1: '#billing_address_1',
      address2: '#billing_address_2',
      suburb: '#billing_city',
      state: '#billing_state',
      postcode: '#billing_postcode'
    },
    stateMappings: null
  }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__region_mappings__ = __webpack_require__(0);

/* harmony default export */ __webpack_exports__["a"] = ({
  label: "Shipping Checkout",
  layoutSelectors: ["#shipping_address_1"],
  countryIdentifier: '#shipping_country',
  searchIdentifier: '#shipping_address_1',
  nz: {
    countryValue: "NZ",
    elements: {
      address1: '#shipping_address_1',
      suburb: '#shipping_address_2',
      city: '#shipping_city',
      region: '#shipping_state',
      postcode: '#shipping_postcode'
    },
    regionMappings: __WEBPACK_IMPORTED_MODULE_0__region_mappings__["a" /* default */]
  },
  au: {
    countryValue: "AU",
    elements: {
      address1: '#shipping_address_1',
      address2: '#shipping_address_2',
      suburb: '#shipping_city',
      state: '#shipping_state',
      postcode: '#shipping_postcode'
    },
    stateMappings: null
  }
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=48)}([function(t,e,n){var r=n(17)("wks"),o=n(14),i=n(2).Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r},function(t,e){var n=t.exports={version:"2.6.5"};"number"==typeof __e&&(__e=n)},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var r=n(2),o=n(1),i=n(5),u=n(13),s=n(23),a=function(t,e,n){var c,l,f,d,p=t&a.F,h=t&a.G,y=t&a.S,v=t&a.P,m=t&a.B,g=h?r:y?r[e]||(r[e]={}):(r[e]||{}).prototype,b=h?o:o[e]||(o[e]={}),_=b.prototype||(b.prototype={});h&&(n=e);for(c in n)l=!p&&g&&void 0!==g[c],f=(l?g:n)[c],d=m&&l?s(f,r):v&&"function"==typeof f?s(Function.call,f):f,g&&u(g,c,f,t&a.U),b[c]!=f&&i(b,c,d),v&&_[c]!=f&&(_[c]=f)};r.core=o,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(6),o=n(12);t.exports=n(9)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(11),o=n(34),i=n(22),u=Object.defineProperty;e.f=n(9)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(37),o=n(20);t.exports=function(t){return r(o(t))}},function(t,e,n){t.exports=!n(10)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(7);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var r=n(2),o=n(5),i=n(4),u=n(14)("src"),s=n(52),a=(""+s).split("toString");n(1).inspectSource=function(t){return s.call(t)},(t.exports=function(t,e,n,s){var c="function"==typeof n;c&&(i(n,"name")||o(n,"name",e)),t[e]!==n&&(c&&(i(n,u)||o(n,u,t[e]?""+t[e]:a.join(String(e)))),t===r?t[e]=n:s?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[u]||s.call(this)})},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var r=n(36),o=n(30);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e){t.exports={}},function(t,e,n){var r=n(1),o=n(2),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(18)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports=!1},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(7);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(53);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(6).f,o=n(4),i=n(0)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){e.f=n(0)},function(t,e,n){var r=n(2),o=n(1),i=n(18),u=n(25),s=n(6).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:u.f(t)})}},function(t,e,n){var r=n(28),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(17)("keys"),o=n(14);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var r=n(20);t.exports=function(t){return Object(r(t))}},function(t,e,n){var r=n(0)("unscopables"),o=Array.prototype;void 0==o[r]&&n(5)(o,r,{}),t.exports=function(t){o[r][t]=!0}},function(t,e,n){var r=n(23),o=n(37),i=n(31),u=n(27),s=n(81);t.exports=function(t,e){var n=1==t,a=2==t,c=3==t,l=4==t,f=6==t,d=5==t||f,p=e||s;return function(e,s,h){for(var y,v,m=i(e),g=o(m),b=r(s,h,3),_=u(g.length),w=0,E=n?p(e,_):a?p(e,0):void 0;_>w;w++)if((d||w in g)&&(y=g[w],v=b(y,w,m),t))if(n)E[w]=v;else if(v)switch(t){case 3:return!0;case 5:return y;case 6:return w;case 2:E.push(y)}else if(l)return!1;return f?-1:c||l?l:E}}},function(t,e,n){t.exports=!n(9)&&!n(10)(function(){return 7!=Object.defineProperty(n(35)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(7),o=n(2).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(4),o=n(8),i=n(38)(!1),u=n(29)("IE_PROTO");t.exports=function(t,e){var n,s=o(t),a=0,c=[];for(n in s)n!=u&&r(s,n)&&c.push(n);for(;e.length>a;)r(s,n=e[a++])&&(~i(c,n)||c.push(n));return c}},function(t,e,n){var r=n(19);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(8),o=n(27),i=n(56);t.exports=function(t){return function(e,n,u){var s,a=r(e),c=o(a.length),l=i(u,c);if(t&&n!=n){for(;c>l;)if((s=a[l++])!=s)return!0}else for(;c>l;l++)if((t||l in a)&&a[l]===n)return t||l||0;return!t&&-1}}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(19);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(11),o=n(57),i=n(30),u=n(29)("IE_PROTO"),s=function(){},a=function(){var t,e=n(35)("iframe"),r=i.length;for(e.style.display="none",n(58).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;r--;)delete a.prototype[i[r]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(s.prototype=r(t),n=new s,s.prototype=null,n[u]=t):n=a(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(36),o=n(30).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(19),o=n(0)("toStringTag"),i="Arguments"==r(function(){return arguments}()),u=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=u(e=Object(t),o))?n:i?r(e):"Object"==(s=r(e))&&"function"==typeof e.callee?"Arguments":s}},function(t,e,n){"use strict";var r=n(65)(!0);n(45)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";var r=n(18),o=n(3),i=n(13),u=n(5),s=n(16),a=n(66),c=n(24),l=n(67),f=n(0)("iterator"),d=!([].keys&&"next"in[].keys()),p=function(){return this};t.exports=function(t,e,n,h,y,v,m){a(n,e,h);var g,b,_,w=function(t){if(!d&&t in x)return x[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},E=e+" Iterator",S="values"==y,C=!1,x=t.prototype,O=x[f]||x["@@iterator"]||y&&x[y],A=O||w(y),T=y?S?w("entries"):A:void 0,F="Array"==e?x.entries||O:O;if(F&&(_=l(F.call(new t)))!==Object.prototype&&_.next&&(c(_,E,!0),r||"function"==typeof _[f]||u(_,f,p)),S&&O&&"values"!==O.name&&(C=!0,A=function(){return O.call(this)}),r&&!m||!d&&!C&&x[f]||u(x,f,A),s[e]=A,s[E]=p,y)if(g={values:S?A:w("values"),keys:v?A:w("keys"),entries:T},m)for(b in g)b in x||i(x,b,g[b]);else o(o.P+o.F*(d||C),e,g);return g}},function(t,e,n){"use strict";var r=n(10);t.exports=function(t,e){return!!t&&r(function(){e?t.call(null,function(){},1):t.call(null)})}},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){return s(t)||u(t,e)||i()}function i(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function u(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var u,s=t[Symbol.iterator]();!(r=(u=s.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==s.return||s.return()}finally{if(o)throw i}}return n}function s(t){if(Array.isArray(t))return t}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,e,n){return e&&c(t.prototype,e),n&&c(t,n),t}n.d(e,"a",function(){return f});var f=function(){function t(e,n,r,o){a(this,t),this.widgetConfig=e,this.formHelperConfig=n,this.formFieldChangeEventToDispatch=r,this.countryChangeEventToListenFor=o,this.widgets={},this.countryCodes=["au","nz"],this._bindToForm()}return l(t,[{key:"destroy",value:function(){this._log("Destroying widget",this.formHelperConfig.label);for(var t in this.widgets)this.widgets[t].disable(),this.widgets[t].destroy();this.widgets=null,this.formHelperConfig.countryElement.removeEventListener(this.countryChangeEventToListenFor,this.boundCountryChangedListener)}},{key:"_bindToForm",value:function(){var t=new window.AddressFinder.Widget(this.formHelperConfig.searchElement,this.widgetConfig.nzKey,"nz",this.widgetConfig.nzWidgetOptions);t.on("result:select",this._nzAddressSelected.bind(this)),this.widgets.nz=t;var e=new window.AddressFinder.Widget(this.formHelperConfig.searchElement,this.widgetConfig.auKey,"au",this.widgetConfig.auWidgetOptions);e.on("result:select",this._auAddressSelected.bind(this)),this.widgets.au=e,this.widgets.null={enable:function(){},disable:function(){},destroy:function(){}},this.boundCountryChangedListener=this._countryChanged.bind(this),this.formHelperConfig.countryElement?(this.formHelperConfig.countryElement.addEventListener(this.countryChangeEventToListenFor,this.boundCountryChangedListener),this.boundCountryChangedListener(null,!0)):this.widgetConfig.defaultCountry&&this._setActiveCountry(this.widgetConfig.defaultCountry)}},{key:"_countryChanged",value:function(t,e){var n;switch(this.formHelperConfig.countryElement.value){case this.formHelperConfig.nz.countryValue:n="nz";break;case this.formHelperConfig.au.countryValue:n="au";break;default:n="null"}if(this._setActiveCountry(n),!e){var r=function(t){return t!=n};this.countryCodes.filter(r).forEach(this._clearElementValues.bind(this))}}},{key:"_clearElementValues",value:function(t){var e=this,n=this.formHelperConfig[t].elements;Object.entries(n).forEach(function(t){var n=o(t,2),r=n[0],i=n[1];i&&e._setElementValue(i,"",r)})}},{key:"_setActiveCountry",value:function(t){this._log("Setting active country",t),Object.values(this.widgets).forEach(function(t){return t.disable()}),this.widgets[t].enable()}},{key:"_combineAddressElements",value:function(t){var e=function(t){return null!=t&&""!=t},n=t.filter(e);return n.length>1?n.join(", "):n[0]}},{key:"_nzAddressSelected",value:function(t,e){var n=this.formHelperConfig.nz.elements,r=new AddressFinder.NZSelectedAddress(t,e);if(n.address_line_2||n.suburb)!n.address_line_2&&n.suburb?(this._setElementValue(n.address_line_1,r.address_line_1_and_2(),"address_line_1"),this._setElementValue(n.suburb,r.suburb(),"suburb")):(this._setElementValue(n.address_line_1,r.address_line_1(),"address_line_1"),this._setElementValue(n.address_line_2,r.address_line_2(),"address_line_2"),this._setElementValue(n.suburb,r.suburb(),"suburb"));else{var o=this._combineAddressElements([r.address_line_1_and_2(),r.suburb()]);this._setElementValue(n.address_line_1,o,"address_line_1")}if(this._setElementValue(n.city,r.city(),"city"),this._setElementValue(n.postcode,r.postcode(),"postcode"),this.formHelperConfig.nz.regionMappings){var i=this.formHelperConfig.nz.regionMappings[e.region];this._setElementValue(n.region,i,"region")}else this._setElementValue(n.region,e.region,"region")}},{key:"_auAddressSelected",value:function(t,e){var n=this.formHelperConfig.au.elements;if(n.address_line_2){this._setElementValue(n.address_line_1,e.address_line_1,"address_line_1");var r=e.address_line_2||"";this._setElementValue(n.address_line_2,r,"address_line_2")}else{var o=this._combineAddressElements([e.address_line_1,e.address_line_2]);this._setElementValue(n.address_line_1,o,"address_line_1")}if(this._setElementValue(n.locality_name,e.locality_name,"suburb"),this._setElementValue(n.postcode,e.postcode,"postcode"),this.formHelperConfig.au.stateMappings){var i=this.formHelperConfig.au.stateMappings[e.state_territory];this._setElementValue(n.state_territory,i,"state_territory")}else this._setElementValue(n.state_territory,e.state_territory,"state_territory")}},{key:"_setElementValue",value:function(t,e,n){if(!t){var r="AddressFinder Error: Attempted to update value for element that could not be found.\n\nElement: "+n+"\nValue: "+e;return void(window.console&&console.warn(r))}t.value=e,this._dispatchEvent(t)}},{key:"_dispatchEvent",value:function(t){var e;switch("undefined"==typeof Event?"undefined":r(Event)){case"function":e=new Event(this.formFieldChangeEventToDispatch,{bubbles:!0,cancelable:!1});break;default:e=document.createEvent("Event"),e.initEvent(this.formFieldChangeEventToDispatch,!0,!1)}t.dispatchEvent(e)}},{key:"_log",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.widgetConfig.debug&&window.console&&(void 0!=e?console.log("FormHelper for layout ".concat(this.formHelperConfig.label,": ").concat(t),e):console.log("FormHelper for layout ".concat(this.formHelperConfig.label,": ").concat(t)))}}]),t}()},function(t,e,n){t.exports=n(49)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(50),o=(n.n(r),n(64)),i=(n.n(o),n(71)),u=(n.n(i),n(76)),s=(n.n(u),n(79)),a=(n.n(s),n(83)),c=(n.n(a),n(90)),l=(n.n(c),n(92)),f=(n.n(l),n(94)),d=(n.n(f),n(96)),p=n(47),h=n(97);n.d(e,"PageManager",function(){return d.a}),n.d(e,"FormManager",function(){return p.a}),n.d(e,"MutationManager",function(){return h.a})},function(t,e,n){n(51),n(61),n(62),n(63),t.exports=n(1).Symbol},function(t,e,n){"use strict";var r=n(2),o=n(4),i=n(9),u=n(3),s=n(13),a=n(54).KEY,c=n(10),l=n(17),f=n(24),d=n(14),p=n(0),h=n(25),y=n(26),v=n(55),m=n(40),g=n(11),b=n(7),_=n(8),w=n(22),E=n(12),S=n(41),C=n(59),x=n(60),O=n(6),A=n(15),T=x.f,F=O.f,j=C.f,M=r.Symbol,k=r.JSON,P=k&&k.stringify,H=p("_hidden"),L=p("toPrimitive"),V={}.propertyIsEnumerable,N=l("symbol-registry"),z=l("symbols"),I=l("op-symbols"),D=Object.prototype,q="function"==typeof M,R=r.QObject,G=!R||!R.prototype||!R.prototype.findChild,W=i&&c(function(){return 7!=S(F({},"a",{get:function(){return F(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=T(D,e);r&&delete D[e],F(t,e,n),r&&t!==D&&F(D,e,r)}:F,K=function(t){var e=z[t]=S(M.prototype);return e._k=t,e},J=q&&"symbol"==typeof M.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof M},B=function(t,e,n){return t===D&&B(I,e,n),g(t),e=w(e,!0),g(n),o(z,e)?(n.enumerable?(o(t,H)&&t[H][e]&&(t[H][e]=!1),n=S(n,{enumerable:E(0,!1)})):(o(t,H)||F(t,H,E(1,{})),t[H][e]=!0),W(t,e,n)):F(t,e,n)},U=function(t,e){g(t);for(var n,r=v(e=_(e)),o=0,i=r.length;i>o;)B(t,n=r[o++],e[n]);return t},Y=function(t,e){return void 0===e?S(t):U(S(t),e)},Q=function(t){var e=V.call(this,t=w(t,!0));return!(this===D&&o(z,t)&&!o(I,t))&&(!(e||!o(this,t)||!o(z,t)||o(this,H)&&this[H][t])||e)},Z=function(t,e){if(t=_(t),e=w(e,!0),t!==D||!o(z,e)||o(I,e)){var n=T(t,e);return!n||!o(z,e)||o(t,H)&&t[H][e]||(n.enumerable=!0),n}},X=function(t){for(var e,n=j(_(t)),r=[],i=0;n.length>i;)o(z,e=n[i++])||e==H||e==a||r.push(e);return r},$=function(t){for(var e,n=t===D,r=j(n?I:_(t)),i=[],u=0;r.length>u;)!o(z,e=r[u++])||n&&!o(D,e)||i.push(z[e]);return i};q||(M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0),e=function(n){this===D&&e.call(I,n),o(this,H)&&o(this[H],t)&&(this[H][t]=!1),W(this,t,E(1,n))};return i&&G&&W(D,t,{configurable:!0,set:e}),K(t)},s(M.prototype,"toString",function(){return this._k}),x.f=Z,O.f=B,n(42).f=C.f=X,n(21).f=Q,n(39).f=$,i&&!n(18)&&s(D,"propertyIsEnumerable",Q,!0),h.f=function(t){return K(p(t))}),u(u.G+u.W+u.F*!q,{Symbol:M});for(var tt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),et=0;tt.length>et;)p(tt[et++]);for(var nt=A(p.store),rt=0;nt.length>rt;)y(nt[rt++]);u(u.S+u.F*!q,"Symbol",{for:function(t){return o(N,t+="")?N[t]:N[t]=M(t)},keyFor:function(t){if(!J(t))throw TypeError(t+" is not a symbol!");for(var e in N)if(N[e]===t)return e},useSetter:function(){G=!0},useSimple:function(){G=!1}}),u(u.S+u.F*!q,"Object",{create:Y,defineProperty:B,defineProperties:U,getOwnPropertyDescriptor:Z,getOwnPropertyNames:X,getOwnPropertySymbols:$}),k&&u(u.S+u.F*(!q||c(function(){var t=M();return"[null]"!=P([t])||"{}"!=P({a:t})||"{}"!=P(Object(t))})),"JSON",{stringify:function(t){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=e=r[1],(b(e)||void 0!==t)&&!J(t))return m(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!J(e))return e}),r[1]=e,P.apply(k,r)}}),M.prototype[L]||n(5)(M.prototype,L,M.prototype.valueOf),f(M,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},function(t,e,n){t.exports=n(17)("native-function-to-string",Function.toString)},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(14)("meta"),o=n(7),i=n(4),u=n(6).f,s=0,a=Object.isExtensible||function(){return!0},c=!n(10)(function(){return a(Object.preventExtensions({}))}),l=function(t){u(t,r,{value:{i:"O"+ ++s,w:{}}})},f=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!a(t))return"F";if(!e)return"E";l(t)}return t[r].i},d=function(t,e){if(!i(t,r)){if(!a(t))return!0;if(!e)return!1;l(t)}return t[r].w},p=function(t){return c&&h.NEED&&a(t)&&!i(t,r)&&l(t),t},h=t.exports={KEY:r,NEED:!1,fastKey:f,getWeak:d,onFreeze:p}},function(t,e,n){var r=n(15),o=n(39),i=n(21);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var u,s=n(t),a=i.f,c=0;s.length>c;)a.call(t,u=s[c++])&&e.push(u);return e}},function(t,e,n){var r=n(28),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(6),o=n(11),i=n(15);t.exports=n(9)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),s=u.length,a=0;s>a;)r.f(t,n=u[a++],e[n]);return t}},function(t,e,n){var r=n(2).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(8),o=n(42).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return o(t)}catch(t){return u.slice()}};t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?s(t):o(r(t))}},function(t,e,n){var r=n(21),o=n(12),i=n(8),u=n(22),s=n(4),a=n(34),c=Object.getOwnPropertyDescriptor;e.f=n(9)?c:function(t,e){if(t=i(t),e=u(e,!0),a)try{return c(t,e)}catch(t){}if(s(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){"use strict";var r=n(43),o={};o[n(0)("toStringTag")]="z",o+""!="[object z]"&&n(13)(Object.prototype,"toString",function(){return"[object "+r(this)+"]"},!0)},function(t,e,n){n(26)("asyncIterator")},function(t,e,n){n(26)("observable")},function(t,e,n){n(44),n(68),t.exports=n(25).f("iterator")},function(t,e,n){var r=n(28),o=n(20);t.exports=function(t){return function(e,n){var i,u,s=String(o(e)),a=r(n),c=s.length;return a<0||a>=c?t?"":void 0:(i=s.charCodeAt(a),i<55296||i>56319||a+1===c||(u=s.charCodeAt(a+1))<56320||u>57343?t?s.charAt(a):i:t?s.slice(a,a+2):u-56320+(i-55296<<10)+65536)}}},function(t,e,n){"use strict";var r=n(41),o=n(12),i=n(24),u={};n(5)(u,n(0)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(4),o=n(31),i=n(29)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){for(var r=n(69),o=n(15),i=n(13),u=n(2),s=n(5),a=n(16),c=n(0),l=c("iterator"),f=c("toStringTag"),d=a.Array,p={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},h=o(p),y=0;y<h.length;y++){var v,m=h[y],g=p[m],b=u[m],_=b&&b.prototype;if(_&&(_[l]||s(_,l,d),_[f]||s(_,f,m),a[m]=d,g))for(v in r)_[v]||i(_,v,r[v],!0)}},function(t,e,n){"use strict";var r=n(32),o=n(70),i=n(16),u=n(8);t.exports=n(45)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){n(72),t.exports=n(1).String.includes},function(t,e,n){"use strict";var r=n(3),o=n(73);r(r.P+r.F*n(75)("includes"),"String",{includes:function(t){return!!~o(this,t,"includes").indexOf(t,arguments.length>1?arguments[1]:void 0)}})},function(t,e,n){var r=n(74),o=n(20);t.exports=function(t,e,n){if(r(e))throw TypeError("String#"+n+" doesn't accept regex!");return String(o(t))}},function(t,e,n){var r=n(7),o=n(19),i=n(0)("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==o(t))}},function(t,e,n){var r=n(0)("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[r]=!1,!"/./"[t](e)}catch(t){}}return!0}},function(t,e,n){n(77),t.exports=n(1).Object.values},function(t,e,n){var r=n(3),o=n(78)(!1);r(r.S,"Object",{values:function(t){return o(t)}})},function(t,e,n){var r=n(15),o=n(8),i=n(21).f;t.exports=function(t){return function(e){for(var n,u=o(e),s=r(u),a=s.length,c=0,l=[];a>c;)i.call(u,n=s[c++])&&l.push(t?[n,u[n]]:u[n]);return l}}},function(t,e,n){n(80),t.exports=n(1).Array.find},function(t,e,n){"use strict";var r=n(3),o=n(33)(5),i=!0;"find"in[]&&Array(1).find(function(){i=!1}),r(r.P+r.F*i,"Array",{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),n(32)("find")},function(t,e,n){var r=n(82);t.exports=function(t,e){return new(r(t))(e)}},function(t,e,n){var r=n(7),o=n(40),i=n(0)("species");t.exports=function(t){var e;return o(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!o(e.prototype)||(e=void 0),r(e)&&null===(e=e[i])&&(e=void 0)),void 0===e?Array:e}},function(t,e,n){n(44),n(84),t.exports=n(1).Array.from},function(t,e,n){"use strict";var r=n(23),o=n(3),i=n(31),u=n(85),s=n(86),a=n(27),c=n(87),l=n(88);o(o.S+o.F*!n(89)(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,o,f,d=i(t),p="function"==typeof this?this:Array,h=arguments.length,y=h>1?arguments[1]:void 0,v=void 0!==y,m=0,g=l(d);if(v&&(y=r(y,h>2?arguments[2]:void 0,2)),void 0==g||p==Array&&s(g))for(e=a(d.length),n=new p(e);e>m;m++)c(n,m,v?y(d[m],m):d[m]);else for(f=g.call(d),n=new p;!(o=f.next()).done;m++)c(n,m,v?u(f,y,[o.value,m],!0):o.value);return n.length=m,n}})},function(t,e,n){var r=n(11);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&r(i.call(t)),e}}},function(t,e,n){var r=n(16),o=n(0)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},function(t,e,n){"use strict";var r=n(6),o=n(12);t.exports=function(t,e,n){e in t?r.f(t,e,o(0,n)):t[e]=n}},function(t,e,n){var r=n(43),o=n(0)("iterator"),i=n(16);t.exports=n(1).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[r(t)]}},function(t,e,n){var r=n(0)("iterator"),o=!1;try{var i=[7][r]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i=[7],u=i[r]();u.next=function(){return{done:n=!0}},i[r]=function(){return u},t(i)}catch(t){}return n}},function(t,e,n){n(91),t.exports=n(1).Array.includes},function(t,e,n){"use strict";var r=n(3),o=n(38)(!0);r(r.P,"Array",{includes:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),n(32)("includes")},function(t,e,n){n(93),t.exports=n(1).Array.map},function(t,e,n){"use strict";var r=n(3),o=n(33)(1);r(r.P+r.F*!n(46)([].map,!0),"Array",{map:function(t){return o(this,t,arguments[1])}})},function(t,e,n){n(95),t.exports=n(1).Array.filter},function(t,e,n){"use strict";var r=n(3),o=n(33)(2);r(r.P+r.F*!n(46)([].filter,!0),"Array",{filter:function(t){return o(this,t,arguments[1])}})},function(t,e,n){"use strict";function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){o(t,e,n[e])})}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e,n){return e&&u(t.prototype,e),n&&u(t,n),t}n.d(e,"a",function(){return c});var a=n(47),c=function(){function t(e){var n=e.addressFormConfigurations,r=e.widgetConfig,o=e.formFieldChangeEventToDispatch,u=e.countryChangeEventToListenFor;i(this,t),this.version="1.5.0",this.formHelpers=[],this.addressFormConfigurations=n,this.widgetConfig=r,this.formFieldChangeEventToDispatch=o,this.countryChangeEventToListenFor=u,this.identifiedFormHelperConfig=[],this.reload=this.reload.bind(this),this.loadFormHelpers()}return s(t,[{key:"reload",value:function(t){this._areAllElementsStillInTheDOM()||(this.identifiedFormHelperConfig=[],this.addressFormConfigurations=t,this.loadFormHelpers())}},{key:"loadFormHelpers",value:function(){this.formHelpers.forEach(function(t){return t.destroy()}),this.identifiedAddressFormConfigurations=[],this.formHelpers=[],this._identifyAddressForms(),this.identifiedAddressFormConfigurations.forEach(this._initialiseFormHelper.bind(this))}},{key:"_getCurrentCountryValue",value:function(t){var e=null;return["nz","au"].forEach(function(n){t.countryElement.value===t[n].countryValue&&(e=n)}),e}},{key:"_areAllElementsStillInTheDOM",value:function(){var t=this;return 0!==this.identifiedFormHelperConfig.length&&this.identifiedFormHelperConfig.every(function(e){if(!t._identifyingElementsPresentAndVisible(e))return!1;if(!document.body.contains(e.countryElement))return!1;var n=t._getCurrentCountryValue(e);return!!t._areAllElementsStillInTheDOMForCountryCode(e,n)})}},{key:"_areAllElementsStillInTheDOMForCountryCode",value:function(t,e){return!!e&&Object.values(t[e].elements).every(function(t){return null!==t&&document.body.contains(t)})}},{key:"_identifyingElementsPresentAndVisible",value:function(t){return t.layoutSelectors.every(function(t){var e=document.querySelector(t);return null!==e&&"none"!==e.style.display})}},{key:"_identifyAddressForms",value:function(){var t=!0,e=!1,n=void 0;try{for(var r,o=this.addressFormConfigurations[Symbol.iterator]();!(t=(r=o.next()).done);t=!0){var i=r.value;this._identifyingElementsPresentAndVisible(i)&&(this.log("Identified layout named: ".concat(i.label)),this.identifiedAddressFormConfigurations.push(i))}}catch(t){e=!0,n=t}finally{try{t||null==o.return||o.return()}finally{if(e)throw n}}}},{key:"_initialiseFormHelper",value:function(t){if(document.querySelector(t.searchIdentifier)){var e={countryElement:document.querySelector(t.countryIdentifier),searchElement:document.querySelector(t.searchIdentifier),label:t.label,layoutSelectors:t.layoutSelectors,nz:{countryValue:t.nz.countryValue,elements:{address_line_1:document.querySelector(t.nz.elements.address1),suburb:document.querySelector(t.nz.elements.suburb),city:document.querySelector(t.nz.elements.city),region:document.querySelector(t.nz.elements.region),postcode:document.querySelector(t.nz.elements.postcode)},regionMappings:t.nz.regionMappings},au:{countryValue:t.au.countryValue,elements:{address_line_1:document.querySelector(t.au.elements.address1),address_line_2:document.querySelector(t.au.elements.address2),locality_name:document.querySelector(t.au.elements.suburb),state_territory:document.querySelector(t.au.elements.state),postcode:document.querySelector(t.au.elements.postcode)},stateMappings:t.au.stateMappings}};t.nz.elements.address2&&(e.nz.elements=r({address_line_2:document.querySelector(t.nz.elements.address2)},e.nz.elements)),this.identifiedFormHelperConfig.push(e);var n=new a.a(this.widgetConfig,e,this.formFieldChangeEventToDispatch,this.countryChangeEventToListenFor);this.formHelpers.push(n)}}},{key:"log",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.widgetConfig.debug&&window.console&&(void 0!=e?console.log("".concat(t),e):console.log("".concat(t)))}}]),t}()},function(t,e,n){"use strict";function r(t){return u(t)||i(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function i(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function u(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}n.d(e,"a",function(){return l});var l=function(){function t(e){var n=e.widgetConfig,r=e.mutationEventHandler,o=e.ignoredClass;s(this,t),this.widgetConfig=n,this.mutationEventHandler=r,this.ignoredClass=o,this.millisecondsToIgnoreMutations=750,this.maxMutationTimeoutCount=20,this.mutationTimeoutCount=0,this.monitorMutations()}return c(t,[{key:"monitorMutations",value:function(){if(window.MutationObserver){new MutationObserver(this._mutationHandler.bind(this)).observe(document.body,{childList:!0,subtree:!0})}else window.addEventListener?(document.body.addEventListener("DOMNodeInserted",this._domNodeModifiedHandler.bind(this),!1),document.body.addEventListener("DOMNodeRemoved",this._domNodeModifiedHandler.bind(this),!1)):window.console&&console.info("AddressFinder Error - please use a more modern browser")}},{key:"_mutationHandler",value:function(t){var e=this;t.reduce(function(t,n){return n.target&&n.target.classList&&n.target.classList.contains(e.ignoredClass)?t:t.concat(r(n.addedNodes)).concat(r(n.removedNodes))},[]).find(function(t){return!(t.classList&&t.classList.contains(e.ignoredClass))})&&this._setMutationTimeout()}},{key:"_domNodeModifiedHandler",value:function(t){t.target.className&&t.target.className.includes(this.ignoredClass)||t.relatedNode&&t.relatedNode.className&&t.relatedNode.className.includes(this.ignoredClass)||this._setMutationTimeout()}},{key:"_setMutationTimeout",value:function(){this._mutationTimeout&&(this._monitorExcessiveMutations(),clearTimeout(this._mutationTimeout)),this._mutationTimeout=setTimeout(function(){this.mutationTimeoutCount=0,this.mutationEventHandler()}.bind(this),this.millisecondsToIgnoreMutations)}},{key:"_monitorExcessiveMutations",value:function(){this.mutationTimeoutCount+=1,this.mutationTimeoutCount===this.maxMutationTimeoutCount&&(this.mutationEventHandler(),this._log("Page is triggering a large amount of mutations, which may prevent AddressFinder from working, and will slow down your store."))}},{key:"_log",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.widgetConfig.debug&&window.console&&(void 0!=e?console.log("".concat(t),e):console.log("".concat(t)))}}]),t}()}])});

/***/ })
/******/ ]);
//# sourceMappingURL=addressfinder.js.map