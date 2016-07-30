/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _session = __webpack_require__(1);

	var _session2 = _interopRequireDefault(_session);

	var _app = __webpack_require__(7);

	var _app2 = _interopRequireDefault(_app);

	__webpack_require__(40);

	__webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_session2.default.initSession().then(function () {
	  _app2.default.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	var _main = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  _currentUser: null,

	  setCurrentUser: function setCurrentUser(user) {
	    this._currentUser = user;
	    if (user) {
	      (0, _jquery2.default)('body').addClass('theme-' + user.background);
	    }
	  },
	  getCurrentUser: function getCurrentUser() {
	    return this._currentUser;
	  },
	  isAuthenticated: function isAuthenticated() {
	    return !!this._currentUser;
	  },
	  login: function login(identification, password) {
	    var self = this;
	    return new Promise(function (resolve, reject) {
	      _jquery2.default.ajax({
	        url: _config2.default.apiEndpoint + '/users/login',
	        method: 'POST',
	        data: {
	          identification: identification,
	          password: password
	        }
	      }).done(function (response) {
	        self.setCurrentUser(response.user);
	        resolve(response.user);
	      }).fail(function (jqXHR) {
	        if (jqXHR.status >= 400) {
	          var errors = jqXHR.responseJSON.errors;
	          reject(errors);
	        }
	      });
	    });
	  },
	  logout: function logout() {
	    var self = this;

	    _jquery2.default.ajax({
	      url: _config2.default.apiEndpoint + '/users/logout',
	      method: 'POST'
	    }).done(function () {
	      self.setCurrentUser(null);
	      _main.router.navigate('login', true);
	    });
	  },
	  initSession: function initSession() {
	    var _this = this;

	    return new Promise(function (resolve, reject) {
	      var self = _this;
	      _jquery2.default.ajax({
	        url: _config2.default.apiEndpoint + '/users/current'
	      }).done(function (response) {
	        self.setCurrentUser(response.user);
	        resolve(response);
	      }).fail(function (error) {
	        reject(error);
	      });
	    });
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*eslint-disable no-unused-vars*/
	/*!
	 * jQuery JavaScript Library v3.1.0
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2016-07-07T21:44Z
	 */
	( function( global, factory ) {

		"use strict";

		if ( typeof module === "object" && typeof module.exports === "object" ) {

			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";

	var arr = [];

	var document = window.document;

	var getProto = Object.getPrototypeOf;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call( Object );

	var support = {};



		function DOMEval( code, doc ) {
			doc = doc || document;

			var script = doc.createElement( "script" );

			script.text = code;
			doc.head.appendChild( script ).parentNode.removeChild( script );
		}
	/* global Symbol */
	// Defining this global in .eslintrc would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module



	var
		version = "3.1.0",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android <=4.0 only
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([a-z])/g,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type( obj );
			return ( type === "number" || type === "string" ) &&

				// parseFloat NaNs numeric-cast false positives ("")
				// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
				// subtraction forces infinities to NaN
				!isNaN( obj - parseFloat( obj ) );
		},

		isPlainObject: function( obj ) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if ( !obj || toString.call( obj ) !== "[object Object]" ) {
				return false;
			}

			proto = getProto( obj );

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if ( !proto ) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
			return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
		},

		isEmptyObject: function( obj ) {

			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;

			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android <=2.3 only (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			DOMEval( code );
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android <=4.0 only
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.3.0
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-01-04
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,

		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
		fcssescape = function( ch, asCodePoint ) {
			if ( asCodePoint ) {

				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if ( ch === "\0" ) {
					return "\uFFFD";
				}

				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
			}

			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		},

		disabledAncestor = addCombinator(
			function( elem ) {
				return elem.disabled === true;
			},
			{ dir: "parentNode", next: "legend" }
		);

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						while ( i-- ) {
							groups[i] = "#" + nid + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created element and returns a boolean result
	 */
	function assert( fn ) {
		var el = document.createElement("fieldset");

		try {
			return !!fn( el );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( el.parentNode ) {
				el.parentNode.removeChild( el );
			}
			// release memory in IE
			el = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				a.sourceIndex - b.sourceIndex;

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for :enabled/:disabled
	 * @param {Boolean} disabled true for :disabled; false for :enabled
	 */
	function createDisabledPseudo( disabled ) {
		// Known :disabled false positives:
		// IE: *[disabled]:not(button, input, select, textarea, optgroup, option, menuitem, fieldset)
		// not IE: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
		return function( elem ) {

			// Check form elements and option elements for explicit disabling
			return "label" in elem && elem.disabled === disabled ||
				"form" in elem && elem.disabled === disabled ||

				// Check non-disabled form elements for fieldset[disabled] ancestors
				"form" in elem && elem.disabled === false && (
					// Support: IE6-11+
					// Ancestry is covered for us
					elem.isDisabled === disabled ||

					// Otherwise, assume any non-<option> under fieldset[disabled] is disabled
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						("label" in elem || !disabledAncestor( elem )) !== disabled
				);
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, subWindow,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( preferredDoc !== document &&
			(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

			// Support: IE 11, Edge
			if ( subWindow.addEventListener ) {
				subWindow.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( subWindow.attachEvent ) {
				subWindow.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( el ) {
			el.className = "i";
			return !el.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( el ) {
			el.appendChild( document.createComment("") );
			return !el.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programmatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( el ) {
			docElem.appendChild( el ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See https://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( el ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// https://bugs.jquery.com/ticket/12359
				docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( el.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !el.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !el.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibling-combinator selector` fails
				if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( el ) {
				el.innerHTML = "<a href='' disabled='disabled'></a>" +
					"<select disabled='disabled'><option/></select>";

				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				el.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( el.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( el.querySelectorAll(":enabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Support: IE9-11+
				// IE's :disabled selector does not pick up the children of disabled fieldsets
				docElem.appendChild( el ).disabled = true;
				if ( el.querySelectorAll(":disabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				el.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( el ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( el, "*" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( el, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.escape = function( sel ) {
		return (sel + "").replace( rcssescape, fcssescape );
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": createDisabledPseudo( false ),
			"disabled": createDisabledPseudo( true ),

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			skip = combinator.next,
			key = skip || dir,
			checkNonElements = base && key === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( skip && skip === elem.nodeName.toLowerCase() ) {
								elem = elem[ dir ] || elem;
							} else if ( (oldCache = uniqueCache[ key ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ key ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( el ) {
		// Should return 1, but returns 4 (following)
		return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( el ) {
		el.innerHTML = "<a href='#'></a>";
		return el.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( el ) {
		el.innerHTML = "<input/>";
		el.firstChild.setAttribute( "value", "" );
		return el.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( el ) {
		return el.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;

	// Deprecated
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;




	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				return !!qualifier.call( elem, i, elem ) !== not;
			} );

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i, ret,
				len = this.length,
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			ret = this.pushStack( [] );

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			return len > 1 ? jQuery.uniqueSort( ret ) : ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		// Shortcut simple #id case for speed
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						if ( elem ) {

							// Inject the element directly into the jQuery object
							this[ 0 ] = elem;
							this.length = 1;
						}
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				targets = typeof selectors !== "string" && jQuery( selectors );

			// Positional selectors never match, since there's no _selection_ context
			if ( !rneedsContext.test( selectors ) ) {
				for ( ; i < l; i++ ) {
					for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

						// Always skip document fragments
						if ( cur.nodeType < 11 && ( targets ?
							targets.index( cur ) > -1 :

							// Don't pass non-elements to Sizzle
							cur.nodeType === 1 &&
								jQuery.find.matchesSelector( cur, selectors ) ) ) {

							matched.push( cur );
							break;
						}
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory && !firing ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	function Identity( v ) {
		return v;
	}
	function Thrower( ex ) {
		throw ex;
	}

	function adoptValue( value, resolve, reject ) {
		var method;

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
				method.call( value ).done( resolve ).fail( reject );

			// Other thenables
			} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
				method.call( value, resolve, reject );

			// Other non-thenables
			} else {

				// Support: Android 4.0 only
				// Strict mode functions invoked without .call/.apply get global-object context
				resolve.call( undefined, value );
			}

		// For Promises/A+, convert exceptions into rejections
		// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
		// Deferred#then to conditionally suppress rejection.
		} catch ( value ) {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.call( undefined, value );
		}
	}

	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, callbacks,
					// ... .then handlers, argument index, [final state]
					[ "notify", "progress", jQuery.Callbacks( "memory" ),
						jQuery.Callbacks( "memory" ), 2 ],
					[ "resolve", "done", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 0, "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 1, "rejected" ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					"catch": function( fn ) {
						return promise.then( null, fn );
					},

					// Keep pipe for back-compat
					pipe: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;

						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {

								// Map tuples (progress, done, fail) to arguments (done, fail, progress)
								var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

								// deferred.progress(function() { bind to newDefer or newDefer.notify })
								// deferred.done(function() { bind to newDefer or newDefer.resolve })
								// deferred.fail(function() { bind to newDefer or newDefer.reject })
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
					then: function( onFulfilled, onRejected, onProgress ) {
						var maxDepth = 0;
						function resolve( depth, deferred, handler, special ) {
							return function() {
								var that = this,
									args = arguments,
									mightThrow = function() {
										var returned, then;

										// Support: Promises/A+ section 2.3.3.3.3
										// https://promisesaplus.com/#point-59
										// Ignore double-resolution attempts
										if ( depth < maxDepth ) {
											return;
										}

										returned = handler.apply( that, args );

										// Support: Promises/A+ section 2.3.1
										// https://promisesaplus.com/#point-48
										if ( returned === deferred.promise() ) {
											throw new TypeError( "Thenable self-resolution" );
										}

										// Support: Promises/A+ sections 2.3.3.1, 3.5
										// https://promisesaplus.com/#point-54
										// https://promisesaplus.com/#point-75
										// Retrieve `then` only once
										then = returned &&

											// Support: Promises/A+ section 2.3.4
											// https://promisesaplus.com/#point-64
											// Only check objects and functions for thenability
											( typeof returned === "object" ||
												typeof returned === "function" ) &&
											returned.then;

										// Handle a returned thenable
										if ( jQuery.isFunction( then ) ) {

											// Special processors (notify) just wait for resolution
											if ( special ) {
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special )
												);

											// Normal processors (resolve) also hook into progress
											} else {

												// ...and disregard older resolution values
												maxDepth++;

												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special ),
													resolve( maxDepth, deferred, Identity,
														deferred.notifyWith )
												);
											}

										// Handle all other returned values
										} else {

											// Only substitute handlers pass on context
											// and multiple values (non-spec behavior)
											if ( handler !== Identity ) {
												that = undefined;
												args = [ returned ];
											}

											// Process the value(s)
											// Default process is resolve
											( special || deferred.resolveWith )( that, args );
										}
									},

									// Only normal processors (resolve) catch and reject exceptions
									process = special ?
										mightThrow :
										function() {
											try {
												mightThrow();
											} catch ( e ) {

												if ( jQuery.Deferred.exceptionHook ) {
													jQuery.Deferred.exceptionHook( e,
														process.stackTrace );
												}

												// Support: Promises/A+ section 2.3.3.3.4.1
												// https://promisesaplus.com/#point-61
												// Ignore post-resolution exceptions
												if ( depth + 1 >= maxDepth ) {

													// Only substitute handlers pass on context
													// and multiple values (non-spec behavior)
													if ( handler !== Thrower ) {
														that = undefined;
														args = [ e ];
													}

													deferred.rejectWith( that, args );
												}
											}
										};

								// Support: Promises/A+ section 2.3.3.3.1
								// https://promisesaplus.com/#point-57
								// Re-resolve promises immediately to dodge false rejection from
								// subsequent errors
								if ( depth ) {
									process();
								} else {

									// Call an optional hook to record the stack, in case of exception
									// since it's otherwise lost when execution goes async
									if ( jQuery.Deferred.getStackHook ) {
										process.stackTrace = jQuery.Deferred.getStackHook();
									}
									window.setTimeout( process );
								}
							};
						}

						return jQuery.Deferred( function( newDefer ) {

							// progress_handlers.add( ... )
							tuples[ 0 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onProgress ) ?
										onProgress :
										Identity,
									newDefer.notifyWith
								)
							);

							// fulfilled_handlers.add( ... )
							tuples[ 1 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onFulfilled ) ?
										onFulfilled :
										Identity
								)
							);

							// rejected_handlers.add( ... )
							tuples[ 2 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onRejected ) ?
										onRejected :
										Thrower
								)
							);
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 5 ];

				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(
						function() {

							// state = "resolved" (i.e., fulfilled)
							// state = "rejected"
							state = stateString;
						},

						// rejected_callbacks.disable
						// fulfilled_callbacks.disable
						tuples[ 3 - i ][ 2 ].disable,

						// progress_callbacks.lock
						tuples[ 0 ][ 2 ].lock
					);
				}

				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add( tuple[ 3 ].fire );

				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
					return this;
				};

				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( singleValue ) {
			var

				// count of uncompleted subordinates
				remaining = arguments.length,

				// count of unprocessed arguments
				i = remaining,

				// subordinate fulfillment data
				resolveContexts = Array( i ),
				resolveValues = slice.call( arguments ),

				// the master Deferred
				master = jQuery.Deferred(),

				// subordinate callback factory
				updateFunc = function( i ) {
					return function( value ) {
						resolveContexts[ i ] = this;
						resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( !( --remaining ) ) {
							master.resolveWith( resolveContexts, resolveValues );
						}
					};
				};

			// Single- and empty arguments are adopted like Promise.resolve
			if ( remaining <= 1 ) {
				adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if ( master.state() === "pending" ||
					jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

					return master.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while ( i-- ) {
				adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
			}

			return master.promise();
		}
	} );


	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	jQuery.Deferred.exceptionHook = function( error, stack ) {

		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
			window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
		}
	};




	jQuery.readyException = function( error ) {
		window.setTimeout( function() {
			throw error;
		} );
	};




	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();

	jQuery.fn.ready = function( fn ) {

		readyList
			.then( fn )

			// Wrap jQuery.readyException in a function so that the lookup
			// happens at the time of error handling instead of callback
			// registration.
			.catch( function( error ) {
				jQuery.readyException( error );
			} );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
		}
	} );

	jQuery.ready.then = readyList.then;

	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if ( document.readyState === "complete" ||
		( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout( jQuery.ready );

	} else {

		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", completed );

		// A fallback to window.onload, that will always work
		window.addEventListener( "load", completed );
	}




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache: function( owner ) {

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if ( typeof data === "string" ) {
				cache[ jQuery.camelCase( data ) ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ jQuery.camelCase( prop ) ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :

				// Always use camelCase key (gh-2257)
				owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
		},
		access: function( owner, key, value ) {

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				return this.get( owner, key );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key !== undefined ) {

				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {

					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map( jQuery.camelCase );
				} else {
					key = jQuery.camelCase( key );

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ?
						[ key ] :
						( key.match( rnotwhite ) || [] );
				}

				i = key.length;

				while ( i-- ) {
					delete cache[ key[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :

						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? JSON.parse( data ) :
						data;
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each( function() {

					// We always store the camelCased key
					dataUser.set( this, key, value );
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHiddenWithinTree = function( elem, el ) {

			// isHiddenWithinTree might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;

			// Inline style trumps all
			return elem.style.display === "none" ||
				elem.style.display === "" &&

				// Otherwise, check computed style
				// Support: Firefox <=43 - 45
				// Disconnected elements can have computed display: none, so first confirm that elem is
				// in the document.
				jQuery.contains( elem.ownerDocument, elem ) &&

				jQuery.css( elem, "display" ) === "none";
		};

	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};




	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() {
					return tween.cur();
				} :
				function() {
					return jQuery.css( elem, prop, "" );
				},
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}


	var defaultDisplayMap = {};

	function getDefaultDisplay( elem ) {
		var temp,
			doc = elem.ownerDocument,
			nodeName = elem.nodeName,
			display = defaultDisplayMap[ nodeName ];

		if ( display ) {
			return display;
		}

		temp = doc.body.appendChild( doc.createElement( nodeName ) ),
		display = jQuery.css( temp, "display" );

		temp.parentNode.removeChild( temp );

		if ( display === "none" ) {
			display = "block";
		}
		defaultDisplayMap[ nodeName ] = display;

		return display;
	}

	function showHide( elements, show ) {
		var display, elem,
			values = [],
			index = 0,
			length = elements.length;

		// Determine new display value for elements that need to change
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			display = elem.style.display;
			if ( show ) {

				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if ( display === "none" ) {
					values[ index ] = dataPriv.get( elem, "display" ) || null;
					if ( !values[ index ] ) {
						elem.style.display = "";
					}
				}
				if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
					values[ index ] = getDefaultDisplay( elem );
				}
			} else {
				if ( display !== "none" ) {
					values[ index ] = "none";

					// Remember what we're overwriting
					dataPriv.set( elem, "display", display );
				}
			}
		}

		// Set the display of the elements in a second loop to avoid constant reflow
		for ( index = 0; index < length; index++ ) {
			if ( values[ index ] != null ) {
				elements[ index ].style.display = values[ index ];
			}
		}

		return elements;
	}

	jQuery.fn.extend( {
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHiddenWithinTree( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE <=9 only
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();
	var documentElement = document.documentElement;



	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if ( selector ) {
				jQuery.find.matchesSelector( documentElement, selector );
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( nativeEvent ) {

			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix( nativeEvent );

			var i, j, ret, matched, handleObj, handlerQueue,
				args = new Array( arguments.length ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;

			for ( i = 1; i < arguments.length; i++ ) {
				args[ i ] = arguments[ i ];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Support: IE <=9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox <=42
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		addProp: function( name, hook ) {
			Object.defineProperty( jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: jQuery.isFunction( hook ) ?
					function() {
						if ( this.originalEvent ) {
								return hook( this.originalEvent );
						}
					} :
					function() {
						if ( this.originalEvent ) {
								return this.originalEvent[ name ];
						}
					},

				set: function( value ) {
					Object.defineProperty( this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					} );
				}
			} );
		},

		fix: function( originalEvent ) {
			return originalEvent[ jQuery.expando ] ?
				originalEvent :
				new jQuery.Event( originalEvent );
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android <=2.3 only
					src.returnValue === false ?
				returnTrue :
				returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = ( src.target && src.target.nodeType === 3 ) ?
				src.target.parentNode :
				src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each( {
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,

		which: function( event ) {
			var button = event.button;

			// Add which for key events
			if ( event.which == null && rkeyEvent.test( event.type ) ) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
				return ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event.which;
		}
	}, jQuery.event.addProp );

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {

		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var

		/* eslint-disable max-len */

		// See https://github.com/eslint/eslint/issues/3229
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

		/* eslint-enable */

		// Support: IE <=10 - 11, Edge 12 - 13
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	function manipulationTarget( elem, content ) {
		if ( jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

			return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {
		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view || !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};



	( function() {

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {

			// This is a singleton, we need to execute it only once
			if ( !div ) {
				return;
			}

			div.style.cssText =
				"box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";

			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );

			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		jQuery.extend( support, {
			pixelPosition: function() {
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {
				computeStyleTests();
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {
				computeStyleTests();
				return reliableMarginLeftVal;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// Support: IE <=9 only
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE <=9 - 11 only
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?

			// If we already have the right measurement, avoid augmentation
			4 :

			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var val,
			valueIsBorderBox = true,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Support: IE <=11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = elem.getBoundingClientRect()[ name ];
		}

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					style[ name ] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

						// Support: Safari 8+
						// Table columns in Safari have non-zero offsetWidth & zero
						// getBoundingClientRect().width unless display is changed.
						// Support: IE <=11 only
						// Running getBoundingClientRect on a disconnected node
						// in IE throws an error.
						( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	function raf() {
		if ( timerId ) {
			window.requestAnimationFrame( raf );
			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
			isBox = "width" in props || "height" in props,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHiddenWithinTree( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Queue-skipping animations hijack the fx hooks
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Detect show/hide animations
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.test( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;

					// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject( props );
		if ( !propTween && jQuery.isEmptyObject( orig ) ) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if ( isBox && elem.nodeType === 1 ) {

			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if ( restoreDisplay == null ) {
				restoreDisplay = dataPriv.get( elem, "display" );
			}
			display = jQuery.css( elem, "display" );
			if ( display === "none" ) {
				if ( restoreDisplay ) {
					display = restoreDisplay;
				} else {

					// Get nonempty value(s) by temporarily forcing visibility
					showHide( [ elem ], true );
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css( elem, "display" );
					showHide( [ elem ] );
				}
			}

			// Animate inline elements as inline-block
			if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
				if ( jQuery.css( elem, "float" ) === "none" ) {

					// Restore the original display value at the end of pure show/hide animations
					if ( !propTween ) {
						anim.done( function() {
							style.display = restoreDisplay;
						} );
						if ( restoreDisplay == null ) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// Implement show/hide animations
		propTween = false;
		for ( prop in orig ) {

			// General show/hide setup for this element animation
			if ( !propTween ) {
				if ( dataShow ) {
					if ( "hidden" in dataShow ) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if ( toggle ) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if ( hidden ) {
					showHide( [ elem ], true );
				}

				/* eslint-disable no-loop-func */

				anim.done( function() {

				/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if ( !hidden ) {
						showHide( [ elem ] );
					}
					dataPriv.remove( elem, "fxshow" );
					for ( prop in orig ) {
						jQuery.style( elem, prop, orig[ prop ] );
					}
				} );
			}

			// Per-property setup
			propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = propTween.start;
				if ( hidden ) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3 only
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {

		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		// Go to the end state if fx are off or if document is hidden
		if ( jQuery.fx.off || document.hidden ) {
			opt.duration = 0;

		} else {
			opt.duration = typeof opt.duration === "number" ?
				opt.duration : opt.duration in jQuery.fx.speeds ?
					jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.requestAnimationFrame ?
				window.requestAnimationFrame( raf ) :
				window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		if ( window.cancelAnimationFrame ) {
			window.cancelAnimationFrame( timerId );
		} else {
			window.clearInterval( timerId );
		}

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};

	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle,
				lowercaseName = name.toLowerCase();

			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ lowercaseName ];
				attrHandle[ lowercaseName ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					lowercaseName :
					null;
				attrHandle[ lowercaseName ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;

					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




	var rclass = /[\t\r\n\f]/g;

	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g,
		rspaces = /[\x20\t\r\n\f]+/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

						// Handle most common string cases
						ret.replace( rreturn, "" ) :

						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :

						// Support: IE <=10 - 11 only
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one",
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								!option.disabled &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];

						/* eslint-disable no-cond-assign */

						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}

						/* eslint-enable no-cond-assign */
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);

			jQuery.event.trigger( e, null, elem );
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, valueOrFunction ) {

				// If value is a function, invoke it and use its return value
				var value = jQuery.isFunction( valueOrFunction ) ?
					valueOrFunction() :
					valueOrFunction;

				s[ s.length ] = encodeURIComponent( key ) + "=" +
					encodeURIComponent( value == null ? "" : value );
			};

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	var
		r20 = /%20/g,
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

				// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",

			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": JSON.parse,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// Request state (becomes false upon send and true upon completion)
				completed,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// uncached part of the url
				uncached,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( completed ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return completed ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						if ( completed == null ) {
							name = requestHeadersNames[ name.toLowerCase() ] =
								requestHeadersNames[ name.toLowerCase() ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( completed == null ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( completed ) {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							} else {

								// Lazy-add the new callbacks in a way that preserves old ones
								for ( code in map ) {
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR );

			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( completed ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace( rhash, "" );

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// Remember the hash so we can put it back
				uncached = s.url.slice( cacheURL.length );

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in uncached url if needed
				if ( s.cache === false ) {
					cacheURL = cacheURL.replace( rts, "" );
					uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;

			// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if ( s.data && s.processData &&
				( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
				s.data = s.data.replace( r20, "+" );
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			completeDeferred.add( s.complete );
			jqXHR.done( s.success );
			jqXHR.fail( s.error );

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( completed ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					completed = false;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Rethrow post-completion exceptions
					if ( completed ) {
						throw e;
					}

					// Propagate others as results
					done( -1, e );
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Ignore repeat invocations
				if ( completed ) {
					return;
				}

				completed = true;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( this[ 0 ] ) {
				if ( jQuery.isFunction( html ) ) {
					html = html.call( this[ 0 ] );
				}

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function( selector ) {
			this.parent( selector ).not( "body" ).each( function() {
				jQuery( this ).replaceWith( this.childNodes );
			} );
			return this;
		}
	} );


	jQuery.expr.pseudos.hidden = function( elem ) {
		return !jQuery.expr.pseudos.visible( elem );
	};
	jQuery.expr.pseudos.visible = function( elem ) {
		return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
	};




	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE <=9 only
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter( function( s ) {
		if ( s.crossDomain ) {
			s.contents.script = false;
		}
	} );

	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();


	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( typeof data !== "string" ) {
			return [];
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}

		var base, parsed, scripts;

		if ( !context ) {

			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if ( support.createHTMLDocument ) {
				context = document.implementation.createHTMLDocument( "" );

				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement( "base" );
				base.href = document.location.href;
				context.head.appendChild( base );
			} else {
				context = document;
			}
		}

		parsed = rsingleTag.exec( data );
		scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.pseudos.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {
		offset: function( options ) {

			// Preserve chaining for setter
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var docElem, win, rect, doc,
				elem = this[ 0 ];

			if ( !elem ) {
				return;
			}

			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if ( !elem.getClientRects().length ) {
				return { top: 0, left: 0 };
			}

			rect = elem.getBoundingClientRect();

			// Make sure element is not hidden (display: none)
			if ( rect.width || rect.height ) {
				doc = elem.ownerDocument;
				win = getWindow( doc );
				docElem = doc.documentElement;

				return {
					top: rect.top + win.pageYOffset - docElem.clientTop,
					left: rect.left + win.pageXOffset - docElem.clientLeft
				};
			}

			// Return zeros for disconnected and hidden elements (gh-2310)
			return rect;
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
					left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
				};
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {

						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf( "outer" ) === 0 ?
							elem[ "inner" + name ] :
							elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable );
			};
		} );
	} );


	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		}
	} );

	jQuery.parseJSON = JSON.parse;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}





	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}


	return jQuery;
	} );


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  apiEndpoint: '/api'
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.router = undefined;
	exports.startRouter = startRouter;

	var _backbone = __webpack_require__(5);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _app = __webpack_require__(7);

	var _app2 = _interopRequireDefault(_app);

	var _session = __webpack_require__(1);

	var _session2 = _interopRequireDefault(_session);

	var _component = __webpack_require__(48);

	var _component2 = _interopRequireDefault(_component);

	var _component3 = __webpack_require__(14);

	var _component4 = _interopRequireDefault(_component3);

	var _component5 = __webpack_require__(16);

	var _component6 = _interopRequireDefault(_component5);

	var _component7 = __webpack_require__(18);

	var _component8 = _interopRequireDefault(_component7);

	var _component9 = __webpack_require__(38);

	var _component10 = _interopRequireDefault(_component9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Router = _backbone2.default.Router.extend({
	  initialize: function initialize(options) {
	    this.app = options.app;
	    this.baseView = this.app.getBaseView();
	  },


	  routes: {
	    '': 'landing',
	    login: 'login',
	    register: 'register',
	    dashboard: 'dashboard',
	    forum: 'forum'
	  },

	  showContentWrappedPage: function showContentWrappedPage(page) {
	    this.contentView = this.contentView || new _component2.default();
	    this.baseView.showChildView('main', this.contentView);
	    this.contentView.showChildView('content', page);
	  },
	  changePage: function changePage(page) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    if (options.authenticated && !_session2.default.isAuthenticated()) {
	      this.navigate('login', true);
	      return;
	    }
	    if (options.wrapped) {
	      this.showContentWrappedPage(page);
	    } else {
	      this.baseView.showChildView('main', page);
	    }
	  },
	  landing: function landing() {
	    var forumView = new _component8.default();
	    this.changePage(forumView, {
	      authenticated: true
	    });
	  },
	  login: function login() {
	    var loginView = new _component4.default();
	    this.changePage(loginView);
	  },
	  register: function register() {
	    var registerView = new _component6.default();
	    this.changePage(registerView);
	  },
	  dashboard: function dashboard() {
	    var dashboardView = new _component10.default();
	    this.changePage(dashboardView, {
	      authenticated: true,
	      wrapped: true
	    });
	  },
	  forum: function forum() {
	    var forumView = new _component8.default();
	    this.changePage(forumView, {
	      authenticated: true,
	      wrapped: true
	    });
	  }
	});

	var router = void 0;

	exports.router = router;
	function startRouter() {
	  exports.router = router = new Router({ app: _app2.default });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {//     Backbone.js 1.3.3

	//     (c) 2010-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Backbone may be freely distributed under the MIT license.
	//     For all details and documentation:
	//     http://backbonejs.org

	(function(factory) {

	  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
	  // We use `self` instead of `window` for `WebWorker` support.
	  var root = (typeof self == 'object' && self.self === self && self) ||
	            (typeof global == 'object' && global.global === global && global);

	  // Set up Backbone appropriately for the environment. Start with AMD.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(2), exports], __WEBPACK_AMD_DEFINE_RESULT__ = function(_, $, exports) {
	      // Export global even in AMD case in case this script is loaded with
	      // others that may still expect a global Backbone.
	      root.Backbone = factory(root, exports, _, $);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
	  } else if (typeof exports !== 'undefined') {
	    var _ = require('underscore'), $;
	    try { $ = require('jquery'); } catch (e) {}
	    factory(root, exports, _, $);

	  // Finally, as a browser global.
	  } else {
	    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
	  }

	})(function(root, Backbone, _, $) {

	  // Initial Setup
	  // -------------

	  // Save the previous value of the `Backbone` variable, so that it can be
	  // restored later on, if `noConflict` is used.
	  var previousBackbone = root.Backbone;

	  // Create a local reference to a common array method we'll want to use later.
	  var slice = Array.prototype.slice;

	  // Current version of the library. Keep in sync with `package.json`.
	  Backbone.VERSION = '1.3.3';

	  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
	  // the `$` variable.
	  Backbone.$ = $;

	  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
	  // to its previous owner. Returns a reference to this Backbone object.
	  Backbone.noConflict = function() {
	    root.Backbone = previousBackbone;
	    return this;
	  };

	  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
	  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
	  // set a `X-Http-Method-Override` header.
	  Backbone.emulateHTTP = false;

	  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
	  // `application/json` requests ... this will encode the body as
	  // `application/x-www-form-urlencoded` instead and will send the model in a
	  // form param named `model`.
	  Backbone.emulateJSON = false;

	  // Proxy Backbone class methods to Underscore functions, wrapping the model's
	  // `attributes` object or collection's `models` array behind the scenes.
	  //
	  // collection.filter(function(model) { return model.get('age') > 10 });
	  // collection.each(this.addView);
	  //
	  // `Function#apply` can be slow so we use the method's arg count, if we know it.
	  var addMethod = function(length, method, attribute) {
	    switch (length) {
	      case 1: return function() {
	        return _[method](this[attribute]);
	      };
	      case 2: return function(value) {
	        return _[method](this[attribute], value);
	      };
	      case 3: return function(iteratee, context) {
	        return _[method](this[attribute], cb(iteratee, this), context);
	      };
	      case 4: return function(iteratee, defaultVal, context) {
	        return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
	      };
	      default: return function() {
	        var args = slice.call(arguments);
	        args.unshift(this[attribute]);
	        return _[method].apply(_, args);
	      };
	    }
	  };
	  var addUnderscoreMethods = function(Class, methods, attribute) {
	    _.each(methods, function(length, method) {
	      if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
	    });
	  };

	  // Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
	  var cb = function(iteratee, instance) {
	    if (_.isFunction(iteratee)) return iteratee;
	    if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
	    if (_.isString(iteratee)) return function(model) { return model.get(iteratee); };
	    return iteratee;
	  };
	  var modelMatcher = function(attrs) {
	    var matcher = _.matches(attrs);
	    return function(model) {
	      return matcher(model.attributes);
	    };
	  };

	  // Backbone.Events
	  // ---------------

	  // A module that can be mixed in to *any object* in order to provide it with
	  // a custom event channel. You may bind a callback to an event with `on` or
	  // remove with `off`; `trigger`-ing an event fires all callbacks in
	  // succession.
	  //
	  //     var object = {};
	  //     _.extend(object, Backbone.Events);
	  //     object.on('expand', function(){ alert('expanded'); });
	  //     object.trigger('expand');
	  //
	  var Events = Backbone.Events = {};

	  // Regular expression used to split event strings.
	  var eventSplitter = /\s+/;

	  // Iterates over the standard `event, callback` (as well as the fancy multiple
	  // space-separated events `"change blur", callback` and jQuery-style event
	  // maps `{event: callback}`).
	  var eventsApi = function(iteratee, events, name, callback, opts) {
	    var i = 0, names;
	    if (name && typeof name === 'object') {
	      // Handle event maps.
	      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
	      for (names = _.keys(name); i < names.length ; i++) {
	        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
	      }
	    } else if (name && eventSplitter.test(name)) {
	      // Handle space-separated event names by delegating them individually.
	      for (names = name.split(eventSplitter); i < names.length; i++) {
	        events = iteratee(events, names[i], callback, opts);
	      }
	    } else {
	      // Finally, standard events.
	      events = iteratee(events, name, callback, opts);
	    }
	    return events;
	  };

	  // Bind an event to a `callback` function. Passing `"all"` will bind
	  // the callback to all events fired.
	  Events.on = function(name, callback, context) {
	    return internalOn(this, name, callback, context);
	  };

	  // Guard the `listening` argument from the public API.
	  var internalOn = function(obj, name, callback, context, listening) {
	    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
	      context: context,
	      ctx: obj,
	      listening: listening
	    });

	    if (listening) {
	      var listeners = obj._listeners || (obj._listeners = {});
	      listeners[listening.id] = listening;
	    }

	    return obj;
	  };

	  // Inversion-of-control versions of `on`. Tell *this* object to listen to
	  // an event in another object... keeping track of what it's listening to
	  // for easier unbinding later.
	  Events.listenTo = function(obj, name, callback) {
	    if (!obj) return this;
	    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
	    var listeningTo = this._listeningTo || (this._listeningTo = {});
	    var listening = listeningTo[id];

	    // This object is not listening to any other events on `obj` yet.
	    // Setup the necessary references to track the listening callbacks.
	    if (!listening) {
	      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
	      listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
	    }

	    // Bind callbacks on obj, and keep track of them on listening.
	    internalOn(obj, name, callback, this, listening);
	    return this;
	  };

	  // The reducing API that adds a callback to the `events` object.
	  var onApi = function(events, name, callback, options) {
	    if (callback) {
	      var handlers = events[name] || (events[name] = []);
	      var context = options.context, ctx = options.ctx, listening = options.listening;
	      if (listening) listening.count++;

	      handlers.push({callback: callback, context: context, ctx: context || ctx, listening: listening});
	    }
	    return events;
	  };

	  // Remove one or many callbacks. If `context` is null, removes all
	  // callbacks with that function. If `callback` is null, removes all
	  // callbacks for the event. If `name` is null, removes all bound
	  // callbacks for all events.
	  Events.off = function(name, callback, context) {
	    if (!this._events) return this;
	    this._events = eventsApi(offApi, this._events, name, callback, {
	      context: context,
	      listeners: this._listeners
	    });
	    return this;
	  };

	  // Tell this object to stop listening to either specific events ... or
	  // to every object it's currently listening to.
	  Events.stopListening = function(obj, name, callback) {
	    var listeningTo = this._listeningTo;
	    if (!listeningTo) return this;

	    var ids = obj ? [obj._listenId] : _.keys(listeningTo);

	    for (var i = 0; i < ids.length; i++) {
	      var listening = listeningTo[ids[i]];

	      // If listening doesn't exist, this object is not currently
	      // listening to obj. Break out early.
	      if (!listening) break;

	      listening.obj.off(name, callback, this);
	    }

	    return this;
	  };

	  // The reducing API that removes a callback from the `events` object.
	  var offApi = function(events, name, callback, options) {
	    if (!events) return;

	    var i = 0, listening;
	    var context = options.context, listeners = options.listeners;

	    // Delete all events listeners and "drop" events.
	    if (!name && !callback && !context) {
	      var ids = _.keys(listeners);
	      for (; i < ids.length; i++) {
	        listening = listeners[ids[i]];
	        delete listeners[listening.id];
	        delete listening.listeningTo[listening.objId];
	      }
	      return;
	    }

	    var names = name ? [name] : _.keys(events);
	    for (; i < names.length; i++) {
	      name = names[i];
	      var handlers = events[name];

	      // Bail out if there are no events stored.
	      if (!handlers) break;

	      // Replace events if there are any remaining.  Otherwise, clean up.
	      var remaining = [];
	      for (var j = 0; j < handlers.length; j++) {
	        var handler = handlers[j];
	        if (
	          callback && callback !== handler.callback &&
	            callback !== handler.callback._callback ||
	              context && context !== handler.context
	        ) {
	          remaining.push(handler);
	        } else {
	          listening = handler.listening;
	          if (listening && --listening.count === 0) {
	            delete listeners[listening.id];
	            delete listening.listeningTo[listening.objId];
	          }
	        }
	      }

	      // Update tail event if the list has any events.  Otherwise, clean up.
	      if (remaining.length) {
	        events[name] = remaining;
	      } else {
	        delete events[name];
	      }
	    }
	    return events;
	  };

	  // Bind an event to only be triggered a single time. After the first time
	  // the callback is invoked, its listener will be removed. If multiple events
	  // are passed in using the space-separated syntax, the handler will fire
	  // once for each event, not once for a combination of all events.
	  Events.once = function(name, callback, context) {
	    // Map the event into a `{event: once}` object.
	    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
	    if (typeof name === 'string' && context == null) callback = void 0;
	    return this.on(events, callback, context);
	  };

	  // Inversion-of-control versions of `once`.
	  Events.listenToOnce = function(obj, name, callback) {
	    // Map the event into a `{event: once}` object.
	    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
	    return this.listenTo(obj, events);
	  };

	  // Reduces the event callbacks into a map of `{event: onceWrapper}`.
	  // `offer` unbinds the `onceWrapper` after it has been called.
	  var onceMap = function(map, name, callback, offer) {
	    if (callback) {
	      var once = map[name] = _.once(function() {
	        offer(name, once);
	        callback.apply(this, arguments);
	      });
	      once._callback = callback;
	    }
	    return map;
	  };

	  // Trigger one or many events, firing all bound callbacks. Callbacks are
	  // passed the same arguments as `trigger` is, apart from the event name
	  // (unless you're listening on `"all"`, which will cause your callback to
	  // receive the true name of the event as the first argument).
	  Events.trigger = function(name) {
	    if (!this._events) return this;

	    var length = Math.max(0, arguments.length - 1);
	    var args = Array(length);
	    for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

	    eventsApi(triggerApi, this._events, name, void 0, args);
	    return this;
	  };

	  // Handles triggering the appropriate event callbacks.
	  var triggerApi = function(objEvents, name, callback, args) {
	    if (objEvents) {
	      var events = objEvents[name];
	      var allEvents = objEvents.all;
	      if (events && allEvents) allEvents = allEvents.slice();
	      if (events) triggerEvents(events, args);
	      if (allEvents) triggerEvents(allEvents, [name].concat(args));
	    }
	    return objEvents;
	  };

	  // A difficult-to-believe, but optimized internal dispatch function for
	  // triggering events. Tries to keep the usual cases speedy (most internal
	  // Backbone events have 3 arguments).
	  var triggerEvents = function(events, args) {
	    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
	    switch (args.length) {
	      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
	      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
	      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
	      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
	      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
	    }
	  };

	  // Aliases for backwards compatibility.
	  Events.bind   = Events.on;
	  Events.unbind = Events.off;

	  // Allow the `Backbone` object to serve as a global event bus, for folks who
	  // want global "pubsub" in a convenient place.
	  _.extend(Backbone, Events);

	  // Backbone.Model
	  // --------------

	  // Backbone **Models** are the basic data object in the framework --
	  // frequently representing a row in a table in a database on your server.
	  // A discrete chunk of data and a bunch of useful, related methods for
	  // performing computations and transformations on that data.

	  // Create a new model with the specified attributes. A client id (`cid`)
	  // is automatically generated and assigned for you.
	  var Model = Backbone.Model = function(attributes, options) {
	    var attrs = attributes || {};
	    options || (options = {});
	    this.cid = _.uniqueId(this.cidPrefix);
	    this.attributes = {};
	    if (options.collection) this.collection = options.collection;
	    if (options.parse) attrs = this.parse(attrs, options) || {};
	    var defaults = _.result(this, 'defaults');
	    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
	    this.set(attrs, options);
	    this.changed = {};
	    this.initialize.apply(this, arguments);
	  };

	  // Attach all inheritable methods to the Model prototype.
	  _.extend(Model.prototype, Events, {

	    // A hash of attributes whose current and previous value differ.
	    changed: null,

	    // The value returned during the last failed validation.
	    validationError: null,

	    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
	    // CouchDB users may want to set this to `"_id"`.
	    idAttribute: 'id',

	    // The prefix is used to create the client id which is used to identify models locally.
	    // You may want to override this if you're experiencing name clashes with model ids.
	    cidPrefix: 'c',

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // Return a copy of the model's `attributes` object.
	    toJSON: function(options) {
	      return _.clone(this.attributes);
	    },

	    // Proxy `Backbone.sync` by default -- but override this if you need
	    // custom syncing semantics for *this* particular model.
	    sync: function() {
	      return Backbone.sync.apply(this, arguments);
	    },

	    // Get the value of an attribute.
	    get: function(attr) {
	      return this.attributes[attr];
	    },

	    // Get the HTML-escaped value of an attribute.
	    escape: function(attr) {
	      return _.escape(this.get(attr));
	    },

	    // Returns `true` if the attribute contains a value that is not null
	    // or undefined.
	    has: function(attr) {
	      return this.get(attr) != null;
	    },

	    // Special-cased proxy to underscore's `_.matches` method.
	    matches: function(attrs) {
	      return !!_.iteratee(attrs, this)(this.attributes);
	    },

	    // Set a hash of model attributes on the object, firing `"change"`. This is
	    // the core primitive operation of a model, updating the data and notifying
	    // anyone who needs to know about the change in state. The heart of the beast.
	    set: function(key, val, options) {
	      if (key == null) return this;

	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if (typeof key === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }

	      options || (options = {});

	      // Run validation.
	      if (!this._validate(attrs, options)) return false;

	      // Extract attributes and options.
	      var unset      = options.unset;
	      var silent     = options.silent;
	      var changes    = [];
	      var changing   = this._changing;
	      this._changing = true;

	      if (!changing) {
	        this._previousAttributes = _.clone(this.attributes);
	        this.changed = {};
	      }

	      var current = this.attributes;
	      var changed = this.changed;
	      var prev    = this._previousAttributes;

	      // For each `set` attribute, update or delete the current value.
	      for (var attr in attrs) {
	        val = attrs[attr];
	        if (!_.isEqual(current[attr], val)) changes.push(attr);
	        if (!_.isEqual(prev[attr], val)) {
	          changed[attr] = val;
	        } else {
	          delete changed[attr];
	        }
	        unset ? delete current[attr] : current[attr] = val;
	      }

	      // Update the `id`.
	      if (this.idAttribute in attrs) this.id = this.get(this.idAttribute);

	      // Trigger all relevant attribute changes.
	      if (!silent) {
	        if (changes.length) this._pending = options;
	        for (var i = 0; i < changes.length; i++) {
	          this.trigger('change:' + changes[i], this, current[changes[i]], options);
	        }
	      }

	      // You might be wondering why there's a `while` loop here. Changes can
	      // be recursively nested within `"change"` events.
	      if (changing) return this;
	      if (!silent) {
	        while (this._pending) {
	          options = this._pending;
	          this._pending = false;
	          this.trigger('change', this, options);
	        }
	      }
	      this._pending = false;
	      this._changing = false;
	      return this;
	    },

	    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
	    // if the attribute doesn't exist.
	    unset: function(attr, options) {
	      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
	    },

	    // Clear all attributes on the model, firing `"change"`.
	    clear: function(options) {
	      var attrs = {};
	      for (var key in this.attributes) attrs[key] = void 0;
	      return this.set(attrs, _.extend({}, options, {unset: true}));
	    },

	    // Determine if the model has changed since the last `"change"` event.
	    // If you specify an attribute name, determine if that attribute has changed.
	    hasChanged: function(attr) {
	      if (attr == null) return !_.isEmpty(this.changed);
	      return _.has(this.changed, attr);
	    },

	    // Return an object containing all the attributes that have changed, or
	    // false if there are no changed attributes. Useful for determining what
	    // parts of a view need to be updated and/or what attributes need to be
	    // persisted to the server. Unset attributes will be set to undefined.
	    // You can also pass an attributes object to diff against the model,
	    // determining if there *would be* a change.
	    changedAttributes: function(diff) {
	      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
	      var old = this._changing ? this._previousAttributes : this.attributes;
	      var changed = {};
	      for (var attr in diff) {
	        var val = diff[attr];
	        if (_.isEqual(old[attr], val)) continue;
	        changed[attr] = val;
	      }
	      return _.size(changed) ? changed : false;
	    },

	    // Get the previous value of an attribute, recorded at the time the last
	    // `"change"` event was fired.
	    previous: function(attr) {
	      if (attr == null || !this._previousAttributes) return null;
	      return this._previousAttributes[attr];
	    },

	    // Get all of the attributes of the model at the time of the previous
	    // `"change"` event.
	    previousAttributes: function() {
	      return _.clone(this._previousAttributes);
	    },

	    // Fetch the model from the server, merging the response with the model's
	    // local attributes. Any changed attributes will trigger a "change" event.
	    fetch: function(options) {
	      options = _.extend({parse: true}, options);
	      var model = this;
	      var success = options.success;
	      options.success = function(resp) {
	        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
	        if (!model.set(serverAttrs, options)) return false;
	        if (success) success.call(options.context, model, resp, options);
	        model.trigger('sync', model, resp, options);
	      };
	      wrapError(this, options);
	      return this.sync('read', this, options);
	    },

	    // Set a hash of model attributes, and sync the model to the server.
	    // If the server returns an attributes hash that differs, the model's
	    // state will be `set` again.
	    save: function(key, val, options) {
	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if (key == null || typeof key === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }

	      options = _.extend({validate: true, parse: true}, options);
	      var wait = options.wait;

	      // If we're not waiting and attributes exist, save acts as
	      // `set(attr).save(null, opts)` with validation. Otherwise, check if
	      // the model will be valid when the attributes, if any, are set.
	      if (attrs && !wait) {
	        if (!this.set(attrs, options)) return false;
	      } else if (!this._validate(attrs, options)) {
	        return false;
	      }

	      // After a successful server-side save, the client is (optionally)
	      // updated with the server-side state.
	      var model = this;
	      var success = options.success;
	      var attributes = this.attributes;
	      options.success = function(resp) {
	        // Ensure attributes are restored during synchronous saves.
	        model.attributes = attributes;
	        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
	        if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
	        if (serverAttrs && !model.set(serverAttrs, options)) return false;
	        if (success) success.call(options.context, model, resp, options);
	        model.trigger('sync', model, resp, options);
	      };
	      wrapError(this, options);

	      // Set temporary attributes if `{wait: true}` to properly find new ids.
	      if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

	      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
	      if (method === 'patch' && !options.attrs) options.attrs = attrs;
	      var xhr = this.sync(method, this, options);

	      // Restore attributes.
	      this.attributes = attributes;

	      return xhr;
	    },

	    // Destroy this model on the server if it was already persisted.
	    // Optimistically removes the model from its collection, if it has one.
	    // If `wait: true` is passed, waits for the server to respond before removal.
	    destroy: function(options) {
	      options = options ? _.clone(options) : {};
	      var model = this;
	      var success = options.success;
	      var wait = options.wait;

	      var destroy = function() {
	        model.stopListening();
	        model.trigger('destroy', model, model.collection, options);
	      };

	      options.success = function(resp) {
	        if (wait) destroy();
	        if (success) success.call(options.context, model, resp, options);
	        if (!model.isNew()) model.trigger('sync', model, resp, options);
	      };

	      var xhr = false;
	      if (this.isNew()) {
	        _.defer(options.success);
	      } else {
	        wrapError(this, options);
	        xhr = this.sync('delete', this, options);
	      }
	      if (!wait) destroy();
	      return xhr;
	    },

	    // Default URL for the model's representation on the server -- if you're
	    // using Backbone's restful methods, override this to change the endpoint
	    // that will be called.
	    url: function() {
	      var base =
	        _.result(this, 'urlRoot') ||
	        _.result(this.collection, 'url') ||
	        urlError();
	      if (this.isNew()) return base;
	      var id = this.get(this.idAttribute);
	      return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
	    },

	    // **parse** converts a response into the hash of attributes to be `set` on
	    // the model. The default implementation is just to pass the response along.
	    parse: function(resp, options) {
	      return resp;
	    },

	    // Create a new model with identical attributes to this one.
	    clone: function() {
	      return new this.constructor(this.attributes);
	    },

	    // A model is new if it has never been saved to the server, and lacks an id.
	    isNew: function() {
	      return !this.has(this.idAttribute);
	    },

	    // Check if the model is currently in a valid state.
	    isValid: function(options) {
	      return this._validate({}, _.extend({}, options, {validate: true}));
	    },

	    // Run validation against the next complete set of model attributes,
	    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
	    _validate: function(attrs, options) {
	      if (!options.validate || !this.validate) return true;
	      attrs = _.extend({}, this.attributes, attrs);
	      var error = this.validationError = this.validate(attrs, options) || null;
	      if (!error) return true;
	      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
	      return false;
	    }

	  });

	  // Underscore methods that we want to implement on the Model, mapped to the
	  // number of arguments they take.
	  var modelMethods = {keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
	      omit: 0, chain: 1, isEmpty: 1};

	  // Mix in each Underscore method as a proxy to `Model#attributes`.
	  addUnderscoreMethods(Model, modelMethods, 'attributes');

	  // Backbone.Collection
	  // -------------------

	  // If models tend to represent a single row of data, a Backbone Collection is
	  // more analogous to a table full of data ... or a small slice or page of that
	  // table, or a collection of rows that belong together for a particular reason
	  // -- all of the messages in this particular folder, all of the documents
	  // belonging to this particular author, and so on. Collections maintain
	  // indexes of their models, both in order, and for lookup by `id`.

	  // Create a new **Collection**, perhaps to contain a specific type of `model`.
	  // If a `comparator` is specified, the Collection will maintain
	  // its models in sort order, as they're added and removed.
	  var Collection = Backbone.Collection = function(models, options) {
	    options || (options = {});
	    if (options.model) this.model = options.model;
	    if (options.comparator !== void 0) this.comparator = options.comparator;
	    this._reset();
	    this.initialize.apply(this, arguments);
	    if (models) this.reset(models, _.extend({silent: true}, options));
	  };

	  // Default options for `Collection#set`.
	  var setOptions = {add: true, remove: true, merge: true};
	  var addOptions = {add: true, remove: false};

	  // Splices `insert` into `array` at index `at`.
	  var splice = function(array, insert, at) {
	    at = Math.min(Math.max(at, 0), array.length);
	    var tail = Array(array.length - at);
	    var length = insert.length;
	    var i;
	    for (i = 0; i < tail.length; i++) tail[i] = array[i + at];
	    for (i = 0; i < length; i++) array[i + at] = insert[i];
	    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
	  };

	  // Define the Collection's inheritable methods.
	  _.extend(Collection.prototype, Events, {

	    // The default model for a collection is just a **Backbone.Model**.
	    // This should be overridden in most cases.
	    model: Model,

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // The JSON representation of a Collection is an array of the
	    // models' attributes.
	    toJSON: function(options) {
	      return this.map(function(model) { return model.toJSON(options); });
	    },

	    // Proxy `Backbone.sync` by default.
	    sync: function() {
	      return Backbone.sync.apply(this, arguments);
	    },

	    // Add a model, or list of models to the set. `models` may be Backbone
	    // Models or raw JavaScript objects to be converted to Models, or any
	    // combination of the two.
	    add: function(models, options) {
	      return this.set(models, _.extend({merge: false}, options, addOptions));
	    },

	    // Remove a model, or a list of models from the set.
	    remove: function(models, options) {
	      options = _.extend({}, options);
	      var singular = !_.isArray(models);
	      models = singular ? [models] : models.slice();
	      var removed = this._removeModels(models, options);
	      if (!options.silent && removed.length) {
	        options.changes = {added: [], merged: [], removed: removed};
	        this.trigger('update', this, options);
	      }
	      return singular ? removed[0] : removed;
	    },

	    // Update a collection by `set`-ing a new list of models, adding new ones,
	    // removing models that are no longer present, and merging models that
	    // already exist in the collection, as necessary. Similar to **Model#set**,
	    // the core operation for updating the data contained by the collection.
	    set: function(models, options) {
	      if (models == null) return;

	      options = _.extend({}, setOptions, options);
	      if (options.parse && !this._isModel(models)) {
	        models = this.parse(models, options) || [];
	      }

	      var singular = !_.isArray(models);
	      models = singular ? [models] : models.slice();

	      var at = options.at;
	      if (at != null) at = +at;
	      if (at > this.length) at = this.length;
	      if (at < 0) at += this.length + 1;

	      var set = [];
	      var toAdd = [];
	      var toMerge = [];
	      var toRemove = [];
	      var modelMap = {};

	      var add = options.add;
	      var merge = options.merge;
	      var remove = options.remove;

	      var sort = false;
	      var sortable = this.comparator && at == null && options.sort !== false;
	      var sortAttr = _.isString(this.comparator) ? this.comparator : null;

	      // Turn bare objects into model references, and prevent invalid models
	      // from being added.
	      var model, i;
	      for (i = 0; i < models.length; i++) {
	        model = models[i];

	        // If a duplicate is found, prevent it from being added and
	        // optionally merge it into the existing model.
	        var existing = this.get(model);
	        if (existing) {
	          if (merge && model !== existing) {
	            var attrs = this._isModel(model) ? model.attributes : model;
	            if (options.parse) attrs = existing.parse(attrs, options);
	            existing.set(attrs, options);
	            toMerge.push(existing);
	            if (sortable && !sort) sort = existing.hasChanged(sortAttr);
	          }
	          if (!modelMap[existing.cid]) {
	            modelMap[existing.cid] = true;
	            set.push(existing);
	          }
	          models[i] = existing;

	        // If this is a new, valid model, push it to the `toAdd` list.
	        } else if (add) {
	          model = models[i] = this._prepareModel(model, options);
	          if (model) {
	            toAdd.push(model);
	            this._addReference(model, options);
	            modelMap[model.cid] = true;
	            set.push(model);
	          }
	        }
	      }

	      // Remove stale models.
	      if (remove) {
	        for (i = 0; i < this.length; i++) {
	          model = this.models[i];
	          if (!modelMap[model.cid]) toRemove.push(model);
	        }
	        if (toRemove.length) this._removeModels(toRemove, options);
	      }

	      // See if sorting is needed, update `length` and splice in new models.
	      var orderChanged = false;
	      var replace = !sortable && add && remove;
	      if (set.length && replace) {
	        orderChanged = this.length !== set.length || _.some(this.models, function(m, index) {
	          return m !== set[index];
	        });
	        this.models.length = 0;
	        splice(this.models, set, 0);
	        this.length = this.models.length;
	      } else if (toAdd.length) {
	        if (sortable) sort = true;
	        splice(this.models, toAdd, at == null ? this.length : at);
	        this.length = this.models.length;
	      }

	      // Silently sort the collection if appropriate.
	      if (sort) this.sort({silent: true});

	      // Unless silenced, it's time to fire all appropriate add/sort/update events.
	      if (!options.silent) {
	        for (i = 0; i < toAdd.length; i++) {
	          if (at != null) options.index = at + i;
	          model = toAdd[i];
	          model.trigger('add', model, this, options);
	        }
	        if (sort || orderChanged) this.trigger('sort', this, options);
	        if (toAdd.length || toRemove.length || toMerge.length) {
	          options.changes = {
	            added: toAdd,
	            removed: toRemove,
	            merged: toMerge
	          };
	          this.trigger('update', this, options);
	        }
	      }

	      // Return the added (or merged) model (or models).
	      return singular ? models[0] : models;
	    },

	    // When you have more items than you want to add or remove individually,
	    // you can reset the entire set with a new list of models, without firing
	    // any granular `add` or `remove` events. Fires `reset` when finished.
	    // Useful for bulk operations and optimizations.
	    reset: function(models, options) {
	      options = options ? _.clone(options) : {};
	      for (var i = 0; i < this.models.length; i++) {
	        this._removeReference(this.models[i], options);
	      }
	      options.previousModels = this.models;
	      this._reset();
	      models = this.add(models, _.extend({silent: true}, options));
	      if (!options.silent) this.trigger('reset', this, options);
	      return models;
	    },

	    // Add a model to the end of the collection.
	    push: function(model, options) {
	      return this.add(model, _.extend({at: this.length}, options));
	    },

	    // Remove a model from the end of the collection.
	    pop: function(options) {
	      var model = this.at(this.length - 1);
	      return this.remove(model, options);
	    },

	    // Add a model to the beginning of the collection.
	    unshift: function(model, options) {
	      return this.add(model, _.extend({at: 0}, options));
	    },

	    // Remove a model from the beginning of the collection.
	    shift: function(options) {
	      var model = this.at(0);
	      return this.remove(model, options);
	    },

	    // Slice out a sub-array of models from the collection.
	    slice: function() {
	      return slice.apply(this.models, arguments);
	    },

	    // Get a model from the set by id, cid, model object with id or cid
	    // properties, or an attributes object that is transformed through modelId.
	    get: function(obj) {
	      if (obj == null) return void 0;
	      return this._byId[obj] ||
	        this._byId[this.modelId(obj.attributes || obj)] ||
	        obj.cid && this._byId[obj.cid];
	    },

	    // Returns `true` if the model is in the collection.
	    has: function(obj) {
	      return this.get(obj) != null;
	    },

	    // Get the model at the given index.
	    at: function(index) {
	      if (index < 0) index += this.length;
	      return this.models[index];
	    },

	    // Return models with matching attributes. Useful for simple cases of
	    // `filter`.
	    where: function(attrs, first) {
	      return this[first ? 'find' : 'filter'](attrs);
	    },

	    // Return the first model with matching attributes. Useful for simple cases
	    // of `find`.
	    findWhere: function(attrs) {
	      return this.where(attrs, true);
	    },

	    // Force the collection to re-sort itself. You don't need to call this under
	    // normal circumstances, as the set will maintain sort order as each item
	    // is added.
	    sort: function(options) {
	      var comparator = this.comparator;
	      if (!comparator) throw new Error('Cannot sort a set without a comparator');
	      options || (options = {});

	      var length = comparator.length;
	      if (_.isFunction(comparator)) comparator = _.bind(comparator, this);

	      // Run sort based on type of `comparator`.
	      if (length === 1 || _.isString(comparator)) {
	        this.models = this.sortBy(comparator);
	      } else {
	        this.models.sort(comparator);
	      }
	      if (!options.silent) this.trigger('sort', this, options);
	      return this;
	    },

	    // Pluck an attribute from each model in the collection.
	    pluck: function(attr) {
	      return this.map(attr + '');
	    },

	    // Fetch the default set of models for this collection, resetting the
	    // collection when they arrive. If `reset: true` is passed, the response
	    // data will be passed through the `reset` method instead of `set`.
	    fetch: function(options) {
	      options = _.extend({parse: true}, options);
	      var success = options.success;
	      var collection = this;
	      options.success = function(resp) {
	        var method = options.reset ? 'reset' : 'set';
	        collection[method](resp, options);
	        if (success) success.call(options.context, collection, resp, options);
	        collection.trigger('sync', collection, resp, options);
	      };
	      wrapError(this, options);
	      return this.sync('read', this, options);
	    },

	    // Create a new instance of a model in this collection. Add the model to the
	    // collection immediately, unless `wait: true` is passed, in which case we
	    // wait for the server to agree.
	    create: function(model, options) {
	      options = options ? _.clone(options) : {};
	      var wait = options.wait;
	      model = this._prepareModel(model, options);
	      if (!model) return false;
	      if (!wait) this.add(model, options);
	      var collection = this;
	      var success = options.success;
	      options.success = function(m, resp, callbackOpts) {
	        if (wait) collection.add(m, callbackOpts);
	        if (success) success.call(callbackOpts.context, m, resp, callbackOpts);
	      };
	      model.save(null, options);
	      return model;
	    },

	    // **parse** converts a response into a list of models to be added to the
	    // collection. The default implementation is just to pass it through.
	    parse: function(resp, options) {
	      return resp;
	    },

	    // Create a new collection with an identical list of models as this one.
	    clone: function() {
	      return new this.constructor(this.models, {
	        model: this.model,
	        comparator: this.comparator
	      });
	    },

	    // Define how to uniquely identify models in the collection.
	    modelId: function(attrs) {
	      return attrs[this.model.prototype.idAttribute || 'id'];
	    },

	    // Private method to reset all internal state. Called when the collection
	    // is first initialized or reset.
	    _reset: function() {
	      this.length = 0;
	      this.models = [];
	      this._byId  = {};
	    },

	    // Prepare a hash of attributes (or other model) to be added to this
	    // collection.
	    _prepareModel: function(attrs, options) {
	      if (this._isModel(attrs)) {
	        if (!attrs.collection) attrs.collection = this;
	        return attrs;
	      }
	      options = options ? _.clone(options) : {};
	      options.collection = this;
	      var model = new this.model(attrs, options);
	      if (!model.validationError) return model;
	      this.trigger('invalid', this, model.validationError, options);
	      return false;
	    },

	    // Internal method called by both remove and set.
	    _removeModels: function(models, options) {
	      var removed = [];
	      for (var i = 0; i < models.length; i++) {
	        var model = this.get(models[i]);
	        if (!model) continue;

	        var index = this.indexOf(model);
	        this.models.splice(index, 1);
	        this.length--;

	        // Remove references before triggering 'remove' event to prevent an
	        // infinite loop. #3693
	        delete this._byId[model.cid];
	        var id = this.modelId(model.attributes);
	        if (id != null) delete this._byId[id];

	        if (!options.silent) {
	          options.index = index;
	          model.trigger('remove', model, this, options);
	        }

	        removed.push(model);
	        this._removeReference(model, options);
	      }
	      return removed;
	    },

	    // Method for checking whether an object should be considered a model for
	    // the purposes of adding to the collection.
	    _isModel: function(model) {
	      return model instanceof Model;
	    },

	    // Internal method to create a model's ties to a collection.
	    _addReference: function(model, options) {
	      this._byId[model.cid] = model;
	      var id = this.modelId(model.attributes);
	      if (id != null) this._byId[id] = model;
	      model.on('all', this._onModelEvent, this);
	    },

	    // Internal method to sever a model's ties to a collection.
	    _removeReference: function(model, options) {
	      delete this._byId[model.cid];
	      var id = this.modelId(model.attributes);
	      if (id != null) delete this._byId[id];
	      if (this === model.collection) delete model.collection;
	      model.off('all', this._onModelEvent, this);
	    },

	    // Internal method called every time a model in the set fires an event.
	    // Sets need to update their indexes when models change ids. All other
	    // events simply proxy through. "add" and "remove" events that originate
	    // in other collections are ignored.
	    _onModelEvent: function(event, model, collection, options) {
	      if (model) {
	        if ((event === 'add' || event === 'remove') && collection !== this) return;
	        if (event === 'destroy') this.remove(model, options);
	        if (event === 'change') {
	          var prevId = this.modelId(model.previousAttributes());
	          var id = this.modelId(model.attributes);
	          if (prevId !== id) {
	            if (prevId != null) delete this._byId[prevId];
	            if (id != null) this._byId[id] = model;
	          }
	        }
	      }
	      this.trigger.apply(this, arguments);
	    }

	  });

	  // Underscore methods that we want to implement on the Collection.
	  // 90% of the core usefulness of Backbone Collections is actually implemented
	  // right here:
	  var collectionMethods = {forEach: 3, each: 3, map: 3, collect: 3, reduce: 0,
	      foldl: 0, inject: 0, reduceRight: 0, foldr: 0, find: 3, detect: 3, filter: 3,
	      select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
	      contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
	      head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
	      without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
	      isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
	      sortBy: 3, indexBy: 3, findIndex: 3, findLastIndex: 3};

	  // Mix in each Underscore method as a proxy to `Collection#models`.
	  addUnderscoreMethods(Collection, collectionMethods, 'models');

	  // Backbone.View
	  // -------------

	  // Backbone Views are almost more convention than they are actual code. A View
	  // is simply a JavaScript object that represents a logical chunk of UI in the
	  // DOM. This might be a single item, an entire list, a sidebar or panel, or
	  // even the surrounding frame which wraps your whole app. Defining a chunk of
	  // UI as a **View** allows you to define your DOM events declaratively, without
	  // having to worry about render order ... and makes it easy for the view to
	  // react to specific changes in the state of your models.

	  // Creating a Backbone.View creates its initial element outside of the DOM,
	  // if an existing element is not provided...
	  var View = Backbone.View = function(options) {
	    this.cid = _.uniqueId('view');
	    _.extend(this, _.pick(options, viewOptions));
	    this._ensureElement();
	    this.initialize.apply(this, arguments);
	  };

	  // Cached regex to split keys for `delegate`.
	  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

	  // List of view options to be set as properties.
	  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

	  // Set up all inheritable **Backbone.View** properties and methods.
	  _.extend(View.prototype, Events, {

	    // The default `tagName` of a View's element is `"div"`.
	    tagName: 'div',

	    // jQuery delegate for element lookup, scoped to DOM elements within the
	    // current view. This should be preferred to global lookups where possible.
	    $: function(selector) {
	      return this.$el.find(selector);
	    },

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // **render** is the core function that your view should override, in order
	    // to populate its element (`this.el`), with the appropriate HTML. The
	    // convention is for **render** to always return `this`.
	    render: function() {
	      return this;
	    },

	    // Remove this view by taking the element out of the DOM, and removing any
	    // applicable Backbone.Events listeners.
	    remove: function() {
	      this._removeElement();
	      this.stopListening();
	      return this;
	    },

	    // Remove this view's element from the document and all event listeners
	    // attached to it. Exposed for subclasses using an alternative DOM
	    // manipulation API.
	    _removeElement: function() {
	      this.$el.remove();
	    },

	    // Change the view's element (`this.el` property) and re-delegate the
	    // view's events on the new element.
	    setElement: function(element) {
	      this.undelegateEvents();
	      this._setElement(element);
	      this.delegateEvents();
	      return this;
	    },

	    // Creates the `this.el` and `this.$el` references for this view using the
	    // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
	    // context or an element. Subclasses can override this to utilize an
	    // alternative DOM manipulation API and are only required to set the
	    // `this.el` property.
	    _setElement: function(el) {
	      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
	      this.el = this.$el[0];
	    },

	    // Set callbacks, where `this.events` is a hash of
	    //
	    // *{"event selector": "callback"}*
	    //
	    //     {
	    //       'mousedown .title':  'edit',
	    //       'click .button':     'save',
	    //       'click .open':       function(e) { ... }
	    //     }
	    //
	    // pairs. Callbacks will be bound to the view, with `this` set properly.
	    // Uses event delegation for efficiency.
	    // Omitting the selector binds the event to `this.el`.
	    delegateEvents: function(events) {
	      events || (events = _.result(this, 'events'));
	      if (!events) return this;
	      this.undelegateEvents();
	      for (var key in events) {
	        var method = events[key];
	        if (!_.isFunction(method)) method = this[method];
	        if (!method) continue;
	        var match = key.match(delegateEventSplitter);
	        this.delegate(match[1], match[2], _.bind(method, this));
	      }
	      return this;
	    },

	    // Add a single event listener to the view's element (or a child element
	    // using `selector`). This only works for delegate-able events: not `focus`,
	    // `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
	    delegate: function(eventName, selector, listener) {
	      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
	      return this;
	    },

	    // Clears all callbacks previously bound to the view by `delegateEvents`.
	    // You usually don't need to use this, but may wish to if you have multiple
	    // Backbone views attached to the same DOM element.
	    undelegateEvents: function() {
	      if (this.$el) this.$el.off('.delegateEvents' + this.cid);
	      return this;
	    },

	    // A finer-grained `undelegateEvents` for removing a single delegated event.
	    // `selector` and `listener` are both optional.
	    undelegate: function(eventName, selector, listener) {
	      this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
	      return this;
	    },

	    // Produces a DOM element to be assigned to your view. Exposed for
	    // subclasses using an alternative DOM manipulation API.
	    _createElement: function(tagName) {
	      return document.createElement(tagName);
	    },

	    // Ensure that the View has a DOM element to render into.
	    // If `this.el` is a string, pass it through `$()`, take the first
	    // matching element, and re-assign it to `el`. Otherwise, create
	    // an element from the `id`, `className` and `tagName` properties.
	    _ensureElement: function() {
	      if (!this.el) {
	        var attrs = _.extend({}, _.result(this, 'attributes'));
	        if (this.id) attrs.id = _.result(this, 'id');
	        if (this.className) attrs['class'] = _.result(this, 'className');
	        this.setElement(this._createElement(_.result(this, 'tagName')));
	        this._setAttributes(attrs);
	      } else {
	        this.setElement(_.result(this, 'el'));
	      }
	    },

	    // Set attributes from a hash on this view's element.  Exposed for
	    // subclasses using an alternative DOM manipulation API.
	    _setAttributes: function(attributes) {
	      this.$el.attr(attributes);
	    }

	  });

	  // Backbone.sync
	  // -------------

	  // Override this function to change the manner in which Backbone persists
	  // models to the server. You will be passed the type of request, and the
	  // model in question. By default, makes a RESTful Ajax request
	  // to the model's `url()`. Some possible customizations could be:
	  //
	  // * Use `setTimeout` to batch rapid-fire updates into a single request.
	  // * Send up the models as XML instead of JSON.
	  // * Persist models via WebSockets instead of Ajax.
	  //
	  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
	  // as `POST`, with a `_method` parameter containing the true HTTP method,
	  // as well as all requests with the body as `application/x-www-form-urlencoded`
	  // instead of `application/json` with the model in a param named `model`.
	  // Useful when interfacing with server-side languages like **PHP** that make
	  // it difficult to read the body of `PUT` requests.
	  Backbone.sync = function(method, model, options) {
	    var type = methodMap[method];

	    // Default options, unless specified.
	    _.defaults(options || (options = {}), {
	      emulateHTTP: Backbone.emulateHTTP,
	      emulateJSON: Backbone.emulateJSON
	    });

	    // Default JSON-request options.
	    var params = {type: type, dataType: 'json'};

	    // Ensure that we have a URL.
	    if (!options.url) {
	      params.url = _.result(model, 'url') || urlError();
	    }

	    // Ensure that we have the appropriate request data.
	    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
	      params.contentType = 'application/json';
	      params.data = JSON.stringify(options.attrs || model.toJSON(options));
	    }

	    // For older servers, emulate JSON by encoding the request into an HTML-form.
	    if (options.emulateJSON) {
	      params.contentType = 'application/x-www-form-urlencoded';
	      params.data = params.data ? {model: params.data} : {};
	    }

	    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
	    // And an `X-HTTP-Method-Override` header.
	    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
	      params.type = 'POST';
	      if (options.emulateJSON) params.data._method = type;
	      var beforeSend = options.beforeSend;
	      options.beforeSend = function(xhr) {
	        xhr.setRequestHeader('X-HTTP-Method-Override', type);
	        if (beforeSend) return beforeSend.apply(this, arguments);
	      };
	    }

	    // Don't process data on a non-GET request.
	    if (params.type !== 'GET' && !options.emulateJSON) {
	      params.processData = false;
	    }

	    // Pass along `textStatus` and `errorThrown` from jQuery.
	    var error = options.error;
	    options.error = function(xhr, textStatus, errorThrown) {
	      options.textStatus = textStatus;
	      options.errorThrown = errorThrown;
	      if (error) error.call(options.context, xhr, textStatus, errorThrown);
	    };

	    // Make the request, allowing the user to override any Ajax options.
	    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
	    model.trigger('request', model, xhr, options);
	    return xhr;
	  };

	  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
	  var methodMap = {
	    'create': 'POST',
	    'update': 'PUT',
	    'patch': 'PATCH',
	    'delete': 'DELETE',
	    'read': 'GET'
	  };

	  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
	  // Override this if you'd like to use a different library.
	  Backbone.ajax = function() {
	    return Backbone.$.ajax.apply(Backbone.$, arguments);
	  };

	  // Backbone.Router
	  // ---------------

	  // Routers map faux-URLs to actions, and fire events when routes are
	  // matched. Creating a new one sets its `routes` hash, if not set statically.
	  var Router = Backbone.Router = function(options) {
	    options || (options = {});
	    if (options.routes) this.routes = options.routes;
	    this._bindRoutes();
	    this.initialize.apply(this, arguments);
	  };

	  // Cached regular expressions for matching named param parts and splatted
	  // parts of route strings.
	  var optionalParam = /\((.*?)\)/g;
	  var namedParam    = /(\(\?)?:\w+/g;
	  var splatParam    = /\*\w+/g;
	  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

	  // Set up all inheritable **Backbone.Router** properties and methods.
	  _.extend(Router.prototype, Events, {

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // Manually bind a single named route to a callback. For example:
	    //
	    //     this.route('search/:query/p:num', 'search', function(query, num) {
	    //       ...
	    //     });
	    //
	    route: function(route, name, callback) {
	      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
	      if (_.isFunction(name)) {
	        callback = name;
	        name = '';
	      }
	      if (!callback) callback = this[name];
	      var router = this;
	      Backbone.history.route(route, function(fragment) {
	        var args = router._extractParameters(route, fragment);
	        if (router.execute(callback, args, name) !== false) {
	          router.trigger.apply(router, ['route:' + name].concat(args));
	          router.trigger('route', name, args);
	          Backbone.history.trigger('route', router, name, args);
	        }
	      });
	      return this;
	    },

	    // Execute a route handler with the provided parameters.  This is an
	    // excellent place to do pre-route setup or post-route cleanup.
	    execute: function(callback, args, name) {
	      if (callback) callback.apply(this, args);
	    },

	    // Simple proxy to `Backbone.history` to save a fragment into the history.
	    navigate: function(fragment, options) {
	      Backbone.history.navigate(fragment, options);
	      return this;
	    },

	    // Bind all defined routes to `Backbone.history`. We have to reverse the
	    // order of the routes here to support behavior where the most general
	    // routes can be defined at the bottom of the route map.
	    _bindRoutes: function() {
	      if (!this.routes) return;
	      this.routes = _.result(this, 'routes');
	      var route, routes = _.keys(this.routes);
	      while ((route = routes.pop()) != null) {
	        this.route(route, this.routes[route]);
	      }
	    },

	    // Convert a route string into a regular expression, suitable for matching
	    // against the current location hash.
	    _routeToRegExp: function(route) {
	      route = route.replace(escapeRegExp, '\\$&')
	                   .replace(optionalParam, '(?:$1)?')
	                   .replace(namedParam, function(match, optional) {
	                     return optional ? match : '([^/?]+)';
	                   })
	                   .replace(splatParam, '([^?]*?)');
	      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
	    },

	    // Given a route, and a URL fragment that it matches, return the array of
	    // extracted decoded parameters. Empty or unmatched parameters will be
	    // treated as `null` to normalize cross-browser behavior.
	    _extractParameters: function(route, fragment) {
	      var params = route.exec(fragment).slice(1);
	      return _.map(params, function(param, i) {
	        // Don't decode the search params.
	        if (i === params.length - 1) return param || null;
	        return param ? decodeURIComponent(param) : null;
	      });
	    }

	  });

	  // Backbone.History
	  // ----------------

	  // Handles cross-browser history management, based on either
	  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
	  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
	  // and URL fragments. If the browser supports neither (old IE, natch),
	  // falls back to polling.
	  var History = Backbone.History = function() {
	    this.handlers = [];
	    this.checkUrl = _.bind(this.checkUrl, this);

	    // Ensure that `History` can be used outside of the browser.
	    if (typeof window !== 'undefined') {
	      this.location = window.location;
	      this.history = window.history;
	    }
	  };

	  // Cached regex for stripping a leading hash/slash and trailing space.
	  var routeStripper = /^[#\/]|\s+$/g;

	  // Cached regex for stripping leading and trailing slashes.
	  var rootStripper = /^\/+|\/+$/g;

	  // Cached regex for stripping urls of hash.
	  var pathStripper = /#.*$/;

	  // Has the history handling already been started?
	  History.started = false;

	  // Set up all inheritable **Backbone.History** properties and methods.
	  _.extend(History.prototype, Events, {

	    // The default interval to poll for hash changes, if necessary, is
	    // twenty times a second.
	    interval: 50,

	    // Are we at the app root?
	    atRoot: function() {
	      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
	      return path === this.root && !this.getSearch();
	    },

	    // Does the pathname match the root?
	    matchRoot: function() {
	      var path = this.decodeFragment(this.location.pathname);
	      var rootPath = path.slice(0, this.root.length - 1) + '/';
	      return rootPath === this.root;
	    },

	    // Unicode characters in `location.pathname` are percent encoded so they're
	    // decoded for comparison. `%25` should not be decoded since it may be part
	    // of an encoded parameter.
	    decodeFragment: function(fragment) {
	      return decodeURI(fragment.replace(/%25/g, '%2525'));
	    },

	    // In IE6, the hash fragment and search params are incorrect if the
	    // fragment contains `?`.
	    getSearch: function() {
	      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
	      return match ? match[0] : '';
	    },

	    // Gets the true hash value. Cannot use location.hash directly due to bug
	    // in Firefox where location.hash will always be decoded.
	    getHash: function(window) {
	      var match = (window || this).location.href.match(/#(.*)$/);
	      return match ? match[1] : '';
	    },

	    // Get the pathname and search params, without the root.
	    getPath: function() {
	      var path = this.decodeFragment(
	        this.location.pathname + this.getSearch()
	      ).slice(this.root.length - 1);
	      return path.charAt(0) === '/' ? path.slice(1) : path;
	    },

	    // Get the cross-browser normalized URL fragment from the path or hash.
	    getFragment: function(fragment) {
	      if (fragment == null) {
	        if (this._usePushState || !this._wantsHashChange) {
	          fragment = this.getPath();
	        } else {
	          fragment = this.getHash();
	        }
	      }
	      return fragment.replace(routeStripper, '');
	    },

	    // Start the hash change handling, returning `true` if the current URL matches
	    // an existing route, and `false` otherwise.
	    start: function(options) {
	      if (History.started) throw new Error('Backbone.history has already been started');
	      History.started = true;

	      // Figure out the initial configuration. Do we need an iframe?
	      // Is pushState desired ... is it available?
	      this.options          = _.extend({root: '/'}, this.options, options);
	      this.root             = this.options.root;
	      this._wantsHashChange = this.options.hashChange !== false;
	      this._hasHashChange   = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
	      this._useHashChange   = this._wantsHashChange && this._hasHashChange;
	      this._wantsPushState  = !!this.options.pushState;
	      this._hasPushState    = !!(this.history && this.history.pushState);
	      this._usePushState    = this._wantsPushState && this._hasPushState;
	      this.fragment         = this.getFragment();

	      // Normalize root to always include a leading and trailing slash.
	      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

	      // Transition from hashChange to pushState or vice versa if both are
	      // requested.
	      if (this._wantsHashChange && this._wantsPushState) {

	        // If we've started off with a route from a `pushState`-enabled
	        // browser, but we're currently in a browser that doesn't support it...
	        if (!this._hasPushState && !this.atRoot()) {
	          var rootPath = this.root.slice(0, -1) || '/';
	          this.location.replace(rootPath + '#' + this.getPath());
	          // Return immediately as browser will do redirect to new url
	          return true;

	        // Or if we've started out with a hash-based route, but we're currently
	        // in a browser where it could be `pushState`-based instead...
	        } else if (this._hasPushState && this.atRoot()) {
	          this.navigate(this.getHash(), {replace: true});
	        }

	      }

	      // Proxy an iframe to handle location events if the browser doesn't
	      // support the `hashchange` event, HTML5 history, or the user wants
	      // `hashChange` but not `pushState`.
	      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
	        this.iframe = document.createElement('iframe');
	        this.iframe.src = 'javascript:0';
	        this.iframe.style.display = 'none';
	        this.iframe.tabIndex = -1;
	        var body = document.body;
	        // Using `appendChild` will throw on IE < 9 if the document is not ready.
	        var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
	        iWindow.document.open();
	        iWindow.document.close();
	        iWindow.location.hash = '#' + this.fragment;
	      }

	      // Add a cross-platform `addEventListener` shim for older browsers.
	      var addEventListener = window.addEventListener || function(eventName, listener) {
	        return attachEvent('on' + eventName, listener);
	      };

	      // Depending on whether we're using pushState or hashes, and whether
	      // 'onhashchange' is supported, determine how we check the URL state.
	      if (this._usePushState) {
	        addEventListener('popstate', this.checkUrl, false);
	      } else if (this._useHashChange && !this.iframe) {
	        addEventListener('hashchange', this.checkUrl, false);
	      } else if (this._wantsHashChange) {
	        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
	      }

	      if (!this.options.silent) return this.loadUrl();
	    },

	    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
	    // but possibly useful for unit testing Routers.
	    stop: function() {
	      // Add a cross-platform `removeEventListener` shim for older browsers.
	      var removeEventListener = window.removeEventListener || function(eventName, listener) {
	        return detachEvent('on' + eventName, listener);
	      };

	      // Remove window listeners.
	      if (this._usePushState) {
	        removeEventListener('popstate', this.checkUrl, false);
	      } else if (this._useHashChange && !this.iframe) {
	        removeEventListener('hashchange', this.checkUrl, false);
	      }

	      // Clean up the iframe if necessary.
	      if (this.iframe) {
	        document.body.removeChild(this.iframe);
	        this.iframe = null;
	      }

	      // Some environments will throw when clearing an undefined interval.
	      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
	      History.started = false;
	    },

	    // Add a route to be tested when the fragment changes. Routes added later
	    // may override previous routes.
	    route: function(route, callback) {
	      this.handlers.unshift({route: route, callback: callback});
	    },

	    // Checks the current URL to see if it has changed, and if it has,
	    // calls `loadUrl`, normalizing across the hidden iframe.
	    checkUrl: function(e) {
	      var current = this.getFragment();

	      // If the user pressed the back button, the iframe's hash will have
	      // changed and we should use that for comparison.
	      if (current === this.fragment && this.iframe) {
	        current = this.getHash(this.iframe.contentWindow);
	      }

	      if (current === this.fragment) return false;
	      if (this.iframe) this.navigate(current);
	      this.loadUrl();
	    },

	    // Attempt to load the current URL fragment. If a route succeeds with a
	    // match, returns `true`. If no defined routes matches the fragment,
	    // returns `false`.
	    loadUrl: function(fragment) {
	      // If the root doesn't match, no routes can match either.
	      if (!this.matchRoot()) return false;
	      fragment = this.fragment = this.getFragment(fragment);
	      return _.some(this.handlers, function(handler) {
	        if (handler.route.test(fragment)) {
	          handler.callback(fragment);
	          return true;
	        }
	      });
	    },

	    // Save a fragment into the hash history, or replace the URL state if the
	    // 'replace' option is passed. You are responsible for properly URL-encoding
	    // the fragment in advance.
	    //
	    // The options object can contain `trigger: true` if you wish to have the
	    // route callback be fired (not usually desirable), or `replace: true`, if
	    // you wish to modify the current URL without adding an entry to the history.
	    navigate: function(fragment, options) {
	      if (!History.started) return false;
	      if (!options || options === true) options = {trigger: !!options};

	      // Normalize the fragment.
	      fragment = this.getFragment(fragment || '');

	      // Don't include a trailing slash on the root.
	      var rootPath = this.root;
	      if (fragment === '' || fragment.charAt(0) === '?') {
	        rootPath = rootPath.slice(0, -1) || '/';
	      }
	      var url = rootPath + fragment;

	      // Strip the hash and decode for matching.
	      fragment = this.decodeFragment(fragment.replace(pathStripper, ''));

	      if (this.fragment === fragment) return;
	      this.fragment = fragment;

	      // If pushState is available, we use it to set the fragment as a real URL.
	      if (this._usePushState) {
	        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

	      // If hash changes haven't been explicitly disabled, update the hash
	      // fragment to store history.
	      } else if (this._wantsHashChange) {
	        this._updateHash(this.location, fragment, options.replace);
	        if (this.iframe && fragment !== this.getHash(this.iframe.contentWindow)) {
	          var iWindow = this.iframe.contentWindow;

	          // Opening and closing the iframe tricks IE7 and earlier to push a
	          // history entry on hash-tag change.  When replace is true, we don't
	          // want this.
	          if (!options.replace) {
	            iWindow.document.open();
	            iWindow.document.close();
	          }

	          this._updateHash(iWindow.location, fragment, options.replace);
	        }

	      // If you've told us that you explicitly don't want fallback hashchange-
	      // based history, then `navigate` becomes a page refresh.
	      } else {
	        return this.location.assign(url);
	      }
	      if (options.trigger) return this.loadUrl(fragment);
	    },

	    // Update the hash location, either replacing the current entry, or adding
	    // a new one to the browser history.
	    _updateHash: function(location, fragment, replace) {
	      if (replace) {
	        var href = location.href.replace(/(javascript:|#).*$/, '');
	        location.replace(href + '#' + fragment);
	      } else {
	        // Some browsers require that `hash` contains a leading #.
	        location.hash = '#' + fragment;
	      }
	    }

	  });

	  // Create the default Backbone.history.
	  Backbone.history = new History;

	  // Helpers
	  // -------

	  // Helper function to correctly set up the prototype chain for subclasses.
	  // Similar to `goog.inherits`, but uses a hash of prototype properties and
	  // class properties to be extended.
	  var extend = function(protoProps, staticProps) {
	    var parent = this;
	    var child;

	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent constructor.
	    if (protoProps && _.has(protoProps, 'constructor')) {
	      child = protoProps.constructor;
	    } else {
	      child = function(){ return parent.apply(this, arguments); };
	    }

	    // Add static properties to the constructor function, if supplied.
	    _.extend(child, parent, staticProps);

	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent`'s constructor function and add the prototype properties.
	    child.prototype = _.create(parent.prototype, protoProps);
	    child.prototype.constructor = child;

	    // Set a convenience property in case the parent's prototype is needed
	    // later.
	    child.__super__ = parent.prototype;

	    return child;
	  };

	  // Set up inheritance for the model, collection, router, view and history.
	  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

	  // Throw an error when a URL is needed, and none is supplied.
	  var urlError = function() {
	    throw new Error('A "url" property or function must be specified');
	  };

	  // Wrap an optional error callback with a fallback error event.
	  var wrapError = function(model, options) {
	    var error = options.error;
	    options.error = function(resp) {
	      if (error) error.call(options.context, model, resp, options);
	      model.trigger('error', model, resp, options);
	    };
	  };

	  return Backbone;
	});

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(5);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(8);

	var _backbone4 = _interopRequireDefault(_backbone3);

	var _component = __webpack_require__(11);

	var _component2 = _interopRequireDefault(_component);

	var _main = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Application = _backbone4.default.Application.extend({
	  region: '#body',

	  onStart: function onStart() {
	    this.applicationView = new _component2.default();
	    this.showView(this.applicationView, { replaceElement: true });

	    (0, _main.startRouter)();

	    _backbone2.default.history.start({ pushState: true });
	  },
	  getBaseView: function getBaseView() {
	    return this.applicationView;
	  }
	});

	exports.default = new Application();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// MarionetteJS (Backbone.Marionette)
	// ----------------------------------
	// v3.0.0-pre.4
	//
	// Copyright (c)2016 Derick Bailey, Muted Solutions, LLC.
	// Distributed under MIT license
	//
	// http://marionettejs.com


	(function (global, factory) {
		 true ? module.exports = factory(__webpack_require__(5), __webpack_require__(6), __webpack_require__(9), __webpack_require__(10)) :
		typeof define === 'function' && define.amd ? define(['backbone', 'underscore', 'backbone.radio', 'backbone.babysitter'], factory) :
		(global.Marionette = global['Mn'] = factory(global.Backbone,global._,global.Backbone.Radio,global.Backbone.ChildViewContainer));
	}(this, function (Backbone,_,Radio,ChildViewContainer) { 'use strict';

		Backbone = 'default' in Backbone ? Backbone['default'] : Backbone;
		_ = 'default' in _ ? _['default'] : _;
		Radio = 'default' in Radio ? Radio['default'] : Radio;
		ChildViewContainer = 'default' in ChildViewContainer ? ChildViewContainer['default'] : ChildViewContainer;

		var babelHelpers = {};

		babelHelpers.toConsumableArray = function (arr) {
		  if (Array.isArray(arr)) {
		    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

		    return arr2;
		  } else {
		    return Array.from(arr);
		  }
		};

		babelHelpers;

		var version = "3.0.0-pre.4";

		//Internal utility for creating context style global utils
		var proxy = function proxy(method) {
		  return function (context) {
		    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		      args[_key - 1] = arguments[_key];
		    }

		    return method.apply(context, args);
		  };
		};

		// Borrow the Backbone `extend` method so we can use it as needed
		var extend = Backbone.Model.extend;

		// Determine if `el` is a child of the document
		var isNodeAttached = function isNodeAttached(el) {
		  return Backbone.$.contains(document.documentElement, el);
		};

		// Merge `keys` from `options` onto `this`
		var mergeOptions = function mergeOptions(options, keys) {
		  if (!options) {
		    return;
		  }
		  _.extend(this, _.pick(options, keys));
		};

		// Marionette.getOption
		// --------------------

		// Retrieve an object, function or other value from the
		// object or its `options`, with `options` taking precedence.
		var getOption = function getOption(optionName) {
		  if (!optionName) {
		    return;
		  }
		  if (this.options && this.options[optionName] !== undefined) {
		    return this.options[optionName];
		  } else {
		    return this[optionName];
		  }
		};

		// Marionette.normalizeMethods
		// ----------------------

		// Pass in a mapping of events => functions or function names
		// and return a mapping of events => functions
		var normalizeMethods = function normalizeMethods(hash) {
		  var _this = this;

		  return _.reduce(hash, function (normalizedHash, method, name) {
		    if (!_.isFunction(method)) {
		      method = _this[method];
		    }
		    if (method) {
		      normalizedHash[name] = method;
		    }
		    return normalizedHash;
		  }, {});
		};

		var deprecate = function deprecate(message, test) {
		  if (_.isObject(message)) {
		    message = message.prev + ' is going to be removed in the future. ' + 'Please use ' + message.next + ' instead.' + (message.url ? ' See: ' + message.url : '');
		  }

		  if (!Marionette.DEV_MODE) {
		    return;
		  }

		  if ((test === undefined || !test) && !deprecate._cache[message]) {
		    deprecate._warn('Deprecation warning: ' + message);
		    deprecate._cache[message] = true;
		  }
		};

		deprecate._console = typeof console !== 'undefined' ? console : {};
		deprecate._warn = function () {
		  var warn = deprecate._console.warn || deprecate._console.log || function () {};
		  return warn.apply(deprecate._console, arguments);
		};
		deprecate._cache = {};

		// split the event name on the ":"
		var splitter = /(^|:)(\w)/gi;

		// take the event section ("section1:section2:section3")
		// and turn it in to uppercase name onSection1Section2Section3
		function getEventName(match, prefix, eventName) {
		  return eventName.toUpperCase();
		}

		// Trigger an event and/or a corresponding method name. Examples:
		//
		// `this.triggerMethod("foo")` will trigger the "foo" event and
		// call the "onFoo" method.
		//
		// `this.triggerMethod("foo:bar")` will trigger the "foo:bar" event and
		// call the "onFooBar" method.
		function triggerMethod(event) {
		  // get the method name from the event name
		  var methodName = 'on' + event.replace(splitter, getEventName);
		  var method = getOption.call(this, methodName);
		  var result;

		  // call the onMethodName if it exists

		  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		    args[_key - 1] = arguments[_key];
		  }

		  if (_.isFunction(method)) {
		    // pass all args, except the event name
		    result = method.apply(this, args);
		  }

		  // trigger the event
		  this.trigger.apply(this, [event].concat(args));

		  return result;
		}

		// triggerMethodOn invokes triggerMethod on a specific context
		//
		// e.g. `Marionette.triggerMethodOn(view, 'show')`
		// will trigger a "show" event or invoke onShow the view.
		function triggerMethodOn(context) {
		  var fnc = _.isFunction(context.triggerMethod) ? context.triggerMethod : triggerMethod;

		  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		    args[_key2 - 1] = arguments[_key2];
		  }

		  return fnc.apply(context, args);
		}

		// Trigger method on children unless a pure Backbone.View
		function triggerMethodChildren(view, event, shouldTrigger) {
		  if (!view._getImmediateChildren) {
		    return;
		  }
		  _.each(view._getImmediateChildren(), function (child) {
		    if (!shouldTrigger(child)) {
		      return;
		    }
		    triggerMethodOn(child, event, child);
		  });
		}

		function shouldTriggerAttach(view) {
		  return !view._isAttached;
		}

		function shouldAttach(view) {
		  if (!shouldTriggerAttach(view)) {
		    return false;
		  }
		  view._isAttached = true;
		  return true;
		}

		function shouldTriggerDetach(view) {
		  return view._isAttached;
		}

		function shouldDetach(view) {
		  if (!shouldTriggerDetach(view)) {
		    return false;
		  }
		  view._isAttached = false;
		  return true;
		}

		// Monitor a view's state, propagating attach/detach events to children and firing dom:refresh
		// whenever a rendered view is attached or an attached view is rendered.
		function monitorViewEvents(view) {
		  if (view._areViewEventsMonitored) {
		    return;
		  }

		  view._areViewEventsMonitored = true;

		  function handleBeforeAttach() {
		    triggerMethodChildren(view, 'before:attach', shouldTriggerAttach);
		  }

		  function handleAttach() {
		    triggerMethodChildren(view, 'attach', shouldAttach);
		    triggerDOMRefresh();
		  }

		  function handleBeforeDetach() {
		    triggerMethodChildren(view, 'before:detach', shouldTriggerDetach);
		  }

		  function handleDetach() {
		    triggerMethodChildren(view, 'detach', shouldDetach);
		  }

		  function handleRender() {
		    triggerDOMRefresh();
		  }

		  function triggerDOMRefresh() {
		    if (view._isAttached && view._isRendered) {
		      triggerMethodOn(view, 'dom:refresh', view);
		    }
		  }

		  view.on({
		    'before:attach': handleBeforeAttach,
		    'attach': handleAttach,
		    'before:detach': handleBeforeDetach,
		    'detach': handleDetach,
		    'render': handleRender
		  });
		}

		// Internal utility for setting options consistently across Mn
		var _setOptions = function _setOptions() {
		  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		    args[_key] = arguments[_key];
		  }

		  this.options = _.extend.apply(_, [{}, _.result(this, 'options')].concat(args));
		};

		var errorProps = ['description', 'fileName', 'lineNumber', 'name', 'message', 'number'];

		var MarionetteError = extend.call(Error, {
		  urlRoot: 'http://marionettejs.com/docs/v' + version + '/',

		  constructor: function MarionetteError(message, options) {
		    if (_.isObject(message)) {
		      options = message;
		      message = options.message;
		    } else if (!options) {
		      options = {};
		    }

		    var error = Error.call(this, message);
		    _.extend(this, _.pick(error, errorProps), _.pick(options, errorProps));

		    this.captureStackTrace();

		    if (options.url) {
		      this.url = this.urlRoot + options.url;
		    }
		  },

		  captureStackTrace: function captureStackTrace() {
		    if (Error.captureStackTrace) {
		      Error.captureStackTrace(this, MarionetteError);
		    }
		  },

		  toString: function toString() {
		    return this.name + ': ' + this.message + (this.url ? ' See: ' + this.url : '');
		  }
		});

		MarionetteError.extend = extend;

		// Bind/unbind the event to handlers specified as a string of
		// handler names on the target object
		function bindFromStrings(target, entity, evt, methods, actionName) {
		  var methodNames = methods.split(/\s+/);

		  _.each(methodNames, function (methodName) {
		    var method = target[methodName];
		    if (!method) {
		      throw new MarionetteError('Method "' + methodName + '" was configured as an event handler, but does not exist.');
		    }

		    target[actionName](entity, evt, method);
		  });
		}

		// generic looping function
		function iterateEvents(target, entity, bindings, actionName) {
		  if (!entity || !bindings) {
		    return;
		  }

		  // type-check bindings
		  if (!_.isObject(bindings)) {
		    throw new MarionetteError({
		      message: 'Bindings must be an object.',
		      url: 'marionette.functions.html#marionettebindentityevents'
		    });
		  }

		  // iterate the bindings and bind/unbind them
		  _.each(bindings, function (method, evt) {

		    // allow for a list of method names as a string
		    if (_.isString(method)) {
		      bindFromStrings(target, entity, evt, method, actionName);
		      return;
		    }

		    target[actionName](entity, evt, method);
		  });
		}

		function bindEntityEvents(entity, bindings) {
		  iterateEvents(this, entity, bindings, 'listenTo');
		  return this;
		}

		function unbindEntityEvents(entity, bindings) {
		  iterateEvents(this, entity, bindings, 'stopListening');
		  return this;
		}

		var CommonMixin = {

		  // Imports the "normalizeMethods" to transform hashes of
		  // events=>function references/names to a hash of events=>function references
		  normalizeMethods: normalizeMethods,

		  _setOptions: _setOptions,

		  // A handy way to merge passed-in options onto the instance
		  mergeOptions: mergeOptions,

		  // Enable getting options from this or this.options by name.
		  getOption: getOption,

		  // Enable binding view's events from another entity.
		  bindEntityEvents: bindEntityEvents,

		  // Enable unbinding view's events from another entity.
		  unbindEntityEvents: unbindEntityEvents
		};

		function iterateReplies(target, channel, bindings, actionName) {
		  if (!channel || !bindings) {
		    return;
		  }

		  // type-check bindings
		  if (!_.isObject(bindings)) {
		    throw new MarionetteError({
		      message: 'Bindings must be an object.',
		      url: 'marionette.functions.html#marionettebindradiorequests'
		    });
		  }

		  var normalizedRadioRequests = normalizeMethods.call(target, bindings);

		  channel[actionName](normalizedRadioRequests, target);
		}

		function bindRadioRequests(channel, bindings) {
		  iterateReplies(this, channel, bindings, 'reply');
		  return this;
		}

		function unbindRadioRequests(channel, bindings) {
		  iterateReplies(this, channel, bindings, 'stopReplying');
		  return this;
		}

		// MixinOptions
		// - channelName
		// - radioEvents
		// - radioRequests

		var RadioMixin = {

		  _initRadio: function _initRadio() {
		    var channelName = _.result(this, 'channelName');

		    if (!channelName) {
		      return;
		    }

		    var channel = this._channel = Radio.channel(channelName);

		    var radioEvents = _.result(this, 'radioEvents');
		    this.bindRadioEvents(channel, radioEvents);

		    var radioRequests = _.result(this, 'radioRequests');
		    this.bindRadioRequests(channel, radioRequests);

		    this.on('destroy', this._destroyRadio);
		  },

		  _destroyRadio: function _destroyRadio() {
		    this._channel.stopReplying(null, null, this);
		  },

		  getChannel: function getChannel() {
		    return this._channel;
		  },

		  // Proxy `bindRadioEvents`
		  bindRadioEvents: bindEntityEvents,

		  // Proxy `unbindRadioEvents`
		  unbindRadioEvents: unbindEntityEvents,

		  // Proxy `bindRadioRequests`
		  bindRadioRequests: bindRadioRequests,

		  // Proxy `unbindRadioRequests`
		  unbindRadioRequests: unbindRadioRequests

		};

		var ClassOptions = ['channelName', 'radioEvents', 'radioRequests'];

		// A Base Class that other Classes should descend from.
		// Object borrows many conventions and utilities from Backbone.
		var MarionetteObject = function MarionetteObject(options) {
		  this._setOptions(options);
		  this.mergeOptions(options, ClassOptions);
		  this.cid = _.uniqueId(this.cidPrefix);
		  this._initRadio();
		  this.initialize.apply(this, arguments);
		};

		MarionetteObject.extend = extend;

		// Object Methods
		// --------------

		// Ensure it can trigger events with Backbone.Events
		_.extend(MarionetteObject.prototype, Backbone.Events, CommonMixin, RadioMixin, {
		  cidPrefix: 'mno',

		  // for parity with Marionette.AbstractView lifecyle
		  _isDestroyed: false,

		  isDestroyed: function isDestroyed() {
		    return this._isDestroyed;
		  },

		  //this is a noop method intended to be overridden by classes that extend from this base
		  initialize: function initialize() {},

		  destroy: function destroy() {
		    if (this._isDestroyed) {
		      return this;
		    }

		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }

		    this.triggerMethod.apply(this, ['before:destroy', this].concat(args));

		    this._isDestroyed = true;
		    this.triggerMethod.apply(this, ['destroy', this].concat(args));
		    this.stopListening();

		    return this;
		  },

		  triggerMethod: triggerMethod
		});

		// Manage templates stored in `<script>` blocks,
		// caching them for faster access.
		var TemplateCache = function TemplateCache(templateId) {
		  this.templateId = templateId;
		};

		// TemplateCache object-level methods. Manage the template
		// caches from these method calls instead of creating
		// your own TemplateCache instances
		_.extend(TemplateCache, {
		  templateCaches: {},

		  // Get the specified template by id. Either
		  // retrieves the cached version, or loads it
		  // from the DOM.
		  get: function get(templateId, options) {
		    var cachedTemplate = this.templateCaches[templateId];

		    if (!cachedTemplate) {
		      cachedTemplate = new TemplateCache(templateId);
		      this.templateCaches[templateId] = cachedTemplate;
		    }

		    return cachedTemplate.load(options);
		  },

		  // Clear templates from the cache. If no arguments
		  // are specified, clears all templates:
		  // `clear()`
		  //
		  // If arguments are specified, clears each of the
		  // specified templates from the cache:
		  // `clear("#t1", "#t2", "...")`
		  clear: function clear() {
		    var i;

		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }

		    var length = args.length;

		    if (length > 0) {
		      for (i = 0; i < length; i++) {
		        delete this.templateCaches[args[i]];
		      }
		    } else {
		      this.templateCaches = {};
		    }
		  }
		});

		// TemplateCache instance methods, allowing each
		// template cache object to manage its own state
		// and know whether or not it has been loaded
		_.extend(TemplateCache.prototype, {

		  // Internal method to load the template
		  load: function load(options) {
		    // Guard clause to prevent loading this template more than once
		    if (this.compiledTemplate) {
		      return this.compiledTemplate;
		    }

		    // Load the template and compile it
		    var template = this.loadTemplate(this.templateId, options);
		    this.compiledTemplate = this.compileTemplate(template, options);

		    return this.compiledTemplate;
		  },

		  // Load a template from the DOM, by default. Override
		  // this method to provide your own template retrieval
		  // For asynchronous loading with AMD/RequireJS, consider
		  // using a template-loader plugin as described here:
		  // https://github.com/marionettejs/backbone.marionette/wiki/Using-marionette-with-requirejs
		  loadTemplate: function loadTemplate(templateId, options) {
		    var $template = Backbone.$(templateId);

		    if (!$template.length) {
		      throw new MarionetteError({
		        name: 'NoTemplateError',
		        message: 'Could not find template: "' + templateId + '"'
		      });
		    }
		    return $template.html();
		  },

		  // Pre-compile the template before caching it. Override
		  // this method if you do not need to pre-compile a template
		  // (JST / RequireJS for example) or if you want to change
		  // the template engine used (Handebars, etc).
		  compileTemplate: function compileTemplate(rawTemplate, options) {
		    return _.template(rawTemplate, options);
		  }
		});

		// Render a template with data by passing in the template
		// selector and the data to render.
		var Renderer = {

		  // Render a template with data. The `template` parameter is
		  // passed to the `TemplateCache` object to retrieve the
		  // template function. Override this method to provide your own
		  // custom rendering and template handling for all of Marionette.
		  render: function render(template, data) {
		    if (!template) {
		      throw new MarionetteError({
		        name: 'TemplateNotFoundError',
		        message: 'Cannot render the template since its false, null or undefined.'
		      });
		    }

		    var templateFunc = _.isFunction(template) ? template : TemplateCache.get(template);

		    return templateFunc(data);
		  }
		};

		var _invoke = _.invokeMap || _.invoke;

		// MixinOptions
		// - behaviors

		// Takes care of getting the behavior class
		// given options and a key.
		// If a user passes in options.behaviorClass
		// default to using that.
		// If a user passes in a Behavior Class directly, use that
		// Otherwise delegate the lookup to the users `behaviorsLookup` implementation.
		function getBehaviorClass(options, key) {
		  if (options.behaviorClass) {
		    return options.behaviorClass;
		    //treat functions as a Behavior constructor
		  } else if (_.isFunction(options)) {
		      return options;
		    }

		  // behaviorsLookup can be either a flat object or a method
		  if (_.isFunction(Marionette.Behaviors.behaviorsLookup)) {
		    return Marionette.Behaviors.behaviorsLookup(options, key)[key];
		  }

		  return Marionette.Behaviors.behaviorsLookup[key];
		}

		// Iterate over the behaviors object, for each behavior
		// instantiate it and get its grouped behaviors.
		// This accepts a list of behaviors in either an object or array form
		function parseBehaviors(view, behaviors) {
		  return _.chain(behaviors).map(function (options, key) {
		    var BehaviorClass = getBehaviorClass(options, key);
		    //if we're passed a class directly instead of an object
		    var _options = options === BehaviorClass ? {} : options;
		    var behavior = new BehaviorClass(_options, view);
		    var nestedBehaviors = parseBehaviors(view, _.result(behavior, 'behaviors'));

		    return [behavior].concat(nestedBehaviors);
		  }).flatten().value();
		}

		var BehaviorsMixin = {
		  _initBehaviors: function _initBehaviors() {
		    var behaviors = _.result(this, 'behaviors');

		    // Behaviors defined on a view can be a flat object literal
		    // or it can be a function that returns an object.
		    this._behaviors = _.isObject(behaviors) ? parseBehaviors(this, behaviors) : {};
		  },

		  _getBehaviorTriggers: function _getBehaviorTriggers() {
		    var triggers = _invoke(this._behaviors, 'getTriggers');
		    return _.extend.apply(_, [{}].concat(babelHelpers.toConsumableArray(triggers)));
		  },

		  _getBehaviorEvents: function _getBehaviorEvents() {
		    var events = _invoke(this._behaviors, 'getEvents');
		    return _.extend.apply(_, [{}].concat(babelHelpers.toConsumableArray(events)));
		  },

		  // proxy behavior $el to the view's $el.
		  _proxyBehaviorViewProperties: function _proxyBehaviorViewProperties() {
		    _invoke(this._behaviors, 'proxyViewProperties');
		  },

		  // delegate modelEvents and collectionEvents
		  _delegateBehaviorEntityEvents: function _delegateBehaviorEntityEvents() {
		    _invoke(this._behaviors, 'delegateEntityEvents');
		  },

		  // undelegate modelEvents and collectionEvents
		  _undelegateBehaviorEntityEvents: function _undelegateBehaviorEntityEvents() {
		    _invoke(this._behaviors, 'undelegateEntityEvents');
		  },

		  _destroyBehaviors: function _destroyBehaviors(args) {
		    // Call destroy on each behavior after
		    // destroying the view.
		    // This unbinds event listeners
		    // that behaviors have registered for.
		    _invoke.apply(undefined, [this._behaviors, 'destroy'].concat(babelHelpers.toConsumableArray(args)));
		  },

		  _bindBehaviorUIElements: function _bindBehaviorUIElements() {
		    _invoke(this._behaviors, 'bindUIElements');
		  },

		  _unbindBehaviorUIElements: function _unbindBehaviorUIElements() {
		    _invoke(this._behaviors, 'unbindUIElements');
		  },

		  _triggerEventOnBehaviors: function _triggerEventOnBehaviors() {
		    var behaviors = this._behaviors;
		    // Use good ol' for as this is a very hot function

		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }

		    for (var i = 0, length = behaviors && behaviors.length; i < length; i++) {
		      triggerMethod.apply(behaviors[i], args);
		    }
		  }
		};

		// MixinOptions
		// - collectionEvents
		// - modelEvents

		var DelegateEntityEventsMixin = {
		  // Handle `modelEvents`, and `collectionEvents` configuration
		  _delegateEntityEvents: function _delegateEntityEvents(model, collection) {
		    this._undelegateEntityEvents(model, collection);

		    var modelEvents = _.result(this, 'modelEvents');
		    bindEntityEvents.call(this, model, modelEvents);

		    var collectionEvents = _.result(this, 'collectionEvents');
		    bindEntityEvents.call(this, collection, collectionEvents);
		  },

		  _undelegateEntityEvents: function _undelegateEntityEvents(model, collection) {
		    var modelEvents = _.result(this, 'modelEvents');
		    unbindEntityEvents.call(this, model, modelEvents);

		    var collectionEvents = _.result(this, 'collectionEvents');
		    unbindEntityEvents.call(this, collection, collectionEvents);
		  }
		};

		// Borrow event splitter from Backbone
		var delegateEventSplitter = /^(\S+)\s*(.*)$/;

		function uniqueName(eventName, selector) {
		  return [eventName + _.uniqueId('.evt'), selector].join(' ');
		}

		// Set event name to be namespaced using a unique index
		// to generate a non colliding event namespace
		// http://api.jquery.com/event.namespace/
		var getUniqueEventName = function getUniqueEventName(eventName) {
		  var match = eventName.match(delegateEventSplitter);
		  return uniqueName(match[1], match[2]);
		};

		// Internal method to create an event handler for a given `triggerDef` like
		// 'click:foo'
		function buildViewTrigger(view, triggerDef) {
		  if (_.isString(triggerDef)) {
		    triggerDef = { event: triggerDef };
		  }

		  var eventName = triggerDef.event;
		  var shouldPreventDefault = triggerDef.preventDefault !== false;
		  var shouldStopPropagation = triggerDef.stopPropagation !== false;

		  return function (e) {
		    if (shouldPreventDefault) {
		      e.preventDefault();
		    }

		    if (shouldStopPropagation) {
		      e.stopPropagation();
		    }

		    view.triggerMethod(eventName, view);
		  };
		}

		var TriggersMixin = {

		  // Configure `triggers` to forward DOM events to view
		  // events. `triggers: {"click .foo": "do:foo"}`
		  _getViewTriggers: function _getViewTriggers(view, triggers) {
		    // Configure the triggers, prevent default
		    // action and stop propagation of DOM events
		    return _.reduce(triggers, function (events, value, key) {
		      key = getUniqueEventName(key);
		      events[key] = buildViewTrigger(view, value);
		      return events;
		    }, {});
		  }

		};

		// allows for the use of the @ui. syntax within
		// a given key for triggers and events
		// swaps the @ui with the associated selector.
		// Returns a new, non-mutated, parsed events hash.
		var _normalizeUIKeys = function _normalizeUIKeys(hash, ui) {
		  return _.reduce(hash, function (memo, val, key) {
		    var normalizedKey = normalizeUIString(key, ui);
		    memo[normalizedKey] = val;
		    return memo;
		  }, {});
		};

		// utility method for parsing @ui. syntax strings
		// into associated selector
		var normalizeUIString = function normalizeUIString(uiString, ui) {
		  return uiString.replace(/@ui\.[a-zA-Z_$0-9]*/g, function (r) {
		    return ui[r.slice(4)];
		  });
		};

		// allows for the use of the @ui. syntax within
		// a given value for regions
		// swaps the @ui with the associated selector
		var _normalizeUIValues = function _normalizeUIValues(hash, ui, properties) {
		  _.each(hash, function (val, key) {
		    if (_.isString(val)) {
		      hash[key] = normalizeUIString(val, ui);
		    } else if (_.isObject(val) && _.isArray(properties)) {
		      _.extend(val, _normalizeUIValues(_.pick(val, properties), ui));
		      /* Value is an object, and we got an array of embedded property names to normalize. */
		      _.each(properties, function (property) {
		        var propertyVal = val[property];
		        if (_.isString(propertyVal)) {
		          val[property] = normalizeUIString(propertyVal, ui);
		        }
		      });
		    }
		  });
		  return hash;
		};

		var UIMixin = {

		  // normalize the keys of passed hash with the views `ui` selectors.
		  // `{"@ui.foo": "bar"}`
		  normalizeUIKeys: function normalizeUIKeys(hash) {
		    var uiBindings = this._getUIBindings();
		    return _normalizeUIKeys(hash, uiBindings);
		  },

		  // normalize the values of passed hash with the views `ui` selectors.
		  // `{foo: "@ui.bar"}`
		  normalizeUIValues: function normalizeUIValues(hash, properties) {
		    var uiBindings = this._getUIBindings();
		    return _normalizeUIValues(hash, uiBindings, properties);
		  },

		  _getUIBindings: function _getUIBindings() {
		    var uiBindings = _.result(this, '_uiBindings');
		    var ui = _.result(this, 'ui');
		    return uiBindings || ui;
		  },

		  // This method binds the elements specified in the "ui" hash inside the view's code with
		  // the associated jQuery selectors.
		  _bindUIElements: function _bindUIElements() {
		    var _this = this;

		    if (!this.ui) {
		      return;
		    }

		    // store the ui hash in _uiBindings so they can be reset later
		    // and so re-rendering the view will be able to find the bindings
		    if (!this._uiBindings) {
		      this._uiBindings = this.ui;
		    }

		    // get the bindings result, as a function or otherwise
		    var bindings = _.result(this, '_uiBindings');

		    // empty the ui so we don't have anything to start with
		    this._ui = {};

		    // bind each of the selectors
		    _.each(bindings, function (selector, key) {
		      _this._ui[key] = _this.$(selector);
		    });

		    this.ui = this._ui;
		  },

		  _unbindUIElements: function _unbindUIElements() {
		    var _this2 = this;

		    if (!this.ui || !this._uiBindings) {
		      return;
		    }

		    // delete all of the existing ui bindings
		    _.each(this.ui, function ($el, name) {
		      delete _this2.ui[name];
		    });

		    // reset the ui element to the original bindings configuration
		    this.ui = this._uiBindings;
		    delete this._uiBindings;
		    delete this._ui;
		  },

		  _getUI: function _getUI(name) {
		    return this._ui[name];
		  }
		};

		// MixinOptions
		// - behaviors
		// - childViewEventPrefix
		// - childViewEvents
		// - childViewTriggers
		// - collectionEvents
		// - modelEvents
		// - triggers
		// - ui

		var ViewMixin = {
		  supportsRenderLifecycle: true,
		  supportsDestroyLifecycle: true,

		  _isDestroyed: false,

		  isDestroyed: function isDestroyed() {
		    return !!this._isDestroyed;
		  },


		  _isRendered: false,

		  isRendered: function isRendered() {
		    return !!this._isRendered;
		  },


		  _isAttached: false,

		  isAttached: function isAttached() {
		    return !!this._isAttached;
		  },


		  // Overriding Backbone.View's `setElement` to handle
		  // if an el was previously defined. If so, the view might be
		  // rendered or attached on setElement.
		  setElement: function setElement() {
		    var hasEl = !!this.el;

		    Backbone.View.prototype.setElement.apply(this, arguments);

		    if (hasEl) {
		      this._isRendered = !!this.$el.length;
		      this._isAttached = isNodeAttached(this.el);
		    }

		    return this;
		  },


		  // Overriding Backbone.View's `delegateEvents` to handle
		  // `events` and `triggers`
		  delegateEvents: function delegateEvents(eventsArg) {

		    this._proxyBehaviorViewProperties();
		    this._buildEventProxies();

		    var viewEvents = this._getEvents(eventsArg);

		    if (typeof eventsArg === 'undefined') {
		      this.events = viewEvents;
		    }

		    var combinedEvents = _.extend({}, this._getBehaviorEvents(), viewEvents, this._getBehaviorTriggers(), this.getTriggers());

		    Backbone.View.prototype.delegateEvents.call(this, combinedEvents);

		    return this;
		  },


		  _getEvents: function _getEvents(eventsArg) {
		    var events = eventsArg || this.events;

		    if (_.isFunction(events)) {
		      return this.normalizeUIKeys(events());
		    }

		    return this.normalizeUIKeys(events);
		  },

		  // Configure `triggers` to forward DOM events to view
		  // events. `triggers: {"click .foo": "do:foo"}`
		  getTriggers: function getTriggers() {
		    if (!this.triggers) {
		      return;
		    }

		    // Allow `triggers` to be configured as a function
		    var triggers = this.normalizeUIKeys(_.result(this, 'triggers'));

		    // Configure the triggers, prevent default
		    // action and stop propagation of DOM events
		    return this._getViewTriggers(this, triggers);
		  },


		  // Handle `modelEvents`, and `collectionEvents` configuration
		  delegateEntityEvents: function delegateEntityEvents() {
		    this._delegateEntityEvents(this.model, this.collection);

		    // bind each behaviors model and collection events
		    this._delegateBehaviorEntityEvents();

		    return this;
		  },


		  // Handle unbinding `modelEvents`, and `collectionEvents` configuration
		  undelegateEntityEvents: function undelegateEntityEvents() {
		    this._undelegateEntityEvents(this.model, this.collection);

		    // unbind each behaviors model and collection events
		    this._undelegateBehaviorEntityEvents();

		    return this;
		  },


		  // Internal helper method to verify whether the view hasn't been destroyed
		  _ensureViewIsIntact: function _ensureViewIsIntact() {
		    if (this._isDestroyed) {
		      throw new MarionetteError({
		        name: 'ViewDestroyedError',
		        message: 'View (cid: "' + this.cid + '") has already been destroyed and cannot be used.'
		      });
		    }
		  },


		  // Handle destroying the view and its children.
		  destroy: function destroy() {
		    if (this._isDestroyed) {
		      return this;
		    }
		    var shouldTriggerDetach = !!this._isAttached;

		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }

		    this.triggerMethod.apply(this, ['before:destroy', this].concat(args));
		    if (shouldTriggerDetach) {
		      this.triggerMethod('before:detach', this);
		    }

		    // unbind UI elements
		    this.unbindUIElements();

		    // remove the view from the DOM
		    // https://github.com/jashkenas/backbone/blob/1.2.3/backbone.js#L1235
		    this._removeElement();

		    if (shouldTriggerDetach) {
		      this._isAttached = false;
		      this.triggerMethod('detach', this);
		    }

		    // remove children after the remove to prevent extra paints
		    this._removeChildren();

		    this._destroyBehaviors(args);

		    this._isDestroyed = true;
		    this._isRendered = false;
		    this.triggerMethod.apply(this, ['destroy', this].concat(args));

		    this.stopListening();

		    return this;
		  },
		  bindUIElements: function bindUIElements() {
		    this._bindUIElements();
		    this._bindBehaviorUIElements();

		    return this;
		  },


		  // This method unbinds the elements specified in the "ui" hash
		  unbindUIElements: function unbindUIElements() {
		    this._unbindUIElements();
		    this._unbindBehaviorUIElements();

		    return this;
		  },
		  getUI: function getUI(name) {
		    this._ensureViewIsIntact();
		    return this._getUI(name);
		  },


		  // used as the prefix for child view events
		  // that are forwarded through the layoutview
		  childViewEventPrefix: 'childview',

		  // import the `triggerMethod` to trigger events with corresponding
		  // methods if the method exists
		  triggerMethod: function triggerMethod$$() {
		    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		      args[_key2] = arguments[_key2];
		    }

		    var ret = triggerMethod.apply(this, args);

		    this._triggerEventOnBehaviors.apply(this, args);
		    this._triggerEventOnParentLayout.apply(this, args);

		    return ret;
		  },


		  // Cache `childViewEvents` and `childViewTriggers`
		  _buildEventProxies: function _buildEventProxies() {
		    this._childViewEvents = _.result(this, 'childViewEvents');
		    this._childViewTriggers = _.result(this, 'childViewTriggers');
		  },

		  _triggerEventOnParentLayout: function _triggerEventOnParentLayout(eventName) {
		    var layoutView = this._parentView();
		    if (!layoutView) {
		      return;
		    }

		    // invoke triggerMethod on parent view
		    var eventPrefix = _.result(layoutView, 'childViewEventPrefix');
		    var prefixedEventName = eventPrefix + ':' + eventName;

		    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
		      args[_key3 - 1] = arguments[_key3];
		    }

		    layoutView.triggerMethod.apply(layoutView, [prefixedEventName].concat(args));

		    // use the parent view's childViewEvents handler
		    var childViewEvents = layoutView.normalizeMethods(layoutView._childViewEvents);

		    if (!!childViewEvents && _.isFunction(childViewEvents[eventName])) {
		      childViewEvents[eventName].apply(layoutView, args);
		    }

		    // use the parent view's proxyEvent handlers
		    var childViewTriggers = layoutView._childViewTriggers;

		    // Call the event with the proxy name on the parent layout
		    if (childViewTriggers && _.isString(childViewTriggers[eventName])) {
		      layoutView.triggerMethod.apply(layoutView, [childViewTriggers[eventName]].concat(args));
		    }
		  },


		  // Walk the _parent tree until we find a view (if one exists).
		  // Returns the parent view hierarchically closest to this view.
		  _parentView: function _parentView() {
		    var parent = this._parent;

		    while (parent) {
		      if (parent instanceof View) {
		        return parent;
		      }
		      parent = parent._parent;
		    }
		  }
		};

		_.extend(ViewMixin, BehaviorsMixin, CommonMixin, DelegateEntityEventsMixin, TriggersMixin, UIMixin);

		function destroyBackboneView(view) {
		  if (!view.supportsDestroyLifecycle) {
		    triggerMethodOn(view, 'before:destroy', view);
		  }

		  var shouldTriggerDetach = !!view._isAttached;

		  if (shouldTriggerDetach) {
		    triggerMethodOn(view, 'before:detach', view);
		  }

		  view.remove();

		  if (shouldTriggerDetach) {
		    view._isAttached = false;
		    triggerMethodOn(view, 'detach', view);
		  }

		  view._isDestroyed = true;

		  if (!view.supportsDestroyLifecycle) {
		    triggerMethodOn(view, 'destroy', view);
		  }
		}

		var ClassOptions$2 = ['allowMissingEl', 'parentEl', 'replaceElement'];

		var Region = MarionetteObject.extend({
		  cidPrefix: 'mnr',
		  replaceElement: false,
		  _isReplaced: false,

		  constructor: function constructor(options) {
		    this._setOptions(options);

		    this.mergeOptions(options, ClassOptions$2);

		    // getOption necessary because options.el may be passed as undefined
		    this._initEl = this.el = this.getOption('el');

		    // Handle when this.el is passed in as a $ wrapped element.
		    this.el = this.el instanceof Backbone.$ ? this.el[0] : this.el;

		    if (!this.el) {
		      throw new MarionetteError({
		        name: 'NoElError',
		        message: 'An "el" must be specified for a region.'
		      });
		    }

		    this.$el = this.getEl(this.el);
		    MarionetteObject.call(this, options);
		  },


		  // Displays a backbone view instance inside of the region. Handles calling the `render`
		  // method for you. Reads content directly from the `el` attribute. The `preventDestroy`
		  // option can be used to prevent a view from the old view being destroyed on show.
		  show: function show(view, options) {
		    if (!this._ensureElement(options)) {
		      return;
		    }
		    this._ensureView(view);
		    if (view === this.currentView) {
		      return this;
		    }

		    this.triggerMethod('before:show', this, view, options);

		    monitorViewEvents(view);

		    this.empty(options);

		    // We need to listen for if a view is destroyed in a way other than through the region.
		    // If this happens we need to remove the reference to the currentView since once a view
		    // has been destroyed we can not reuse it.
		    view.on('destroy', this.empty, this);

		    // Make this region the view's parent.
		    // It's important that this parent binding happens before rendering so that any events
		    // the child may trigger during render can also be triggered on the child's ancestor views.
		    view._parent = this;

		    this._renderView(view);

		    this._attachView(view, options);

		    this.triggerMethod('show', this, view, options);
		    return this;
		  },
		  _renderView: function _renderView(view) {
		    if (view._isRendered) {
		      return;
		    }

		    if (!view.supportsRenderLifecycle) {
		      triggerMethodOn(view, 'before:render', view);
		    }

		    view.render();

		    if (!view.supportsRenderLifecycle) {
		      view._isRendered = true;
		      triggerMethodOn(view, 'render', view);
		    }
		  },
		  _attachView: function _attachView(view) {
		    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		    var shouldTriggerAttach = !view._isAttached && isNodeAttached(this.el);
		    var shouldReplaceEl = typeof options.replaceElement === 'undefined' ? !!_.result(this, 'replaceElement') : !!options.replaceElement;

		    if (shouldTriggerAttach) {
		      triggerMethodOn(view, 'before:attach', view);
		    }

		    this.attachHtml(view, shouldReplaceEl);

		    if (shouldTriggerAttach) {
		      view._isAttached = true;
		      triggerMethodOn(view, 'attach', view);
		    }

		    this.currentView = view;
		  },
		  _ensureElement: function _ensureElement() {
		    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		    if (!_.isObject(this.el)) {
		      this.$el = this.getEl(this.el);
		      this.el = this.$el[0];
		    }

		    if (!this.$el || this.$el.length === 0) {
		      var allowMissingEl = typeof options.allowMissingEl === 'undefined' ? !!_.result(this, 'allowMissingEl') : !!options.allowMissingEl;

		      if (allowMissingEl) {
		        return false;
		      } else {
		        throw new MarionetteError('An "el" must exist in DOM for this region ' + this.cid);
		      }
		    }
		    return true;
		  },
		  _ensureView: function _ensureView(view) {
		    if (!view) {
		      throw new MarionetteError({
		        name: 'ViewNotValid',
		        message: 'The view passed is undefined and therefore invalid. You must pass a view instance to show.'
		      });
		    }

		    if (view._isDestroyed) {
		      throw new MarionetteError({
		        name: 'ViewDestroyedError',
		        message: 'View (cid: "' + view.cid + '") has already been destroyed and cannot be used.'
		      });
		    }
		  },


		  // Override this method to change how the region finds the DOM element that it manages. Return
		  // a jQuery selector object scoped to a provided parent el or the document if none exists.
		  getEl: function getEl(el) {
		    return Backbone.$(el, _.result(this, 'parentEl'));
		  },
		  _replaceEl: function _replaceEl(view) {
		    // always restore the el to ensure the regions el is present before replacing
		    this._restoreEl();

		    var parent = this.el.parentNode;

		    parent.replaceChild(view.el, this.el);
		    this._isReplaced = true;
		  },


		  // Restore the region's element in the DOM.
		  _restoreEl: function _restoreEl() {
		    if (!this.currentView) {
		      return;
		    }

		    var view = this.currentView;
		    var parent = view.el.parentNode;

		    if (!parent) {
		      return;
		    }

		    parent.replaceChild(this.el, view.el);
		    this._isReplaced = false;
		  },
		  isReplaced: function isReplaced() {
		    return !!this._isReplaced;
		  },


		  // Override this method to change how the new view is appended to the `$el` that the
		  // region is managing
		  attachHtml: function attachHtml(view, shouldReplace) {
		    if (shouldReplace) {
		      // replace the region's node with the view's node
		      this._replaceEl(view);
		    } else {
		      this.el.appendChild(view.el);
		    }
		  },


		  // Destroy the current view, if there is one. If there is no current view, it does
		  // nothing and returns immediately.
		  empty: function empty() {
		    var options = arguments.length <= 0 || arguments[0] === undefined ? { allowMissingEl: true } : arguments[0];

		    var view = this.currentView;

		    // If there is no view in the region we should only detach current html
		    if (!view) {
		      if (this._ensureElement(options)) {
		        this.detachHtml();
		      }
		      return this;
		    }

		    view.off('destroy', this.empty, this);
		    this.triggerMethod('before:empty', this, view);

		    if (this._isReplaced) {
		      this._restoreEl();
		    }

		    delete this.currentView;

		    if (!view._isDestroyed) {
		      this._removeView(view, options);
		    }

		    delete view._parent;

		    this.triggerMethod('empty', this, view);
		    return this;
		  },
		  _removeView: function _removeView(view) {
		    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		    var preventDestroy = _ref.preventDestroy;

		    var shouldPreventDestroy = !!preventDestroy;

		    if (shouldPreventDestroy) {
		      this._detachView(view);
		      return;
		    }

		    if (view.destroy) {
		      view.destroy();
		    } else {
		      destroyBackboneView(view);
		    }
		  },
		  _detachView: function _detachView(view) {
		    var shouldTriggerDetach = !!view._isAttached;

		    if (shouldTriggerDetach) {
		      triggerMethodOn(view, 'before:detach', view);
		    }

		    this.detachHtml();

		    if (shouldTriggerDetach) {
		      view._isAttached = false;
		      triggerMethodOn(view, 'detach', view);
		    }
		  },


		  // Override this method to change how the region detaches current content
		  detachHtml: function detachHtml() {
		    this.$el.contents().detach();
		  },


		  // Checks whether a view is currently present within the region. Returns `true` if there is
		  // and `false` if no view is present.
		  hasView: function hasView() {
		    return !!this.currentView;
		  },


		  // Reset the region by destroying any existing view and clearing out the cached `$el`.
		  // The next time a view is shown via this region, the region will re-query the DOM for
		  // the region's `el`.
		  reset: function reset(options) {
		    this.empty(options);

		    if (this.$el) {
		      this.el = this._initEl;
		    }

		    delete this.$el;
		    return this;
		  },


		  destroy: function destroy(options) {
		    this.reset(options);
		    return MarionetteObject.prototype.destroy.apply(this, arguments);
		  }
		});

		// MixinOptions
		// - regions
		// - regionClass

		var RegionsMixin = {
		  regionClass: Region,

		  // Internal method to initialize the regions that have been defined in a
		  // `regions` attribute on this View.
		  _initRegions: function _initRegions() {

		    // init regions hash
		    this.regions = this.regions || {};
		    this._regions = {};

		    this.addRegions(_.result(this, 'regions'));
		  },

		  // Internal method to re-initialize all of the regions by updating
		  // the `el` that they point to
		  _reInitRegions: function _reInitRegions() {
		    _invoke(this._regions, 'reset');
		  },

		  // Add a single region, by name, to the View
		  addRegion: function addRegion(name, definition) {
		    var regions = {};
		    regions[name] = definition;
		    return this.addRegions(regions)[name];
		  },

		  // Add multiple regions as a {name: definition, name2: def2} object literal
		  addRegions: function addRegions(regions) {
		    // If there's nothing to add, stop here.
		    if (_.isEmpty(regions)) {
		      return;
		    }

		    // Normalize region selectors hash to allow
		    // a user to use the @ui. syntax.
		    regions = this.normalizeUIValues(regions, ['selector', 'el']);

		    // Add the regions definitions to the regions property
		    this.regions = _.extend({}, this.regions, regions);

		    return this._addRegions(regions);
		  },

		  // internal method to build and add regions
		  _addRegions: function _addRegions(regionDefinitions) {
		    var _this = this;

		    return _.reduce(regionDefinitions, function (regions, definition, name) {
		      regions[name] = _this._buildRegion(definition);
		      _this._addRegion(regions[name], name);
		      return regions;
		    }, {});
		  },

		  // return the region instance from the definition
		  _buildRegion: function _buildRegion(definition) {
		    if (definition instanceof Region) {
		      return definition;
		    }

		    return this._buildRegionFromDefinition(definition);
		  },

		  _buildRegionFromDefinition: function _buildRegionFromDefinition(definition) {
		    if (_.isString(definition)) {
		      return this._buildRegionFromObject({ el: definition });
		    }

		    if (_.isFunction(definition)) {
		      return this._buildRegionFromRegionClass(definition);
		    }

		    if (_.isObject(definition)) {
		      return this._buildRegionFromObject(definition);
		    }

		    throw new MarionetteError({
		      message: 'Improper region configuration type.',
		      url: 'marionette.region.html#region-configuration-types'
		    });
		  },

		  _buildRegionFromObject: function _buildRegionFromObject(definition) {
		    var RegionClass = definition.regionClass || this.regionClass;

		    var options = _.omit(definition, 'regionClass');

		    _.defaults(options, {
		      el: definition.selector,
		      parentEl: _.partial(_.result, this, 'el')
		    });

		    return new RegionClass(options);
		  },

		  // Build the region directly from a given `RegionClass`
		  _buildRegionFromRegionClass: function _buildRegionFromRegionClass(RegionClass) {
		    return new RegionClass({
		      parentEl: _.partial(_.result, this, 'el')
		    });
		  },

		  _addRegion: function _addRegion(region, name) {
		    this.triggerMethod('before:add:region', this, name, region);

		    region._parent = this;

		    this._regions[name] = region;

		    this.triggerMethod('add:region', this, name, region);
		  },

		  // Remove a single region from the View, by name
		  removeRegion: function removeRegion(name) {
		    var region = this._regions[name];

		    this._removeRegion(region, name);

		    return region;
		  },

		  // Remove all regions from the View
		  removeRegions: function removeRegions() {
		    var regions = this.getRegions();

		    _.each(this._regions, _.bind(this._removeRegion, this));

		    return regions;
		  },

		  _removeRegion: function _removeRegion(region, name) {
		    this.triggerMethod('before:remove:region', this, name, region);

		    region.empty();
		    region.stopListening();

		    delete this.regions[name];
		    delete this._regions[name];

		    this.triggerMethod('remove:region', this, name, region);
		  },

		  // Empty all regions in the region manager, but
		  // leave them attached
		  emptyRegions: function emptyRegions() {
		    var regions = this.getRegions();
		    _invoke(regions, 'empty');
		    return regions;
		  },

		  // Checks to see if view contains region
		  // Accepts the region name
		  // hasRegion('main')
		  hasRegion: function hasRegion(name) {
		    return !!this.getRegion(name);
		  },

		  // Provides access to regions
		  // Accepts the region name
		  // getRegion('main')
		  getRegion: function getRegion(name) {
		    return this._regions[name];
		  },

		  // Get all regions
		  getRegions: function getRegions() {
		    return _.clone(this._regions);
		  },

		  showChildView: function showChildView(name, view) {
		    var region = this.getRegion(name);

		    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		      args[_key - 2] = arguments[_key];
		    }

		    return region.show.apply(region, [view].concat(args));
		  },

		  getChildView: function getChildView(name) {
		    return this.getRegion(name).currentView;
		  }

		};

		var ClassOptions$1 = ['behaviors', 'childViewEventPrefix', 'childViewEvents', 'childViewTriggers', 'collectionEvents', 'events', 'modelEvents', 'regionClass', 'regions', 'template', 'templateContext', 'triggers', 'ui'];

		// The standard view. Includes view events, automatic rendering
		// of Underscore templates, nested views, and more.
		var View = Backbone.View.extend({
		  constructor: function constructor(options) {
		    this.render = _.bind(this.render, this);

		    this._setOptions(options);

		    this.mergeOptions(options, ClassOptions$1);

		    monitorViewEvents(this);

		    this._initBehaviors();
		    this._initRegions();

		    var args = Array.prototype.slice.call(arguments);
		    args[0] = this.options;
		    Backbone.View.prototype.constructor.apply(this, args);

		    this.delegateEntityEvents();
		  },


		  // Serialize the view's model *or* collection, if
		  // it exists, for the template
		  serializeData: function serializeData() {
		    if (!this.model && !this.collection) {
		      return {};
		    }

		    // If we have a model, we serialize that
		    if (this.model) {
		      return this.serializeModel();
		    }

		    // Otherwise, we serialize the collection,
		    // making it available under the `items` property
		    return {
		      items: this.serializeCollection()
		    };
		  },


		  // Prepares the special `model` property of a view
		  // for being displayed in the template. By default
		  // we simply clone the attributes. Override this if
		  // you need a custom transformation for your view's model
		  serializeModel: function serializeModel() {
		    if (!this.model) {
		      return {};
		    }
		    return _.clone(this.model.attributes);
		  },


		  // Serialize a collection by cloning each of
		  // its model's attributes
		  serializeCollection: function serializeCollection() {
		    if (!this.collection) {
		      return {};
		    }
		    return this.collection.map(function (model) {
		      return _.clone(model.attributes);
		    });
		  },


		  // Render the view, defaulting to underscore.js templates.
		  // You can override this in your view definition to provide
		  // a very specific rendering for your view. In general, though,
		  // you should override the `Marionette.Renderer` object to
		  // change how Marionette renders views.
		  // Subsequent renders after the first will re-render all nested
		  // views.
		  render: function render() {
		    this._ensureViewIsIntact();

		    this.triggerMethod('before:render', this);

		    // If this is not the first render call, then we need to
		    // re-initialize the `el` for each region
		    if (this._isRendered) {
		      this._reInitRegions();
		    }

		    this._renderTemplate();
		    this.bindUIElements();

		    this._isRendered = true;
		    this.triggerMethod('render', this);

		    return this;
		  },


		  // Internal method to render the template with the serialized data
		  // and template context via the `Marionette.Renderer` object.
		  _renderTemplate: function _renderTemplate() {
		    var template = this.getTemplate();

		    // Allow template-less views
		    if (template === false) {
		      return;
		    }

		    // Add in entity data and template context
		    var data = this.mixinTemplateContext(this.serializeData());

		    // Render and add to el
		    var html = Renderer.render(template, data, this);
		    this.attachElContent(html);
		  },


		  // Get the template for this view
		  // instance. You can set a `template` attribute in the view
		  // definition or pass a `template: "whatever"` parameter in
		  // to the constructor options.
		  getTemplate: function getTemplate() {
		    return this.template;
		  },


		  // Mix in template context methods. Looks for a
		  // `templateContext` attribute, which can either be an
		  // object literal, or a function that returns an object
		  // literal. All methods and attributes from this object
		  // are copies to the object passed in.
		  mixinTemplateContext: function mixinTemplateContext() {
		    var target = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		    var templateContext = _.result(this, 'templateContext');
		    return _.extend(target, templateContext);
		  },

		  // Attaches the content of a given view.
		  // This method can be overridden to optimize rendering,
		  // or to render in a non standard way.
		  //
		  // For example, using `innerHTML` instead of `$el.html`
		  //
		  // ```js
		  // attachElContent(html) {
		  //   this.el.innerHTML = html;
		  //   return this;
		  // }
		  // ```
		  attachElContent: function attachElContent(html) {
		    this.$el.html(html);

		    return this;
		  },


		  // called by ViewMixin destroy
		  _removeChildren: function _removeChildren() {
		    this.removeRegions();
		  },


		  _getImmediateChildren: function _getImmediateChildren() {
		    return _.chain(this.getRegions()).map('currentView').compact().value();
		  }
		});

		_.extend(View.prototype, ViewMixin, RegionsMixin);

		var ClassOptions$3 = ['behaviors', 'childView', 'childViewEventPrefix', 'childViewEvents', 'childViewOptions', 'childViewTriggers', 'collectionEvents', 'events', 'filter', 'emptyView', 'emptyViewOptions', 'modelEvents', 'reorderOnSort', 'sort', 'triggers', 'ui', 'viewComparator'];

		// A view that iterates over a Backbone.Collection
		// and renders an individual child view for each model.
		var CollectionView = Backbone.View.extend({

		  // flag for maintaining the sorted order of the collection
		  sort: true,

		  // constructor
		  // option to pass `{sort: false}` to prevent the `CollectionView` from
		  // maintaining the sorted order of the collection.
		  // This will fallback onto appending childView's to the end.
		  //
		  // option to pass `{comparator: compFunction()}` to allow the `CollectionView`
		  // to use a custom sort order for the collection.
		  constructor: function constructor(options) {
		    this.render = _.bind(this.render, this);

		    this._setOptions(options);

		    this.mergeOptions(options, ClassOptions$3);

		    monitorViewEvents(this);

		    this._initBehaviors();
		    this.once('render', this._initialEvents);
		    this._initChildViewStorage();
		    this._bufferedChildren = [];

		    var args = Array.prototype.slice.call(arguments);
		    args[0] = this.options;
		    Backbone.View.prototype.constructor.apply(this, args);

		    this.delegateEntityEvents();
		  },


		  // Instead of inserting elements one by one into the page, it's much more performant to insert
		  // elements into a document fragment and then insert that document fragment into the page
		  _startBuffering: function _startBuffering() {
		    this._isBuffering = true;
		  },
		  _endBuffering: function _endBuffering() {
		    var shouldTriggerAttach = !!this._isAttached;
		    var triggerOnChildren = shouldTriggerAttach ? this._getImmediateChildren() : [];

		    this._isBuffering = false;

		    _.each(triggerOnChildren, function (child) {
		      triggerMethodOn(child, 'before:attach', child);
		    });

		    this.attachBuffer(this, this._createBuffer());

		    _.each(triggerOnChildren, function (child) {
		      child._isAttached = true;
		      triggerMethodOn(child, 'attach', child);
		    });

		    this._bufferedChildren = [];
		  },
		  _getImmediateChildren: function _getImmediateChildren() {
		    return _.values(this.children._views);
		  },


		  // Configured the initial events that the collection view binds to.
		  _initialEvents: function _initialEvents() {
		    if (this.collection) {
		      this.listenTo(this.collection, 'add', this._onCollectionAdd);
		      this.listenTo(this.collection, 'remove', this._onCollectionRemove);
		      this.listenTo(this.collection, 'reset', this.render);

		      if (this.sort) {
		        this.listenTo(this.collection, 'sort', this._sortViews);
		      }
		    }
		  },


		  // Handle a child added to the collection
		  _onCollectionAdd: function _onCollectionAdd(child, collection, opts) {
		    // `index` is present when adding with `at` since BB 1.2; indexOf fallback for < 1.2
		    var index = opts.at !== undefined && (opts.index || collection.indexOf(child));

		    // When filtered or when there is no initial index, calculate index.
		    if (this.filter || index === false) {
		      index = _.indexOf(this._filteredSortedModels(index), child);
		    }

		    if (this._shouldAddChild(child, index)) {
		      this._destroyEmptyView();
		      var ChildView = this._getChildView(child);
		      this._addChild(child, ChildView, index);
		    }
		  },


		  // get the child view by model it holds, and remove it
		  _onCollectionRemove: function _onCollectionRemove(model) {
		    var view = this.children.findByModel(model);
		    this.removeChildView(view);
		    this._checkEmpty();
		  },


		  // Render children views. Override this method to provide your own implementation of a
		  // render function for the collection view.
		  render: function render() {
		    this._ensureViewIsIntact();
		    this.triggerMethod('before:render', this);
		    this._renderChildren();
		    this._isRendered = true;
		    this.triggerMethod('render', this);
		    return this;
		  },


		  // An efficient rendering used for filtering. Instead of modifying the whole DOM for the
		  // collection view, we are only adding or removing the related childrenViews.
		  setFilter: function setFilter(filter) {
		    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		    var preventRender = _ref.preventRender;

		    var canBeRendered = this._isRendered && !this._isDestroyed;
		    var filterChanged = this.filter !== filter;
		    var shouldRender = canBeRendered && filterChanged && !preventRender;

		    if (shouldRender) {
		      this.triggerMethod('before:apply:filter', this);
		      var previousModels = this._filteredSortedModels();
		      this.filter = filter;
		      var models = this._filteredSortedModels();
		      this._applyModelDeltas(models, previousModels);
		      this.triggerMethod('apply:filter', this);
		    } else {
		      this.filter = filter;
		    }
		    return this;
		  },


		  // `removeFilter` is actually an alias for removing filters.
		  removeFilter: function removeFilter(options) {
		    this.setFilter(null, options);
		    return this;
		  },


		  // Calculate and apply difference by cid between `models` and `previousModels`.
		  _applyModelDeltas: function _applyModelDeltas(models, previousModels) {
		    var _this = this;

		    var currentIds = {};
		    _.each(models, function (model, index) {
		      var addedChildNotExists = !_this.children.findByModel(model);
		      if (addedChildNotExists) {
		        _this._onCollectionAdd(model, _this.collection, { at: index });
		      }
		      currentIds[model.cid] = true;
		    });
		    _.each(previousModels, function (prevModel) {
		      var removedChildExists = !currentIds[prevModel.cid] && _this.children.findByModel(prevModel);
		      if (removedChildExists) {
		        _this._onCollectionRemove(prevModel);
		      }
		    });
		  },


		  // Reorder DOM after sorting. When your element's rendering do not use their index,
		  // you can pass reorderOnSort: true to only reorder the DOM after a sort instead of
		  // rendering all the collectionView.
		  reorder: function reorder() {
		    var _this2 = this;

		    var children = this.children;
		    var models = this._filteredSortedModels();

		    if (!models.length && this._showingEmptyView) {
		      return this;
		    }

		    var anyModelsAdded = _.some(models, function (model) {
		      return !children.findByModel(model);
		    });

		    // If there are any new models added due to filtering we need to add child views,
		    // so render as normal.
		    if (anyModelsAdded) {
		      this.render();
		    } else {
		      (function () {
		        // Get the DOM nodes in the same order as the models.
		        var elsToReorder = _.map(models, function (model, index) {
		          var view = children.findByModel(model);
		          view._index = index;
		          return view.el;
		        });

		        // Find the views that were children before but aren't in this new ordering.
		        var filteredOutViews = children.filter(function (view) {
		          return !_.contains(elsToReorder, view.el);
		        });

		        _this2.triggerMethod('before:reorder', _this2);

		        // Since append moves elements that are already in the DOM, appending the elements
		        // will effectively reorder them.
		        _this2._appendReorderedChildren(elsToReorder);

		        // remove any views that have been filtered out
		        _.each(filteredOutViews, _.bind(_this2.removeChildView, _this2));
		        _this2._checkEmpty();

		        _this2.triggerMethod('reorder', _this2);
		      })();
		    }
		    return this;
		  },


		  // Render view after sorting. Override this method to change how the view renders
		  // after a `sort` on the collection.
		  resortView: function resortView() {
		    if (this.reorderOnSort) {
		      this.reorder();
		    } else {
		      this._renderChildren();
		    }
		    return this;
		  },


		  // Internal method. This checks for any changes in the order of the collection.
		  // If the index of any view doesn't match, it will render.
		  _sortViews: function _sortViews() {
		    var _this3 = this;

		    var models = this._filteredSortedModels();

		    // check for any changes in sort order of views
		    var orderChanged = _.find(models, function (item, index) {
		      var view = _this3.children.findByModel(item);
		      return !view || view._index !== index;
		    });

		    if (orderChanged) {
		      this.resortView();
		    }
		  },


		  // Internal reference to what index a `emptyView` is.
		  _emptyViewIndex: -1,

		  // Internal method. Separated so that CompositeView can append to the childViewContainer
		  // if necessary
		  _appendReorderedChildren: function _appendReorderedChildren(children) {
		    this.$el.append(children);
		  },


		  // Internal method. Separated so that CompositeView can have more control over events
		  // being triggered, around the rendering process
		  _renderChildren: function _renderChildren() {
		    this._destroyEmptyView();
		    this._destroyChildren({ checkEmpty: false });

		    var models = this._filteredSortedModels();
		    if (this.isEmpty({ processedModels: models })) {
		      this._showEmptyView();
		    } else {
		      this.triggerMethod('before:render:children', this);
		      this._startBuffering();
		      this._showCollection(models);
		      this._endBuffering();
		      this.triggerMethod('render:children', this);
		    }
		  },


		  // Internal method to loop through collection and show each child view.
		  _showCollection: function _showCollection(models) {
		    var _this4 = this;

		    _.each(models, function (child, index) {
		      var ChildView = _this4._getChildView(child);
		      _this4._addChild(child, ChildView, index);
		    });
		  },


		  // Allow the collection to be sorted by a custom view comparator
		  _filteredSortedModels: function _filteredSortedModels(addedAt) {
		    if (!this.collection) {
		      return [];
		    }

		    var viewComparator = this.getViewComparator();
		    var models = this.collection.models;
		    addedAt = Math.min(Math.max(addedAt, 0), models.length - 1);

		    if (viewComparator) {
		      var addedModel = void 0;
		      // Preserve `at` location, even for a sorted view
		      if (addedAt) {
		        addedModel = models[addedAt];
		        models = models.slice(0, addedAt).concat(models.slice(addedAt + 1));
		      }
		      models = this._sortModelsBy(models, viewComparator);
		      if (addedModel) {
		        models.splice(addedAt, 0, addedModel);
		      }
		    }

		    // Filter after sorting in case the filter uses the index
		    models = this._filterModels(models);

		    return models;
		  },
		  getViewComparator: function getViewComparator() {
		    return this.viewComparator;
		  },


		  // Filter an array of models, if a filter exists
		  _filterModels: function _filterModels(models) {
		    var _this5 = this;

		    if (this.filter) {
		      models = _.filter(models, function (model, index) {
		        return _this5._shouldAddChild(model, index);
		      });
		    }
		    return models;
		  },
		  _sortModelsBy: function _sortModelsBy(models, comparator) {
		    if (typeof comparator === 'string') {
		      return _.sortBy(models, function (model) {
		        return model.get(comparator);
		      });
		    } else if (comparator.length === 1) {
		      return _.sortBy(models, _.bind(comparator, this));
		    } else {
		      return models.sort(_.bind(comparator, this));
		    }
		  },


		  // Internal method to show an empty view in place of a collection of child views,
		  // when the collection is empty
		  _showEmptyView: function _showEmptyView() {
		    var EmptyView = this.getEmptyView();

		    if (EmptyView && !this._showingEmptyView) {
		      this._showingEmptyView = true;

		      var model = new Backbone.Model();
		      var emptyViewOptions = this.emptyViewOptions || this.childViewOptions;
		      if (_.isFunction(emptyViewOptions)) {
		        emptyViewOptions = emptyViewOptions.call(this, model, this._emptyViewIndex);
		      }

		      var view = this.buildChildView(model, EmptyView, emptyViewOptions);

		      this.triggerMethod('before:render:empty', this, view);
		      this._addChildView(view, 0);
		      this.triggerMethod('render:empty', this, view);

		      view._parent = this;
		    }
		  },


		  // Internal method to destroy an existing emptyView instance if one exists. Called when
		  // a collection view has been rendered empty, and then a child is added to the collection.
		  _destroyEmptyView: function _destroyEmptyView() {
		    if (this._showingEmptyView) {
		      this.triggerMethod('before:remove:empty', this);

		      this._destroyChildren();
		      delete this._showingEmptyView;

		      this.triggerMethod('remove:empty', this);
		    }
		  },


		  // Retrieve the empty view class
		  getEmptyView: function getEmptyView() {
		    return this.emptyView;
		  },


		  // Retrieve the `childView` class, either from `this.options.childView` or from
		  // the `childView` in the object definition. The "options" takes precedence.
		  // The `childView` property can be either a view class or a function that
		  // returns a view class. If it is a function, it will receive the model that
		  // will be passed to the view instance (created from the returned view class)
		  _getChildView: function _getChildView(child) {
		    var childView = this.childView;

		    if (!childView) {
		      throw new MarionetteError({
		        name: 'NoChildViewError',
		        message: 'A "childView" must be specified'
		      });
		    }

		    // first check if the `childView` is a view class (the common case)
		    // then check if it's a function (which we assume that returns a view class)
		    if (childView.prototype instanceof Backbone.View || childView === Backbone.View) {
		      return childView;
		    } else if (_.isFunction(childView)) {
		      return childView.call(this, child);
		    } else {
		      throw new MarionetteError({
		        name: 'InvalidChildViewError',
		        message: '"childView" must be a view class or a function that returns a view class'
		      });
		    }
		  },


		  // Internal method for building and adding a child view
		  _addChild: function _addChild(child, ChildView, index) {
		    var childViewOptions = this._getChildViewOptions(child, index);

		    var view = this.buildChildView(child, ChildView, childViewOptions);

		    this.addChildView(view, index);

		    return view;
		  },
		  _getChildViewOptions: function _getChildViewOptions(child, index) {
		    if (_.isFunction(this.childViewOptions)) {
		      return this.childViewOptions(child, index);
		    }

		    return this.childViewOptions;
		  },


		  // Render the child's view and add it to the HTML for the collection view at a given index.
		  // This will also update the indices of later views in the collection in order to keep the
		  // children in sync with the collection.
		  addChildView: function addChildView(view, index) {
		    this.triggerMethod('before:add:child', this, view);

		    // increment indices of views after this one
		    this._updateIndices(view, true, index);

		    view._parent = this;

		    this._addChildView(view, index);

		    this.triggerMethod('add:child', this, view);

		    return view;
		  },


		  // Internal method. This decrements or increments the indices of views after the added/removed
		  // view to keep in sync with the collection.
		  _updateIndices: function _updateIndices(view, increment, index) {
		    if (!this.sort) {
		      return;
		    }

		    if (increment) {
		      // assign the index to the view
		      view._index = index;
		    }

		    // update the indexes of views after this one
		    this.children.each(function (laterView) {
		      if (laterView._index >= view._index) {
		        laterView._index += increment ? 1 : -1;
		      }
		    });
		  },


		  // Internal Method. Add the view to children and render it at the given index.
		  _addChildView: function _addChildView(view, index) {
		    // Only trigger attach if already attached and not buffering,
		    // otherwise _endBuffering() or Region#show() handles this.
		    var shouldTriggerAttach = !this._isBuffering && this._isAttached;

		    monitorViewEvents(view);

		    // set up the child view event forwarding
		    this._proxyChildEvents(view);

		    // Store the child view itself so we can properly remove and/or destroy it later
		    this.children.add(view);

		    if (!view.supportsRenderLifecycle) {
		      triggerMethodOn(view, 'before:render', view);
		    }

		    // Render view
		    view.render();

		    if (!view.supportsRenderLifecycle) {
		      view._isRendered = true;
		      triggerMethodOn(view, 'render', view);
		    }

		    if (shouldTriggerAttach) {
		      triggerMethodOn(view, 'before:attach', view);
		    }

		    // Attach view
		    this.attachHtml(this, view, index);

		    if (shouldTriggerAttach) {
		      view._isAttached = true;
		      triggerMethodOn(view, 'attach', view);
		    }
		  },


		  // Build a `childView` for a model in the collection.
		  buildChildView: function buildChildView(child, ChildViewClass, childViewOptions) {
		    var options = _.extend({ model: child }, childViewOptions);
		    return new ChildViewClass(options);
		  },


		  // Remove the child view and destroy it. This function also updates the indices of later views
		  // in the collection in order to keep the children in sync with the collection.
		  removeChildView: function removeChildView(view) {
		    if (!view || view._isDestroyed) {
		      return;
		    }

		    this.triggerMethod('before:remove:child', this, view);

		    if (view.destroy) {
		      view.destroy();
		    } else {
		      destroyBackboneView(view);
		    }

		    delete view._parent;
		    this.stopListening(view);
		    this.children.remove(view);
		    this.triggerMethod('remove:child', this, view);

		    // decrement the index of views after this one
		    this._updateIndices(view, false);
		  },


		  // check if the collection is empty or optionally whether an array of pre-processed models is empty
		  isEmpty: function isEmpty(options) {
		    var models = void 0;
		    if (_.result(options, 'processedModels')) {
		      models = options.processedModels;
		    } else {
		      models = this.collection ? this.collection.models : [];
		      models = this._filterModels(models);
		    }
		    return models.length === 0;
		  },


		  // If empty, show the empty view
		  _checkEmpty: function _checkEmpty() {
		    if (this.isEmpty()) {
		      this._showEmptyView();
		    }
		  },


		  // You might need to override this if you've overridden attachHtml
		  attachBuffer: function attachBuffer(collectionView, buffer) {
		    collectionView.$el.append(buffer);
		  },


		  // Create a fragment buffer from the currently buffered children
		  _createBuffer: function _createBuffer() {
		    var elBuffer = document.createDocumentFragment();
		    _.each(this._bufferedChildren, function (b) {
		      elBuffer.appendChild(b.el);
		    });
		    return elBuffer;
		  },


		  // Append the HTML to the collection's `el`. Override this method to do something other
		  // than `.append`.
		  attachHtml: function attachHtml(collectionView, childView, index) {
		    if (collectionView._isBuffering) {
		      // buffering happens on reset events and initial renders
		      // in order to reduce the number of inserts into the
		      // document, which are expensive.
		      collectionView._bufferedChildren.splice(index, 0, childView);
		    } else {
		      // If we've already rendered the main collection, append
		      // the new child into the correct order if we need to. Otherwise
		      // append to the end.
		      if (!collectionView._insertBefore(childView, index)) {
		        collectionView._insertAfter(childView);
		      }
		    }
		  },


		  // Internal method. Check whether we need to insert the view into the correct position.
		  _insertBefore: function _insertBefore(childView, index) {
		    var currentView = void 0;
		    var findPosition = this.sort && index < this.children.length - 1;
		    if (findPosition) {
		      // Find the view after this one
		      currentView = this.children.find(function (view) {
		        return view._index === index + 1;
		      });
		    }

		    if (currentView) {
		      currentView.$el.before(childView.el);
		      return true;
		    }

		    return false;
		  },


		  // Internal method. Append a view to the end of the $el
		  _insertAfter: function _insertAfter(childView) {
		    this.$el.append(childView.el);
		  },


		  // Internal method to set up the `children` object for storing all of the child views
		  _initChildViewStorage: function _initChildViewStorage() {
		    this.children = new ChildViewContainer();
		  },


		  // called by ViewMixin destroy
		  _removeChildren: function _removeChildren() {
		    this._destroyChildren({ checkEmpty: false });
		  },


		  // Destroy the child views that this collection view is holding on to, if any
		  _destroyChildren: function _destroyChildren() {
		    var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		    var checkEmpty = _ref2.checkEmpty;

		    this.triggerMethod('before:destroy:children', this);
		    var shouldCheckEmpty = checkEmpty !== false;
		    var childViews = this.children.map(_.identity);

		    this.children.each(_.bind(this.removeChildView, this));

		    if (shouldCheckEmpty) {
		      this._checkEmpty();
		    }

		    this.triggerMethod('destroy:children', this);
		    return childViews;
		  },


		  // Return true if the given child should be shown. Return false otherwise.
		  // The filter will be passed (child, index, collection), where
		  //  'child' is the given model
		  //  'index' is the index of that model in the collection
		  //  'collection' is the collection referenced by this CollectionView
		  _shouldAddChild: function _shouldAddChild(child, index) {
		    var filter = this.filter;
		    return !_.isFunction(filter) || filter.call(this, child, index, this.collection);
		  },


		  // Set up the child view event forwarding. Uses a "childview:" prefix in front of all forwarded events.
		  _proxyChildEvents: function _proxyChildEvents(view) {
		    var prefix = _.result(this, 'childViewEventPrefix');

		    // Forward all child view events through the parent,
		    // prepending "childview:" to the event name
		    this.listenTo(view, 'all', function (eventName) {

		      var childEventName = prefix + ':' + eventName;

		      var childViewEvents = this.normalizeMethods(this._childViewEvents);

		      // call collectionView childViewEvent if defined

		      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		        args[_key - 1] = arguments[_key];
		      }

		      if (typeof childViewEvents !== 'undefined' && _.isFunction(childViewEvents[eventName])) {
		        childViewEvents[eventName].apply(this, args);
		      }

		      // use the parent view's proxyEvent handlers
		      var childViewTriggers = this._childViewTriggers;

		      // Call the event with the proxy name on the parent layout
		      if (childViewTriggers && _.isString(childViewTriggers[eventName])) {
		        this.triggerMethod.apply(this, [childViewTriggers[eventName]].concat(args));
		      }

		      this.triggerMethod.apply(this, [childEventName].concat(args));
		    });
		  }
		});

		_.extend(CollectionView.prototype, ViewMixin);

		var ClassOptions$4 = ['childViewContainer', 'template', 'templateContext'];

		// Used for rendering a branch-leaf, hierarchical structure.
		// Extends directly from CollectionView and also renders an
		// a child view as `modelView`, for the top leaf
		// @deprecated
		var CompositeView = CollectionView.extend({

		  // Setting up the inheritance chain which allows changes to
		  // Marionette.CollectionView.prototype.constructor which allows overriding
		  // option to pass '{sort: false}' to prevent the CompositeView from
		  // maintaining the sorted order of the collection.
		  // This will fallback onto appending childView's to the end.

		  constructor: function constructor(options) {
		    deprecate('CompositeView is deprecated. Convert to View at your earliest convenience');

		    this.mergeOptions(options, ClassOptions$4);

		    CollectionView.prototype.constructor.apply(this, arguments);
		  },


		  // Configured the initial events that the composite view
		  // binds to. Override this method to prevent the initial
		  // events, or to add your own initial events.
		  _initialEvents: function _initialEvents() {

		    // Bind only after composite view is rendered to avoid adding child views
		    // to nonexistent childViewContainer

		    if (this.collection) {
		      this.listenTo(this.collection, 'add', this._onCollectionAdd);
		      this.listenTo(this.collection, 'remove', this._onCollectionRemove);
		      this.listenTo(this.collection, 'reset', this.renderChildren);

		      if (this.sort) {
		        this.listenTo(this.collection, 'sort', this._sortViews);
		      }
		    }
		  },


		  // Retrieve the `childView` to be used when rendering each of
		  // the items in the collection. The default is to return
		  // `this.childView` or Marionette.CompositeView if no `childView`
		  // has been defined. As happens in CollectionView, `childView` can
		  // be a function (which should return a view class).
		  _getChildView: function _getChildView(child) {
		    var childView = this.childView;

		    // for CompositeView, if `childView` is not specified, we'll get the same
		    // composite view class rendered for each child in the collection
		    // then check if the `childView` is a view class (the common case)
		    // finally check if it's a function (which we assume that returns a view class)
		    if (!childView) {
		      return this.constructor;
		    } else if (childView.prototype instanceof Backbone.View || childView === Backbone.View) {
		      return childView;
		    } else if (_.isFunction(childView)) {
		      return childView.call(this, child);
		    } else {
		      throw new MarionetteError({
		        name: 'InvalidChildViewError',
		        message: '"childView" must be a view class or a function that returns a view class'
		      });
		    }
		  },


		  // Return the serialized model
		  serializeData: function serializeData() {
		    return this.serializeModel();
		  },


		  // Renders the model and the collection.
		  render: function render() {
		    this._ensureViewIsIntact();
		    this._isRendering = true;
		    this.resetChildViewContainer();

		    this.triggerMethod('before:render', this);

		    this._renderTemplate();
		    this.bindUIElements();
		    this.renderChildren();

		    this._isRendering = false;
		    this._isRendered = true;
		    this.triggerMethod('render', this);
		    return this;
		  },
		  renderChildren: function renderChildren() {
		    if (this._isRendered || this._isRendering) {
		      CollectionView.prototype._renderChildren.call(this);
		    }
		  },


		  // You might need to override this if you've overridden attachHtml
		  attachBuffer: function attachBuffer(compositeView, buffer) {
		    var $container = this.getChildViewContainer(compositeView);
		    $container.append(buffer);
		  },


		  // Internal method. Append a view to the end of the $el.
		  // Overidden from CollectionView to ensure view is appended to
		  // childViewContainer
		  _insertAfter: function _insertAfter(childView) {
		    var $container = this.getChildViewContainer(this, childView);
		    $container.append(childView.el);
		  },


		  // Internal method. Append reordered childView'.
		  // Overidden from CollectionView to ensure reordered views
		  // are appended to childViewContainer
		  _appendReorderedChildren: function _appendReorderedChildren(children) {
		    var $container = this.getChildViewContainer(this);
		    $container.append(children);
		  },


		  // Internal method to ensure an `$childViewContainer` exists, for the
		  // `attachHtml` method to use.
		  getChildViewContainer: function getChildViewContainer(containerView, childView) {
		    if (!!containerView.$childViewContainer) {
		      return containerView.$childViewContainer;
		    }

		    var container = void 0;
		    var childViewContainer = containerView.childViewContainer;
		    if (childViewContainer) {

		      var selector = _.result(containerView, 'childViewContainer');

		      if (selector.charAt(0) === '@' && containerView.ui) {
		        container = containerView.ui[selector.substr(4)];
		      } else {
		        container = containerView.$(selector);
		      }

		      if (container.length <= 0) {
		        throw new MarionetteError({
		          name: 'ChildViewContainerMissingError',
		          message: 'The specified "childViewContainer" was not found: ' + containerView.childViewContainer
		        });
		      }
		    } else {
		      container = containerView.$el;
		    }

		    containerView.$childViewContainer = container;
		    return container;
		  },


		  // Internal method to reset the `$childViewContainer` on render
		  resetChildViewContainer: function resetChildViewContainer() {
		    if (this.$childViewContainer) {
		      this.$childViewContainer = undefined;
		    }
		  }
		});

		// To prevent duplication but allow the best View organization
		// Certain View methods are mixed directly into the deprecated CompositeView
		var MixinFromView = _.pick(View.prototype, 'serializeModel', 'getTemplate', '_renderTemplate', 'mixinTemplateContext', 'attachElContent');
		_.extend(CompositeView.prototype, MixinFromView);

		var ClassOptions$5 = ['collectionEvents', 'events', 'modelEvents', 'triggers', 'ui'];

		var Behavior = MarionetteObject.extend({
		  cidPrefix: 'mnb',

		  constructor: function constructor(options, view) {
		    // Setup reference to the view.
		    // this comes in handle when a behavior
		    // wants to directly talk up the chain
		    // to the view.
		    this.view = view;
		    this.defaults = _.clone(_.result(this, 'defaults', {}));
		    this._setOptions(this.defaults, options);
		    this.mergeOptions(this.options, ClassOptions$5);

		    // Construct an internal UI hash using
		    // the behaviors UI hash and then the view UI hash.
		    // This allows the user to use UI hash elements
		    // defined in the parent view as well as those
		    // defined in the given behavior.
		    // This order will help the reuse and share of a behavior
		    // between multiple views, while letting a view override a
		    // selector under an UI key.
		    this.ui = _.extend({}, _.result(this, 'ui'), _.result(view, 'ui'));

		    MarionetteObject.apply(this, arguments);
		  },

		  // proxy behavior $ method to the view
		  // this is useful for doing jquery DOM lookups
		  // scoped to behaviors view.
		  $: function $() {
		    return this.view.$.apply(this.view, arguments);
		  },

		  // Stops the behavior from listening to events.
		  // Overrides Object#destroy to prevent additional events from being triggered.
		  destroy: function destroy() {
		    this.stopListening();

		    return this;
		  },

		  proxyViewProperties: function proxyViewProperties() {
		    this.$el = this.view.$el;
		    this.el = this.view.el;

		    return this;
		  },

		  bindUIElements: function bindUIElements() {
		    this._bindUIElements();

		    return this;
		  },

		  unbindUIElements: function unbindUIElements() {
		    this._unbindUIElements();

		    return this;
		  },

		  getUI: function getUI(name) {
		    this.view._ensureViewIsIntact();
		    return this._getUI(name);
		  },

		  // Handle `modelEvents`, and `collectionEvents` configuration
		  delegateEntityEvents: function delegateEntityEvents() {
		    this._delegateEntityEvents(this.view.model, this.view.collection);

		    return this;
		  },

		  undelegateEntityEvents: function undelegateEntityEvents() {
		    this._undelegateEntityEvents(this.view.model, this.view.collection);

		    return this;
		  },

		  getEvents: function getEvents() {
		    // Normalize behavior events hash to allow
		    // a user to use the @ui. syntax.
		    var behaviorEvents = this.normalizeUIKeys(_.result(this, 'events'));

		    // binds the handler to the behavior and builds a unique eventName
		    return _.reduce(behaviorEvents, function (events, behaviorHandler, key) {
		      if (!_.isFunction(behaviorHandler)) {
		        behaviorHandler = this[behaviorHandler];
		      }
		      if (!behaviorHandler) {
		        return;
		      }
		      key = getUniqueEventName(key);
		      events[key] = _.bind(behaviorHandler, this);
		      return events;
		    }, {}, this);
		  },

		  // Internal method to build all trigger handlers for a given behavior
		  getTriggers: function getTriggers() {
		    if (!this.triggers) {
		      return;
		    }

		    // Normalize behavior triggers hash to allow
		    // a user to use the @ui. syntax.
		    var behaviorTriggers = this.normalizeUIKeys(_.result(this, 'triggers'));

		    return this._getViewTriggers(this.view, behaviorTriggers);
		  }

		});

		_.extend(Behavior.prototype, DelegateEntityEventsMixin, TriggersMixin, UIMixin);

		var ClassOptions$6 = ['region', 'regionClass'];

		// A container for a Marionette application.
		var Application = MarionetteObject.extend({
		  cidPrefix: 'mna',

		  constructor: function constructor(options) {
		    this._setOptions(options);

		    this.mergeOptions(options, ClassOptions$6);

		    this._initRegion();

		    MarionetteObject.prototype.constructor.apply(this, arguments);
		  },

		  regionClass: Region,

		  _initRegion: function _initRegion(options) {
		    var region = this.region;
		    var RegionClass = this.regionClass;

		    // if the region is a string expect an el or selector
		    // and instantiate a region
		    if (_.isString(region)) {
		      this._region = new RegionClass({
		        el: region
		      });
		      return;
		    }

		    this._region = region;
		  },

		  getRegion: function getRegion() {
		    return this._region;
		  },

		  showView: function showView(view) {
		    var region = this.getRegion();

		    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		      args[_key - 1] = arguments[_key];
		    }

		    return region.show.apply(region, [view].concat(args));
		  },

		  getView: function getView() {
		    return this.getRegion().currentView;
		  },

		  // kick off all of the application's processes.
		  start: function start(options) {
		    this.triggerMethod('before:start', this, options);
		    this.triggerMethod('start', this, options);
		    return this;
		  }

		});

		var ClassOptions$7 = ['appRoutes', 'controller'];

		var AppRouter = Backbone.Router.extend({

		  constructor: function constructor(options) {
		    this._setOptions(options);

		    this.mergeOptions(options, ClassOptions$7);

		    Backbone.Router.apply(this, arguments);

		    var appRoutes = this.appRoutes;
		    var controller = this._getController();
		    this.processAppRoutes(controller, appRoutes);
		    this.on('route', this._processOnRoute, this);
		  },

		  // Similar to route method on a Backbone Router but
		  // method is called on the controller
		  appRoute: function appRoute(route, methodName) {
		    var controller = this._getController();
		    this._addAppRoute(controller, route, methodName);
		    return this;
		  },

		  // process the route event and trigger the onRoute
		  // method call, if it exists
		  _processOnRoute: function _processOnRoute(routeName, routeArgs) {
		    // make sure an onRoute before trying to call it
		    if (_.isFunction(this.onRoute)) {
		      // find the path that matches the current route
		      var routePath = _.invert(this.appRoutes)[routeName];
		      this.onRoute(routeName, routePath, routeArgs);
		    }
		  },

		  // Internal method to process the `appRoutes` for the
		  // router, and turn them in to routes that trigger the
		  // specified method on the specified `controller`.
		  processAppRoutes: function processAppRoutes(controller, appRoutes) {
		    var _this = this;

		    if (!appRoutes) {
		      return this;
		    }

		    var routeNames = _.keys(appRoutes).reverse(); // Backbone requires reverted order of routes

		    _.each(routeNames, function (route) {
		      _this._addAppRoute(controller, route, appRoutes[route]);
		    });

		    return this;
		  },

		  _getController: function _getController() {
		    return this.controller;
		  },

		  _addAppRoute: function _addAppRoute(controller, route, methodName) {
		    var method = controller[methodName];

		    if (!method) {
		      throw new MarionetteError('Method "' + methodName + '" was not found on the controller');
		    }

		    this.route(route, methodName, _.bind(method, controller));
		  },

		  triggerMethod: triggerMethod
		});

		_.extend(AppRouter.prototype, CommonMixin);

		// Placeholder method to be extended by the user.
		// The method should define the object that stores the behaviors.
		// i.e.
		//
		// ```js
		// Marionette.Behaviors.behaviorsLookup: function() {
		//   return App.Behaviors
		// }
		// ```
		function behaviorsLookup() {
		  throw new MarionetteError({
		    message: 'You must define where your behaviors are stored.',
		    url: 'marionette.behaviors.md#behaviorslookup'
		  });
		}

		// Add Feature flags here
		// e.g. 'class' => false
		var FEATURES = {};

		function isEnabled(name) {
		  return !!FEATURES[name];
		}

		function setEnabled(name, state) {
		  return FEATURES[name] = state;
		}

		var previousMarionette = Backbone.Marionette;
		var Marionette = Backbone.Marionette = {};

		// This allows you to run multiple instances of Marionette on the same
		// webapp. After loading the new version, call `noConflict()` to
		// get a reference to it. At the same time the old version will be
		// returned to Backbone.Marionette.
		Marionette.noConflict = function () {
		  Backbone.Marionette = previousMarionette;
		  return this;
		};

		// Utilities
		Marionette.bindEntityEvents = proxy(bindEntityEvents);
		Marionette.unbindEntityEvents = proxy(unbindEntityEvents);
		Marionette.bindRadioEvents = proxy(bindEntityEvents);
		Marionette.unbindRadioEvents = proxy(unbindEntityEvents);
		Marionette.bindRadioRequests = proxy(bindRadioRequests);
		Marionette.unbindRadioRequests = proxy(unbindRadioRequests);
		Marionette.mergeOptions = proxy(mergeOptions);
		Marionette.getOption = proxy(getOption);
		Marionette.normalizeMethods = proxy(normalizeMethods);
		Marionette.extend = extend;
		Marionette.isNodeAttached = isNodeAttached;
		Marionette.deprecate = deprecate;
		Marionette.triggerMethod = proxy(triggerMethod);
		Marionette.triggerMethodOn = triggerMethodOn;
		Marionette.isEnabled = isEnabled;
		Marionette.setEnabled = setEnabled;
		Marionette.monitorViewEvents = monitorViewEvents;

		Marionette.Behaviors = {};
		Marionette.Behaviors.behaviorsLookup = behaviorsLookup;

		// Classes
		Marionette.Application = Application;
		Marionette.AppRouter = AppRouter;
		Marionette.Renderer = Renderer;
		Marionette.TemplateCache = TemplateCache;
		Marionette.View = View;
		Marionette.CollectionView = CollectionView;
		Marionette.CompositeView = CompositeView;
		Marionette.Behavior = Behavior;
		Marionette.Region = Region;
		Marionette.Error = MarionetteError;
		Marionette.Object = MarionetteObject;

		// Configuration
		Marionette.DEV_MODE = false;
		Marionette.FEATURES = FEATURES;
		Marionette.VERSION = version;

		return Marionette;

	}));

	//# sourceMappingURL=backbone.marionette.js.map


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// Backbone.Radio v2.0.0-pre.1

	(function (global, factory) {
	   true ? module.exports = factory(__webpack_require__(6), __webpack_require__(5)) :
	  typeof define === 'function' && define.amd ? define(['underscore', 'backbone'], factory) :
	  (global.Backbone = global.Backbone || {}, global.Backbone.Radio = factory(global._,global.Backbone));
	}(this, function (_,Backbone) { 'use strict';

	  _ = 'default' in _ ? _['default'] : _;
	  Backbone = 'default' in Backbone ? Backbone['default'] : Backbone;

	  var babelHelpers = {};
	  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	  };
	  babelHelpers;

	  var previousRadio = Backbone.Radio;

	  var Radio = Backbone.Radio = {};

	  Radio.VERSION = '2.0.0-pre.1';

	  // This allows you to run multiple instances of Radio on the same
	  // webapp. After loading the new version, call `noConflict()` to
	  // get a reference to it. At the same time the old version will be
	  // returned to Backbone.Radio.
	  Radio.noConflict = function () {
	    Backbone.Radio = previousRadio;
	    return this;
	  };

	  // Whether or not we're in DEBUG mode or not. DEBUG mode helps you
	  // get around the issues of lack of warnings when events are mis-typed.
	  Radio.DEBUG = false;

	  // Format debug text.
	  Radio._debugText = function (warning, eventName, channelName) {
	    return warning + (channelName ? ' on the ' + channelName + ' channel' : '') + ': "' + eventName + '"';
	  };

	  // This is the method that's called when an unregistered event was called.
	  // By default, it logs warning to the console. By overriding this you could
	  // make it throw an Error, for instance. This would make firing a nonexistent event
	  // have the same consequence as firing a nonexistent method on an Object.
	  Radio.debugLog = function (warning, eventName, channelName) {
	    if (Radio.DEBUG && console && console.warn) {
	      console.warn(Radio._debugText(warning, eventName, channelName));
	    }
	  };

	  var eventSplitter = /\s+/;

	  // An internal method used to handle Radio's method overloading for Requests.
	  // It's borrowed from Backbone.Events. It differs from Backbone's overload
	  // API (which is used in Backbone.Events) in that it doesn't support space-separated
	  // event names.
	  Radio._eventsApi = function (obj, action, name, rest) {
	    if (!name) {
	      return false;
	    }

	    var results = {};

	    // Handle event maps.
	    if ((typeof name === 'undefined' ? 'undefined' : babelHelpers.typeof(name)) === 'object') {
	      for (var key in name) {
	        var result = obj[action].apply(obj, [key, name[key]].concat(rest));
	        eventSplitter.test(key) ? _.extend(results, result) : results[key] = result;
	      }
	      return results;
	    }

	    // Handle space separated event names.
	    if (eventSplitter.test(name)) {
	      var names = name.split(eventSplitter);
	      for (var i = 0, l = names.length; i < l; i++) {
	        results[names[i]] = obj[action].apply(obj, [names[i]].concat(rest));
	      }
	      return results;
	    }

	    return false;
	  };

	  // An optimized way to execute callbacks.
	  Radio._callHandler = function (callback, context, args) {
	    var a1 = args[0],
	        a2 = args[1],
	        a3 = args[2];
	    switch (args.length) {
	      case 0:
	        return callback.call(context);
	      case 1:
	        return callback.call(context, a1);
	      case 2:
	        return callback.call(context, a1, a2);
	      case 3:
	        return callback.call(context, a1, a2, a3);
	      default:
	        return callback.apply(context, args);
	    }
	  };

	  // A helper used by `off` methods to the handler from the store
	  function removeHandler(store, name, callback, context) {
	    var event = store[name];
	    if ((!callback || callback === event.callback || callback === event.callback._callback) && (!context || context === event.context)) {
	      delete store[name];
	      return true;
	    }
	  }

	  function removeHandlers(store, name, callback, context) {
	    store || (store = {});
	    var names = name ? [name] : _.keys(store);
	    var matched = false;

	    for (var i = 0, length = names.length; i < length; i++) {
	      name = names[i];

	      // If there's no event by this name, log it and continue
	      // with the loop
	      if (!store[name]) {
	        continue;
	      }

	      if (removeHandler(store, name, callback, context)) {
	        matched = true;
	      }
	    }

	    return matched;
	  }

	  /*
	   * tune-in
	   * -------
	   * Get console logs of a channel's activity
	   *
	   */

	  var _logs = {};

	  // This is to produce an identical function in both tuneIn and tuneOut,
	  // so that Backbone.Events unregisters it.
	  function _partial(channelName) {
	    return _logs[channelName] || (_logs[channelName] = _.partial(Radio.log, channelName));
	  }

	  _.extend(Radio, {

	    // Log information about the channel and event
	    log: function log(channelName, eventName) {
	      if (typeof console === 'undefined') {
	        return;
	      }
	      var args = _.drop(arguments, 2);
	      console.log('[' + channelName + '] "' + eventName + '"', args);
	    },

	    // Logs all events on this channel to the console. It sets an
	    // internal value on the channel telling it we're listening,
	    // then sets a listener on the Backbone.Events
	    tuneIn: function tuneIn(channelName) {
	      var channel = Radio.channel(channelName);
	      channel._tunedIn = true;
	      channel.on('all', _partial(channelName));
	      return this;
	    },

	    // Stop logging all of the activities on this channel to the console
	    tuneOut: function tuneOut(channelName) {
	      var channel = Radio.channel(channelName);
	      channel._tunedIn = false;
	      channel.off('all', _partial(channelName));
	      delete _logs[channelName];
	      return this;
	    }
	  });

	  /*
	   * Backbone.Radio.Requests
	   * -----------------------
	   * A messaging system for requesting data.
	   *
	   */

	  function makeCallback(callback) {
	    return _.isFunction(callback) ? callback : function () {
	      return callback;
	    };
	  }

	  Radio.Requests = {

	    // Make a request
	    request: function request(name) {
	      var args = _.rest(arguments);
	      var results = Radio._eventsApi(this, 'request', name, args);
	      if (results) {
	        return results;
	      }
	      var channelName = this.channelName;
	      var requests = this._requests;

	      // Check if we should log the request, and if so, do it
	      if (channelName && this._tunedIn) {
	        Radio.log.apply(this, [channelName, name].concat(args));
	      }

	      // If the request isn't handled, log it in DEBUG mode and exit
	      if (requests && (requests[name] || requests['default'])) {
	        var handler = requests[name] || requests['default'];
	        args = requests[name] ? args : arguments;
	        return Radio._callHandler(handler.callback, handler.context, args);
	      } else {
	        Radio.debugLog('An unhandled request was fired', name, channelName);
	      }
	    },

	    // Set up a handler for a request
	    reply: function reply(name, callback, context) {
	      if (Radio._eventsApi(this, 'reply', name, [callback, context])) {
	        return this;
	      }

	      this._requests || (this._requests = {});

	      if (this._requests[name]) {
	        Radio.debugLog('A request was overwritten', name, this.channelName);
	      }

	      this._requests[name] = {
	        callback: makeCallback(callback),
	        context: context || this
	      };

	      return this;
	    },

	    // Set up a handler that can only be requested once
	    replyOnce: function replyOnce(name, callback, context) {
	      if (Radio._eventsApi(this, 'replyOnce', name, [callback, context])) {
	        return this;
	      }

	      var self = this;

	      var once = _.once(function () {
	        self.stopReplying(name);
	        return makeCallback(callback).apply(this, arguments);
	      });

	      return this.reply(name, once, context);
	    },

	    // Remove handler(s)
	    stopReplying: function stopReplying(name, callback, context) {
	      if (Radio._eventsApi(this, 'stopReplying', name)) {
	        return this;
	      }

	      // Remove everything if there are no arguments passed
	      if (!name && !callback && !context) {
	        delete this._requests;
	      } else if (!removeHandlers(this._requests, name, callback, context)) {
	        Radio.debugLog('Attempted to remove the unregistered request', name, this.channelName);
	      }

	      return this;
	    }
	  };

	  /*
	   * Backbone.Radio.channel
	   * ----------------------
	   * Get a reference to a channel by name.
	   *
	   */

	  Radio._channels = {};

	  Radio.channel = function (channelName) {
	    if (!channelName) {
	      throw new Error('You must provide a name for the channel.');
	    }

	    if (Radio._channels[channelName]) {
	      return Radio._channels[channelName];
	    } else {
	      return Radio._channels[channelName] = new Radio.Channel(channelName);
	    }
	  };

	  /*
	   * Backbone.Radio.Channel
	   * ----------------------
	   * A Channel is an object that extends from Backbone.Events,
	   * and Radio.Requests.
	   *
	   */

	  Radio.Channel = function (channelName) {
	    this.channelName = channelName;
	  };

	  _.extend(Radio.Channel.prototype, Backbone.Events, Radio.Requests, {

	    // Remove all handlers from the messaging systems of this channel
	    reset: function reset() {
	      this.off();
	      this.stopListening();
	      this.stopReplying();
	      return this;
	    }
	  });

	  /*
	   * Top-level API
	   * -------------
	   * Supplies the 'top-level API' for working with Channels directly
	   * from Backbone.Radio.
	   *
	   */

	  var channel;
	  var args;
	  var systems = [Backbone.Events, Radio.Requests];
	  _.each(systems, function (system) {
	    _.each(system, function (method, methodName) {
	      Radio[methodName] = function (channelName) {
	        args = _.rest(arguments);
	        channel = this.channel(channelName);
	        return channel[methodName].apply(channel, args);
	      };
	    });
	  });

	  Radio.reset = function (channelName) {
	    var channels = !channelName ? this._channels : [this._channels[channelName]];
	    _.invoke(channels, 'reset');
	  };

	  return Radio;

	}));
	//# sourceMappingURL=./backbone.radio.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Backbone.BabySitter
	// -------------------
	// v1.0.0-pre.1
	//
	// Copyright (c)2016 Derick Bailey, Muted Solutions, LLC.
	// Distributed under MIT license
	//
	// http://github.com/marionettejs/backbone.babysitter

	(function(root, factory) {

	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Backbone, _) {
	      return factory(Backbone, _);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined') {
	    var Backbone = require('backbone');
	    var _ = require('underscore');
	    module.exports = factory(Backbone, _);
	  } else {
	    factory(root.Backbone, root._);
	  }

	}(this, function(Backbone, _) {
	  'use strict';

	  var previousChildViewContainer = Backbone.ChildViewContainer;

	  // BabySitter.ChildViewContainer
	  // -----------------------------
	  //
	  // Provide a container to store, retrieve and
	  // shut down child views.
	  
	  Backbone.ChildViewContainer = (function (Backbone, _) {
	  
	    // Container Constructor
	    // ---------------------
	  
	    var Container = function(views){
	      this._views = {};
	      this._indexByModel = {};
	      this._indexByCustom = {};
	      this._updateLength();
	  
	      _.each(views, this.add, this);
	    };
	  
	    // Container Methods
	    // -----------------
	  
	    _.extend(Container.prototype, {
	  
	      // Add a view to this container. Stores the view
	      // by `cid` and makes it searchable by the model
	      // cid (and model itself). Optionally specify
	      // a custom key to store an retrieve the view.
	      add: function(view, customIndex){
	        var viewCid = view.cid;
	  
	        // store the view
	        this._views[viewCid] = view;
	  
	        // index it by model
	        if (view.model){
	          this._indexByModel[view.model.cid] = viewCid;
	        }
	  
	        // index by custom
	        if (customIndex){
	          this._indexByCustom[customIndex] = viewCid;
	        }
	  
	        this._updateLength();
	        return this;
	      },
	  
	      // Find a view by the model that was attached to
	      // it. Uses the model's `cid` to find it.
	      findByModel: function(model){
	        return this.findByModelCid(model.cid);
	      },
	  
	      // Find a view by the `cid` of the model that was attached to
	      // it. Uses the model's `cid` to find the view `cid` and
	      // retrieve the view using it.
	      findByModelCid: function(modelCid){
	        var viewCid = this._indexByModel[modelCid];
	        return this.findByCid(viewCid);
	      },
	  
	      // Find a view by a custom indexer.
	      findByCustom: function(index){
	        var viewCid = this._indexByCustom[index];
	        return this.findByCid(viewCid);
	      },
	  
	      // Find by index. This is not guaranteed to be a
	      // stable index.
	      findByIndex: function(index){
	        return _.values(this._views)[index];
	      },
	  
	      // retrieve a view by its `cid` directly
	      findByCid: function(cid){
	        return this._views[cid];
	      },
	  
	      // Remove a view
	      remove: function(view){
	        var viewCid = view.cid;
	  
	        // delete model index
	        if (view.model){
	          delete this._indexByModel[view.model.cid];
	        }
	  
	        // delete custom index
	        _.any(this._indexByCustom, function(cid, key) {
	          if (cid === viewCid) {
	            delete this._indexByCustom[key];
	            return true;
	          }
	        }, this);
	  
	        // remove the view from the container
	        delete this._views[viewCid];
	  
	        // update the length
	        this._updateLength();
	        return this;
	      },
	  
	      // Call a method on every view in the container,
	      // passing parameters to the call method one at a
	      // time, like `function.call`.
	      call: function(method){
	        this.apply(method, _.tail(arguments));
	      },
	  
	      // Apply a method on every view in the container,
	      // passing parameters to the call method one at a
	      // time, like `function.apply`.
	      apply: function(method, args){
	        _.each(this._views, function(view){
	          if (_.isFunction(view[method])){
	            view[method].apply(view, args || []);
	          }
	        });
	      },
	  
	      // Update the `.length` attribute on this container
	      _updateLength: function(){
	        this.length = _.size(this._views);
	      }
	    });
	  
	    // Borrowing this code from Backbone.Collection:
	    // http://backbonejs.org/docs/backbone.html#section-106
	    //
	    // Mix in methods from Underscore, for iteration, and other
	    // collection related features.
	    var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter',
	      'select', 'reject', 'every', 'all', 'some', 'any', 'include',
	      'contains', 'invoke', 'toArray', 'first', 'initial', 'rest',
	      'last', 'without', 'isEmpty', 'pluck', 'reduce'];
	  
	    _.each(methods, function(method) {
	      Container.prototype[method] = function() {
	        var views = _.values(this._views);
	        var args = [views].concat(_.toArray(arguments));
	        return _[method].apply(_, args);
	      };
	    });
	  
	    // return the public API
	    return Container;
	  })(Backbone, _);
	  

	  Backbone.ChildViewContainer.VERSION = '1.0.0-pre.1';

	  Backbone.ChildViewContainer.noConflict = function () {
	    Backbone.ChildViewContainer = previousChildViewContainer;
	    return this;
	  };

	  return Backbone.ChildViewContainer;

	}));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(8);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _template = __webpack_require__(12);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import Handlebars from 'handlebars';
	exports.default = _backbone2.default.View.extend({

	  template: _template2.default,

	  tagName: 'body',

	  attributes: {
	    id: 'body'
	  },

	  className: 'body',

	  regions: {
	    header: '#header',
	    main: '#main',
	    footer: '#footer'
	  }

	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(13);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<header class=\"header\" id=\"header\"></header>\n<main class=\"page-content\" id=\"main\"></main>\n<footer class=\"footer\" id=\"footer\"></footer>\n";
	},"useData":true});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*!

	 handlebars v4.0.5

	Copyright (C) 2011-2015 by Yehuda Katz

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

	@license
	*/
	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["Handlebars"] = factory();
		else
			root["Handlebars"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _interopRequireWildcard = __webpack_require__(1)['default'];

		var _interopRequireDefault = __webpack_require__(2)['default'];

		exports.__esModule = true;

		var _handlebarsBase = __webpack_require__(3);

		var base = _interopRequireWildcard(_handlebarsBase);

		// Each of these augment the Handlebars object. No need to setup here.
		// (This is done to easily share code between commonjs and browse envs)

		var _handlebarsSafeString = __webpack_require__(17);

		var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

		var _handlebarsException = __webpack_require__(5);

		var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

		var _handlebarsUtils = __webpack_require__(4);

		var Utils = _interopRequireWildcard(_handlebarsUtils);

		var _handlebarsRuntime = __webpack_require__(18);

		var runtime = _interopRequireWildcard(_handlebarsRuntime);

		var _handlebarsNoConflict = __webpack_require__(19);

		var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

		// For compatibility and usage outside of module systems, make the Handlebars object a namespace
		function create() {
		  var hb = new base.HandlebarsEnvironment();

		  Utils.extend(hb, base);
		  hb.SafeString = _handlebarsSafeString2['default'];
		  hb.Exception = _handlebarsException2['default'];
		  hb.Utils = Utils;
		  hb.escapeExpression = Utils.escapeExpression;

		  hb.VM = runtime;
		  hb.template = function (spec) {
		    return runtime.template(spec, hb);
		  };

		  return hb;
		}

		var inst = create();
		inst.create = create;

		_handlebarsNoConflict2['default'](inst);

		inst['default'] = inst;

		exports['default'] = inst;
		module.exports = exports['default'];

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		"use strict";

		exports["default"] = function (obj) {
		  if (obj && obj.__esModule) {
		    return obj;
		  } else {
		    var newObj = {};

		    if (obj != null) {
		      for (var key in obj) {
		        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
		      }
		    }

		    newObj["default"] = obj;
		    return newObj;
		  }
		};

		exports.__esModule = true;

	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		"use strict";

		exports["default"] = function (obj) {
		  return obj && obj.__esModule ? obj : {
		    "default": obj
		  };
		};

		exports.__esModule = true;

	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _interopRequireDefault = __webpack_require__(2)['default'];

		exports.__esModule = true;
		exports.HandlebarsEnvironment = HandlebarsEnvironment;

		var _utils = __webpack_require__(4);

		var _exception = __webpack_require__(5);

		var _exception2 = _interopRequireDefault(_exception);

		var _helpers = __webpack_require__(6);

		var _decorators = __webpack_require__(14);

		var _logger = __webpack_require__(16);

		var _logger2 = _interopRequireDefault(_logger);

		var VERSION = '4.0.5';
		exports.VERSION = VERSION;
		var COMPILER_REVISION = 7;

		exports.COMPILER_REVISION = COMPILER_REVISION;
		var REVISION_CHANGES = {
		  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
		  2: '== 1.0.0-rc.3',
		  3: '== 1.0.0-rc.4',
		  4: '== 1.x.x',
		  5: '== 2.0.0-alpha.x',
		  6: '>= 2.0.0-beta.1',
		  7: '>= 4.0.0'
		};

		exports.REVISION_CHANGES = REVISION_CHANGES;
		var objectType = '[object Object]';

		function HandlebarsEnvironment(helpers, partials, decorators) {
		  this.helpers = helpers || {};
		  this.partials = partials || {};
		  this.decorators = decorators || {};

		  _helpers.registerDefaultHelpers(this);
		  _decorators.registerDefaultDecorators(this);
		}

		HandlebarsEnvironment.prototype = {
		  constructor: HandlebarsEnvironment,

		  logger: _logger2['default'],
		  log: _logger2['default'].log,

		  registerHelper: function registerHelper(name, fn) {
		    if (_utils.toString.call(name) === objectType) {
		      if (fn) {
		        throw new _exception2['default']('Arg not supported with multiple helpers');
		      }
		      _utils.extend(this.helpers, name);
		    } else {
		      this.helpers[name] = fn;
		    }
		  },
		  unregisterHelper: function unregisterHelper(name) {
		    delete this.helpers[name];
		  },

		  registerPartial: function registerPartial(name, partial) {
		    if (_utils.toString.call(name) === objectType) {
		      _utils.extend(this.partials, name);
		    } else {
		      if (typeof partial === 'undefined') {
		        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
		      }
		      this.partials[name] = partial;
		    }
		  },
		  unregisterPartial: function unregisterPartial(name) {
		    delete this.partials[name];
		  },

		  registerDecorator: function registerDecorator(name, fn) {
		    if (_utils.toString.call(name) === objectType) {
		      if (fn) {
		        throw new _exception2['default']('Arg not supported with multiple decorators');
		      }
		      _utils.extend(this.decorators, name);
		    } else {
		      this.decorators[name] = fn;
		    }
		  },
		  unregisterDecorator: function unregisterDecorator(name) {
		    delete this.decorators[name];
		  }
		};

		var log = _logger2['default'].log;

		exports.log = log;
		exports.createFrame = _utils.createFrame;
		exports.logger = _logger2['default'];

	/***/ },
	/* 4 */
	/***/ function(module, exports) {

		'use strict';

		exports.__esModule = true;
		exports.extend = extend;
		exports.indexOf = indexOf;
		exports.escapeExpression = escapeExpression;
		exports.isEmpty = isEmpty;
		exports.createFrame = createFrame;
		exports.blockParams = blockParams;
		exports.appendContextPath = appendContextPath;
		var escape = {
		  '&': '&amp;',
		  '<': '&lt;',
		  '>': '&gt;',
		  '"': '&quot;',
		  "'": '&#x27;',
		  '`': '&#x60;',
		  '=': '&#x3D;'
		};

		var badChars = /[&<>"'`=]/g,
		    possible = /[&<>"'`=]/;

		function escapeChar(chr) {
		  return escape[chr];
		}

		function extend(obj /* , ...source */) {
		  for (var i = 1; i < arguments.length; i++) {
		    for (var key in arguments[i]) {
		      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
		        obj[key] = arguments[i][key];
		      }
		    }
		  }

		  return obj;
		}

		var toString = Object.prototype.toString;

		exports.toString = toString;
		// Sourced from lodash
		// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
		/* eslint-disable func-style */
		var isFunction = function isFunction(value) {
		  return typeof value === 'function';
		};
		// fallback for older versions of Chrome and Safari
		/* istanbul ignore next */
		if (isFunction(/x/)) {
		  exports.isFunction = isFunction = function (value) {
		    return typeof value === 'function' && toString.call(value) === '[object Function]';
		  };
		}
		exports.isFunction = isFunction;

		/* eslint-enable func-style */

		/* istanbul ignore next */
		var isArray = Array.isArray || function (value) {
		  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
		};

		exports.isArray = isArray;
		// Older IE versions do not directly support indexOf so we must implement our own, sadly.

		function indexOf(array, value) {
		  for (var i = 0, len = array.length; i < len; i++) {
		    if (array[i] === value) {
		      return i;
		    }
		  }
		  return -1;
		}

		function escapeExpression(string) {
		  if (typeof string !== 'string') {
		    // don't escape SafeStrings, since they're already safe
		    if (string && string.toHTML) {
		      return string.toHTML();
		    } else if (string == null) {
		      return '';
		    } else if (!string) {
		      return string + '';
		    }

		    // Force a string conversion as this will be done by the append regardless and
		    // the regex test will do this transparently behind the scenes, causing issues if
		    // an object's to string has escaped characters in it.
		    string = '' + string;
		  }

		  if (!possible.test(string)) {
		    return string;
		  }
		  return string.replace(badChars, escapeChar);
		}

		function isEmpty(value) {
		  if (!value && value !== 0) {
		    return true;
		  } else if (isArray(value) && value.length === 0) {
		    return true;
		  } else {
		    return false;
		  }
		}

		function createFrame(object) {
		  var frame = extend({}, object);
		  frame._parent = object;
		  return frame;
		}

		function blockParams(params, ids) {
		  params.path = ids;
		  return params;
		}

		function appendContextPath(contextPath, id) {
		  return (contextPath ? contextPath + '.' : '') + id;
		}

	/***/ },
	/* 5 */
	/***/ function(module, exports) {

		'use strict';

		exports.__esModule = true;

		var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

		function Exception(message, node) {
		  var loc = node && node.loc,
		      line = undefined,
		      column = undefined;
		  if (loc) {
		    line = loc.start.line;
		    column = loc.start.column;

		    message += ' - ' + line + ':' + column;
		  }

		  var tmp = Error.prototype.constructor.call(this, message);

		  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
		  for (var idx = 0; idx < errorProps.length; idx++) {
		    this[errorProps[idx]] = tmp[errorProps[idx]];
		  }

		  /* istanbul ignore else */
		  if (Error.captureStackTrace) {
		    Error.captureStackTrace(this, Exception);
		  }

		  if (loc) {
		    this.lineNumber = line;
		    this.column = column;
		  }
		}

		Exception.prototype = new Error();

		exports['default'] = Exception;
		module.exports = exports['default'];

	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _interopRequireDefault = __webpack_require__(2)['default'];

		exports.__esModule = true;
		exports.registerDefaultHelpers = registerDefaultHelpers;

		var _helpersBlockHelperMissing = __webpack_require__(7);

		var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

		var _helpersEach = __webpack_require__(8);

		var _helpersEach2 = _interopRequireDefault(_helpersEach);

		var _helpersHelperMissing = __webpack_require__(9);

		var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

		var _helpersIf = __webpack_require__(10);

		var _helpersIf2 = _interopRequireDefault(_helpersIf);

		var _helpersLog = __webpack_require__(11);

		var _helpersLog2 = _interopRequireDefault(_helpersLog);

		var _helpersLookup = __webpack_require__(12);

		var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

		var _helpersWith = __webpack_require__(13);

		var _helpersWith2 = _interopRequireDefault(_helpersWith);

		function registerDefaultHelpers(instance) {
		  _helpersBlockHelperMissing2['default'](instance);
		  _helpersEach2['default'](instance);
		  _helpersHelperMissing2['default'](instance);
		  _helpersIf2['default'](instance);
		  _helpersLog2['default'](instance);
		  _helpersLookup2['default'](instance);
		  _helpersWith2['default'](instance);
		}

	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		exports.__esModule = true;

		var _utils = __webpack_require__(4);

		exports['default'] = function (instance) {
		  instance.registerHelper('blockHelperMissing', function (context, options) {
		    var inverse = options.inverse,
		        fn = options.fn;

		    if (context === true) {
		      return fn(this);
		    } else if (context === false || context == null) {
		      return inverse(this);
		    } else if (_utils.isArray(context)) {
		      if (context.length > 0) {
		        if (options.ids) {
		          options.ids = [options.name];
		        }

		        return instance.helpers.each(context, options);
		      } else {
		        return inverse(this);
		      }
		    } else {
		      if (options.data && options.ids) {
		        var data = _utils.createFrame(options.data);
		        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
		        options = { data: data };
		      }

		      return fn(context, options);
		    }
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _interopRequireDefault = __webpack_require__(2)['default'];

		exports.__esModule = true;

		var _utils = __webpack_require__(4);

		var _exception = __webpack_require__(5);

		var _exception2 = _interopRequireDefault(_exception);

		exports['default'] = function (instance) {
		  instance.registerHelper('each', function (context, options) {
		    if (!options) {
		      throw new _exception2['default']('Must pass iterator to #each');
		    }

		    var fn = options.fn,
		        inverse = options.inverse,
		        i = 0,
		        ret = '',
		        data = undefined,
		        contextPath = undefined;

		    if (options.data && options.ids) {
		      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
		    }

		    if (_utils.isFunction(context)) {
		      context = context.call(this);
		    }

		    if (options.data) {
		      data = _utils.createFrame(options.data);
		    }

		    function execIteration(field, index, last) {
		      if (data) {
		        data.key = field;
		        data.index = index;
		        data.first = index === 0;
		        data.last = !!last;

		        if (contextPath) {
		          data.contextPath = contextPath + field;
		        }
		      }

		      ret = ret + fn(context[field], {
		        data: data,
		        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
		      });
		    }

		    if (context && typeof context === 'object') {
		      if (_utils.isArray(context)) {
		        for (var j = context.length; i < j; i++) {
		          if (i in context) {
		            execIteration(i, i, i === context.length - 1);
		          }
		        }
		      } else {
		        var priorKey = undefined;

		        for (var key in context) {
		          if (context.hasOwnProperty(key)) {
		            // We're running the iterations one step out of sync so we can detect
		            // the last iteration without have to scan the object twice and create
		            // an itermediate keys array.
		            if (priorKey !== undefined) {
		              execIteration(priorKey, i - 1);
		            }
		            priorKey = key;
		            i++;
		          }
		        }
		        if (priorKey !== undefined) {
		          execIteration(priorKey, i - 1, true);
		        }
		      }
		    }

		    if (i === 0) {
		      ret = inverse(this);
		    }

		    return ret;
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _interopRequireDefault = __webpack_require__(2)['default'];

		exports.__esModule = true;

		var _exception = __webpack_require__(5);

		var _exception2 = _interopRequireDefault(_exception);

		exports['default'] = function (instance) {
		  instance.registerHelper('helperMissing', function () /* [args, ]options */{
		    if (arguments.length === 1) {
		      // A missing field in a {{foo}} construct.
		      return undefined;
		    } else {
		      // Someone is actually trying to call something, blow up.
		      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
		    }
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		exports.__esModule = true;

		var _utils = __webpack_require__(4);

		exports['default'] = function (instance) {
		  instance.registerHelper('if', function (conditional, options) {
		    if (_utils.isFunction(conditional)) {
		      conditional = conditional.call(this);
		    }

		    // Default behavior is to render the positive path if the value is truthy and not empty.
		    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
		    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
		    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
		      return options.inverse(this);
		    } else {
		      return options.fn(this);
		    }
		  });

		  instance.registerHelper('unless', function (conditional, options) {
		    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 11 */
	/***/ function(module, exports) {

		'use strict';

		exports.__esModule = true;

		exports['default'] = function (instance) {
		  instance.registerHelper('log', function () /* message, options */{
		    var args = [undefined],
		        options = arguments[arguments.length - 1];
		    for (var i = 0; i < arguments.length - 1; i++) {
		      args.push(arguments[i]);
		    }

		    var level = 1;
		    if (options.hash.level != null) {
		      level = options.hash.level;
		    } else if (options.data && options.data.level != null) {
		      level = options.data.level;
		    }
		    args[0] = level;

		    instance.log.apply(instance, args);
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 12 */
	/***/ function(module, exports) {

		'use strict';

		exports.__esModule = true;

		exports['default'] = function (instance) {
		  instance.registerHelper('lookup', function (obj, field) {
		    return obj && obj[field];
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		exports.__esModule = true;

		var _utils = __webpack_require__(4);

		exports['default'] = function (instance) {
		  instance.registerHelper('with', function (context, options) {
		    if (_utils.isFunction(context)) {
		      context = context.call(this);
		    }

		    var fn = options.fn;

		    if (!_utils.isEmpty(context)) {
		      var data = options.data;
		      if (options.data && options.ids) {
		        data = _utils.createFrame(options.data);
		        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
		      }

		      return fn(context, {
		        data: data,
		        blockParams: _utils.blockParams([context], [data && data.contextPath])
		      });
		    } else {
		      return options.inverse(this);
		    }
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 14 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _interopRequireDefault = __webpack_require__(2)['default'];

		exports.__esModule = true;
		exports.registerDefaultDecorators = registerDefaultDecorators;

		var _decoratorsInline = __webpack_require__(15);

		var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

		function registerDefaultDecorators(instance) {
		  _decoratorsInline2['default'](instance);
		}

	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		exports.__esModule = true;

		var _utils = __webpack_require__(4);

		exports['default'] = function (instance) {
		  instance.registerDecorator('inline', function (fn, props, container, options) {
		    var ret = fn;
		    if (!props.partials) {
		      props.partials = {};
		      ret = function (context, options) {
		        // Create a new partials stack frame prior to exec.
		        var original = container.partials;
		        container.partials = _utils.extend({}, original, props.partials);
		        var ret = fn(context, options);
		        container.partials = original;
		        return ret;
		      };
		    }

		    props.partials[options.args[0]] = options.fn;

		    return ret;
		  });
		};

		module.exports = exports['default'];

	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		exports.__esModule = true;

		var _utils = __webpack_require__(4);

		var logger = {
		  methodMap: ['debug', 'info', 'warn', 'error'],
		  level: 'info',

		  // Maps a given level value to the `methodMap` indexes above.
		  lookupLevel: function lookupLevel(level) {
		    if (typeof level === 'string') {
		      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
		      if (levelMap >= 0) {
		        level = levelMap;
		      } else {
		        level = parseInt(level, 10);
		      }
		    }

		    return level;
		  },

		  // Can be overridden in the host environment
		  log: function log(level) {
		    level = logger.lookupLevel(level);

		    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
		      var method = logger.methodMap[level];
		      if (!console[method]) {
		        // eslint-disable-line no-console
		        method = 'log';
		      }

		      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		        message[_key - 1] = arguments[_key];
		      }

		      console[method].apply(console, message); // eslint-disable-line no-console
		    }
		  }
		};

		exports['default'] = logger;
		module.exports = exports['default'];

	/***/ },
	/* 17 */
	/***/ function(module, exports) {

		// Build out our basic SafeString type
		'use strict';

		exports.__esModule = true;
		function SafeString(string) {
		  this.string = string;
		}

		SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
		  return '' + this.string;
		};

		exports['default'] = SafeString;
		module.exports = exports['default'];

	/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _interopRequireWildcard = __webpack_require__(1)['default'];

		var _interopRequireDefault = __webpack_require__(2)['default'];

		exports.__esModule = true;
		exports.checkRevision = checkRevision;
		exports.template = template;
		exports.wrapProgram = wrapProgram;
		exports.resolvePartial = resolvePartial;
		exports.invokePartial = invokePartial;
		exports.noop = noop;

		var _utils = __webpack_require__(4);

		var Utils = _interopRequireWildcard(_utils);

		var _exception = __webpack_require__(5);

		var _exception2 = _interopRequireDefault(_exception);

		var _base = __webpack_require__(3);

		function checkRevision(compilerInfo) {
		  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
		      currentRevision = _base.COMPILER_REVISION;

		  if (compilerRevision !== currentRevision) {
		    if (compilerRevision < currentRevision) {
		      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
		          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
		      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
		    } else {
		      // Use the embedded version info since the runtime doesn't know about this revision yet
		      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
		    }
		  }
		}

		function template(templateSpec, env) {
		  /* istanbul ignore next */
		  if (!env) {
		    throw new _exception2['default']('No environment passed to template');
		  }
		  if (!templateSpec || !templateSpec.main) {
		    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
		  }

		  templateSpec.main.decorator = templateSpec.main_d;

		  // Note: Using env.VM references rather than local var references throughout this section to allow
		  // for external users to override these as psuedo-supported APIs.
		  env.VM.checkRevision(templateSpec.compiler);

		  function invokePartialWrapper(partial, context, options) {
		    if (options.hash) {
		      context = Utils.extend({}, context, options.hash);
		      if (options.ids) {
		        options.ids[0] = true;
		      }
		    }

		    partial = env.VM.resolvePartial.call(this, partial, context, options);
		    var result = env.VM.invokePartial.call(this, partial, context, options);

		    if (result == null && env.compile) {
		      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
		      result = options.partials[options.name](context, options);
		    }
		    if (result != null) {
		      if (options.indent) {
		        var lines = result.split('\n');
		        for (var i = 0, l = lines.length; i < l; i++) {
		          if (!lines[i] && i + 1 === l) {
		            break;
		          }

		          lines[i] = options.indent + lines[i];
		        }
		        result = lines.join('\n');
		      }
		      return result;
		    } else {
		      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
		    }
		  }

		  // Just add water
		  var container = {
		    strict: function strict(obj, name) {
		      if (!(name in obj)) {
		        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
		      }
		      return obj[name];
		    },
		    lookup: function lookup(depths, name) {
		      var len = depths.length;
		      for (var i = 0; i < len; i++) {
		        if (depths[i] && depths[i][name] != null) {
		          return depths[i][name];
		        }
		      }
		    },
		    lambda: function lambda(current, context) {
		      return typeof current === 'function' ? current.call(context) : current;
		    },

		    escapeExpression: Utils.escapeExpression,
		    invokePartial: invokePartialWrapper,

		    fn: function fn(i) {
		      var ret = templateSpec[i];
		      ret.decorator = templateSpec[i + '_d'];
		      return ret;
		    },

		    programs: [],
		    program: function program(i, data, declaredBlockParams, blockParams, depths) {
		      var programWrapper = this.programs[i],
		          fn = this.fn(i);
		      if (data || depths || blockParams || declaredBlockParams) {
		        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
		      } else if (!programWrapper) {
		        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
		      }
		      return programWrapper;
		    },

		    data: function data(value, depth) {
		      while (value && depth--) {
		        value = value._parent;
		      }
		      return value;
		    },
		    merge: function merge(param, common) {
		      var obj = param || common;

		      if (param && common && param !== common) {
		        obj = Utils.extend({}, common, param);
		      }

		      return obj;
		    },

		    noop: env.VM.noop,
		    compilerInfo: templateSpec.compiler
		  };

		  function ret(context) {
		    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		    var data = options.data;

		    ret._setup(options);
		    if (!options.partial && templateSpec.useData) {
		      data = initData(context, data);
		    }
		    var depths = undefined,
		        blockParams = templateSpec.useBlockParams ? [] : undefined;
		    if (templateSpec.useDepths) {
		      if (options.depths) {
		        depths = context !== options.depths[0] ? [context].concat(options.depths) : options.depths;
		      } else {
		        depths = [context];
		      }
		    }

		    function main(context /*, options*/) {
		      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
		    }
		    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
		    return main(context, options);
		  }
		  ret.isTop = true;

		  ret._setup = function (options) {
		    if (!options.partial) {
		      container.helpers = container.merge(options.helpers, env.helpers);

		      if (templateSpec.usePartial) {
		        container.partials = container.merge(options.partials, env.partials);
		      }
		      if (templateSpec.usePartial || templateSpec.useDecorators) {
		        container.decorators = container.merge(options.decorators, env.decorators);
		      }
		    } else {
		      container.helpers = options.helpers;
		      container.partials = options.partials;
		      container.decorators = options.decorators;
		    }
		  };

		  ret._child = function (i, data, blockParams, depths) {
		    if (templateSpec.useBlockParams && !blockParams) {
		      throw new _exception2['default']('must pass block params');
		    }
		    if (templateSpec.useDepths && !depths) {
		      throw new _exception2['default']('must pass parent depths');
		    }

		    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
		  };
		  return ret;
		}

		function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
		  function prog(context) {
		    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		    var currentDepths = depths;
		    if (depths && context !== depths[0]) {
		      currentDepths = [context].concat(depths);
		    }

		    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
		  }

		  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

		  prog.program = i;
		  prog.depth = depths ? depths.length : 0;
		  prog.blockParams = declaredBlockParams || 0;
		  return prog;
		}

		function resolvePartial(partial, context, options) {
		  if (!partial) {
		    if (options.name === '@partial-block') {
		      partial = options.data['partial-block'];
		    } else {
		      partial = options.partials[options.name];
		    }
		  } else if (!partial.call && !options.name) {
		    // This is a dynamic partial that returned a string
		    options.name = partial;
		    partial = options.partials[partial];
		  }
		  return partial;
		}

		function invokePartial(partial, context, options) {
		  options.partial = true;
		  if (options.ids) {
		    options.data.contextPath = options.ids[0] || options.data.contextPath;
		  }

		  var partialBlock = undefined;
		  if (options.fn && options.fn !== noop) {
		    options.data = _base.createFrame(options.data);
		    partialBlock = options.data['partial-block'] = options.fn;

		    if (partialBlock.partials) {
		      options.partials = Utils.extend({}, options.partials, partialBlock.partials);
		    }
		  }

		  if (partial === undefined && partialBlock) {
		    partial = partialBlock;
		  }

		  if (partial === undefined) {
		    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
		  } else if (partial instanceof Function) {
		    return partial(context, options);
		  }
		}

		function noop() {
		  return '';
		}

		function initData(context, data) {
		  if (!data || !('root' in data)) {
		    data = data ? _base.createFrame(data) : {};
		    data.root = context;
		  }
		  return data;
		}

		function executeDecorators(fn, prog, container, depths, data, blockParams) {
		  if (fn.decorator) {
		    var props = {};
		    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
		    Utils.extend(prog, props);
		  }
		  return prog;
		}

	/***/ },
	/* 19 */
	/***/ function(module, exports) {

		/* WEBPACK VAR INJECTION */(function(global) {/* global window */
		'use strict';

		exports.__esModule = true;

		exports['default'] = function (Handlebars) {
		  /* istanbul ignore next */
		  var root = typeof global !== 'undefined' ? global : window,
		      $Handlebars = root.Handlebars;
		  /* istanbul ignore next */
		  Handlebars.noConflict = function () {
		    if (root.Handlebars === Handlebars) {
		      root.Handlebars = $Handlebars;
		    }
		    return Handlebars;
		  };
		};

		module.exports = exports['default'];
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(8);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _underscore = __webpack_require__(6);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _main = __webpack_require__(4);

	var _session = __webpack_require__(1);

	var _session2 = _interopRequireDefault(_session);

	var _template = __webpack_require__(15);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.View.extend({
	  tagName: 'article',

	  className: 'page login-page',

	  ui: {
	    form: '.js-form',
	    registerButton: '.js-register'
	  },

	  events: {
	    'submit @ui.form': 'submit',
	    'click @ui.registerButton': 'toRegister'
	  },

	  template: _template2.default,

	  close: function close() {
	    this.remove();
	  },
	  submit: function submit(event) {
	    event.preventDefault();
	    var $form = this.getUI('form');
	    var identification = $form.find('.js-identification').val();
	    var password = $form.find('.js-password').val();

	    _session2.default.login(identification, password).then(function (user) {
	      if (user.photos.length) {
	        _main.router.navigate('dashboard', true);
	      } else {
	        _main.router.navigate('first-steps/photo', true);
	      }
	    }).catch(function (errors) {
	      _underscore2.default.each(errors, function (error) {
	        $form.find('.js-error-' + error.field).text(error.message);
	      });
	    });
	  },
	  toRegister: function toRegister() {
	    _main.router.navigate('register', true);
	  }
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(13);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<div class=\"card\">\n  <form class=\"js-form\">\n    <div class=\"card__content\">\n      <div class=\"input-box\">\n        <label for=\"login-input-identification\" class=\"input-box__label\">Email or username</label>\n        <input type=\"text\" class=\"input-box__input js-identification\" id=\"login-input-identification\"/>\n        <span class=\"input-box__message is-error js-error-identification\"></span>\n      </div>\n      <div class=\"input-box\">\n        <label for=\"login-input-password\" class=\"input-box__label\">Password</label>\n        <input type=\"password\" class=\"input-box__input js-password\" id=\"login-input-password\"/>\n        <span class=\"input-box__message is-error js-error-password\"></span>\n      </div>\n    </div>\n    <div class=\"card__actions align-right\">\n      <div class=\"button button--dialog js-register\">\n        REGISTER\n      </div>\n      <button class=\"button button--dialog\" type=\"submit\">\n        LOGIN\n      </button>\n    </div>\n  </form>\n</div>\n";
	},"useData":true});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(8);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _underscore = __webpack_require__(6);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.View.extend({
	  tagName: 'article',

	  className: 'page register-page',

	  ui: {
	    form: '.js-form'
	  },

	  events: {
	    'submit @ui.form': 'submit'
	  },

	  template: _template2.default,

	  close: function close() {
	    this.remove();
	  },
	  submit: function submit(event) {
	    event.preventDefault();
	    var $form = this.getUI('form');
	    var email = $form.find('.js-email').val();
	    var password = $form.find('.js-password').val();

	    _jquery2.default.ajax({
	      url: _config2.default.apiEndpoint + '/users/register',
	      method: 'POST',
	      data: {
	        email: email,
	        password: password
	      }
	    }).done(function () {
	      // TODO: Handle successful registration

	    }).fail(function (jqXHR) {
	      if (jqXHR.status >= 400) {
	        var errors = jqXHR.responseJSON.errors;
	        _underscore2.default.each(errors, function (error) {
	          $form.find('.js-error-' + error.field).text(error.message);
	        });
	      }
	    });
	  }
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(13);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<div class=\"card\">\n  <form class=\"js-form\">\n    <div class=\"card__content\">\n      <div class=\"input-box\">\n        <label for=\"register-input-email\" class=\"input-box__label\">Email</label>\n        <input type=\"email\" class=\"input-box__input js-email\" id=\"register-input-email\" required/>\n        <span class=\"input-box__message is-error js-error-email\"></span>\n      </div>\n      <div class=\"input-box\">\n        <label for=\"register-input-password\" class=\"input-box__label\">Password</label>\n        <input type=\"password\" class=\"input-box__input js-password\" id=\"register-input-password\" required/>\n        <span class=\"input-box__message is-error js-error-password\"></span>\n      </div>\n    </div>\n    <div class=\"card__actions align-right\">\n      <button class=\"button button--dialog\" type=\"submit\">\n        REGISTER\n      </button>\n    </div>\n  </form>\n</div>\n";
	},"useData":true});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(5);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(8);

	var _backbone4 = _interopRequireDefault(_backbone3);

	var _underscore = __webpack_require__(6);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _template = __webpack_require__(19);

	var _template2 = _interopRequireDefault(_template);

	var _component = __webpack_require__(20);

	var _component2 = _interopRequireDefault(_component);

	var _thread = __webpack_require__(22);

	var _thread2 = _interopRequireDefault(_thread);

	var _categories = __webpack_require__(35);

	var _categories2 = _interopRequireDefault(_categories);

	var _thread3 = __webpack_require__(37);

	var _thread4 = _interopRequireDefault(_thread3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import {router} from 'router/main';

	exports.default = _backbone4.default.View.extend({
	  tagName: 'article',

	  className: 'page forum-page',

	  template: _template2.default,

	  templateContext: {
	    categories: _categories2.default
	  },

	  initialize: function initialize() {
	    _categories2.default.fetch();
	  }
	});

	// export default Backbone.View.extend({
	//
	//   events: {
	//     'click .js-create-new-thread': 'showNewThreadModal',
	//     'click .js-forum-edit': 'transitionToEditForum'
	//   },
	//
	//   initialize() {
	//     categories.fetch();
	//     this.listenTo(categories, 'change reset add remove', this.render);
	//   },
	//
	//   render() {
	//     this.$el.html(
	//
	//       _.template(
	//         this.template({
	//           categories
	//         })
	//       )
	//     );
	//
	//     return this;
	//   },
	//
	//   close() {
	//     this.remove();
	//
	//     if (this.newThreadModalDialog) {
	//       this.newThreadModalDialog.close();
	//     }
	//
	//     if (this.newThreadFormObject) {
	//       this.newThreadFormObject.close();
	//     }
	//   },
	//
	//   showNewThreadModal(event) {
	//     this.newThreadFormObject = new NewThreadForm({
	//       model: new Thread({
	//         categoryId: event.currentTarget.dataset.categoryId
	//       })
	//     });
	//
	//     this.newThreadForm = this.newThreadFormObject.getForm();
	//     this.newThreadForm.render();
	//
	//     this.newThreadForm.on('submit', this.closeNewThreadModalDialog);
	//
	//     this.newThreadModalDialog = new ModalDialog({
	//       title: 'Create new thread',
	//       content: this.newThreadForm.el.outerHTML,
	//       cancelLabel: 'cancel',
	//       cancelAction: this.closeNewThreadModalDialog.bind(this),
	//       confirmLabel: 'create',
	//       confirmAction: this.createNewThread.bind(this)
	//     });
	//
	//     this.newThreadModalDialog.render();
	//   },
	//
	//   closeNewThreadModalDialog() {
	//     this.newThreadForm.off();
	//     this.newThreadModalDialog.close();
	//     this.newThreadModalDialog = null;
	//   },
	//
	//   createNewThread() {
	//     this.newThreadFormObject.submit();
	//     this.closeNewThreadModalDialog();
	//   },
	//
	//   transitionToEditForum() {
	//     router.navigate('forum/edit', true);
	//   }
	// });

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(13);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<div class=\"forum\">\n  <div class=\"forum__heading\">\n    <div class=\"forum__title\">\n      FORUM\n    </div>\n    <div class=\"forum__actions\">\n      <img class=\"forum__action js-forum-edit\" src=\"/public/images/edit-icon-white.svg\" alt=\"Edit\" />\n    </div>\n  </div>\n  <!-- <% categories.each(function(category) { %>\n    <div class=\"card-list\">\n      <div class=\"card-list__header\">\n        <div class=\"card-list__title\">\n          <%= category.get('name') %>\n        </div>\n        <div class=\"card-list__header-actions\">\n          <div class=\"card-list__header-icon-action js-create-new-thread\" data-category-id=\"<%= category.get('id') %>\">\n            <img src=\"/public/images/add-icon-white.svg\" alt=\"addNewThread\" />\n          </div>\n        </div>\n      </div>\n      <div class=\"card-list__items\">\n        <% if (category.get('threads')) { %>\n          <% _.each(category.get('threads'), function(thread) { %>\n            <div class=\"js-navigate-to-thread\" data-thread-id=\"<%= thread.id %>\">\n              <%= thread.title %>\n            </div>\n          <% }); %>\n        <% } else { %>\n          <div>\n            No threads in this category\n          </div>\n        <% } %>\n      </div>\n    </div>\n  <% }); %> -->\n</div>\n";
	},"useData":true});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(5);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _underscore = __webpack_require__(6);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _template = __webpack_require__(21);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.View.extend({
	  tagName: 'div',

	  className: 'modal-dialog-container',

	  events: {
	    click: 'onDismissClick',
	    'click .js-modal-dialog-confirm-action': 'onConfirmClick',
	    'click .js-modal-dialog-cancel-action': 'onCancelClick'
	  },

	  template: _template2.default,

	  initialize: function initialize(args) {
	    this.title = args.title;
	    this.content = args.content;

	    this.confirmLabel = args.confirmLabel;
	    this.confirmAction = args.confirmAction;

	    this.cancelLabel = args.cancelLabel;
	    this.cancelAction = args.cancelAction;

	    this.headerColor = args.headerColor;
	  },
	  onConfirmClick: function onConfirmClick() {
	    this.confirmAction();
	  },
	  onCancelClick: function onCancelClick() {
	    this.cancelAction();
	  },
	  onDismissClick: function onDismissClick(event) {
	    if ((0, _jquery2.default)(event.target).hasClass('modal-dialog-container')) {
	      this.onCancelClick();
	    }
	  },
	  render: function render() {
	    this.$el.html(_underscore2.default.template(this.template({
	      title: this.title,
	      content: this.content,
	      confirmLabel: this.confirmLabel,
	      cancelLabel: this.cancelLabel,
	      headerColor: this.headerColor
	    })));

	    (0, _jquery2.default)('body').append(this.$el);
	    (0, _jquery2.default)('body').addClass('is-scrolling-disabled');

	    return this;
	  },
	  close: function close() {
	    this.remove();
	    (0, _jquery2.default)('body').removeClass('is-scrolling-disabled');
	  }
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(6);
	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="modal-dialog">\n  <div class="modal-dialog__header" ';
	 if (headerColor) { 
	__p+=' style="background-color: '+
	((__t=( headerColor ))==null?'':__t)+
	'"';
	 } 
	__p+='>\n    '+
	((__t=( title ))==null?'':__t)+
	'\n  </div>\n\n  <div class="modal-dialog__content">\n    '+
	((__t=( content ))==null?'':__t)+
	'\n  </div>\n\n  <div class="modal-dialog__actions">\n    ';
	 if (cancelLabel) { 
	__p+='\n      <div class="button button--dialog js-modal-dialog-cancel-action">\n        '+
	((__t=( cancelLabel ))==null?'':__t)+
	'\n      </div>\n    ';
	 } 
	__p+='\n\n    ';
	 if (confirmLabel) { 
	__p+='\n      <div class="button button--dialog js-modal-dialog-confirm-action">\n        '+
	((__t=( confirmLabel ))==null?'':__t)+
	'\n      </div>\n    ';
	 } 
	__p+='\n  </div>\n</div>\n';
	}
	return __p;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _baseForm = __webpack_require__(23);

	var _baseForm2 = _interopRequireDefault(_baseForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CategoryForm = function (_BaseForm) {
	  _inherits(CategoryForm, _BaseForm);

	  function CategoryForm() {
	    _classCallCheck(this, CategoryForm);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CategoryForm).apply(this, arguments));

	    _this.modelName = 'thread';

	    _this.properties = {
	      title: {
	        type: 'text'
	      },

	      content: {
	        type: 'trix'
	      }
	    };
	    return _this;
	  }

	  return CategoryForm;
	}(_baseForm2.default);

	exports.default = CategoryForm;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _underscore = __webpack_require__(6);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _component = __webpack_require__(24);

	var _component2 = _interopRequireDefault(_component);

	var _form = __webpack_require__(25);

	var _form2 = _interopRequireDefault(_form);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var createFormPropertyObject = _form2.default.createFormPropertyObject;

	var BaseForm = function () {
	  function BaseForm(attributes) {
	    _classCallCheck(this, BaseForm);

	    this.model = attributes.model;
	  }

	  _createClass(BaseForm, [{
	    key: 'getForm',
	    value: function getForm() {
	      if (!this.form) {
	        this._setupFormView();
	      }

	      return this.form;
	    }
	  }, {
	    key: 'submit',
	    value: function submit() {
	      var _this = this;

	      var propertyViews = this.form.propertyViews;
	      _underscore2.default.each(propertyViews, function (view) {
	        _this.model.set(view.name, view.getValue());
	      });

	      this.model.save();
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      if (this.form) {
	        this.form.close();
	      }
	    }
	  }, {
	    key: '_setupFormView',
	    value: function _setupFormView() {
	      var _this2 = this;

	      var propertyViews = [];

	      var properties = _underscore2.default.keys(this.properties);
	      _underscore2.default.each(properties, function (propertyName) {
	        var propertyOptions = _this2.properties[propertyName];
	        propertyOptions.value = propertyOptions.value || _this2.model.get(propertyName);
	        var propertyView = createFormPropertyObject(propertyName, propertyOptions);
	        propertyViews.push(propertyView);
	      });

	      this.form = new _component2.default({
	        propertyViews: propertyViews
	      });

	      this.form.on('submit', this.submit);

	      this.form.render();
	    }
	  }]);

	  return BaseForm;
	}();

	exports.default = BaseForm;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(5);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _underscore = __webpack_require__(6);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.View.extend({
	  tagName: 'form',

	  className: '',

	  events: {
	    'click .js-form': 'onSubmit'
	  },

	  initialize: function initialize(args) {
	    this.propertyViews = args.propertyViews;
	  },
	  render: function render() {
	    var _this = this;

	    _underscore2.default.each(this.propertyViews, function (view) {
	      view.render();
	      _this.$el.append(view.$el);
	    });

	    return this;
	  },
	  close: function close() {
	    this.remove();
	  },
	  onSubmit: function onSubmit(event) {
	    event.preventDefault();
	    this.trigger('submit');
	  }
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _component = __webpack_require__(26);

	var _component2 = _interopRequireDefault(_component);

	var _component3 = __webpack_require__(28);

	var _component4 = _interopRequireDefault(_component3);

	var _component5 = __webpack_require__(30);

	var _component6 = _interopRequireDefault(_component5);

	var _component7 = __webpack_require__(32);

	var _component8 = _interopRequireDefault(_component7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  createFormPropertyObject: function createFormPropertyObject(propertyName, propertyOptions) {
	    switch (propertyOptions.type) {
	      case 'text':
	        return new _component2.default({
	          name: propertyName,
	          value: propertyOptions.value,
	          required: propertyOptions.required
	        });
	      case 'switch':
	        return new _component4.default({
	          name: propertyName,
	          value: propertyOptions.value
	        });
	      case 'trix':
	        return new _component6.default({
	          name: propertyName,
	          value: propertyOptions.value
	        });
	      case 'color-select':
	        return new _component8.default({
	          name: propertyName,
	          value: propertyOptions.value
	        });
	      default:
	        throw new Error('unknown form property type');
	    }
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(5);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _underscore = __webpack_require__(6);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _template = __webpack_require__(27);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.View.extend({
	  tagName: 'div',

	  className: 'input-box',

	  initialize: function initialize(args) {
	    this.name = args.name;
	    this.value = args.value;
	    this.inputId = _underscore2.default.uniqueId();
	    this.isRequired = args.required;
	  },


	  template: _template2.default,

	  render: function render() {
	    this.$el.html(_underscore2.default.template(this.template({
	      label: this.name,
	      value: this.value,
	      inputId: this.inputId,
	      isRequired: this.isRequired
	    })));

	    return this;
	  },
	  close: function close() {
	    this.remove();
	  },
	  getValue: function getValue() {
	    var value = (0, _jquery2.default)('#' + this.inputId).val();
	    return value;
	  }
	});

	// template

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(6);
	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<label for="'+
	((__t=( inputId ))==null?'':__t)+
	'" class="input-box__label">'+
	((__t=( label ))==null?'':__t)+
	'</label>\n<input type="text" class="input-box__input" value="'+
	((__t=( value ))==null?'':__t)+
	'" id="'+
	((__t=( inputId ))==null?'':__t)+
	'" ';
	 if (isRequired) { 
	__p+=' required ';
	 }; 
	__p+=' />\n<span class="input-box__message is-error"></span>\n';
	}
	return __p;
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(5);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _underscore = __webpack_require__(6);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _template = __webpack_require__(29);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.View.extend({
	  tagName: 'div',

	  className: 'input-box',

	  initialize: function initialize(args) {
	    this.name = args.name;
	    this.value = args.value;
	    this.inputId = _underscore2.default.uniqueId();
	    this.isRequired = args.required;
	  },


	  template: _template2.default,

	  render: function render() {
	    this.$el.html(_underscore2.default.template(this.template({
	      label: this.name,
	      value: this.value,
	      inputId: this.inputId,
	      isRequired: this.isRequired
	    })));

	    return this;
	  },
	  close: function close() {
	    this.remove();
	  },
	  getValue: function getValue() {
	    var value = (0, _jquery2.default)('#' + this.inputId).val();
	    return value;
	  }
	});

	// template

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(6);
	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="input-box__text">'+
	((__t=( label ))==null?'':__t)+
	'</div>\n<input class="input-box__switch-input" type="checkbox" id="'+
	((__t=( inputId ))==null?'':__t)+
	'" hidden="hidden" ';
	 if (value) { 
	__p+=' checked ';
	 }; 
	__p+='/>\n<label class="input-box__switch-label" for="'+
	((__t=( inputId ))==null?'':__t)+
	'"></label>\n<span class="input-box__message is-error"></span>\n';
	}
	return __p;
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(5);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _underscore = __webpack_require__(6);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _template = __webpack_require__(31);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.View.extend({
	  tagName: 'div',

	  className: 'trix-container',

	  initialize: function initialize(args) {
	    this.name = args.name;
	    this.inputId = _underscore2.default.uniqueId();
	  },


	  template: _template2.default,

	  render: function render() {
	    this.$el.html(_underscore2.default.template(this.template({
	      inputId: this.inputId
	    })));

	    return this;
	  },
	  close: function close() {
	    this.remove();
	  },
	  getValue: function getValue() {
	    var value = (0, _jquery2.default)('#' + this.inputId).val();
	    return value;
	  }
	});

	// template

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(6);
	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<trix-editor id="'+
	((__t=( inputId ))==null?'':__t)+
	'"></trix-editor>\n';
	}
	return __p;
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(5);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _underscore = __webpack_require__(6);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _template = __webpack_require__(33);

	var _template2 = _interopRequireDefault(_template);

	var _colors = __webpack_require__(34);

	var _colors2 = _interopRequireDefault(_colors);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.View.extend({
	  tagName: 'div',

	  className: 'color-select',

	  initialize: function initialize(args) {
	    this.inputId = _underscore2.default.uniqueId();
	    this.name = args.name;
	    this.value = args.value || '1';

	    this.colors = _underscore2.default.pairs(_colors2.default).map(function (colorArray) {
	      return {
	        id: colorArray[0],
	        hexValue: colorArray[1].hexColor
	      };
	    });
	  },


	  template: _template2.default,

	  render: function render() {
	    this.$el.html(_underscore2.default.template(this.template({
	      label: this.name,
	      value: this.value,
	      inputId: this.inputId,
	      colors: this.colors
	    })));

	    return this;
	  },
	  close: function close() {
	    this.remove();
	  },
	  getValue: function getValue() {
	    var value = (0, _jquery2.default)('.js-color-select-' + this.inputId + ':checked').val();
	    return value;
	  }
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(6);
	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="color-select__label">\n'+
	((__t=( label ))==null?'':__t)+
	'\n</div>\n';
	 _.each(colors, function(color) { 
	__p+='\n  <input type="radio" name="'+
	((__t=( inputId ))==null?'':__t)+
	'" value="'+
	((__t=( color.id ))==null?'':__t)+
	'" class="color-select__item js-color-select-'+
	((__t=( inputId ))==null?'':__t)+
	'" style="background-color: '+
	((__t=( color.hexValue ))==null?'':__t)+
	'" ';
	 if (value === color.id) { 
	__p+=' checked ';
	 }; 
	__p+='/>\n';
	 }); 
	__p+='\n';
	}
	return __p;
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  1: {
	    hexColor: '#2196F3'
	  },
	  2: {
	    hexColor: '#F44336'
	  },
	  3: {
	    hexColor: '#009688'
	  },
	  4: {
	    hexColor: '#FF5722'
	  },
	  5: {
	    hexColor: '#673AB7'
	  }
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(5);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _category = __webpack_require__(36);

	var _category2 = _interopRequireDefault(_category);

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Forum = _backbone2.default.Collection.extend({
	  model: _category2.default,
	  url: _config2.default.apiEndpoint + '/categories'
	});

	exports.default = new Forum();

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(5);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.Model.extend({
	  urlRoot: _config2.default.apiEndpoint + '/categories'
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(5);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.Model.extend({
	  urlRoot: _config2.default.apiEndpoint + '/threads'
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(8);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _template = __webpack_require__(39);

	var _template2 = _interopRequireDefault(_template);

	var _session = __webpack_require__(1);

	var _session2 = _interopRequireDefault(_session);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.View.extend({
	  tagName: 'article',

	  className: 'page dashboard-page',

	  template: _template2.default,

	  initialize: function initialize() {
	    this.currentUser = _session2.default.getCurrentUser();
	  },
	  templateContext: function templateContext() {
	    return {
	      currentUser: this.currentUser
	    };
	  }
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(13);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "    CurrentUser: <b>"
	    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentUser : depth0)) != null ? stack1.username : stack1), depth0))
	    + "</b>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "<section>\n"
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.currentUser : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</section>\n";
	},"useData":true});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(setImmediate) {/*
	Trix 0.9.8
	Copyright © 2016 Basecamp, LLC
	http://trix-editor.org/
	 */
	(function(){}).call(this),function(){var t;null==window.Set&&(window.Set=t=function(){function t(){this.clear()}return t.prototype.clear=function(){return this.values=[]},t.prototype.has=function(t){return-1!==this.values.indexOf(t)},t.prototype.add=function(t){return this.has(t)||this.values.push(t),this},t.prototype["delete"]=function(t){var e;return-1===(e=this.values.indexOf(t))?!1:(this.values.splice(e,1),!0)},t.prototype.forEach=function(){var t;return(t=this.values).forEach.apply(t,arguments)},t}())}.call(this),function(t){function e(){}function n(t,e){return function(){t.apply(e,arguments)}}function o(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],c(t,this)}function i(t,e){for(;3===t._state;)t=t._value;return 0===t._state?void t._deferreds.push(e):(t._handled=!0,void h(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?r:s)(e.promise,t._value);var o;try{o=n(t._value)}catch(i){return void s(e.promise,i)}r(e.promise,o)}))}function r(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var i=e.then;if(e instanceof o)return t._state=3,t._value=e,void a(t);if("function"==typeof i)return void c(n(i,e),t)}t._state=1,t._value=e,a(t)}catch(r){s(t,r)}}function s(t,e){t._state=2,t._value=e,a(t)}function a(t){2===t._state&&0===t._deferreds.length&&setTimeout(function(){t._handled||p(t._value)},1);for(var e=0,n=t._deferreds.length;n>e;e++)i(t,t._deferreds[e]);t._deferreds=null}function u(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function c(t,e){var n=!1;try{t(function(t){n||(n=!0,r(e,t))},function(t){n||(n=!0,s(e,t))})}catch(o){if(n)return;n=!0,s(e,o)}}var l=setTimeout,h="function"==typeof setImmediate&&setImmediate||function(t){l(t,1)},p=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)};o.prototype["catch"]=function(t){return this.then(null,t)},o.prototype.then=function(t,n){var r=new o(e);return i(this,new u(t,n,r)),r},o.all=function(t){var e=Array.prototype.slice.call(t);return new o(function(t,n){function o(r,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,function(t){o(r,t)},n)}e[r]=s,0===--i&&t(e)}catch(u){n(u)}}if(0===e.length)return t([]);for(var i=e.length,r=0;r<e.length;r++)o(r,e[r])})},o.resolve=function(t){return t&&"object"==typeof t&&t.constructor===o?t:new o(function(e){e(t)})},o.reject=function(t){return new o(function(e,n){n(t)})},o.race=function(t){return new o(function(e,n){for(var o=0,i=t.length;i>o;o++)t[o].then(e,n)})},o._setImmediateFn=function(t){h=t},o._setUnhandledRejectionFn=function(t){p=t},"undefined"!=typeof module&&module.exports?module.exports=o:t.Promise||(t.Promise=o)}(this),/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	"undefined"==typeof WeakMap&&!function(){var t=Object.defineProperty,e=Date.now()%1e9,n=function(){this.name="__st"+(1e9*Math.random()>>>0)+(e++ +"__")};n.prototype={set:function(e,n){var o=e[this.name];return o&&o[0]===e?o[1]=n:t(e,this.name,{value:[e,n],writable:!0}),this},get:function(t){var e;return(e=t[this.name])&&e[0]===t?e[1]:void 0},"delete":function(t){var e=t[this.name];return e&&e[0]===t?(e[0]=e[1]=void 0,!0):!1},has:function(t){var e=t[this.name];return e?e[0]===t:!1}},window.WeakMap=n}(),function(t){function e(t){A.push(t),b||(b=!0,g(o))}function n(t){return window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(t)||t}function o(){b=!1;var t=A;A=[],t.sort(function(t,e){return t.uid_-e.uid_});var e=!1;t.forEach(function(t){var n=t.takeRecords();i(t),n.length&&(t.callback_(n,t),e=!0)}),e&&o()}function i(t){t.nodes_.forEach(function(e){var n=m.get(e);n&&n.forEach(function(e){e.observer===t&&e.removeTransientObservers()})})}function r(t,e){for(var n=t;n;n=n.parentNode){var o=m.get(n);if(o)for(var i=0;i<o.length;i++){var r=o[i],s=r.options;if(n===t||s.subtree){var a=e(s);a&&r.enqueue(a)}}}}function s(t){this.callback_=t,this.nodes_=[],this.records_=[],this.uid_=++C}function a(t,e){this.type=t,this.target=e,this.addedNodes=[],this.removedNodes=[],this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function u(t){var e=new a(t.type,t.target);return e.addedNodes=t.addedNodes.slice(),e.removedNodes=t.removedNodes.slice(),e.previousSibling=t.previousSibling,e.nextSibling=t.nextSibling,e.attributeName=t.attributeName,e.attributeNamespace=t.attributeNamespace,e.oldValue=t.oldValue,e}function c(t,e){return w=new a(t,e)}function l(t){return x?x:(x=u(w),x.oldValue=t,x)}function h(){w=x=void 0}function p(t){return t===x||t===w}function d(t,e){return t===e?t:x&&p(t)?x:null}function f(t,e,n){this.observer=t,this.target=e,this.options=n,this.transientObservedNodes=[]}if(!t.JsMutationObserver){var g,m=new WeakMap;if(/Trident|Edge/.test(navigator.userAgent))g=setTimeout;else if(window.setImmediate)g=window.setImmediate;else{var y=[],v=String(Math.random());window.addEventListener("message",function(t){if(t.data===v){var e=y;y=[],e.forEach(function(t){t()})}}),g=function(t){y.push(t),window.postMessage(v,"*")}}var b=!1,A=[],C=0;s.prototype={observe:function(t,e){if(t=n(t),!e.childList&&!e.attributes&&!e.characterData||e.attributeOldValue&&!e.attributes||e.attributeFilter&&e.attributeFilter.length&&!e.attributes||e.characterDataOldValue&&!e.characterData)throw new SyntaxError;var o=m.get(t);o||m.set(t,o=[]);for(var i,r=0;r<o.length;r++)if(o[r].observer===this){i=o[r],i.removeListeners(),i.options=e;break}i||(i=new f(this,t,e),o.push(i),this.nodes_.push(t)),i.addListeners()},disconnect:function(){this.nodes_.forEach(function(t){for(var e=m.get(t),n=0;n<e.length;n++){var o=e[n];if(o.observer===this){o.removeListeners(),e.splice(n,1);break}}},this),this.records_=[]},takeRecords:function(){var t=this.records_;return this.records_=[],t}};var w,x;f.prototype={enqueue:function(t){var n=this.observer.records_,o=n.length;if(n.length>0){var i=n[o-1],r=d(i,t);if(r)return void(n[o-1]=r)}else e(this.observer);n[o]=t},addListeners:function(){this.addListeners_(this.target)},addListeners_:function(t){var e=this.options;e.attributes&&t.addEventListener("DOMAttrModified",this,!0),e.characterData&&t.addEventListener("DOMCharacterDataModified",this,!0),e.childList&&t.addEventListener("DOMNodeInserted",this,!0),(e.childList||e.subtree)&&t.addEventListener("DOMNodeRemoved",this,!0)},removeListeners:function(){this.removeListeners_(this.target)},removeListeners_:function(t){var e=this.options;e.attributes&&t.removeEventListener("DOMAttrModified",this,!0),e.characterData&&t.removeEventListener("DOMCharacterDataModified",this,!0),e.childList&&t.removeEventListener("DOMNodeInserted",this,!0),(e.childList||e.subtree)&&t.removeEventListener("DOMNodeRemoved",this,!0)},addTransientObserver:function(t){if(t!==this.target){this.addListeners_(t),this.transientObservedNodes.push(t);var e=m.get(t);e||m.set(t,e=[]),e.push(this)}},removeTransientObservers:function(){var t=this.transientObservedNodes;this.transientObservedNodes=[],t.forEach(function(t){this.removeListeners_(t);for(var e=m.get(t),n=0;n<e.length;n++)if(e[n]===this){e.splice(n,1);break}},this)},handleEvent:function(t){switch(t.stopImmediatePropagation(),t.type){case"DOMAttrModified":var e=t.attrName,n=t.relatedNode.namespaceURI,o=t.target,i=new c("attributes",o);i.attributeName=e,i.attributeNamespace=n;var s=t.attrChange===MutationEvent.ADDITION?null:t.prevValue;r(o,function(t){return!t.attributes||t.attributeFilter&&t.attributeFilter.length&&-1===t.attributeFilter.indexOf(e)&&-1===t.attributeFilter.indexOf(n)?void 0:t.attributeOldValue?l(s):i});break;case"DOMCharacterDataModified":var o=t.target,i=c("characterData",o),s=t.prevValue;r(o,function(t){return t.characterData?t.characterDataOldValue?l(s):i:void 0});break;case"DOMNodeRemoved":this.addTransientObserver(t.target);case"DOMNodeInserted":var a,u,p=t.target;"DOMNodeInserted"===t.type?(a=[p],u=[]):(a=[],u=[p]);var d=p.previousSibling,f=p.nextSibling,i=c("childList",t.target.parentNode);i.addedNodes=a,i.removedNodes=u,i.previousSibling=d,i.nextSibling=f,r(t.relatedNode,function(t){return t.childList?i:void 0})}h()}},t.JsMutationObserver=s,t.MutationObserver||(t.MutationObserver=s,s._isPolyfilled=!0)}}(self),function(){"use strict";if(!window.performance){var t=Date.now();window.performance={now:function(){return Date.now()-t}}}window.requestAnimationFrame||(window.requestAnimationFrame=function(){var t=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;return t?function(e){return t(function(){e(performance.now())})}:function(t){return window.setTimeout(t,1e3/60)}}()),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(){return window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||function(t){clearTimeout(t)}}());var e=function(){var t=document.createEvent("Event");return t.initEvent("foo",!0,!0),t.preventDefault(),t.defaultPrevented}();if(!e){var n=Event.prototype.preventDefault;Event.prototype.preventDefault=function(){this.cancelable&&(n.call(this),Object.defineProperty(this,"defaultPrevented",{get:function(){return!0},configurable:!0}))}}var o=/Trident/.test(navigator.userAgent);if((!window.CustomEvent||o&&"function"!=typeof window.CustomEvent)&&(window.CustomEvent=function(t,e){e=e||{};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,Boolean(e.bubbles),Boolean(e.cancelable),e.detail),n},window.CustomEvent.prototype=window.Event.prototype),!window.Event||o&&"function"!=typeof window.Event){var i=window.Event;window.Event=function(t,e){e=e||{};var n=document.createEvent("Event");return n.initEvent(t,Boolean(e.bubbles),Boolean(e.cancelable)),n},window.Event.prototype=i.prototype}}(window.WebComponents),window.CustomElements=window.CustomElements||{flags:{}},function(t){var e=t.flags,n=[],o=function(t){n.push(t)},i=function(){n.forEach(function(e){e(t)})};t.addModule=o,t.initializeModules=i,t.hasNative=Boolean(document.registerElement),t.isIE=/Trident/.test(navigator.userAgent),t.useNative=!e.register&&t.hasNative&&!window.ShadowDOMPolyfill&&(!window.HTMLImports||window.HTMLImports.useNative)}(window.CustomElements),window.CustomElements.addModule(function(t){function e(t,e){n(t,function(t){return e(t)?!0:void o(t,e)}),o(t,e)}function n(t,e,o){var i=t.firstElementChild;if(!i)for(i=t.firstChild;i&&i.nodeType!==Node.ELEMENT_NODE;)i=i.nextSibling;for(;i;)e(i,o)!==!0&&n(i,e,o),i=i.nextElementSibling;return null}function o(t,n){for(var o=t.shadowRoot;o;)e(o,n),o=o.olderShadowRoot}function i(t,e){r(t,e,[])}function r(t,e,n){if(t=window.wrap(t),!(n.indexOf(t)>=0)){n.push(t);for(var o,i=t.querySelectorAll("link[rel="+s+"]"),a=0,u=i.length;u>a&&(o=i[a]);a++)o.import&&r(o.import,e,n);e(t)}}var s=window.HTMLImports?window.HTMLImports.IMPORT_LINK_TYPE:"none";t.forDocumentTree=i,t.forSubtree=e}),window.CustomElements.addModule(function(t){function e(t,e){return n(t,e)||o(t,e)}function n(e,n){return t.upgrade(e,n)?!0:void(n&&s(e))}function o(t,e){b(t,function(t){return n(t,e)?!0:void 0})}function i(t){x.push(t),w||(w=!0,setTimeout(r))}function r(){w=!1;for(var t,e=x,n=0,o=e.length;o>n&&(t=e[n]);n++)t();x=[]}function s(t){C?i(function(){a(t)}):a(t)}function a(t){t.__upgraded__&&!t.__attached&&(t.__attached=!0,t.attachedCallback&&t.attachedCallback())}function u(t){c(t),b(t,function(t){c(t)})}function c(t){C?i(function(){l(t)}):l(t)}function l(t){t.__upgraded__&&t.__attached&&(t.__attached=!1,t.detachedCallback&&t.detachedCallback())}function h(t){for(var e=t,n=window.wrap(document);e;){if(e==n)return!0;e=e.parentNode||e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host}}function p(t){if(t.shadowRoot&&!t.shadowRoot.__watched){v.dom&&console.log("watching shadow-root for: ",t.localName);for(var e=t.shadowRoot;e;)g(e),e=e.olderShadowRoot}}function d(t,n){if(v.dom){var o=n[0];if(o&&"childList"===o.type&&o.addedNodes&&o.addedNodes){for(var i=o.addedNodes[0];i&&i!==document&&!i.host;)i=i.parentNode;var r=i&&(i.URL||i._URL||i.host&&i.host.localName)||"";r=r.split("/?").shift().split("/").pop()}console.group("mutations (%d) [%s]",n.length,r||"")}var s=h(t);n.forEach(function(t){"childList"===t.type&&(E(t.addedNodes,function(t){t.localName&&e(t,s)}),E(t.removedNodes,function(t){t.localName&&u(t)}))}),v.dom&&console.groupEnd()}function f(t){for(t=window.wrap(t),t||(t=window.wrap(document));t.parentNode;)t=t.parentNode;var e=t.__observer;e&&(d(t,e.takeRecords()),r())}function g(t){if(!t.__observer){var e=new MutationObserver(d.bind(this,t));e.observe(t,{childList:!0,subtree:!0}),t.__observer=e}}function m(t){t=window.wrap(t),v.dom&&console.group("upgradeDocument: ",t.baseURI.split("/").pop());var n=t===window.wrap(document);e(t,n),g(t),v.dom&&console.groupEnd()}function y(t){A(t,m)}var v=t.flags,b=t.forSubtree,A=t.forDocumentTree,C=window.MutationObserver._isPolyfilled&&v["throttle-attached"];t.hasPolyfillMutations=C,t.hasThrottledAttached=C;var w=!1,x=[],E=Array.prototype.forEach.call.bind(Array.prototype.forEach),S=Element.prototype.createShadowRoot;S&&(Element.prototype.createShadowRoot=function(){var t=S.call(this);return window.CustomElements.watchShadow(this),t}),t.watchShadow=p,t.upgradeDocumentTree=y,t.upgradeDocument=m,t.upgradeSubtree=o,t.upgradeAll=e,t.attached=s,t.takeRecords=f}),window.CustomElements.addModule(function(t){function e(e,o){if("template"===e.localName&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(e),!e.__upgraded__&&e.nodeType===Node.ELEMENT_NODE){var i=e.getAttribute("is"),r=t.getRegisteredDefinition(e.localName)||t.getRegisteredDefinition(i);if(r&&(i&&r.tag==e.localName||!i&&!r.extends))return n(e,r,o)}}function n(e,n,i){return s.upgrade&&console.group("upgrade:",e.localName),n.is&&e.setAttribute("is",n.is),o(e,n),e.__upgraded__=!0,r(e),i&&t.attached(e),t.upgradeSubtree(e,i),s.upgrade&&console.groupEnd(),e}function o(t,e){Object.__proto__?t.__proto__=e.prototype:(i(t,e.prototype,e.native),t.__proto__=e.prototype)}function i(t,e,n){for(var o={},i=e;i!==n&&i!==HTMLElement.prototype;){for(var r,s=Object.getOwnPropertyNames(i),a=0;r=s[a];a++)o[r]||(Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(i,r)),o[r]=1);i=Object.getPrototypeOf(i)}}function r(t){t.createdCallback&&t.createdCallback()}var s=t.flags;t.upgrade=e,t.upgradeWithDefinition=n,t.implementPrototype=o}),window.CustomElements.addModule(function(t){function e(e,o){var u=o||{};if(!e)throw new Error("document.registerElement: first argument `name` must not be empty");if(e.indexOf("-")<0)throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '"+String(e)+"'.");if(i(e))throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '"+String(e)+"'. The type name is invalid.");if(c(e))throw new Error("DuplicateDefinitionError: a type with name '"+String(e)+"' is already registered");return u.prototype||(u.prototype=Object.create(HTMLElement.prototype)),u.__name=e.toLowerCase(),u.extends&&(u.extends=u.extends.toLowerCase()),u.lifecycle=u.lifecycle||{},u.ancestry=r(u.extends),s(u),a(u),n(u.prototype),l(u.__name,u),u.ctor=h(u),u.ctor.prototype=u.prototype,u.prototype.constructor=u.ctor,t.ready&&m(document),u.ctor}function n(t){if(!t.setAttribute._polyfilled){var e=t.setAttribute;t.setAttribute=function(t,n){o.call(this,t,n,e)};var n=t.removeAttribute;t.removeAttribute=function(t){o.call(this,t,null,n)},t.setAttribute._polyfilled=!0}}function o(t,e,n){t=t.toLowerCase();var o=this.getAttribute(t);n.apply(this,arguments);var i=this.getAttribute(t);this.attributeChangedCallback&&i!==o&&this.attributeChangedCallback(t,o,i)}function i(t){for(var e=0;e<C.length;e++)if(t===C[e])return!0}function r(t){var e=c(t);return e?r(e.extends).concat([e]):[]}function s(t){for(var e,n=t.extends,o=0;e=t.ancestry[o];o++)n=e.is&&e.tag;t.tag=n||t.__name,n&&(t.is=t.__name)}function a(t){if(!Object.__proto__){var e=HTMLElement.prototype;if(t.is){var n=document.createElement(t.tag);e=Object.getPrototypeOf(n)}for(var o,i=t.prototype,r=!1;i;)i==e&&(r=!0),o=Object.getPrototypeOf(i),o&&(i.__proto__=o),i=o;r||console.warn(t.tag+" prototype not found in prototype chain for "+t.is),t.native=e}}function u(t){return v(E(t.tag),t)}function c(t){return t?w[t.toLowerCase()]:void 0}function l(t,e){w[t]=e}function h(t){return function(){return u(t)}}function p(t,e,n){return t===x?d(e,n):S(t,e)}function d(t,e){t&&(t=t.toLowerCase()),e&&(e=e.toLowerCase());var n=c(e||t);if(n){if(t==n.tag&&e==n.is)return new n.ctor;if(!e&&!n.is)return new n.ctor}var o;return e?(o=d(t),o.setAttribute("is",e),o):(o=E(t),t.indexOf("-")>=0&&b(o,HTMLElement),o)}function f(t,e){var n=t[e];t[e]=function(){var t=n.apply(this,arguments);return y(t),t}}var g,m=(t.isIE,t.upgradeDocumentTree),y=t.upgradeAll,v=t.upgradeWithDefinition,b=t.implementPrototype,A=t.useNative,C=["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"],w={},x="http://www.w3.org/1999/xhtml",E=document.createElement.bind(document),S=document.createElementNS.bind(document);g=Object.__proto__||A?function(t,e){return t instanceof e}:function(t,e){if(t instanceof e)return!0;for(var n=t;n;){if(n===e.prototype)return!0;n=n.__proto__}return!1},f(Node.prototype,"cloneNode"),f(document,"importNode"),document.registerElement=e,document.createElement=d,document.createElementNS=p,t.registry=w,t.instanceof=g,t.reservedTagList=C,t.getRegisteredDefinition=c,document.register=document.registerElement}),function(t){function e(){r(window.wrap(document)),window.CustomElements.ready=!0;var t=window.requestAnimationFrame||function(t){setTimeout(t,16)};t(function(){setTimeout(function(){window.CustomElements.readyTime=Date.now(),window.HTMLImports&&(window.CustomElements.elapsed=window.CustomElements.readyTime-window.HTMLImports.readyTime),document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})})}{var n=t.useNative,o=t.initializeModules;t.isIE}if(n){var i=function(){};t.watchShadow=i,t.upgrade=i,t.upgradeAll=i,t.upgradeDocumentTree=i,t.upgradeSubtree=i,t.takeRecords=i,t.instanceof=function(t,e){return t instanceof e}}else o();var r=t.upgradeDocumentTree,s=t.upgradeDocument;if(window.wrap||(window.ShadowDOMPolyfill?(window.wrap=window.ShadowDOMPolyfill.wrapIfNeeded,window.unwrap=window.ShadowDOMPolyfill.unwrapIfNeeded):window.wrap=window.unwrap=function(t){return t}),window.HTMLImports&&(window.HTMLImports.__importsParsingHook=function(t){t.import&&s(wrap(t.import))}),"complete"===document.readyState||t.flags.eager)e();else if("interactive"!==document.readyState||window.attachEvent||window.HTMLImports&&!window.HTMLImports.ready){var a=window.HTMLImports&&!window.HTMLImports.ready?"HTMLImportsLoaded":"DOMContentLoaded";window.addEventListener(a,e)}else e()}(window.CustomElements),function(){}.call(this),function(){(function(){(function(){this.Trix={VERSION:"0.9.8",ZERO_WIDTH_SPACE:"\ufeff",NON_BREAKING_SPACE:"\xa0",OBJECT_REPLACEMENT_CHARACTER:"\ufffc",config:{}}}).call(this)}).call(this);var t=this.Trix;(function(){(function(){t.BasicObject=function(){function t(){}var e,n,o;return t.proxyMethod=function(t){var o,i,r,s,a;return r=n(t),o=r.name,s=r.toMethod,a=r.toProperty,i=r.optional,this.prototype[o]=function(){var t,n;return t=null!=s?i?"function"==typeof this[s]?this[s]():void 0:this[s]():null!=a?this[a]:void 0,i?(n=null!=t?t[o]:void 0,null!=n?e.call(n,t,arguments):void 0):(n=t[o],e.call(n,t,arguments))}},n=function(t){var e,n;if(!(n=t.match(o)))throw new Error("can't parse @proxyMethod expression: "+t);return e={name:n[4]},null!=n[2]?e.toMethod=n[1]:e.toProperty=n[1],null!=n[3]&&(e.optional=!0),e},e=Function.prototype.apply,o=/^(.+?)(\(\))?(\?)?\.(.+?)$/,t}()}).call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.Object=function(n){function o(){this.id=++i}var i;return e(o,n),i=0,o.fromJSONString=function(t){return this.fromJSON(JSON.parse(t))},o.prototype.hasSameConstructorAs=function(t){return this.constructor===(null!=t?t.constructor:void 0)},o.prototype.isEqualTo=function(t){return this===t},o.prototype.inspect=function(){var t,e,n;return t=function(){var t,o,i;o=null!=(t=this.contentsForInspection())?t:{},i=[];for(e in o)n=o[e],i.push(e+"="+n);return i}.call(this),"#<"+this.constructor.name+":"+this.id+(t.length?" "+t.join(", "):"")+">"},o.prototype.contentsForInspection=function(){},o.prototype.toJSONString=function(){return JSON.stringify(this)},o.prototype.toUTF16String=function(){return t.UTF16String.box(this)},o.prototype.getCacheKey=function(){return this.id.toString()},o}(t.BasicObject)}.call(this),function(){t.extend=function(t){var e,n;for(e in t)n=t[e],this[e]=n;return this}}.call(this),function(){var e,n;t.extend({defer:function(t){return setTimeout(t,1)},memoize:function(t){var e;return e=n++,function(){var n;return null==this.memos&&(this.memos={}),null!=(n=this.memos)[e]?n[e]:n[e]=t.apply(this,arguments)}}}),n=0,e=function(t){var e,n;return null!=(e=null!=(n=null!=t&&"function"==typeof t.inspect?t.inspect():void 0)?n:function(){try{return JSON.stringify(t)}catch(e){}}())?e:t}}.call(this),function(){var e,n;t.extend({normalizeSpaces:function(e){return e.replace(RegExp(""+t.ZERO_WIDTH_SPACE,"g"),"").replace(RegExp(""+t.NON_BREAKING_SPACE,"g")," ")},summarizeStringChange:function(e,o){var i,r,s,a;return e=t.UTF16String.box(e),o=t.UTF16String.box(o),o.length<e.length?(r=n(e,o),a=r[0],i=r[1]):(s=n(o,e),i=s[0],a=s[1]),{added:i,removed:a}}}),n=function(n,o){var i,r,s,a,u;return n.isEqualTo(o)?["",""]:(r=e(n,o),a=r.utf16String.length,s=a?(u=r.offset,r,i=n.codepoints.slice(0,u).concat(n.codepoints.slice(u+a)),e(o,t.UTF16String.fromCodepoints(i))):e(o,n),[r.utf16String.toString(),s.utf16String.toString()])},e=function(t,e){var n,o,i;for(n=0,o=t.length,i=e.length;o>n&&t.charAt(n).isEqualTo(e.charAt(n));)n++;for(;o>n+1&&t.charAt(o-1).isEqualTo(e.charAt(i-1));)o--,i--;return{utf16String:t.slice(n,o),offset:n}}}.call(this),function(){t.extend({copyObject:function(t){var e,n,o;null==t&&(t={}),n={};for(e in t)o=t[e],n[e]=o;return n},objectsAreEqual:function(t,e){var n,o;if(null==t&&(t={}),null==e&&(e={}),Object.keys(t).length!==Object.keys(e).length)return!1;for(n in t)if(o=t[n],o!==e[n])return!1;return!0}})}.call(this),function(){t.extend({arraysAreEqual:function(t,e){var n,o,i,r;if(null==t&&(t=[]),null==e&&(e=[]),t.length!==e.length)return!1;for(o=n=0,i=t.length;i>n;o=++n)if(r=t[o],r!==e[o])return!1;return!0},summarizeArrayChange:function(t,e){var n,o,i,r,s,a,u,c,l,h,p;for(null==t&&(t=[]),null==e&&(e=[]),n=[],h=[],i=new Set,r=0,u=t.length;u>r;r++)p=t[r],i.add(p);for(o=new Set,s=0,c=e.length;c>s;s++)p=e[s],o.add(p),i.has(p)||n.push(p);for(a=0,l=t.length;l>a;a++)p=t[a],o.has(p)||h.push(p);return{added:n,removed:h}}})}.call(this),function(){var e,n,o,i,r,s=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1};e=document.documentElement,n=null!=(o=null!=(i=null!=(r=e.matchesSelector)?r:e.webkitMatchesSelector)?i:e.msMatchesSelector)?o:e.mozMatchesSelector,t.extend({handleEvent:function(n,o){var i,r,s,a,u,c,l,h,p,d,f,g;return h=null!=o?o:{},c=h.onElement,u=h.matchingSelector,g=h.withCallback,a=h.inPhase,l=h.preventDefault,d=h.times,r=null!=c?c:e,p=u,i=g,f="capturing"===a,s=function(e){var n;return null!=d&&0===--d&&s.destroy(),n=t.findClosestElementFromNode(e.target,{matchingSelector:p}),null!=n&&(null!=g&&g.call(n,e,n),l)?e.preventDefault():void 0},s.destroy=function(){return r.removeEventListener(n,s,f)},r.addEventListener(n,s,f),s},handleEventOnce:function(e,n){return null==n&&(n={}),n.times=1,t.handleEvent(e,n)},triggerEvent:function(n,o){var i,r,s,a,u,c,l;return l=null!=o?o:{},c=l.onElement,r=l.bubbles,s=l.cancelable,i=l.attributes,a=null!=c?c:e,r=r!==!1,s=s!==!1,u=document.createEvent("Events"),u.initEvent(n,r,s),null!=i&&t.extend.call(u,i),a.dispatchEvent(u)},elementMatchesSelector:function(t,e){return 1===(null!=t?t.nodeType:void 0)?n.call(t,e):void 0},findClosestElementFromNode:function(e,n){var o;for(o=(null!=n?n:{}).matchingSelector;null!=e&&e.nodeType!==Node.ELEMENT_NODE;)e=e.parentNode;if(null!=e){if(null==o)return e;if(e.closest)return e.closest(o);for(;e;){if(t.elementMatchesSelector(e,o))return e;e=e.parentNode}}},findInnerElement:function(t){for(;null!=t?t.firstElementChild:void 0;)t=t.firstElementChild;return t},innerElementIsActive:function(e){return document.activeElement!==e&&t.elementContainsNode(e,document.activeElement)},elementContainsNode:function(t,e){if(t&&e)for(;e;){if(e===t)return!0;e=e.parentNode}},findNodeFromContainerAndOffset:function(t,e){var n;if(t)return t.nodeType===Node.TEXT_NODE?t:0===e?null!=(n=t.firstChild)?n:t:t.childNodes.item(e-1)},findElementFromContainerAndOffset:function(e,n){var o;return o=t.findNodeFromContainerAndOffset(e,n),t.findClosestElementFromNode(o)},findChildIndexOfNode:function(t){var e;if(null!=t?t.parentNode:void 0){for(e=0;t=t.previousSibling;)e++;return e}},measureElement:function(t){return{width:t.offsetWidth,height:t.offsetHeight}},walkTree:function(t,e){var n,o,i,r,s;return i=null!=e?e:{},o=i.onlyNodesOfType,r=i.usingFilter,n=i.expandEntityReferences,s=function(){switch(o){case"element":return NodeFilter.SHOW_ELEMENT;case"text":return NodeFilter.SHOW_TEXT;case"comment":return NodeFilter.SHOW_COMMENT;default:return NodeFilter.SHOW_ALL}}(),document.createTreeWalker(t,s,null!=r?r:null,n===!0)},tagName:function(t){var e;return null!=t&&null!=(e=t.tagName)?e.toLowerCase():void 0},makeElement:function(t,e){var n,o,i,r,s,a,u,c,l,h;if(null==e&&(e={}),"object"==typeof t?(e=t,t=e.tagName):e={attributes:e},o=document.createElement(t),null!=e.editable&&(null==e.attributes&&(e.attributes={}),e.attributes.contenteditable=e.editable),e.attributes){a=e.attributes;for(r in a)h=a[r],o.setAttribute(r,h)}if(e.style){u=e.style;for(r in u)h=u[r],o.style[r]=h}if(e.data){c=e.data;for(r in c)h=c[r],o.dataset[r]=h}if(e.className)for(l=e.className.split(" "),i=0,s=l.length;s>i;i++)n=l[i],o.classList.add(n);return e.textContent&&(o.textContent=e.textContent),o},cloneFragment:function(t){var e,n,o,i,r;for(e=document.createDocumentFragment(),r=t.childNodes,n=0,o=r.length;o>n;n++)i=r[n],e.appendChild(i.cloneNode(!0));return e},makeFragment:function(t){var e,n,o;for(null==t&&(t=""),e=document.createElement("div"),e.innerHTML=t,n=document.createDocumentFragment();o=e.firstChild;)n.appendChild(o);return n},getBlockTagNames:function(){var e,n;return null!=t.blockTagNames?t.blockTagNames:t.blockTagNames=function(){var o,i;o=t.config.blockAttributes,i=[];for(e in o)n=o[e],i.push(n.tagName);return i}()},nodeIsBlockContainer:function(e){return t.nodeIsBlockStartComment(null!=e?e.firstChild:void 0)},nodeProbablyIsBlockContainer:function(e){var n,o;return n=t.tagName(e),s.call(t.getBlockTagNames(),n)>=0&&(o=t.tagName(e.firstChild),s.call(t.getBlockTagNames(),o)<0)},nodeIsBlockStart:function(e,n){var o;return o=(null!=n?n:{strict:!0}).strict,o?t.nodeIsBlockStartComment(e):t.nodeIsBlockStartComment(e)||!t.nodeIsBlockStartComment(e.firstChild)&&t.nodeProbablyIsBlockContainer(e)},nodeIsBlockStartComment:function(e){return t.nodeIsCommentNode(e)&&"block"===(null!=e?e.data:void 0)},nodeIsCommentNode:function(t){return(null!=t?t.nodeType:void 0)===Node.COMMENT_NODE},nodeIsCursorTarget:function(e){return e?t.nodeIsTextNode(e)?e.data===t.ZERO_WIDTH_SPACE:t.nodeIsCursorTarget(e.firstChild):void 0},nodeIsAttachmentElement:function(e){return t.elementMatchesSelector(e,t.AttachmentView.attachmentSelector)},nodeIsEmptyTextNode:function(e){return t.nodeIsTextNode(e)&&""===(null!=e?e.data:void 0)},nodeIsTextNode:function(t){return(null!=t?t.nodeType:void 0)===Node.TEXT_NODE}})}.call(this),function(){var e,n,o,i,r;e=t.copyObject,i=t.objectsAreEqual,t.extend({normalizeRange:o=function(t){var e;if(null!=t)return Array.isArray(t)||(t=[t,t]),[n(t[0]),n(null!=(e=t[1])?e:t[0])]},rangeIsCollapsed:function(t){var e,n,i;if(null!=t)return n=o(t),i=n[0],e=n[1],r(i,e)},rangesAreEqual:function(t,e){var n,i,s,a,u,c;if(null!=t&&null!=e)return s=o(t),i=s[0],n=s[1],a=o(e),c=a[0],u=a[1],r(i,c)&&r(n,u)}}),n=function(t){return"number"==typeof t?t:e(t)},r=function(t,e){return"number"==typeof t?t===e:i(t,e)}}.call(this),function(){var e,n,o,i;e={extendsTagName:"div",css:"%t { display: block; }"},t.registerElement=function(t,n){var r,s,a,u,c,l,h;return null==n&&(n={}),t=t.toLowerCase(),c=i(n),u=null!=(h=c.extendsTagName)?h:e.extendsTagName,delete c.extendsTagName,s=c.defaultCSS,delete c.defaultCSS,null!=s&&u===e.extendsTagName?s+="\n"+e.css:s=e.css,o(s,t),a=Object.getPrototypeOf(document.createElement(u)),a.__super__=a,l=Object.create(a,c),r=document.registerElement(t,{prototype:l}),Object.defineProperty(l,"constructor",{value:r}),r},o=function(t,e){var o;return o=n(e),o.textContent=t.replace(/%t/g,e)},n=function(t){var e;return e=document.createElement("style"),e.setAttribute("type","text/css"),e.setAttribute("data-tag-name",t.toLowerCase()),document.head.insertBefore(e,document.head.firstChild),e},i=function(t){var e,n,o;n={};for(e in t)o=t[e],n[e]="function"==typeof o?{value:o}:o;return n}}.call(this),function(){var e,n;t.extend({getDOMSelection:function(){var t;return t=window.getSelection(),t.rangeCount>0?t:void 0},getDOMRange:function(){var n,o;return(n=null!=(o=t.getDOMSelection())?o.getRangeAt(0):void 0)&&!e(n)?n:void 0},setDOMRange:function(e){var n;return n=window.getSelection(),n.removeAllRanges(),n.addRange(e),t.selectionChangeObserver.update()}}),e=function(t){return n(t.startContainer)||n(t.endContainer)},n=function(t){return!Object.getPrototypeOf(t)}}.call(this),function(){}.call(this),function(){var e,n=function(t,e){function n(){this.constructor=t}for(var i in e)o.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},o={}.hasOwnProperty;e=t.arraysAreEqual,t.Hash=function(o){function i(t){null==t&&(t={}),this.values=s(t),i.__super__.constructor.apply(this,arguments)}var r,s,a,u,c;return n(i,o),i.fromCommonAttributesOfObjects=function(t){var e,n,o,i,s,a;if(null==t&&(t=[]),!t.length)return new this;for(e=r(t[0]),o=e.getKeys(),a=t.slice(1),n=0,i=a.length;i>n;n++)s=a[n],o=e.getKeysCommonToHash(r(s)),e=e.slice(o);return e},i.box=function(t){return r(t)},i.prototype.add=function(t,e){return this.merge(u(t,e))},i.prototype.remove=function(e){return new t.Hash(s(this.values,e))},i.prototype.get=function(t){return this.values[t]},i.prototype.has=function(t){return t in this.values},i.prototype.merge=function(e){return new t.Hash(a(this.values,c(e)))},i.prototype.slice=function(e){var n,o,i,r;for(r={},n=0,i=e.length;i>n;n++)o=e[n],this.has(o)&&(r[o]=this.values[o]);return new t.Hash(r)},i.prototype.getKeys=function(){return Object.keys(this.values)},i.prototype.getKeysCommonToHash=function(t){var e,n,o,i,s;for(t=r(t),i=this.getKeys(),s=[],e=0,o=i.length;o>e;e++)n=i[e],this.values[n]===t.values[n]&&s.push(n);return s},i.prototype.isEqualTo=function(t){return e(this.toArray(),r(t).toArray())},i.prototype.isEmpty=function(){return 0===this.getKeys().length},i.prototype.toArray=function(){var t,e,n;return(null!=this.array?this.array:this.array=function(){var o;e=[],o=this.values;for(t in o)n=o[t],e.push(t,n);return e}.call(this)).slice(0)},i.prototype.toObject=function(){return s(this.values)},i.prototype.toJSON=function(){return this.toObject()},i.prototype.contentsForInspection=function(){return{values:JSON.stringify(this.values)}},u=function(t,e){var n;return n={},n[t]=e,n},a=function(t,e){var n,o,i;o=s(t);for(n in e)i=e[n],o[n]=i;return o},s=function(t,e){var n,o,i,r,s;for(r={},s=Object.keys(t).sort(),n=0,i=s.length;i>n;n++)o=s[n],o!==e&&(r[o]=t[o]);return r},r=function(e){return e instanceof t.Hash?e:new t.Hash(e)},c=function(e){return e instanceof t.Hash?e.values:e},i}(t.Object)}.call(this),function(){t.ObjectGroup=function(){function t(t,e){var n,o;this.objects=null!=t?t:[],o=e.depth,n=e.asTree,n&&(this.depth=o,this.objects=this.constructor.groupObjects(this.objects,{asTree:n,depth:this.depth+1}))}return t.groupObjects=function(t,e){var n,o,i,r,s,a,u,c,l;for(null==t&&(t=[]),l=null!=e?e:{},i=l.depth,n=l.asTree,n&&null==i&&(i=0),c=[],s=0,a=t.length;a>s;s++){if(u=t[s],r){if(("function"==typeof u.canBeGrouped?u.canBeGrouped(i):void 0)&&("function"==typeof(o=r[r.length-1]).canBeGroupedWith?o.canBeGroupedWith(u,i):void 0)){r.push(u);continue}c.push(new this(r,{depth:i,asTree:n})),r=null}("function"==typeof u.canBeGrouped?u.canBeGrouped(i):void 0)?r=[u]:c.push(u)}return r&&c.push(new this(r,{depth:i,asTree:n})),c},t.prototype.getObjects=function(){return this.objects},t.prototype.getDepth=function(){return this.depth},t.prototype.getCacheKey=function(){var t,e,n,o,i;for(e=["objectGroup"],i=this.getObjects(),t=0,n=i.length;n>t;t++)o=i[t],e.push(o.getCacheKey());return e.join("/")},t}()}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.ObjectMap=function(t){function n(t){var e,n,o,i,r;for(null==t&&(t=[]),this.objects={},o=0,i=t.length;i>o;o++)r=t[o],n=JSON.stringify(r),null==(e=this.objects)[n]&&(e[n]=r)}return e(n,t),n.prototype.find=function(t){var e;return e=JSON.stringify(t),this.objects[e]},n}(t.BasicObject)}.call(this),function(){t.ElementStore=function(){function t(t){this.reset(t)}var e;return t.prototype.add=function(t){var n;return n=e(t),this.elements[n]=t},t.prototype.remove=function(t){var n,o;return n=e(t),(o=this.elements[n])?(delete this.elements[n],o):void 0},t.prototype.reset=function(t){var e,n,o;for(null==t&&(t=[]),this.elements={},n=0,o=t.length;o>n;n++)e=t[n],this.add(e);return t},e=function(t){return t.dataset.trixStoreKey},t}()}.call(this),function(){}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.Operation=function(t){function n(){return n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.isPerforming=function(){return this.performing===!0},n.prototype.hasPerformed=function(){return this.performed===!0},n.prototype.hasSucceeded=function(){return this.performed&&this.succeeded},n.prototype.hasFailed=function(){return this.performed&&!this.succeeded},n.prototype.getPromise=function(){return null!=this.promise?this.promise:this.promise=new Promise(function(t){return function(e,n){return t.performing=!0,t.perform(function(o,i){return t.succeeded=o,t.performing=!1,t.performed=!0,t.succeeded?e(i):n(i)})}}(this))},n.prototype.perform=function(t){return t(!1)},n.prototype.release=function(){var t;return null!=(t=this.promise)&&"function"==typeof t.cancel&&t.cancel(),this.promise=null,this.performing=null,this.performed=null,this.succeeded=null},n.proxyMethod("getPromise().then"),n.proxyMethod("getPromise().catch"),n}(t.BasicObject)}.call(this),function(){var e,n,o,i,r,s=function(t,e){function n(){this.constructor=t}for(var o in e)a.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},a={}.hasOwnProperty;t.UTF16String=function(t){function e(t,e){this.ucs2String=t,this.codepoints=e,this.length=this.codepoints.length,this.ucs2Length=this.ucs2String.length}return s(e,t),e.box=function(t){return null==t&&(t=""),t instanceof this?t:this.fromUCS2String(null!=t?t.toString():void 0)
	},e.fromUCS2String=function(t){return new this(t,i(t))},e.fromCodepoints=function(t){return new this(r(t),t)},e.prototype.offsetToUCS2Offset=function(t){return r(this.codepoints.slice(0,Math.max(0,t))).length},e.prototype.offsetFromUCS2Offset=function(t){return i(this.ucs2String.slice(0,Math.max(0,t))).length},e.prototype.slice=function(){var t;return this.constructor.fromCodepoints((t=this.codepoints).slice.apply(t,arguments))},e.prototype.charAt=function(t){return this.slice(t,t+1)},e.prototype.isEqualTo=function(t){return this.constructor.box(t).ucs2String===this.ucs2String},e.prototype.toJSON=function(){return this.ucs2String},e.prototype.getCacheKey=function(){return this.ucs2String},e.prototype.toString=function(){return this.ucs2String},e}(t.BasicObject),e=1===("function"==typeof Array.from?Array.from("\ud83d\udc7c").length:void 0),n=null!=("function"==typeof" ".codePointAt?" ".codePointAt(0):void 0),o=" \ud83d\udc7c"===("function"==typeof String.fromCodePoint?String.fromCodePoint(32,128124):void 0),i=e&&n?function(t){return Array.from(t).map(function(t){return t.codePointAt(0)})}:function(t){var e,n,o,i,r;for(i=[],e=0,o=t.length;o>e;)r=t.charCodeAt(e++),r>=55296&&56319>=r&&o>e&&(n=t.charCodeAt(e++),56320===(64512&n)?r=((1023&r)<<10)+(1023&n)+65536:e--),i.push(r);return i},r=o?function(t){return String.fromCodePoint.apply(String,t)}:function(t){var e,n,o;return e=function(){var e,i,r;for(r=[],e=0,i=t.length;i>e;e++)o=t[e],n="",o>65535&&(o-=65536,n+=String.fromCharCode(o>>>10&1023|55296),o=56320|1023&o),r.push(n+String.fromCharCode(o));return r}(),e.join("")}}.call(this),function(){}.call(this),function(){}.call(this),function(){t.config.lang={bold:"Bold",bullets:"Bullets","byte":"Byte",bytes:"Bytes",captionPlaceholder:"Type a caption here\u2026",captionPrompt:"Add a caption\u2026",code:"Code",indent:"Increase Level",italic:"Italic",link:"Link",numbers:"Numbers",outdent:"Decrease Level",quote:"Quote",redo:"Redo",remove:"Remove",strike:"Strikethrough",undo:"Undo",unlink:"Unlink",urlPlaceholder:"Enter a URL\u2026",GB:"GB",KB:"KB",MB:"MB",PB:"PB",TB:"TB"}}.call(this),function(){t.config.css={classNames:{attachment:{container:"attachment",typePrefix:"attachment-",caption:"caption",captionEdited:"caption-edited",captionEditor:"caption-editor",editingCaption:"caption-editing",progressBar:"progress",removeButton:"remove",size:"size"}}}}.call(this),function(){var e;t.config.blockAttributes=e={"default":{tagName:"div",parse:!1},quote:{tagName:"blockquote",nestable:!0},code:{tagName:"pre",text:{plaintext:!0}},bulletList:{tagName:"ul",parse:!1},bullet:{tagName:"li",listAttribute:"bulletList",test:function(n){return t.tagName(n.parentNode)===e[this.listAttribute].tagName}},numberList:{tagName:"ol",parse:!1},number:{tagName:"li",listAttribute:"numberList",test:function(n){return t.tagName(n.parentNode)===e[this.listAttribute].tagName}}}}.call(this),function(){var e,n;e=t.config.lang,n=[e.bytes,e.KB,e.MB,e.GB,e.TB,e.PB],t.config.fileSize={prefix:"IEC",precision:2,formatter:function(t){var o,i,r,s,a;switch(t){case 0:return"0 "+e.bytes;case 1:return"1 "+e.byte;default:return o=function(){switch(this.prefix){case"SI":return 1e3;case"IEC":return 1024}}.call(this),i=Math.floor(Math.log(t)/Math.log(o)),r=t/Math.pow(o,i),s=r.toFixed(this.precision),a=s.replace(/0*$/,"").replace(/\.$/,""),a+" "+n[i]}}}}.call(this),function(){t.config.textAttributes={bold:{tagName:"strong",inheritable:!0,parser:function(t){var e;return e=window.getComputedStyle(t),"bold"===e.fontWeight||e.fontWeight>=600}},italic:{tagName:"em",inheritable:!0,parser:function(t){var e;return e=window.getComputedStyle(t),"italic"===e.fontStyle}},href:{groupTagName:"a",parser:function(e){var n,o,i;return n=t.AttachmentView.attachmentSelector,i="a:not("+n+")",(o=t.findClosestElementFromNode(e,{matchingSelector:i}))?o.getAttribute("href"):void 0}},strike:{tagName:"del",inheritable:!0},frozen:{style:{backgroundColor:"highlight"}}}}.call(this),function(){var e,n,o,i,r;r="[data-trix-serialize=false]",i=["contenteditable","data-trix-id","data-trix-store-key","data-trix-mutable"],n="data-trix-serialized-attributes",o="["+n+"]",e=new RegExp("<!--block-->","g"),t.extend({serializers:{"application/json":function(e){var n;if(e instanceof t.Document)n=e;else{if(!(e instanceof HTMLElement))throw new Error("unserializable object");n=t.Document.fromHTML(e.innerHTML)}return n.toSerializableDocument().toJSONString()},"text/html":function(s){var a,u,c,l,h,p,d,f,g,m,y,v,b,A,C,w,x;if(s instanceof t.Document)l=t.DocumentView.render(s);else{if(!(s instanceof HTMLElement))throw new Error("unserializable object");l=s.cloneNode(!0)}for(A=l.querySelectorAll(r),h=0,g=A.length;g>h;h++)c=A[h],c.parentNode.removeChild(c);for(p=0,m=i.length;m>p;p++)for(a=i[p],C=l.querySelectorAll("["+a+"]"),d=0,y=C.length;y>d;d++)c=C[d],c.removeAttribute(a);for(w=l.querySelectorAll(o),f=0,v=w.length;v>f;f++){c=w[f];try{u=JSON.parse(c.getAttribute(n)),c.removeAttribute(n);for(b in u)x=u[b],c.setAttribute(b,x)}catch(E){}}return l.innerHTML.replace(e,"")}},deserializers:{"application/json":function(e){return t.Document.fromJSONString(e)},"text/html":function(e){return t.Document.fromHTML(e)}},serializeToContentType:function(e,n){var o;if(o=t.serializers[n])return o(e);throw new Error("unknown content type: "+n)},deserializeFromContentType:function(e,n){var o;if(o=t.deserializers[n])return o(e);throw new Error("unknown content type: "+n)}})}.call(this),function(){var e,n;n=t.makeFragment,e=t.config.lang,t.config.toolbar={content:n('<div class="button_groups">\n  <span class="button_group text_tools">\n    <button type="button" class="bold" data-trix-attribute="bold" data-trix-key="b" title="'+e.bold+'">'+e.bold+'</button>\n    <button type="button" class="italic" data-trix-attribute="italic" data-trix-key="i" title="'+e.italic+'">'+e.italic+'</button>\n    <button type="button" class="strike" data-trix-attribute="strike" title="'+e.strike+'">'+e.strike+'</button>\n    <button type="button" class="link" data-trix-attribute="href" data-trix-action="link" data-trix-key="k" title="'+e.link+'">'+e.link+'</button>\n  </span>\n\n  <span class="button_group block_tools">\n    <button type="button" class="quote" data-trix-attribute="quote" title="'+e.quote+'">'+e.quote+'</button>\n    <button type="button" class="code" data-trix-attribute="code" title="'+e.code+'">'+e.code+'</button>\n    <button type="button" class="list bullets" data-trix-attribute="bullet" title="'+e.bullets+'">'+e.bullets+'</button>\n    <button type="button" class="list numbers" data-trix-attribute="number" title="'+e.numbers+'">'+e.numbers+'</button>\n    <button type="button" class="block-level decrease" data-trix-action="decreaseBlockLevel" title="'+e.outdent+'">'+e.outdent+'</button>\n    <button type="button" class="block-level increase" data-trix-action="increaseBlockLevel" title="'+e.indent+'">'+e.indent+'</button>\n  </span>\n\n  <span class="button_group history_tools">\n    <button type="button" class="undo" data-trix-action="undo" data-trix-key="z" title="'+e.undo+'">'+e.undo+'</button>\n    <button type="button" class="redo" data-trix-action="redo" data-trix-key="shift+z" title="'+e.redo+'">'+e.redo+'</button>\n  </span>\n</div>\n\n<div class="dialogs">\n  <div class="dialog link_dialog" data-trix-attribute="href" data-trix-dialog="href">\n    <div class="link_url_fields">\n      <input type="url" required name="href" placeholder="'+e.urlPlaceholder+'">\n      <div class="button_group">\n        <input type="button" value="'+e.link+'" data-trix-method="setAttribute">\n        <input type="button" value="'+e.unlink+'" data-trix-method="removeAttribute">\n      </div>\n    </div>\n  </div>\n</div>')}}.call(this),function(){t.config.undoInterval=5e3}.call(this),function(){var e,n,o;n=t.makeElement,e=t.defer,o={cursorTarget:n({tagName:"span",textContent:t.ZERO_WIDTH_SPACE,data:{trixSelection:!0,trixCursorTarget:!0,trixSerialize:!1}})},t.extend({selectionElements:{selector:"[data-trix-selection]",cssText:"font-size: 0 !important;\npadding: 0 !important;\nmargin: 0 !important;\nborder: none !important;",create:function(t){return o[t].cloneNode(!0)}}})}.call(this),function(){}.call(this),function(){var e;e=t.cloneFragment,t.registerElement("trix-toolbar",{defaultCSS:"%t {\n  white-space: collapse;\n}\n\n%t .dialog {\n  display: none;\n}\n\n%t .dialog.active {\n  display: block;\n}\n\n%t .dialog input.validate:invalid {\n  background-color: #ffdddd;\n}\n\n%t[native] {\n  display: none;\n}",createdCallback:function(){return""===this.innerHTML?this.appendChild(e(t.config.toolbar.content)):void 0}})}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty,o=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1};t.ObjectView=function(n){function i(t,e){this.object=t,this.options=null!=e?e:{},this.childViews=[],this.rootView=this}return e(i,n),i.prototype.getNodes=function(){var t,e,n,o,i;for(null==this.nodes&&(this.nodes=this.createNodes()),o=this.nodes,i=[],t=0,e=o.length;e>t;t++)n=o[t],i.push(n.cloneNode(!0));return i},i.prototype.invalidate=function(){var t;return this.nodes=null,null!=(t=this.parentView)?t.invalidate():void 0},i.prototype.invalidateViewForObject=function(t){var e;return null!=(e=this.findViewForObject(t))?e.invalidate():void 0},i.prototype.findOrCreateCachedChildView=function(t,e){var n;return(n=this.getCachedViewForObject(e))?this.recordChildView(n):(n=this.createChildView.apply(this,arguments),this.cacheViewForObject(n,e)),n},i.prototype.createChildView=function(e,n,o){var i;return null==o&&(o={}),n instanceof t.ObjectGroup&&(o.viewClass=e,e=t.ObjectGroupView),i=new e(n,o),this.recordChildView(i)},i.prototype.recordChildView=function(t){return t.parentView=this,t.rootView=this.rootView,this.childViews.push(t),t},i.prototype.getAllChildViews=function(){var t,e,n,o,i;for(i=[],o=this.childViews,e=0,n=o.length;n>e;e++)t=o[e],i.push(t),i=i.concat(t.getAllChildViews());return i},i.prototype.findElement=function(){return this.findElementForObject(this.object)},i.prototype.findElementForObject=function(t){var e;return(e=null!=t?t.id:void 0)?this.rootView.element.querySelector("[data-trix-id='"+e+"']"):void 0},i.prototype.findViewForObject=function(t){var e,n,o,i;for(o=this.getAllChildViews(),e=0,n=o.length;n>e;e++)if(i=o[e],i.object===t)return i},i.prototype.getViewCache=function(){return this.rootView!==this?this.rootView.getViewCache():this.isViewCachingEnabled()?null!=this.viewCache?this.viewCache:this.viewCache={}:void 0},i.prototype.isViewCachingEnabled=function(){return this.shouldCacheViews!==!1},i.prototype.enableViewCaching=function(){return this.shouldCacheViews=!0},i.prototype.disableViewCaching=function(){return this.shouldCacheViews=!1},i.prototype.getCachedViewForObject=function(t){var e;return null!=(e=this.getViewCache())?e[t.getCacheKey()]:void 0},i.prototype.cacheViewForObject=function(t,e){var n;return null!=(n=this.getViewCache())?n[e.getCacheKey()]=t:void 0},i.prototype.garbageCollectCachedViews=function(){var t,e,n,i,r,s;if(t=this.getViewCache()){s=this.getAllChildViews().concat(this),n=function(){var t,e,n;for(n=[],t=0,e=s.length;e>t;t++)r=s[t],n.push(r.object.getCacheKey());return n}(),i=[];for(e in t)o.call(n,e)<0&&i.push(delete t[e]);return i}},i}(t.BasicObject)}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.ObjectGroupView=function(t){function n(){n.__super__.constructor.apply(this,arguments),this.objectGroup=this.object,this.viewClass=this.options.viewClass,delete this.options.viewClass}return e(n,t),n.prototype.getChildViews=function(){var t,e,n,o;if(!this.childViews.length)for(o=this.objectGroup.getObjects(),t=0,e=o.length;e>t;t++)n=o[t],this.findOrCreateCachedChildView(this.viewClass,n,this.options);return this.childViews},n.prototype.createNodes=function(){var t,e,n,o,i,r,s,a,u;for(t=this.createContainerElement(),s=this.getChildViews(),e=0,o=s.length;o>e;e++)for(u=s[e],a=u.getNodes(),n=0,i=a.length;i>n;n++)r=a[n],t.appendChild(r);return[t]},n.prototype.createContainerElement=function(t){return null==t&&(t=this.objectGroup.getDepth()),this.getChildViews()[0].createContainerElement(t)},n}(t.ObjectView)}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.Controller=function(t){function n(){return n.__super__.constructor.apply(this,arguments)}return e(n,t),n}(t.BasicObject)}.call(this),function(){var e,n,o,i,r,s,a=function(t,e){return function(){return t.apply(e,arguments)}},u=function(t,e){function n(){this.constructor=t}for(var o in e)c.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},c={}.hasOwnProperty,l=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1};e=t.defer,n=t.findClosestElementFromNode,o=t.nodeIsEmptyTextNode,i=t.normalizeSpaces,r=t.summarizeStringChange,s=t.tagName,t.MutationObserver=function(t){function e(t){this.element=t,this.didMutate=a(this.didMutate,this),this.observer=new window.MutationObserver(this.didMutate),this.start()}var c,h,p,d;return u(e,t),h="data-trix-mutable",p="["+h+"]",d={attributes:!0,childList:!0,characterData:!0,characterDataOldValue:!0,subtree:!0},e.prototype.start=function(){return this.reset(),this.observer.observe(this.element,d)},e.prototype.stop=function(){return this.observer.disconnect()},e.prototype.didMutate=function(t){var e,n;return(e=this.mutations).push.apply(e,this.findSignificantMutations(t)),this.mutations.length?(null!=(n=this.delegate)&&"function"==typeof n.elementDidMutate&&n.elementDidMutate(this.getMutationSummary()),this.reset()):void 0},e.prototype.reset=function(){return this.mutations=[]},e.prototype.findSignificantMutations=function(t){var e,n,o,i;for(i=[],e=0,n=t.length;n>e;e++)o=t[e],this.mutationIsSignificant(o)&&i.push(o);return i},e.prototype.mutationIsSignificant=function(t){var e,n,o,i;for(i=this.nodesModifiedByMutation(t),e=0,n=i.length;n>e;e++)if(o=i[e],this.nodeIsSignificant(o))return!0;return!1},e.prototype.nodeIsSignificant=function(t){return t!==this.element&&!this.nodeIsMutable(t)&&!o(t)},e.prototype.nodeIsMutable=function(t){return n(t,{matchingSelector:p})},e.prototype.nodesModifiedByMutation=function(t){var e;switch(e=[],t.type){case"attributes":t.attributeName!==h&&e.push(t.target);break;case"characterData":e.push(t.target.parentNode),e.push(t.target);break;case"childList":e.push.apply(e,t.addedNodes),e.push.apply(e,t.removedNodes)}return e},e.prototype.getMutationSummary=function(){return this.getTextMutationSummary()},e.prototype.getTextMutationSummary=function(){var t,e,n,o,i,r,s,a,u,c,h;for(a=this.getTextChangesFromCharacterData(),n=a.additions,i=a.deletions,h=this.getTextChangesFromChildList(),u=h.additions,r=0,s=u.length;s>r;r++)e=u[r],l.call(n,e)<0&&n.push(e);return i.push.apply(i,h.deletions),c={},(t=n.join(""))&&(c.textAdded=t),(o=i.join(""))&&(c.textDeleted=o),c},e.prototype.getMutationsByType=function(t){var e,n,o,i,r;for(i=this.mutations,r=[],e=0,n=i.length;n>e;e++)o=i[e],o.type===t&&r.push(o);return r},e.prototype.getTextChangesFromChildList=function(){var t,e,n,o,r,s,a,u,l,h;for(l=[],h=[],r=this.getMutationsByType("childList"),e=0,o=r.length;o>e;e++)s=r[e],t=s.addedNodes,a=s.removedNodes,l.push.apply(l,c(t)),h.push.apply(h,c(a));return{additions:function(){var t,e,o;for(o=[],n=t=0,e=l.length;e>t;n=++t)u=l[n],u!==h[n]&&o.push(i(u));return o}(),deletions:function(){var t,e,o;for(o=[],n=t=0,e=h.length;e>t;n=++t)u=h[n],u!==l[n]&&o.push(i(u));return o}()}},e.prototype.getTextChangesFromCharacterData=function(){var t,e,n,o,s,a,u,c;return e=this.getMutationsByType("characterData"),e.length&&(c=e[0],n=e[e.length-1],s=i(c.oldValue),o=i(n.target.data),a=r(s,o),t=a.added,u=a.removed),{additions:t?[t]:[],deletions:u?[u]:[]}},c=function(t){var e,n,o,i;for(null==t&&(t=[]),i=[],e=0,n=t.length;n>e;e++)switch(o=t[e],o.nodeType){case Node.TEXT_NODE:i.push(o.data);break;case Node.ELEMENT_NODE:"br"===s(o)&&i.push("\n")}return i},e}(t.BasicObject)}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.FileVerificationOperation=function(t){function n(t){this.file=t}return e(n,t),n.prototype.perform=function(t){var e;return e=new FileReader,e.onerror=function(){return t(!1)},e.onload=function(n){return function(){e.onerror=null;try{e.abort()}catch(o){}return t(!0,n.file)}}(this),e.readAsArrayBuffer(this.file)},n}(t.Operation)}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.CompositionInputController=function(t){function n(t){var e;this.inputController=t,e=this.inputController,this.responder=e.responder,this.delegate=e.delegate,this.inputSummary=e.inputSummary,this.data={}}return e(n,t),n.prototype.start=function(t){var e,n;return this.data.start=t,"keypress"===this.inputSummary.eventName&&this.inputSummary.textAdded&&null!=(e=this.responder)&&e.deleteInDirection("left"),this.selectionIsExpanded()||(this.insertPlaceholder(),this.requestRender()),this.range=null!=(n=this.responder)?n.getSelectedRange():void 0},n.prototype.update=function(t){var e;return this.data.update=t,(e=this.selectPlaceholder())?(this.forgetPlaceholder(),this.range=e):void 0},n.prototype.end=function(t){var e,n,o;return this.data.end=t,this.forgetPlaceholder(),this.canApplyToDocument()?(null!=(e=this.delegate)&&e.inputControllerWillPerformTyping(),null!=(n=this.responder)&&n.setSelectedRange(this.range),null!=(o=this.responder)&&o.insertString(this.data.end),this.setInputSummary({preferDocument:!0}),this.setFinalSelection()):null!=this.data.start||null!=this.data.update?(this.requestReparse(),this.inputController.reset()):void 0},n.prototype.canApplyToDocument=function(){var t,e;return 0===(null!=(t=this.data.start)?t.length:void 0)&&(null!=(e=this.data.end)?e.length:void 0)>0&&null!=this.range},n.prototype.setFinalSelection=function(){return null!=this.data.end&&this.data.end===this.data.update?this.unlessMutationOccurs(function(t){return function(){var e;return t.selectionIsExpanded()?(null!=(e=t.responder)&&e.setSelection(t.range[0]+t.data.end.length),t.requestRender()):void 0}}(this)):void 0},n.proxyMethod("inputController.setInputSummary"),n.proxyMethod("inputController.requestRender"),n.proxyMethod("inputController.requestReparse"),n.proxyMethod("inputController.unlessMutationOccurs"),n.proxyMethod("responder?.selectionIsExpanded"),n.proxyMethod("responder?.insertPlaceholder"),n.proxyMethod("responder?.selectPlaceholder"),n.proxyMethod("responder?.forgetPlaceholder"),n}(t.BasicObject)}.call(this),function(){var e,n,o,i,r,s,a,u,c,l,h,p,d,f,g,m,y,v=function(t,e){function n(){this.constructor=t}for(var o in e)b.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},b={}.hasOwnProperty,A=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1};a=t.handleEvent,r=t.findClosestElementFromNode,s=t.findElementFromContainerAndOffset,o=t.defer,p=t.makeElement,u=t.innerElementIsActive,g=t.summarizeStringChange,d=t.objectsAreEqual,m=t.tagName,t.InputController=function(r){function s(e){var n;this.element=e,this.resetInputSummary(),this.mutationCount=0,this.mutationObserver=new t.MutationObserver(this.element),this.mutationObserver.delegate=this;for(n in this.events)a(n,{onElement:this.element,withCallback:this.handlerFor(n),inPhase:"capturing"})}var g;return v(s,r),g=0,s.keyNames={8:"backspace",9:"tab",13:"return",37:"left",39:"right",46:"delete",68:"d",72:"h",79:"o"},s.prototype.handlerFor=function(t){return function(e){return function(n){return e.handleInput(function(){return u(this.element)?void 0:(this.eventName=t,this.events[t].call(this,n))})}}(this)},s.prototype.setInputSummary=function(t){var e,n;null==t&&(t={}),this.inputSummary.eventName=this.eventName;for(e in t)n=t[e],this.inputSummary[e]=n;return this.inputSummary},s.prototype.resetInputSummary=function(){return this.inputSummary={}},s.prototype.reset=function(){return this.resetInputSummary(),t.selectionChangeObserver.reset()},s.prototype.editorWillSyncDocumentView=function(){return this.mutationObserver.stop()},s.prototype.editorDidSyncDocumentView=function(){return this.mutationObserver.start()},s.prototype.requestRender=function(){var t;return null!=(t=this.delegate)&&"function"==typeof t.inputControllerDidRequestRender?t.inputControllerDidRequestRender():void 0},s.prototype.requestReparse=function(){var t;return null!=(t=this.delegate)&&"function"==typeof t.inputControllerDidRequestReparse&&t.inputControllerDidRequestReparse(),this.requestRender()},s.prototype.elementDidMutate=function(t){return this.mutationCount++,this.isComposing()?void 0:this.handleInput(function(){return this.mutationIsExpected(t)?this.requestRender():this.requestReparse(),this.reset()})},s.prototype.mutationIsExpected=function(t){var e,n,o,i,r,s;return o=t.textAdded,i=t.textDeleted,this.inputSummary.preferDocument?!0:(r=o!==this.inputSummary.textAdded,s=null!=i&&!this.inputSummary.didDelete,"\n"===i&&s&&o&&!r&&(e=this.getSelectedRange())&&(null!=(n=this.responder)?n.positionIsBlockBreak(e[1]+o.length):void 0)&&(s=!1),!(r||s))},s.prototype.unlessMutationOccurs=function(t){var e;return e=this.mutationCount,o(function(n){return function(){return e===n.mutationCount?t():void 0}}(this))},s.prototype.attachFiles=function(e){var n,o;return o=function(){var o,i,r;for(r=[],o=0,i=e.length;i>o;o++)n=e[o],r.push(new t.FileVerificationOperation(n));return r}(),Promise.all(o).then(function(t){return function(e){return t.handleInput(function(){var t,o,i,r;for(null!=(i=this.delegate)&&i.inputControllerWillAttachFiles(),t=0,o=e.length;o>t;t++)n=e[t],null!=(r=this.responder)&&r.insertFile(n);return this.requestRender()})}}(this))},s.prototype.events={keydown:function(e){var n,o,i,r,s,a,u,l,h;if(this.isComposing()||this.resetInputSummary(),r=this.constructor.keyNames[e.keyCode]){for(o=this.keys,l=["ctrl","alt","shift","meta"],i=0,a=l.length;a>i;i++)u=l[i],e[u+"Key"]&&("ctrl"===u&&(u="control"),o=null!=o?o[u]:void 0);null!=(null!=o?o[r]:void 0)&&(this.setInputSummary({keyName:r}),t.selectionChangeObserver.reset(),o[r].call(this,e))}return c(e)&&(n=String.fromCharCode(e.keyCode).toLowerCase())&&(s=function(){var t,n,o,i;for(o=["alt","shift"],i=[],t=0,n=o.length;n>t;t++)u=o[t],e[u+"Key"]&&i.push(u);return i}(),s.push(n),null!=(h=this.delegate)?h.inputControllerDidReceiveKeyboardCommand(s):void 0)?e.preventDefault():void 0},keypress:function(t){var e,n,o;if(null==this.inputSummary.eventName&&(!t.metaKey&&!t.ctrlKey||t.altKey)&&!h(t)&&!l(t))return null===t.which?e=String.fromCharCode(t.keyCode):0!==t.which&&0!==t.charCode&&(e=String.fromCharCode(t.charCode)),null!=e?(null!=(n=this.delegate)&&n.inputControllerWillPerformTyping(),null!=(o=this.responder)&&o.insertString(e),this.setInputSummary({textAdded:e,didDelete:this.selectionIsExpanded()})):void 0},textInput:function(t){var e,n,o,i;return e=t.data,i=this.inputSummary.textAdded,i&&i!==e&&i.toUpperCase()===e?(n=this.getSelectedRange(),this.setSelectedRange([n[0],n[1]+i.length]),null!=(o=this.responder)&&o.insertString(e),this.setInputSummary({textAdded:e}),this.setSelectedRange(n)):void 0},dragenter:function(t){return t.preventDefault()},dragstart:function(t){var e,n;return n=t.target,this.serializeSelectionToDataTransfer(t.dataTransfer),this.draggedRange=this.getSelectedRange(),null!=(e=this.delegate)&&"function"==typeof e.inputControllerDidStartDrag?e.inputControllerDidStartDrag():void 0},dragover:function(t){var e,n;return!this.draggedRange&&!this.canAcceptDataTransfer(t.dataTransfer)||(t.preventDefault(),e={x:t.clientX,y:t.clientY},d(e,this.draggingPoint))?void 0:(this.draggingPoint=e,null!=(n=this.delegate)&&"function"==typeof n.inputControllerDidReceiveDragOverPoint?n.inputControllerDidReceiveDragOverPoint(this.draggingPoint):void 0)},dragend:function(){var t;return null!=(t=this.delegate)&&"function"==typeof t.inputControllerDidCancelDrag&&t.inputControllerDidCancelDrag(),this.draggedRange=null,this.draggingPoint=null},drop:function(e){var n,o,i,r,s,a,u,c,l;return e.preventDefault(),i=null!=(s=e.dataTransfer)?s.files:void 0,r={x:e.clientX,y:e.clientY},null!=(a=this.responder)&&a.setLocationRangeFromPointRange(r),(null!=i?i.length:void 0)?this.attachFiles(i):this.draggedRange?(null!=(u=this.delegate)&&u.inputControllerWillMoveText(),null!=(c=this.responder)&&c.moveTextFromRange(this.draggedRange),this.draggedRange=null,this.requestRender()):(o=e.dataTransfer.getData("application/x-trix-document"))&&(n=t.Document.fromJSONString(o),null!=(l=this.responder)&&l.insertDocument(n),this.requestRender()),this.draggedRange=null,this.draggingPoint=null},cut:function(t){var e;return this.serializeSelectionToDataTransfer(t.clipboardData)&&t.preventDefault(),null!=(e=this.delegate)&&e.inputControllerWillCutText(),this.deleteInDirection("backward"),t.defaultPrevented?this.requestRender():void 0},copy:function(t){return this.serializeSelectionToDataTransfer(t.clipboardData)?t.preventDefault():void 0},paste:function(n){var o,r,s,a,u,c,l,h,p,d,m,y,v,b,C,w,x,E,S,R,k,D;return u=null!=(l=n.clipboardData)?l:n.testClipboardData,c={paste:u},null==u||f(n)?void this.getPastedHTMLUsingHiddenElement(function(t){return function(e){var n,o,i;return c.html=e,null!=(n=t.delegate)&&n.inputControllerWillPasteText(c),null!=(o=t.responder)&&o.insertHTML(e),t.requestRender(),null!=(i=t.delegate)?i.inputControllerDidPaste(c):void 0}}(this)):(e(u)?(D=u.getData("text/plain"),c.string=D,this.setInputSummary({textAdded:D,didDelete:this.selectionIsExpanded()}),null!=(h=this.delegate)&&h.inputControllerWillPasteText(c),null!=(b=this.responder)&&b.insertString(D),this.requestRender(),null!=(C=this.delegate)&&C.inputControllerDidPaste(c)):(a=u.getData("text/html"))?(c.html=a,null!=(w=this.delegate)&&w.inputControllerWillPasteText(c),null!=(x=this.responder)&&x.insertHTML(a),this.requestRender(),null!=(E=this.delegate)&&E.inputControllerDidPaste(c)):(s=u.getData("URL"))?(c.string=s,this.setInputSummary({textAdded:s,didDelete:this.selectionIsExpanded()}),null!=(S=this.delegate)&&S.inputControllerWillPasteText(c),null!=(R=this.responder)&&R.insertText(t.Text.textForStringWithAttributes(s,{href:s})),this.requestRender(),null!=(k=this.delegate)&&k.inputControllerDidPaste(c)):A.call(u.types,"Files")>=0&&(r=null!=(p=u.items)&&null!=(d=p[0])&&"function"==typeof d.getAsFile?d.getAsFile():void 0)&&(!r.name&&(o=i(r))&&(r.name="pasted-file-"+ ++g+"."+o),c.file=r,null!=(m=this.delegate)&&m.inputControllerWillAttachFiles(),null!=(y=this.responder)&&y.insertFile(r),this.requestRender(),null!=(v=this.delegate)&&v.inputControllerDidPaste(c)),n.preventDefault())},compositionstart:function(e){return this.compositionInputController=new t.CompositionInputController(this),this.compositionInputController.start(e.data)},compositionupdate:function(e){return null==this.compositionInputController&&(this.compositionInputController=new t.CompositionInputController(this)),this.compositionInputController.update(e.data)},compositionend:function(e){return null==this.compositionInputController&&(this.compositionInputController=new t.CompositionInputController(this)),this.compositionInputController.end(e.data),this.compositionInputController=null},input:function(t){return t.stopPropagation()}},s.prototype.keys={backspace:function(t){var e;return null!=(e=this.delegate)&&e.inputControllerWillPerformTyping(),this.deleteInDirection("backward",t)},"delete":function(t){var e;return null!=(e=this.delegate)&&e.inputControllerWillPerformTyping(),this.deleteInDirection("forward",t)},"return":function(){var t,e;return this.setInputSummary({preferDocument:!0}),null!=(t=this.delegate)&&t.inputControllerWillPerformTyping(),null!=(e=this.responder)?e.insertLineBreak():void 0},tab:function(t){var e,n;return(null!=(e=this.responder)?e.canIncreaseBlockAttributeLevel():void 0)?(null!=(n=this.responder)&&n.increaseBlockAttributeLevel(),this.requestRender(),t.preventDefault()):void 0},left:function(t){var e;return this.selectionIsInCursorTarget()?(t.preventDefault(),null!=(e=this.responder)?e.moveCursorInDirection("backward"):void 0):void 0},right:function(t){var e;return this.selectionIsInCursorTarget()?(t.preventDefault(),null!=(e=this.responder)?e.moveCursorInDirection("forward"):void 0):void 0},control:{d:function(t){var e;return null!=(e=this.delegate)&&e.inputControllerWillPerformTyping(),this.deleteInDirection("forward",t)},h:function(t){var e;return null!=(e=this.delegate)&&e.inputControllerWillPerformTyping(),this.deleteInDirection("backward",t)},o:function(t){var e,n;return t.preventDefault(),null!=(e=this.delegate)&&e.inputControllerWillPerformTyping(),null!=(n=this.responder)&&n.insertString("\n",{updatePosition:!1}),this.requestRender()}},shift:{"return":function(){var t,e;return null!=(t=this.delegate)&&t.inputControllerWillPerformTyping(),null!=(e=this.responder)?e.insertString("\n"):void 0},tab:function(t){var e,n;return(null!=(e=this.responder)?e.canDecreaseBlockAttributeLevel():void 0)?(null!=(n=this.responder)&&n.decreaseBlockAttributeLevel(),this.requestRender(),t.preventDefault()):void 0},left:function(t){return this.selectionIsInCursorTarget()?(t.preventDefault(),this.expandSelectionInDirection("backward")):void 0},right:function(t){return this.selectionIsInCursorTarget()?(t.preventDefault(),this.expandSelectionInDirection("forward")):void 0}},alt:{backspace:function(){var t;return this.setInputSummary({preferDocument:!1}),null!=(t=this.delegate)?t.inputControllerWillPerformTyping():void 0}},meta:{backspace:function(){var t;return this.setInputSummary({preferDocument:!1}),null!=(t=this.delegate)?t.inputControllerWillPerformTyping():void 0}}},s.prototype.handleInput=function(t){var e,n;try{return null!=(e=this.delegate)&&e.inputControllerWillHandleInput(),t.call(this)}finally{null!=(n=this.delegate)&&n.inputControllerDidHandleInput()}},s.prototype.isComposing=function(){return null!=this.compositionInputController},s.prototype.deleteInDirection=function(t,e){var n;return(null!=(n=this.responder)?n.deleteInDirection(t):void 0)!==!1?this.setInputSummary({didDelete:!0}):e?(e.preventDefault(),this.requestRender()):void 0},s.prototype.serializeSelectionToDataTransfer=function(e){var o,i;if(n(e))return o=null!=(i=this.responder)?i.getSelectedDocument().toSerializableDocument():void 0,e.setData("application/x-trix-document",JSON.stringify(o)),e.setData("text/html",t.DocumentView.render(o).innerHTML),e.setData("text/plain",o.toString().replace(/\n$/,"")),!0},s.prototype.canAcceptDataTransfer=function(t){var e,n,o,i,r,s;for(s={},i=null!=(o=null!=t?t.types:void 0)?o:[],e=0,n=i.length;n>e;e++)r=i[e],s[r]=!0;return s.Files||s["application/x-trix-document"]||s["text/html"]||s["text/plain"]},s.prototype.getPastedHTMLUsingHiddenElement=function(t){var e,n,o;return n=this.getSelectedRange(),o={position:"absolute",left:window.pageXOffset+"px",top:window.pageYOffset+"px",opacity:0},e=p({style:o,tagName:"div",editable:!0}),document.body.appendChild(e),e.focus(),requestAnimationFrame(function(o){return function(){var i;return i=e.innerHTML,document.body.removeChild(e),o.setSelectedRange(n),t(i)}}(this))},s.proxyMethod("responder?.getSelectedRange"),s.proxyMethod("responder?.setSelectedRange"),s.proxyMethod("responder?.expandSelectionInDirection"),s.proxyMethod("responder?.selectionIsInCursorTarget"),s.proxyMethod("responder?.selectionIsExpanded"),s}(t.BasicObject),i=function(t){var e,n;return null!=(e=t.type)&&null!=(n=e.match(/\/(\w+)$/))?n[1]:void 0},h=function(t){return t.metaKey&&t.altKey&&!t.shiftKey&&94===t.keyCode},l=function(t){return t.metaKey&&t.altKey&&t.shiftKey&&9674===t.keyCode},c=function(t){return/Mac|^iP/.test(navigator.platform)?t.metaKey:t.ctrlKey},f=function(t){var e,n;return(n=null!=(e=t.clipboardData)?e.types:void 0)?A.call(n,"text/html")<0&&(A.call(n,"com.apple.webarchive")>=0||A.call(n,"com.apple.flat-rtfd")>=0):void 0},e=function(t){var e,n,o;return o=t.getData("text/plain"),n=t.getData("text/html"),o&&n?(e=p("div"),e.innerHTML=n,e.textContent===o?!e.querySelector(":not(meta)"):void 0):null!=o?o.length:void 0
	},y={"application/x-trix-feature-detection":"test"},n=function(t){var e,n;if(null!=(null!=t?t.setData:void 0)){for(e in y)if(n=y[e],t.setData(e,n),t.getData(e)!==n)return;return!0}}}.call(this),function(){var e,n,o,i,r,s,a=function(t,e){return function(){return t.apply(e,arguments)}},u=function(t,e){function n(){this.constructor=t}for(var o in e)c.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},c={}.hasOwnProperty;n=t.handleEvent,r=t.makeElement,s=t.tagName,o=t.InputController.keyNames,i=t.config.lang,e=t.config.css.classNames,t.AttachmentEditorController=function(t){function c(t,e,n){this.attachmentPiece=t,this.element=e,this.container=n,this.uninstall=a(this.uninstall,this),this.didKeyDownCaption=a(this.didKeyDownCaption,this),this.didChangeCaption=a(this.didChangeCaption,this),this.didClickCaption=a(this.didClickCaption,this),this.didClickRemoveButton=a(this.didClickRemoveButton,this),this.attachment=this.attachmentPiece.attachment,"a"===s(this.element)&&(this.element=this.element.firstChild),this.install()}var l;return u(c,t),l=function(t){return function(){var e;return e=t.apply(this,arguments),e["do"](),null==this.undos&&(this.undos=[]),this.undos.push(e.undo)}},c.prototype.install=function(){return this.makeElementMutable(),this.attachment.isPreviewable()&&this.makeCaptionEditable(),this.addRemoveButton()},c.prototype.makeElementMutable=l(function(){return{"do":function(t){return function(){return t.element.dataset.trixMutable=!0}}(this),undo:function(t){return function(){return delete t.element.dataset.trixMutable}}(this)}}),c.prototype.makeCaptionEditable=l(function(){var t,e;return t=this.element.querySelector("figcaption"),e=null,{"do":function(o){return function(){return e=n("click",{onElement:t,withCallback:o.didClickCaption,inPhase:"capturing"})}}(this),undo:function(){return function(){return e.destroy()}}(this)}}),c.prototype.addRemoveButton=l(function(){var t;return t=r({tagName:"a",textContent:i.remove,className:e.attachment.removeButton,attributes:{href:"#",title:i.remove}}),n("click",{onElement:t,withCallback:this.didClickRemoveButton}),{"do":function(e){return function(){return e.element.appendChild(t)}}(this),undo:function(e){return function(){return e.element.removeChild(t)}}(this)}}),c.prototype.editCaption=l(function(){var t,o,s,a,u;return a=r({tagName:"textarea",className:e.attachment.captionEditor,attributes:{placeholder:i.captionPlaceholder}}),a.value=this.attachmentPiece.getCaption(),u=a.cloneNode(),u.classList.add("trix-autoresize-clone"),t=function(){return u.value=a.value,a.style.height=u.scrollHeight+"px"},n("input",{onElement:a,withCallback:t}),n("keydown",{onElement:a,withCallback:this.didKeyDownCaption}),n("change",{onElement:a,withCallback:this.didChangeCaption}),n("blur",{onElement:a,withCallback:this.uninstall}),s=this.element.querySelector("figcaption"),o=s.cloneNode(),{"do":function(){return s.style.display="none",o.appendChild(a),o.appendChild(u),o.classList.add(e.attachment.editingCaption),s.parentElement.insertBefore(o,s),t(),a.focus()},undo:function(){return o.parentNode.removeChild(o),s.style.display=null}}}),c.prototype.didClickRemoveButton=function(t){var e;return t.preventDefault(),t.stopPropagation(),null!=(e=this.delegate)?e.attachmentEditorDidRequestRemovalOfAttachment(this.attachment):void 0},c.prototype.didClickCaption=function(t){return t.preventDefault(),this.editCaption()},c.prototype.didChangeCaption=function(t){var e,n,o;return e=t.target.value.replace(/\s/g," ").trim(),e?null!=(n=this.delegate)&&"function"==typeof n.attachmentEditorDidRequestUpdatingAttributesForAttachment?n.attachmentEditorDidRequestUpdatingAttributesForAttachment({caption:e},this.attachment):void 0:null!=(o=this.delegate)&&"function"==typeof o.attachmentEditorDidRequestRemovingAttributeForAttachment?o.attachmentEditorDidRequestRemovingAttributeForAttachment("caption",this.attachment):void 0},c.prototype.didKeyDownCaption=function(t){var e;return"return"===o[t.keyCode]?(t.preventDefault(),this.didChangeCaption(t),null!=(e=this.delegate)&&"function"==typeof e.attachmentEditorDidRequestDeselectingAttachment?e.attachmentEditorDidRequestDeselectingAttachment(this.attachment):void 0):void 0},c.prototype.uninstall=function(){for(var t,e;e=this.undos.pop();)e();return null!=(t=this.delegate)?t.didUninstallAttachmentEditor(this):void 0},c}(t.BasicObject)}.call(this),function(){var e,n,o,i,r=function(t,e){function n(){this.constructor=t}for(var o in e)s.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},s={}.hasOwnProperty;o=t.makeElement,i=t.selectionElements,e=t.config.css.classNames,t.AttachmentView=function(t){function s(){s.__super__.constructor.apply(this,arguments),this.attachment=this.object,this.attachment.uploadProgressDelegate=this,this.attachmentPiece=this.options.piece}return r(s,t),s.attachmentSelector="[data-trix-attachment]",s.prototype.createContentNodes=function(){return[]},s.prototype.createNodes=function(){var t,n,r,s,a,u,c,l,h,p,d;if(s=o({tagName:"figure",className:this.getClassName()}),this.attachment.hasContent())s.innerHTML=this.attachment.getContent();else for(p=this.createContentNodes(),u=0,l=p.length;l>u;u++)h=p[u],s.appendChild(h);s.appendChild(this.createCaptionElement()),n={trixAttachment:JSON.stringify(this.attachment),trixContentType:this.attachment.getContentType(),trixId:this.attachment.id},t=this.attachmentPiece.getAttributesForAttachment(),t.isEmpty()||(n.trixAttributes=JSON.stringify(t)),this.attachment.isPending()&&(this.progressElement=o({tagName:"progress",attributes:{"class":e.attachment.progressBar,value:this.attachment.getUploadProgress(),max:100},data:{trixMutable:!0,trixStoreKey:this.attachment.getCacheKey("progressElement")}}),s.appendChild(this.progressElement),n.trixSerialize=!1),(a=this.getHref())?(r=o("a",{href:a}),r.appendChild(s)):r=s;for(c in n)d=n[c],r.dataset[c]=d;return r.setAttribute("contenteditable",!1),[i.create("cursorTarget"),r,i.create("cursorTarget")]},s.prototype.createCaptionElement=function(){var t,n,i,r,s;return n=o({tagName:"figcaption",className:e.attachment.caption}),(t=this.attachmentPiece.getCaption())?(n.classList.add(e.attachment.captionEdited),n.textContent=t):(i=this.attachment.getFilename())&&(n.textContent=i,(r=this.attachment.getFormattedFilesize())&&(n.appendChild(document.createTextNode(" ")),s=o({tagName:"span",className:e.attachment.size,textContent:r}),n.appendChild(s))),n},s.prototype.getClassName=function(){var t,n;return n=[e.attachment.container,""+e.attachment.typePrefix+this.attachment.getType()],(t=this.attachment.getExtension())&&n.push(t),n.join(" ")},s.prototype.getHref=function(){return n(this.attachment.getContent(),"a")?void 0:this.attachment.getHref()},s.prototype.findProgressElement=function(){var t;return null!=(t=this.findElement())?t.querySelector("progress"):void 0},s.prototype.attachmentDidChangeUploadProgress=function(){var t,e;return e=this.attachment.getUploadProgress(),null!=(t=this.findProgressElement())?t.value=e:void 0},s}(t.ObjectView),n=function(t,e){var n;return n=o("div"),n.innerHTML=null!=t?t:"",n.querySelector(e)}}.call(this),function(){var e,n,o,i=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;e=t.defer,n=t.makeElement,o=t.measureElement,t.PreviewableAttachmentView=function(t){function e(){e.__super__.constructor.apply(this,arguments),this.attachment.previewDelegate=this}return i(e,t),e.prototype.createContentNodes=function(){return this.image=n({tagName:"img",attributes:{src:""},data:{trixMutable:!0,trixStoreKey:this.attachment.getCacheKey("imageElement")}}),this.refresh(this.image),[this.image]},e.prototype.refresh=function(t){var e;return null==t&&(t=null!=(e=this.findElement())?e.querySelector("img"):void 0),t?this.updateAttributesForImage(t):void 0},e.prototype.updateAttributesForImage=function(t){var e,n,o,i,r;return i=this.attachment.getURL(),n=this.attachment.getPreloadedURL(),t.src=n||i,n===i?t.removeAttribute("data-trix-serialized-attributes"):(o=JSON.stringify({src:i}),t.setAttribute("data-trix-serialized-attributes",o)),r=this.attachment.getWidth(),e=this.attachment.getHeight(),null!=r&&(t.width=r),null!=e?t.height=e:void 0},e.prototype.attachmentDidPreload=function(){return this.refresh(this.image),this.refresh()},e}(t.AttachmentView)}.call(this),function(){var e,n,o=function(t,e){function n(){this.constructor=t}for(var o in e)i.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},i={}.hasOwnProperty;n=t.makeElement,e=t.findInnerElement,t.PieceView=function(i){function r(){var t;r.__super__.constructor.apply(this,arguments),this.piece=this.object,this.attributes=this.piece.getAttributes(),t=this.options,this.textConfig=t.textConfig,this.context=t.context,this.piece.attachment?this.attachment=this.piece.attachment:this.string=this.piece.toString()}var s;return o(r,i),r.prototype.createNodes=function(){var t,n,o,i,r,s;if(s=this.attachment?this.createAttachmentNodes():this.createStringNodes(),t=this.createElement()){for(o=e(t),n=0,i=s.length;i>n;n++)r=s[n],o.appendChild(r);s=[t]}return s},r.prototype.createAttachmentNodes=function(){var e,n;return e=this.attachment.isPreviewable()?t.PreviewableAttachmentView:t.AttachmentView,n=this.createChildView(e,this.piece.attachment,{piece:this.piece}),n.getNodes()},r.prototype.createStringNodes=function(){var t,e,o,i,r,s,a,u,c,l;if(null!=(u=this.textConfig)?u.plaintext:void 0)return[document.createTextNode(this.string)];for(a=[],c=this.string.split("\n"),o=e=0,i=c.length;i>e;o=++e)l=c[o],o>0&&(t=n("br"),a.push(t)),(r=l.length)&&(s=document.createTextNode(this.preserveSpaces(l)),a.push(s));return a},r.prototype.createElement=function(){var e,o,i,r,s,a,u,c;for(r in this.attributes)if((e=t.config.textAttributes[r])&&(e.tagName&&(s=n(e.tagName),i?(i.appendChild(s),i=s):o=i=s),e.style))if(u){a=e.style;for(r in a)c=a[r],u[r]=c}else u=e.style;if(u){null==o&&(o=n("span"));for(r in u)c=u[r],o.style[r]=c}return o},r.prototype.createContainerElement=function(){var e,o,i,r,s;r=this.attributes;for(i in r)if(s=r[i],(o=t.config.textAttributes[i])&&o.groupTagName)return e={},e[i]=s,n(o.groupTagName,e)},s=t.NON_BREAKING_SPACE,r.prototype.preserveSpaces=function(t){return this.context.isLast&&(t=t.replace(/\ $/,s)),t=t.replace(/(\S)\ {3}(\S)/g,"$1 "+s+" $2").replace(/\ {2}/g,s+" ").replace(/\ {2}/g," "+s),(this.context.isFirst||this.context.followsWhitespace)&&(t=t.replace(/^\ /,s)),t},r}(t.ObjectView)}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.TextView=function(n){function o(){o.__super__.constructor.apply(this,arguments),this.text=this.object,this.textConfig=this.options.textConfig}var i;return e(o,n),o.prototype.createNodes=function(){var e,n,o,r,s,a,u,c,l,h;for(a=[],c=t.ObjectGroup.groupObjects(this.getPieces()),r=c.length-1,o=n=0,s=c.length;s>n;o=++n)u=c[o],e={},0===o&&(e.isFirst=!0),o===r&&(e.isLast=!0),i(l)&&(e.followsWhitespace=!0),h=this.findOrCreateCachedChildView(t.PieceView,u,{textConfig:this.textConfig,context:e}),a.push.apply(a,h.getNodes()),l=u;return a},o.prototype.getPieces=function(){var t,e,n,o,i;for(o=this.text.getPieces(),i=[],t=0,e=o.length;e>t;t++)n=o[t],n.hasAttribute("blockBreak")||i.push(n);return i},i=function(t){return/\s$/.test(null!=t?t.toString():void 0)},o}(t.ObjectView)}.call(this),function(){var e,n=function(t,e){function n(){this.constructor=t}for(var i in e)o.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},o={}.hasOwnProperty;e=t.makeElement,t.BlockView=function(o){function i(){i.__super__.constructor.apply(this,arguments),this.block=this.object,this.attributes=this.block.getAttributes()}return n(i,o),i.prototype.createNodes=function(){var n,o,i,r,s,a,u,c,l;if(n=document.createComment("block"),a=[n],this.block.isEmpty()?a.push(e("br")):(c=null!=(u=t.config.blockAttributes[this.block.getLastAttribute()])?u.text:void 0,l=this.findOrCreateCachedChildView(t.TextView,this.block.text,{textConfig:c}),a.push.apply(a,l.getNodes()),this.shouldAddExtraNewlineElement()&&a.push(e("br"))),this.attributes.length)return a;for(o=e(t.config.blockAttributes["default"].tagName),i=0,r=a.length;r>i;i++)s=a[i],o.appendChild(s);return[o]},i.prototype.createContainerElement=function(n){var o,i;return o=this.attributes[n],i=t.config.blockAttributes[o],e(i.tagName)},i.prototype.shouldAddExtraNewlineElement=function(){return/\n\n$/.test(this.block.toString())},i}(t.ObjectView)}.call(this),function(){var e,n,o=function(t,e){function n(){this.constructor=t}for(var o in e)i.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},i={}.hasOwnProperty;e=t.defer,n=t.makeElement,t.DocumentView=function(i){function r(){r.__super__.constructor.apply(this,arguments),this.element=this.options.element,this.elementStore=new t.ElementStore,this.setDocument(this.object)}var s,a,u;return o(r,i),r.render=function(t){var e,o;return e=n("div"),o=new this(t,{element:e}),o.render(),o.sync(),e},r.prototype.setDocument=function(t){return t.isEqualTo(this.document)?void 0:this.document=this.object=t},r.prototype.render=function(){var e,o,i,r,s,a,u;if(this.childViews=[],this.shadowElement=n("div"),!this.document.isEmpty()){for(s=t.ObjectGroup.groupObjects(this.document.getBlocks(),{asTree:!0}),a=[],e=0,o=s.length;o>e;e++)r=s[e],u=this.findOrCreateCachedChildView(t.BlockView,r),a.push(function(){var t,e,n,o;for(n=u.getNodes(),o=[],t=0,e=n.length;e>t;t++)i=n[t],o.push(this.shadowElement.appendChild(i));return o}.call(this));return a}},r.prototype.isSynced=function(){return s(this.shadowElement,this.element)},r.prototype.sync=function(){var t;for(t=this.createDocumentFragmentForSync();this.element.lastChild;)this.element.removeChild(this.element.lastChild);return this.element.appendChild(t),this.didSync()},r.prototype.didSync=function(){return this.elementStore.reset(a(this.element)),e(function(t){return function(){return t.garbageCollectCachedViews()}}(this))},r.prototype.createDocumentFragmentForSync=function(){var t,e,n,o,i,r,s,u,c,l;for(e=document.createDocumentFragment(),u=this.shadowElement.childNodes,n=0,i=u.length;i>n;n++)s=u[n],e.appendChild(s.cloneNode(!0));for(c=a(e),o=0,r=c.length;r>o;o++)t=c[o],(l=this.elementStore.remove(t))&&t.parentNode.replaceChild(l,t);return e},a=function(t){return t.querySelectorAll("[data-trix-store-key]")},s=function(t,e){return u(t.innerHTML)===u(e.innerHTML)},u=function(t){return t.replace(/&nbsp;/g," ")},r}(t.ObjectView)}.call(this),function(){var e,n,o,i,r,s,a=function(t,e){return function(){return t.apply(e,arguments)}},u=function(t,e){function n(){this.constructor=t}for(var o in e)c.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},c={}.hasOwnProperty;i=t.handleEvent,s=t.tagName,o=t.findClosestElementFromNode,r=t.innerElementIsActive,n=t.defer,e=t.AttachmentView.attachmentSelector,t.CompositionController=function(o){function s(n,o){this.element=n,this.composition=o,this.didClickAttachment=a(this.didClickAttachment,this),this.didBlur=a(this.didBlur,this),this.didFocus=a(this.didFocus,this),this.documentView=new t.DocumentView(this.composition.document,{element:this.element}),i("focus",{onElement:this.element,withCallback:this.didFocus}),i("blur",{onElement:this.element,withCallback:this.didBlur}),i("click",{onElement:this.element,matchingSelector:"a[contenteditable=false]",preventDefault:!0}),i("mousedown",{onElement:this.element,matchingSelector:e,withCallback:this.didClickAttachment}),i("click",{onElement:this.element,matchingSelector:"a"+e,preventDefault:!0})}return u(s,o),s.prototype.didFocus=function(){var t;return this.focused?void 0:(this.focused=!0,null!=(t=this.delegate)&&"function"==typeof t.compositionControllerDidFocus?t.compositionControllerDidFocus():void 0)},s.prototype.didBlur=function(){return n(function(t){return function(){var e;return r(t.element)?void 0:(t.focused=null,null!=(e=t.delegate)&&"function"==typeof e.compositionControllerDidBlur?e.compositionControllerDidBlur():void 0)}}(this))},s.prototype.didClickAttachment=function(t,e){var n,o;return n=this.findAttachmentForElement(e),null!=(o=this.delegate)&&"function"==typeof o.compositionControllerDidSelectAttachment?o.compositionControllerDidSelectAttachment(n):void 0},s.prototype.render=function(){var t,e,n;return this.revision!==this.composition.revision&&(this.documentView.setDocument(this.composition.document),this.documentView.render(),this.revision=this.composition.revision),this.documentView.isSynced()||(null!=(t=this.delegate)&&"function"==typeof t.compositionControllerWillSyncDocumentView&&t.compositionControllerWillSyncDocumentView(),this.documentView.sync(),this.reinstallAttachmentEditor(),null!=(e=this.delegate)&&"function"==typeof e.compositionControllerDidSyncDocumentView&&e.compositionControllerDidSyncDocumentView()),null!=(n=this.delegate)&&"function"==typeof n.compositionControllerDidRender?n.compositionControllerDidRender():void 0},s.prototype.rerenderViewForObject=function(t){return this.documentView.invalidateViewForObject(t),this.render()},s.prototype.isViewCachingEnabled=function(){return this.documentView.isViewCachingEnabled()},s.prototype.enableViewCaching=function(){return this.documentView.enableViewCaching()},s.prototype.disableViewCaching=function(){return this.documentView.disableViewCaching()},s.prototype.refreshViewCache=function(){return this.documentView.garbageCollectCachedViews()},s.prototype.installAttachmentEditorForAttachment=function(e){var n,o,i;if((null!=(i=this.attachmentEditor)?i.attachment:void 0)!==e&&(o=this.documentView.findElementForObject(e)))return this.uninstallAttachmentEditor(),n=this.composition.document.getAttachmentPieceForAttachment(e),this.attachmentEditor=new t.AttachmentEditorController(n,o,this.element),this.attachmentEditor.delegate=this},s.prototype.uninstallAttachmentEditor=function(){var t;return null!=(t=this.attachmentEditor)?t.uninstall():void 0},s.prototype.reinstallAttachmentEditor=function(){var t;return this.attachmentEditor?(t=this.attachmentEditor.attachment,this.uninstallAttachmentEditor(),this.installAttachmentEditorForAttachment(t)):void 0},s.prototype.editAttachmentCaption=function(){var t;return null!=(t=this.attachmentEditor)?t.editCaption():void 0},s.prototype.didUninstallAttachmentEditor=function(){return this.attachmentEditor=null,this.render()},s.prototype.attachmentEditorDidRequestUpdatingAttributesForAttachment=function(t,e){var n;return null!=(n=this.delegate)&&"function"==typeof n.compositionControllerWillUpdateAttachment&&n.compositionControllerWillUpdateAttachment(e),this.composition.updateAttributesForAttachment(t,e)},s.prototype.attachmentEditorDidRequestRemovingAttributeForAttachment=function(t,e){var n;return null!=(n=this.delegate)&&"function"==typeof n.compositionControllerWillUpdateAttachment&&n.compositionControllerWillUpdateAttachment(e),this.composition.removeAttributeForAttachment(t,e)},s.prototype.attachmentEditorDidRequestRemovalOfAttachment=function(t){var e;return null!=(e=this.delegate)&&"function"==typeof e.compositionControllerDidRequestRemovalOfAttachment?e.compositionControllerDidRequestRemovalOfAttachment(t):void 0},s.prototype.attachmentEditorDidRequestDeselectingAttachment=function(t){var e;return null!=(e=this.delegate)&&"function"==typeof e.compositionControllerDidRequestDeselectingAttachment?e.compositionControllerDidRequestDeselectingAttachment(t):void 0},s.prototype.findAttachmentForElement=function(t){return this.composition.document.getAttachmentById(parseInt(t.dataset.trixId,10))},s}(t.BasicObject)}.call(this),function(){var e,n,o,i=function(t,e){return function(){return t.apply(e,arguments)}},r=function(t,e){function n(){this.constructor=t}for(var o in e)s.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},s={}.hasOwnProperty;n=t.handleEvent,o=t.triggerEvent,e=t.findClosestElementFromNode,t.ToolbarController=function(t){function s(t){this.element=t,this.didKeyDownDialogInput=i(this.didKeyDownDialogInput,this),this.didClickDialogButton=i(this.didClickDialogButton,this),this.didClickAttributeButton=i(this.didClickAttributeButton,this),this.didClickActionButton=i(this.didClickActionButton,this),this.attributes={},this.actions={},this.resetDialogInputs(),n("mousedown",{onElement:this.element,matchingSelector:a,withCallback:this.didClickActionButton}),n("mousedown",{onElement:this.element,matchingSelector:c,withCallback:this.didClickAttributeButton}),n("click",{onElement:this.element,matchingSelector:y,preventDefault:!0}),n("click",{onElement:this.element,matchingSelector:l,withCallback:this.didClickDialogButton}),n("keydown",{onElement:this.element,matchingSelector:h,withCallback:this.didKeyDownDialogInput})}var a,u,c,l,h,p,d,f,g,m,y;return r(s,t),a="button[data-trix-action]",c="button[data-trix-attribute]",y=[a,c].join(", "),p=".dialog[data-trix-dialog]",u=p+".active",l=p+" input[data-trix-method]",h=p+" input[type=text], "+p+" input[type=url]",s.prototype.didClickActionButton=function(t,e){var n,o,i;return null!=(o=this.delegate)&&o.toolbarDidClickButton(),t.preventDefault(),n=d(e),this.getDialog(n)?this.toggleDialog(n):null!=(i=this.delegate)?i.toolbarDidInvokeAction(n):void 0},s.prototype.didClickAttributeButton=function(t,e){var n,o,i;return null!=(o=this.delegate)&&o.toolbarDidClickButton(),t.preventDefault(),n=f(e),this.getDialog(n)?this.toggleDialog(n):null!=(i=this.delegate)&&i.toolbarDidToggleAttribute(n),this.refreshAttributeButtons()},s.prototype.didClickDialogButton=function(t,n){var o,i;return o=e(n,{matchingSelector:p}),i=n.getAttribute("data-trix-method"),this[i].call(this,o)},s.prototype.didKeyDownDialogInput=function(t,e){var n,o;return 13===t.keyCode&&(t.preventDefault(),n=e.getAttribute("name"),o=this.getDialog(n),this.setAttribute(o)),27===t.keyCode?(t.preventDefault(),this.hideDialog()):void 0},s.prototype.updateActions=function(t){return this.actions=t,this.refreshActionButtons()},s.prototype.refreshActionButtons=function(){return this.eachActionButton(function(t){return function(e,n){return e.disabled=t.actions[n]===!1}}(this))},s.prototype.eachActionButton=function(t){var e,n,o,i,r;for(i=this.element.querySelectorAll(a),r=[],n=0,o=i.length;o>n;n++)e=i[n],r.push(t(e,d(e)));return r},s.prototype.updateAttributes=function(t){return this.attributes=t,this.refreshAttributeButtons()},s.prototype.refreshAttributeButtons=function(){return this.eachAttributeButton(function(t){return function(e,n){return t.attributes[n]||t.dialogIsVisible(n)?e.classList.add("active"):e.classList.remove("active")}}(this))},s.prototype.eachAttributeButton=function(t){var e,n,o,i,r;for(i=this.element.querySelectorAll(c),r=[],n=0,o=i.length;o>n;n++)e=i[n],r.push(t(e,f(e)));return r},s.prototype.applyKeyboardCommand=function(t){var e,n,i,r,s,a,u;for(s=JSON.stringify(t.sort()),u=this.element.querySelectorAll("[data-trix-key]"),r=0,a=u.length;a>r;r++)if(e=u[r],i=e.getAttribute("data-trix-key").split("+"),n=JSON.stringify(i.sort()),n===s)return o("mousedown",{onElement:e}),!0;return!1},s.prototype.dialogIsVisible=function(t){var e;return(e=this.getDialog(t))?e.classList.contains("active"):void 0},s.prototype.toggleDialog=function(t){return this.dialogIsVisible(t)?this.hideDialog():this.showDialog(t)},s.prototype.showDialog=function(t){var e,n,o,i,r,s,a,u,c,l;for(this.hideDialog(),null!=(a=this.delegate)&&a.toolbarWillShowDialog(),o=this.getDialog(t),o.classList.add("active"),u=o.querySelectorAll("input[disabled]"),i=0,s=u.length;s>i;i++)n=u[i],n.removeAttribute("disabled");return(e=f(o))&&(r=m(o,t))&&(r.value=null!=(c=this.attributes[e])?c:"",r.select()),null!=(l=this.delegate)?l.toolbarDidShowDialog(t):void 0},s.prototype.setAttribute=function(t){var e,n,o;return e=f(t),n=m(t,e),n.willValidate&&!n.checkValidity()?(n.classList.add("validate"),n.focus()):(null!=(o=this.delegate)&&o.toolbarDidUpdateAttribute(e,n.value),this.hideDialog())},s.prototype.removeAttribute=function(t){var e,n;return e=f(t),null!=(n=this.delegate)&&n.toolbarDidRemoveAttribute(e),this.hideDialog()},s.prototype.hideDialog=function(){var t,e;return(t=this.element.querySelector(u))?(t.classList.remove("active"),this.resetDialogInputs(),null!=(e=this.delegate)?e.toolbarDidHideDialog(g(t)):void 0):void 0},s.prototype.resetDialogInputs=function(){var t,e,n,o,i;for(o=this.element.querySelectorAll(h),i=[],t=0,n=o.length;n>t;t++)e=o[t],e.setAttribute("disabled","disabled"),i.push(e.classList.remove("validate"));return i},s.prototype.getDialog=function(t){return this.element.querySelector(".dialog[data-trix-dialog="+t+"]")},m=function(t,e){return null==e&&(e=f(t)),t.querySelector("input[name='"+e+"']")},d=function(t){return t.getAttribute("data-trix-action")},f=function(t){return t.getAttribute("data-trix-attribute")},g=function(t){return t.getAttribute("data-trix-dialog")},s}(t.BasicObject)}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.ImagePreloadOperation=function(t){function n(t){this.url=t}return e(n,t),n.prototype.perform=function(t){var e;return e=new Image,e.onload=function(n){return function(){return e.width=n.width=e.naturalWidth,e.height=n.height=e.naturalHeight,t(!0,e)}}(this),e.onerror=function(){return t(!1)},e.src=this.url},n}(t.Operation)}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}},n=function(t,e){function n(){this.constructor=t}for(var i in e)o.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},o={}.hasOwnProperty;t.Attachment=function(o){function i(n){null==n&&(n={}),this.releaseFile=e(this.releaseFile,this),i.__super__.constructor.apply(this,arguments),this.attributes=t.Hash.box(n),this.didChangeAttributes()}return n(i,o),i.previewablePattern=/^image(\/(gif|png|jpe?g)|$)/,i.attachmentForFile=function(t){var e,n;return n=this.attributesForFile(t),e=new this(n),e.setFile(t),e},i.attributesForFile=function(e){return new t.Hash({filename:e.name,filesize:e.size,contentType:e.type})},i.fromJSON=function(t){return new this(t)},i.prototype.getAttribute=function(t){return this.attributes.get(t)},i.prototype.hasAttribute=function(t){return this.attributes.has(t)},i.prototype.getAttributes=function(){return this.attributes.toObject()},i.prototype.setAttributes=function(t){var e,n;return null==t&&(t={}),e=this.attributes.merge(t),this.attributes.isEqualTo(e)?void 0:(this.attributes=e,this.didChangeAttributes(),null!=(n=this.delegate)&&"function"==typeof n.attachmentDidChangeAttributes?n.attachmentDidChangeAttributes(this):void 0)},i.prototype.didChangeAttributes=function(){return this.isPreviewable()?this.preloadURL():void 0},i.prototype.isPending=function(){return null!=this.file&&!(this.getURL()||this.getHref())},i.prototype.isPreviewable=function(){return this.attributes.has("previewable")?this.attributes.get("previewable"):this.constructor.previewablePattern.test(this.getContentType())},i.prototype.getType=function(){return this.hasContent()?"content":this.isPreviewable()?"preview":"file"},i.prototype.getURL=function(){return this.attributes.get("url")},i.prototype.getHref=function(){return this.attributes.get("href")},i.prototype.getFilename=function(){var t;return null!=(t=this.attributes.get("filename"))?t:""},i.prototype.getFilesize=function(){return this.attributes.get("filesize")},i.prototype.getFormattedFilesize=function(){var e;return e=this.attributes.get("filesize"),"number"==typeof e?t.config.fileSize.formatter(e):""},i.prototype.getExtension=function(){var t;return null!=(t=this.getFilename().match(/\.(\w+)$/))?t[1].toLowerCase():void 0},i.prototype.getContentType=function(){return this.attributes.get("contentType")},i.prototype.hasContent=function(){return this.attributes.has("content")},i.prototype.getContent=function(){return this.attributes.get("content")},i.prototype.getWidth=function(){return this.attributes.get("width")},i.prototype.getHeight=function(){return this.attributes.get("height")},i.prototype.getFile=function(){return this.file},i.prototype.setFile=function(t){return this.file=t,this.isPreviewable()?this.preloadFile():void 0},i.prototype.releaseFile=function(){return this.releasePreloadedFile(),this.file=null},i.prototype.getUploadProgress=function(){var t;return null!=(t=this.uploadProgress)?t:0},i.prototype.setUploadProgress=function(t){var e;return this.uploadProgress!==t?(this.uploadProgress=t,null!=(e=this.uploadProgressDelegate)&&"function"==typeof e.attachmentDidChangeUploadProgress?e.attachmentDidChangeUploadProgress(this):void 0):void 0},i.prototype.toJSON=function(){return this.getAttributes()},i.prototype.getCacheKey=function(t){var e;return e=[i.__super__.getCacheKey.apply(this,arguments),this.attributes.getCacheKey(),this.getPreloadedURL()],t&&e.unshift(t),e.join("/")},i.prototype.getPreloadedURL=function(){return this.preloadedURL},i.prototype.preloadURL=function(){return this.preload(this.getURL(),this.releaseFile)},i.prototype.preloadFile=function(){return this.file?(this.fileObjectURL=URL.createObjectURL(this.file),this.preload(this.fileObjectURL)):void 0},i.prototype.releasePreloadedFile=function(){return this.fileObjectURL?(URL.revokeObjectURL(this.fileObjectURL),this.fileObjectURL=null):void 0},i.prototype.preload=function(e,n){var o;return e&&e!==this.preloadedURL?(null==this.preloadedURL&&(this.preloadedURL=e),o=new t.ImagePreloadOperation(e),o.then(function(t){return function(o){var i,r,s;return s=o.width,i=o.height,t.preloadedURL=e,t.setAttributes({width:s,height:i}),null!=(r=t.previewDelegate)&&"function"==typeof r.attachmentDidPreload&&r.attachmentDidPreload(),"function"==typeof n?n():void 0}}(this))):void 0},i}(t.Object)}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.Piece=function(n){function o(e,n){null==n&&(n={}),o.__super__.constructor.apply(this,arguments),this.attributes=t.Hash.box(n)}return e(o,n),o.types={},o.registerType=function(t,e){return e.type=t,this.types[t]=e},o.fromJSON=function(t){var e;return(e=this.types[t.type])?e.fromJSON(t):void 0},o.prototype.copyWithAttributes=function(t){return new this.constructor(this.getValue(),t)},o.prototype.copyWithAdditionalAttributes=function(t){return this.copyWithAttributes(this.attributes.merge(t))},o.prototype.copyWithoutAttribute=function(t){return this.copyWithAttributes(this.attributes.remove(t))},o.prototype.copy=function(){return this.copyWithAttributes(this.attributes)},o.prototype.getAttribute=function(t){return this.attributes.get(t)},o.prototype.getAttributesHash=function(){return this.attributes},o.prototype.getAttributes=function(){return this.attributes.toObject()},o.prototype.getCommonAttributes=function(){var t,e,n;return(n=pieceList.getPieceAtIndex(0))?(t=n.attributes,e=t.getKeys(),pieceList.eachPiece(function(n){return e=t.getKeysCommonToHash(n.attributes),t=t.slice(e)}),t.toObject()):{}},o.prototype.hasAttribute=function(t){return this.attributes.has(t)},o.prototype.hasSameStringValueAsPiece=function(t){return null!=t&&this.toString()===t.toString()},o.prototype.hasSameAttributesAsPiece=function(t){return null!=t&&(this.attributes===t.attributes||this.attributes.isEqualTo(t.attributes))},o.prototype.isBlockBreak=function(){return!1},o.prototype.isEqualTo=function(t){return o.__super__.isEqualTo.apply(this,arguments)||this.hasSameConstructorAs(t)&&this.hasSameStringValueAsPiece(t)&&this.hasSameAttributesAsPiece(t)},o.prototype.isEmpty=function(){return 0===this.length},o.prototype.isSerializable=function(){return!0},o.prototype.toJSON=function(){return{type:this.constructor.type,attributes:this.getAttributes()}},o.prototype.contentsForInspection=function(){return{type:this.constructor.type,attributes:this.attributes.inspect()}},o.prototype.canBeGrouped=function(){return this.hasAttribute("href")},o.prototype.canBeGroupedWith=function(t){return this.getAttribute("href")===t.getAttribute("href")},o.prototype.getLength=function(){return this.length},o.prototype.canBeConsolidatedWith=function(){return!1},o}(t.Object)}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);
	return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.Piece.registerType("attachment",t.AttachmentPiece=function(n){function o(t){this.attachment=t,o.__super__.constructor.apply(this,arguments),this.length=1,this.ensureAttachmentExclusivelyHasAttribute("href")}return e(o,n),o.fromJSON=function(e){return new this(t.Attachment.fromJSON(e.attachment),e.attributes)},o.prototype.ensureAttachmentExclusivelyHasAttribute=function(t){return this.hasAttribute(t)&&this.attachment.hasAttribute(t)?this.attributes=this.attributes.remove(t):void 0},o.prototype.getValue=function(){return this.attachment},o.prototype.isSerializable=function(){return!this.attachment.isPending()},o.prototype.getCaption=function(){var t;return null!=(t=this.attributes.get("caption"))?t:""},o.prototype.getAttributesForAttachment=function(){return this.attributes.slice(["caption"])},o.prototype.canBeGrouped=function(){return o.__super__.canBeGrouped.apply(this,arguments)&&!this.attachment.hasAttribute("href")},o.prototype.isEqualTo=function(t){var e;return o.__super__.isEqualTo.apply(this,arguments)&&this.attachment.id===(null!=t&&null!=(e=t.attachment)?e.id:void 0)},o.prototype.toString=function(){return t.OBJECT_REPLACEMENT_CHARACTER},o.prototype.toJSON=function(){var t;return t=o.__super__.toJSON.apply(this,arguments),t.attachment=this.attachment,t},o.prototype.getCacheKey=function(){return[o.__super__.getCacheKey.apply(this,arguments),this.attachment.getCacheKey()].join("/")},o.prototype.toConsole=function(){return JSON.stringify(this.toString())},o}(t.Piece))}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.Piece.registerType("string",t.StringPiece=function(t){function n(t){n.__super__.constructor.apply(this,arguments),this.string=t,this.length=this.string.length}return e(n,t),n.fromJSON=function(t){return new this(t.string,t.attributes)},n.prototype.getValue=function(){return this.string},n.prototype.toString=function(){return this.string.toString()},n.prototype.isBlockBreak=function(){return"\n"===this.toString()&&this.getAttribute("blockBreak")===!0},n.prototype.toJSON=function(){var t;return t=n.__super__.toJSON.apply(this,arguments),t.string=this.string,t},n.prototype.canBeConsolidatedWith=function(t){return null!=t&&this.hasSameConstructorAs(t)&&this.hasSameAttributesAsPiece(t)},n.prototype.consolidateWith=function(t){return new this.constructor(this.toString()+t.toString(),this.attributes)},n.prototype.splitAtOffset=function(t){var e,n;return 0===t?(e=null,n=this):t===this.length?(e=this,n=null):(e=new this.constructor(this.string.slice(0,t),this.attributes),n=new this.constructor(this.string.slice(t),this.attributes)),[e,n]},n.prototype.toConsole=function(){var t;return t=this.string,t.length>15&&(t=t.slice(0,14)+"\u2026"),JSON.stringify(t.toString())},n}(t.Piece))}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty,o=[].slice;t.SplittableList=function(t){function n(t){null==t&&(t=[]),n.__super__.constructor.apply(this,arguments),this.objects=t.slice(0),this.length=this.objects.length}var i,r,s;return e(n,t),n.box=function(t){return t instanceof this?t:new this(t)},n.prototype.eachObject=function(t){var e,n,o,i,r,s;for(r=this.objects,s=[],n=e=0,o=r.length;o>e;n=++e)i=r[n],s.push(t(i,n));return s},n.prototype.insertObjectAtIndex=function(t,e){var n;return n=this.objects.slice(0),n.splice(e,0,t),new this.constructor(n)},n.prototype.insertSplittableListAtIndex=function(t,e){var n;return n=this.objects.slice(0),n.splice.apply(n,[e,0].concat(o.call(t.objects))),new this.constructor(n)},n.prototype.insertSplittableListAtPosition=function(t,e){var n,o,i;return i=this.splitObjectAtPosition(e),o=i[0],n=i[1],new this.constructor(o).insertSplittableListAtIndex(t,n)},n.prototype.editObjectAtIndex=function(t,e){return this.replaceObjectAtIndex(e(this.objects[t]),t)},n.prototype.replaceObjectAtIndex=function(t,e){var n;return n=this.objects.slice(0),n.splice(e,1,t),new this.constructor(n)},n.prototype.removeObjectAtIndex=function(t){var e;return e=this.objects.slice(0),e.splice(t,1),new this.constructor(e)},n.prototype.getObjectAtIndex=function(t){return this.objects[t]},n.prototype.getSplittableListInRange=function(t){var e,n,o,i;return o=this.splitObjectsAtRange(t),n=o[0],e=o[1],i=o[2],new this.constructor(n.slice(e,i+1))},n.prototype.selectSplittableList=function(t){var e,n;return n=function(){var n,o,i,r;for(i=this.objects,r=[],n=0,o=i.length;o>n;n++)e=i[n],t(e)&&r.push(e);return r}.call(this),new this.constructor(n)},n.prototype.removeObjectsInRange=function(t){var e,n,o,i;return o=this.splitObjectsAtRange(t),n=o[0],e=o[1],i=o[2],n.splice(e,i-e+1),new this.constructor(n)},n.prototype.transformObjectsInRange=function(t,e){var n,o,i,r,s,a,u;return s=this.splitObjectsAtRange(t),r=s[0],o=s[1],a=s[2],u=function(){var t,s,u;for(u=[],n=t=0,s=r.length;s>t;n=++t)i=r[n],u.push(n>=o&&a>=n?e(i):i);return u}(),new this.constructor(u)},n.prototype.splitObjectsAtRange=function(t){var e,n,o,r,a,u;return r=this.splitObjectAtPosition(s(t)),n=r[0],e=r[1],o=r[2],a=new this.constructor(n).splitObjectAtPosition(i(t)+o),n=a[0],u=a[1],[n,e,u-1]},n.prototype.getObjectAtPosition=function(t){var e,n,o;return o=this.findIndexAndOffsetAtPosition(t),e=o.index,n=o.offset,this.objects[e]},n.prototype.splitObjectAtPosition=function(t){var e,n,o,i,r,s,a,u,c,l;return s=this.findIndexAndOffsetAtPosition(t),e=s.index,r=s.offset,i=this.objects.slice(0),null!=e?0===r?(c=e,l=0):(o=this.getObjectAtIndex(e),a=o.splitAtOffset(r),n=a[0],u=a[1],i.splice(e,1,n,u),c=e+1,l=n.getLength()-r):(c=i.length,l=0),[i,c,l]},n.prototype.consolidate=function(){var t,e,n,o,i,r;for(o=[],i=this.objects[0],r=this.objects.slice(1),t=0,e=r.length;e>t;t++)n=r[t],("function"==typeof i.canBeConsolidatedWith?i.canBeConsolidatedWith(n):void 0)?i=i.consolidateWith(n):(o.push(i),i=n);return null!=i&&o.push(i),new this.constructor(o)},n.prototype.consolidateFromIndexToIndex=function(t,e){var n,i,r;return i=this.objects.slice(0),r=i.slice(t,e+1),n=new this.constructor(r).consolidate().toArray(),i.splice.apply(i,[t,r.length].concat(o.call(n))),new this.constructor(i)},n.prototype.findIndexAndOffsetAtPosition=function(t){var e,n,o,i,r,s,a;for(e=0,a=this.objects,o=n=0,i=a.length;i>n;o=++n){if(s=a[o],r=e+s.getLength(),t>=e&&r>t)return{index:o,offset:t-e};e=r}return{index:null,offset:null}},n.prototype.findPositionAtIndexAndOffset=function(t,e){var n,o,i,r,s,a;for(s=0,a=this.objects,n=o=0,i=a.length;i>o;n=++o)if(r=a[n],t>n)s+=r.getLength();else if(n===t){s+=e;break}return s},n.prototype.getEndPosition=function(){var t,e;return null!=this.endPosition?this.endPosition:this.endPosition=function(){var n,o,i;for(e=0,i=this.objects,n=0,o=i.length;o>n;n++)t=i[n],e+=t.getLength();return e}.call(this)},n.prototype.toString=function(){return this.objects.join("")},n.prototype.toArray=function(){return this.objects.slice(0)},n.prototype.toJSON=function(){return this.toArray()},n.prototype.isEqualTo=function(t){return n.__super__.isEqualTo.apply(this,arguments)||r(this.objects,null!=t?t.objects:void 0)},r=function(t,e){var n,o,i,r,s;if(null==e&&(e=[]),t.length!==e.length)return!1;for(s=!0,o=n=0,i=t.length;i>n;o=++n)r=t[o],s&&!r.isEqualTo(e[o])&&(s=!1);return s},n.prototype.contentsForInspection=function(){var t;return{objects:"["+function(){var e,n,o,i;for(o=this.objects,i=[],e=0,n=o.length;n>e;e++)t=o[e],i.push(t.inspect());return i}.call(this).join(", ")+"]"}},s=function(t){return t[0]},i=function(t){return t[1]},n}(t.Object)}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.Text=function(n){function o(e){var n;null==e&&(e=[]),o.__super__.constructor.apply(this,arguments),this.pieceList=new t.SplittableList(function(){var t,o,i;for(i=[],t=0,o=e.length;o>t;t++)n=e[t],n.isEmpty()||i.push(n);return i}())}return e(o,n),o.textForAttachmentWithAttributes=function(e,n){var o;return o=new t.AttachmentPiece(e,n),new this([o])},o.textForStringWithAttributes=function(e,n){var o;return o=new t.StringPiece(e,n),new this([o])},o.fromJSON=function(e){var n,o;return o=function(){var o,i,r;for(r=[],o=0,i=e.length;i>o;o++)n=e[o],r.push(t.Piece.fromJSON(n));return r}(),new this(o)},o.prototype.copy=function(){return this.copyWithPieceList(this.pieceList)},o.prototype.copyWithPieceList=function(t){return new this.constructor(t.consolidate().toArray())},o.prototype.copyUsingObjectMap=function(t){var e,n;return n=function(){var n,o,i,r,s;for(i=this.getPieces(),s=[],n=0,o=i.length;o>n;n++)e=i[n],s.push(null!=(r=t.find(e))?r:e);return s}.call(this),new this.constructor(n)},o.prototype.appendText=function(t){return this.insertTextAtPosition(t,this.getLength())},o.prototype.insertTextAtPosition=function(t,e){return this.copyWithPieceList(this.pieceList.insertSplittableListAtPosition(t.pieceList,e))},o.prototype.removeTextAtRange=function(t){return this.copyWithPieceList(this.pieceList.removeObjectsInRange(t))},o.prototype.replaceTextAtRange=function(t,e){return this.removeTextAtRange(e).insertTextAtPosition(t,e[0])},o.prototype.moveTextFromRangeToPosition=function(t,e){var n,o;if(!(t[0]<=e&&e<=t[1]))return o=this.getTextAtRange(t),n=o.getLength(),t[0]<e&&(e-=n),this.removeTextAtRange(t).insertTextAtPosition(o,e)},o.prototype.addAttributeAtRange=function(t,e,n){var o;return o={},o[t]=e,this.addAttributesAtRange(o,n)},o.prototype.addAttributesAtRange=function(t,e){return this.copyWithPieceList(this.pieceList.transformObjectsInRange(e,function(e){return e.copyWithAdditionalAttributes(t)}))},o.prototype.removeAttributeAtRange=function(t,e){return this.copyWithPieceList(this.pieceList.transformObjectsInRange(e,function(e){return e.copyWithoutAttribute(t)}))},o.prototype.setAttributesAtRange=function(t,e){return this.copyWithPieceList(this.pieceList.transformObjectsInRange(e,function(e){return e.copyWithAttributes(t)}))},o.prototype.getAttributesAtPosition=function(t){var e,n;return null!=(e=null!=(n=this.pieceList.getObjectAtPosition(t))?n.getAttributes():void 0)?e:{}},o.prototype.getCommonAttributes=function(){var e,n;return e=function(){var t,e,o,i;for(o=this.pieceList.toArray(),i=[],t=0,e=o.length;e>t;t++)n=o[t],i.push(n.getAttributes());return i}.call(this),t.Hash.fromCommonAttributesOfObjects(e).toObject()},o.prototype.getCommonAttributesAtRange=function(t){var e;return null!=(e=this.getTextAtRange(t).getCommonAttributes())?e:{}},o.prototype.getExpandedRangeForAttributeAtOffset=function(t,e){var n,o,i;for(n=i=e,o=this.getLength();n>0&&this.getCommonAttributesAtRange([n-1,i])[t];)n--;for(;o>i&&this.getCommonAttributesAtRange([e,i+1])[t];)i++;return[n,i]},o.prototype.getTextAtRange=function(t){return this.copyWithPieceList(this.pieceList.getSplittableListInRange(t))},o.prototype.getStringAtRange=function(t){return this.pieceList.getSplittableListInRange(t).toString()},o.prototype.startsWithString=function(t){return this.getStringAtRange([0,t.length])===t},o.prototype.endsWithString=function(t){var e;return e=this.getLength(),this.getStringAtRange([e-t.length,e])===t},o.prototype.getAttachmentPieces=function(){var t,e,n,o,i;for(o=this.pieceList.toArray(),i=[],t=0,e=o.length;e>t;t++)n=o[t],null!=n.attachment&&i.push(n);return i},o.prototype.getAttachments=function(){var t,e,n,o,i;for(o=this.getAttachmentPieces(),i=[],t=0,e=o.length;e>t;t++)n=o[t],i.push(n.attachment);return i},o.prototype.getAttachmentAndPositionById=function(t){var e,n,o,i,r,s;for(i=0,r=this.pieceList.toArray(),e=0,n=r.length;n>e;e++){if(o=r[e],(null!=(s=o.attachment)?s.id:void 0)===t)return{attachment:o.attachment,position:i};i+=o.length}return{attachment:null,position:null}},o.prototype.getAttachmentById=function(t){var e,n,o;return o=this.getAttachmentAndPositionById(t),e=o.attachment,n=o.position,e},o.prototype.getRangeOfAttachment=function(t){var e,n;return n=this.getAttachmentAndPositionById(t.id),t=n.attachment,e=n.position,null!=t?[e,e+1]:void 0},o.prototype.updateAttributesForAttachment=function(t,e){var n;return(n=this.getRangeOfAttachment(e))?this.addAttributesAtRange(t,n):this},o.prototype.getLength=function(){return this.pieceList.getEndPosition()},o.prototype.isEmpty=function(){return 0===this.getLength()},o.prototype.isEqualTo=function(t){var e;return o.__super__.isEqualTo.apply(this,arguments)||(null!=t&&null!=(e=t.pieceList)?e.isEqualTo(this.pieceList):void 0)},o.prototype.isBlockBreak=function(){return 1===this.getLength()&&this.pieceList.getObjectAtIndex(0).isBlockBreak()},o.prototype.eachPiece=function(t){return this.pieceList.eachObject(t)},o.prototype.getPieces=function(){return this.pieceList.toArray()},o.prototype.getPieceAtPosition=function(t){return this.pieceList.getObjectAtPosition(t)},o.prototype.contentsForInspection=function(){return{pieceList:this.pieceList.inspect()}},o.prototype.toSerializableText=function(){var t;return t=this.pieceList.selectSplittableList(function(t){return t.isSerializable()}),this.copyWithPieceList(t)},o.prototype.toString=function(){return this.pieceList.toString()},o.prototype.toJSON=function(){return this.pieceList.toJSON()},o.prototype.toConsole=function(){var t;return JSON.stringify(function(){var e,n,o,i;for(o=this.pieceList.toArray(),i=[],e=0,n=o.length;n>e;e++)t=o[e],i.push(JSON.parse(t.toConsole()));return i}.call(this))},o}(t.Object)}.call(this),function(){var e,n=function(t,e){function n(){this.constructor=t}for(var i in e)o.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},o={}.hasOwnProperty,i=[].slice;e=t.arraysAreEqual,t.Block=function(o){function r(e,n){null==e&&(e=new t.Text),null==n&&(n=[]),r.__super__.constructor.apply(this,arguments),this.text=a(e),this.attributes=n}var s,a,u,c,l,h,p,d;return n(r,o),r.fromJSON=function(e){var n;return n=t.Text.fromJSON(e.text),new this(n,e.attributes)},r.prototype.isEmpty=function(){return this.text.isBlockBreak()},r.prototype.isEqualTo=function(t){return r.__super__.isEqualTo.apply(this,arguments)||this.text.isEqualTo(null!=t?t.text:void 0)&&e(this.attributes,null!=t?t.attributes:void 0)},r.prototype.copyWithText=function(t){return new this.constructor(t,this.attributes)},r.prototype.copyWithoutText=function(){return this.copyWithText(null)},r.prototype.copyWithAttributes=function(t){return new this.constructor(this.text,t)},r.prototype.copyUsingObjectMap=function(t){var e;return this.copyWithText((e=t.find(this.text))?e:this.text.copyUsingObjectMap(t))},r.prototype.addAttribute=function(e){var n,o;return o=t.config.blockAttributes[e].listAttribute,n=this.attributes.concat(o?[o,e]:[e]),this.copyWithAttributes(n)},r.prototype.removeAttribute=function(e){var n,o;return o=t.config.blockAttributes[e].listAttribute,n=l(this.attributes,e),null!=o&&(n=l(n,o)),this.copyWithAttributes(n)},r.prototype.removeLastAttribute=function(){return this.removeAttribute(this.getLastAttribute())},r.prototype.getLastAttribute=function(){return c(this.attributes)},r.prototype.getAttributes=function(){return this.attributes.slice(0)},r.prototype.getAttributeLevel=function(){return this.attributes.length},r.prototype.getAttributeAtLevel=function(t){return this.attributes[t-1]},r.prototype.hasAttributes=function(){return this.getAttributeLevel()>0},r.prototype.getConfig=function(e){var n,o;if((n=this.getLastAttribute())&&(o=t.config.blockAttributes[n]))return e?o[e]:o},r.prototype.isListItem=function(){return null!=this.getConfig("listAttribute")},r.prototype.findLineBreakInDirectionFromPosition=function(t,e){var n,o;return o=this.toString(),n=function(){switch(t){case"forward":return o.indexOf("\n",e);case"backward":return o.slice(0,e).lastIndexOf("\n")}}(),-1!==n?n:void 0},r.prototype.contentsForInspection=function(){return{text:this.text.inspect(),attributes:this.attributes}},r.prototype.toString=function(){return this.text.toString()},r.prototype.toJSON=function(){return{text:this.text,attributes:this.attributes}},r.prototype.getLength=function(){return this.text.getLength()},r.prototype.canBeConsolidatedWith=function(t){return!this.hasAttributes()&&!t.hasAttributes()},r.prototype.consolidateWith=function(e){var n,o;return n=t.Text.textForStringWithAttributes("\n"),o=this.getTextWithoutBlockBreak().appendText(n),this.copyWithText(o.appendText(e.text))},r.prototype.splitAtOffset=function(t){var e,n;return 0===t?(e=null,n=this):t===this.getLength()?(e=this,n=null):(e=this.copyWithText(this.text.getTextAtRange([0,t])),n=this.copyWithText(this.text.getTextAtRange([t,this.getLength()]))),[e,n]},r.prototype.getBlockBreakPosition=function(){return this.text.getLength()-1},r.prototype.getTextWithoutBlockBreak=function(){return h(this.text)?this.text.getTextAtRange([0,this.getBlockBreakPosition()]):this.text.copy()},r.prototype.canBeGrouped=function(t){return this.attributes[t]},r.prototype.canBeGroupedWith=function(t,e){var n,o,i,r;return n=this.attributes,o=t.getAttributes(),n[e]===o[e]?"bullet"!==(i=n[e])&&"number"!==i||"bulletList"===(r=o[e+1])||"numberList"===r?!0:!1:void 0},a=function(t){return t=d(t),t=s(t)},d=function(e){var n,o,r,s,a,u;return s=!1,u=e.getPieces(),o=2<=u.length?i.call(u,0,n=u.length-1):(n=0,[]),r=u[n++],null==r?e:(o=function(){var t,e,n;for(n=[],t=0,e=o.length;e>t;t++)a=o[t],a.isBlockBreak()?(s=!0,n.push(p(a))):n.push(a);return n}(),s?new t.Text(i.call(o).concat([r])):e)},u=t.Text.textForStringWithAttributes("\n",{blockBreak:!0}),s=function(t){return h(t)?t:t.appendText(u)},h=function(t){var e,n;return n=t.getLength(),0===n?!1:(e=t.getTextAtRange([n-1,n]),e.isBlockBreak())},p=function(t){return t.copyWithoutAttribute("blockBreak")},l=function(t,e){return c(t)===e?t.slice(0,-1):t},c=function(t){return t.slice(-1)[0]},r}(t.Object)}.call(this),function(){var e,n,o,i,r,s,a,u,c,l=function(t,e){function n(){this.constructor=t}for(var o in e)h.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},h={}.hasOwnProperty,p=[].slice,d=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1};e=t.arraysAreEqual,a=t.normalizeSpaces,r=t.makeElement,u=t.tagName,i=t.getBlockTagNames,c=t.walkTree,o=t.findClosestElementFromNode,n=t.elementContainsNode,s=t.nodeIsAttachmentElement,t.HTMLParser=function(h){function f(t,e){this.html=t,this.referenceElement=(null!=e?e:{}).referenceElement,this.blocks=[],this.blockElements=[],this.processedElements=[]}var g,m,y,v,b,A,C,w,x,E,S,R,k,D,L,O,T,_,P;return l(f,h),g="style href src width height class".split(" "),f.parse=function(t,e){var n;return n=new this(t,e),n.parse(),n},f.prototype.getDocument=function(){return t.Document.fromJSON(this.blocks)},f.prototype.parse=function(){var t,e;try{for(this.createHiddenContainer(),t=O(this.html),this.containerElement.innerHTML=t,e=c(this.containerElement,{usingFilter:k});e.nextNode();)this.processNode(e.currentNode);return this.translateBlockElementMarginsToNewlines()}finally{this.removeHiddenContainer()}},f.prototype.createHiddenContainer=function(){return this.referenceElement?(this.containerElement=this.referenceElement.cloneNode(!1),this.containerElement.removeAttribute("id"),this.containerElement.setAttribute("data-trix-internal",""),this.containerElement.style.display="none",this.referenceElement.parentNode.insertBefore(this.containerElement,this.referenceElement.nextSibling)):(this.containerElement=r({tagName:"div",style:{display:"none"}}),document.body.appendChild(this.containerElement))},f.prototype.removeHiddenContainer=function(){return this.containerElement.parentNode.removeChild(this.containerElement)},O=function(t){var e,n,o,i,r,s,a,u,l,h,f,m,y,v,A,C;for(n=document.implementation.createHTMLDocument(""),n.documentElement.innerHTML=t,e=n.body,o=n.head,y=o.querySelectorAll("style"),i=0,a=y.length;a>i;i++)A=y[i],e.appendChild(A);for(m=[],C=c(e);C.nextNode();)switch(f=C.currentNode,f.nodeType){case Node.ELEMENT_NODE:if(b(f))m.push(f);else for(v=p.call(f.attributes),r=0,u=v.length;u>r;r++)h=v[r].name,d.call(g,h)>=0||0===h.indexOf("data-trix")||f.removeAttribute(h);break;case Node.COMMENT_NODE:m.push(f)}for(s=0,l=m.length;l>s;s++)f=m[s],f.parentNode.removeChild(f);return e.innerHTML},b=function(t){return(null!=t?t.nodeType:void 0)===Node.ELEMENT_NODE?"script"===u(t)||"false"===t.getAttribute("data-trix-serialize"):void 0},k=function(t){return"style"===u(t)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},f.prototype.processNode=function(t){switch(t.nodeType){case Node.TEXT_NODE:return this.processTextNode(t);case Node.ELEMENT_NODE:return this.appendBlockForElement(t),this.processElement(t)}},f.prototype.appendBlockForElement=function(t){var o,i,r,s;if(r=x(t),i=n(this.currentBlockElement,t),r&&!x(t.firstChild)){if(!(S(t.firstChild)&&x(t.firstElementChild)||(o=this.getBlockAttributes(t),i&&e(o,this.currentBlock.attributes))))return this.currentBlock=this.appendBlockForAttributesWithElement(o,t),this.currentBlockElement=t}else if(this.currentBlockElement&&!i&&!r)return(s=this.findParentBlockElement(t))?this.appendBlockForElement(s):(this.currentBlock=this.appendEmptyBlock(),this.currentBlockElement=null)},f.prototype.findParentBlockElement=function(t){var e;for(e=t.parentElement;e&&e!==this.containerElement;){if(x(e)&&d.call(this.blockElements,e)>=0)return e;e=e.parentElement}return null},f.prototype.processTextNode=function(t){var e,n;return S(t)?void 0:(n=t.data,v(t.parentNode)||(n=T(n),_(null!=(e=t.previousSibling)?e.textContent:void 0)&&(n=R(n))),this.appendStringWithAttributes(n,this.getTextAttributes(t.parentNode)))},f.prototype.processElement=function(t){var e,n,o,i,r;if(s(t))return e=A(t),Object.keys(e).length&&(i=this.getTextAttributes(t),this.appendAttachmentWithAttributes(e,i),t.innerHTML=""),this.processedElements.push(t);switch(u(t)){case"br":return E(t)||x(t.nextSibling)||this.appendStringWithAttributes("\n",this.getTextAttributes(t)),this.processedElements.push(t);case"img":e={url:t.getAttribute("src"),contentType:"image"},o=w(t);for(n in o)r=o[n],e[n]=r;return this.appendAttachmentWithAttributes(e,this.getTextAttributes(t)),this.processedElements.push(t);case"tr":if(t.parentNode.firstChild!==t)return this.appendStringWithAttributes("\n");break;case"td":if(t.parentNode.firstChild!==t)return this.appendStringWithAttributes(" | ")}},f.prototype.appendBlockForAttributesWithElement=function(t,e){var n;return this.blockElements.push(e),n=m(t),this.blocks.push(n),n},f.prototype.appendEmptyBlock=function(){return this.appendBlockForAttributesWithElement([],null)},f.prototype.appendStringWithAttributes=function(t,e){return this.appendPiece(L(t,e))},f.prototype.appendAttachmentWithAttributes=function(t,e){return this.appendPiece(D(t,e))},f.prototype.appendPiece=function(t){return 0===this.blocks.length&&this.appendEmptyBlock(),this.blocks[this.blocks.length-1].text.push(t)},f.prototype.appendStringToTextAtIndex=function(t,e){var n,o;return o=this.blocks[e].text,n=o[o.length-1],"string"===(null!=n?n.type:void 0)?n.string+=t:o.push(L(t))},f.prototype.prependStringToTextAtIndex=function(t,e){var n,o;return o=this.blocks[e].text,n=o[0],"string"===(null!=n?n.type:void 0)?n.string=t+n.string:o.unshift(L(t))},L=function(t,e){var n;return null==e&&(e={}),n="string",t=a(t),{string:t,attributes:e,type:n}},D=function(t,e){var n;return null==e&&(e={}),n="attachment",{attachment:t,attributes:e,type:n}},m=function(t){var e;return null==t&&(t={}),e=[],{text:e,attributes:t}},f.prototype.getTextAttributes=function(e){var n,i,r,a,u,c,l,h,p,d,f,g,m;r={},d=t.config.textAttributes;for(n in d)if(u=d[n],u.tagName&&o(e,{matchingSelector:u.tagName}))r[n]=!0;else if(u.parser&&(m=u.parser(e))){for(i=!1,f=this.findBlockElementAncestors(e.firstChild),c=0,p=f.length;p>c;c++)if(a=f[c],u.parser(a)===m){i=!0;break}i||(r[n]=m)}if(s(e)&&(l=e.dataset.trixAttributes)){g=JSON.parse(l);for(h in g)m=g[h],r[h]=m}return r},f.prototype.getBlockAttributes=function(e){var n,o,i,r;for(o=[];e&&e!==this.containerElement;){r=t.config.blockAttributes;for(n in r)i=r[n],i.parse!==!1&&u(e)===i.tagName&&(("function"==typeof i.test?i.test(e):void 0)||!i.test)&&(o.push(n),i.listAttribute&&o.push(i.listAttribute));e=e.parentNode}return o.reverse()},f.prototype.findBlockElementAncestors=function(t){var e,n;for(e=[];t&&t!==this.containerElement;)n=u(t),d.call(i(),n)>=0&&e.push(t),t=t.parentNode;return e},A=function(t){return JSON.parse(t.dataset.trixAttachment)},w=function(t){var e,n,o;return o=t.getAttribute("width"),n=t.getAttribute("height"),e={},o&&(e.width=parseInt(o,10)),n&&(e.height=parseInt(n,10)),e},x=function(t){var e;if((null!=t?t.nodeType:void 0)===Node.ELEMENT_NODE&&!o(t,{matchingSelector:"td"}))return e=u(t),d.call(i(),e)>=0||"block"===window.getComputedStyle(t).display},S=function(t){return(null!=t?t.nodeType:void 0)===Node.TEXT_NODE&&P(t.data)&&!v(t.parentNode)?!t.previousSibling||x(t.previousSibling)||!t.nextSibling||x(t.nextSibling):void 0},E=function(t){return"br"===u(t)&&x(t.parentNode)&&t.parentNode.lastChild===t},v=function(t){var e;return e=window.getComputedStyle(t).whiteSpace,"pre"===e||"pre-wrap"===e||"pre-line"===e},f.prototype.translateBlockElementMarginsToNewlines=function(){var t,e,n,o,i,r,s,a;for(e=this.getMarginOfDefaultBlockElement(),s=this.blocks,a=[],o=n=0,i=s.length;i>n;o=++n)t=s[o],(r=this.getMarginOfBlockElementAtIndex(o))&&(r.top>2*e.top&&this.prependStringToTextAtIndex("\n",o),a.push(r.bottom>2*e.bottom?this.appendStringToTextAtIndex("\n",o):void 0));return a},f.prototype.getMarginOfBlockElementAtIndex=function(t){var e,n;return!(e=this.blockElements[t])||(n=u(e),d.call(i(),n)>=0||d.call(this.processedElements,e)>=0)?void 0:C(e)},f.prototype.getMarginOfDefaultBlockElement=function(){var e;return e=r(t.config.blockAttributes["default"].tagName),this.containerElement.appendChild(e),C(e)},C=function(t){var e;return e=window.getComputedStyle(t),"block"===e.display?{top:parseInt(e.marginTop),bottom:parseInt(e.marginBottom)}:void 0},y=RegExp("[^\\S"+t.NON_BREAKING_SPACE+"]"),T=function(t){return t.replace(RegExp(""+y.source,"g")," ").replace(/\ {2,}/g," ")},R=function(t){return t.replace(RegExp("^"+y.source+"+"),"")},P=function(t){return RegExp("^"+y.source+"*$").test(t)},_=function(t){return/\s$/.test(t)},f}(t.BasicObject)}.call(this),function(){var e,n,o,i=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty,s=[].slice,a=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1};e=t.arraysAreEqual,n=t.normalizeRange,o=t.rangeIsCollapsed,t.Document=function(r){function u(e){null==e&&(e=[]),u.__super__.constructor.apply(this,arguments),0===e.length&&(e=[new t.Block]),this.blockList=t.SplittableList.box(e)}var c;return i(u,r),u.fromJSON=function(e){var n,o;return o=function(){var o,i,r;for(r=[],o=0,i=e.length;i>o;o++)n=e[o],r.push(t.Block.fromJSON(n));return r}(),new this(o)},u.fromHTML=function(e,n){return t.HTMLParser.parse(e,n).getDocument()},u.fromString=function(e,n){var o;return o=t.Text.textForStringWithAttributes(e,n),new this([new t.Block(o)])},u.prototype.isEmpty=function(){var t;return 1===this.blockList.length&&(t=this.getBlockAtIndex(0),t.isEmpty()&&!t.hasAttributes())},u.prototype.copy=function(t){var e;return null==t&&(t={}),e=t.consolidateBlocks?this.blockList.consolidate().toArray():this.blockList.toArray(),new this.constructor(e)},u.prototype.copyUsingObjectsFromDocument=function(e){var n;return n=new t.ObjectMap(e.getObjects()),this.copyUsingObjectMap(n)},u.prototype.copyUsingObjectMap=function(t){var e,n,o;return n=function(){var n,i,r,s;for(r=this.getBlocks(),s=[],n=0,i=r.length;i>n;n++)e=r[n],s.push((o=t.find(e))?o:e.copyUsingObjectMap(t));return s}.call(this),new this.constructor(n)},u.prototype.copyWithBaseBlockAttributes=function(t){var e,n,o;return null==t&&(t=[]),o=function(){var o,i,r,s;for(r=this.getBlocks(),s=[],o=0,i=r.length;i>o;o++)n=r[o],e=t.concat(n.getAttributes()),s.push(n.copyWithAttributes(e));return s}.call(this),new this.constructor(o)},u.prototype.insertDocumentAtRange=function(t,e){var i,r,s,a,u,c,l;return r=t.blockList,u=(e=n(e))[0],c=this.locationFromPosition(u),s=c.index,a=c.offset,l=this,i=this.getBlockAtPosition(u),o(e)&&i.isEmpty()&&!i.hasAttributes()?l=new this.constructor(l.blockList.removeObjectAtIndex(s)):i.getBlockBreakPosition()===a&&u++,l=l.removeTextAtRange(e),new this.constructor(l.blockList.insertSplittableListAtPosition(r,u))},u.prototype.mergeDocumentAtRange=function(t,o){var i,r,s,a,u,c,l,h,p,d,f,g;return f=(o=n(o))[0],d=this.locationFromPosition(f),r=this.getBlockAtIndex(d.index).getAttributes(),i=t.getBaseBlockAttributes(),g=r.slice(-i.length),e(i,g)?(l=r.slice(0,-i.length),c=t.copyWithBaseBlockAttributes(l)):c=t.copy({consolidateBlocks:!0}).copyWithBaseBlockAttributes(r),s=c.getBlockCount(),a=c.getBlockAtIndex(0),e(r,a.getAttributes())?(u=a.getTextWithoutBlockBreak(),p=this.insertTextAtRange(u,o),s>1&&(c=new this.constructor(c.getBlocks().slice(1)),h=f+u.getLength(),p=p.insertDocumentAtRange(c,h))):p=this.insertDocumentAtRange(c,o),p},u.prototype.insertTextAtRange=function(t,e){var o,i,r,s,a;return a=(e=n(e))[0],s=this.locationFromPosition(a),i=s.index,r=s.offset,o=this.removeTextAtRange(e),new this.constructor(o.blockList.editObjectAtIndex(i,function(e){return e.copyWithText(e.text.insertTextAtPosition(t,r))}))},u.prototype.removeTextAtRange=function(t){var e,i,r,s,a,u,c,l,h,p,d,f,g,m,y,v,b;return h=t=n(t),y=h[0],s=h[1],o(t)?this:(c=this.locationFromPosition(y),u=c.index,a=this.getBlockAtIndex(u),l=a.text.getTextAtRange([0,c.offset]),g=this.locationFromPosition(s),f=g.index,d=this.getBlockAtIndex(f),m=d.text.getTextAtRange([g.offset,d.getLength()]),v=l.appendText(m),p=u!==f&&0===c.offset,b=p&&a.getAttributeLevel()>=d.getAttributeLevel(),i=b?d.copyWithText(v):a.copyWithText(v),r=this.blockList.toArray(),e=f+1-u,r.splice(u,e,i),new this.constructor(r))},u.prototype.moveTextFromRangeToPosition=function(t,e){var o,i,r,a,u,c,l,h,p,d;if(c=t=n(t),p=c[0],r=c[1],e>=p&&r>=e)return this;if(i=this.getDocumentAtRange(t),h=this.removeTextAtRange(t),u=e>p,u&&(e-=i.getLength()),!h.firstBlockInRangeIsEntirelySelected(t)){if(l=i.getBlocks(),a=l[0],o=2<=l.length?s.call(l,1):[],0===o.length?(d=a.getTextWithoutBlockBreak(),u&&(e+=1)):d=a.text,h=h.insertTextAtRange(d,e),0===o.length)return h;i=new this.constructor(o),e+=d.getLength()}return h.insertDocumentAtRange(i,e)},u.prototype.addAttributeAtRange=function(e,n,o){var i;return i=this.blockList,this.eachBlockAtRange(o,function(o,r,s){return i=i.editObjectAtIndex(s,function(){return t.config.blockAttributes[e]?o.addAttribute(e,n):r[0]===r[1]?o:o.copyWithText(o.text.addAttributeAtRange(e,n,r))})}),new this.constructor(i)},u.prototype.addAttribute=function(t,e){var n;return n=this.blockList,this.eachBlock(function(o,i){return n=n.editObjectAtIndex(i,function(){return o.addAttribute(t,e)})}),new this.constructor(n)},u.prototype.removeAttributeAtRange=function(e,n){var o;return o=this.blockList,this.eachBlockAtRange(n,function(n,i,r){return t.config.blockAttributes[e]?o=o.editObjectAtIndex(r,function(){return n.removeAttribute(e)}):i[0]!==i[1]?o=o.editObjectAtIndex(r,function(){return n.copyWithText(n.text.removeAttributeAtRange(e,i))}):void 0}),new this.constructor(o)},u.prototype.updateAttributesForAttachment=function(t,e){var n,o,i,r;return i=(o=this.getRangeOfAttachment(e))[0],n=this.locationFromPosition(i).index,r=this.getTextAtIndex(n),new this.constructor(this.blockList.editObjectAtIndex(n,function(n){return n.copyWithText(r.updateAttributesForAttachment(t,e))}))},u.prototype.removeAttributeForAttachment=function(t,e){var n;return n=this.getRangeOfAttachment(e),this.removeAttributeAtRange(t,n)},u.prototype.insertBlockBreakAtRange=function(e){var o,i,r,s;return s=(e=n(e))[0],r=this.locationFromPosition(s).offset,i=this.removeTextAtRange(e),0===r&&(o=[new t.Block]),new this.constructor(i.blockList.insertSplittableListAtPosition(new t.SplittableList(o),s))},u.prototype.applyBlockAttributeAtRange=function(e,n,o){var i,r,s;return r=this.expandRangeToLineBreaksAndSplitBlocks(o),i=r.document,o=r.range,t.config.blockAttributes[e].listAttribute?(i=i.removeLastListAttributeAtRange(o,{exceptAttributeName:e}),s=i.convertLineBreaksToBlockBreaksInRange(o),i=s.document,o=s.range):i=i.consolidateBlocksAtRange(o),i.addAttributeAtRange(e,n,o)},u.prototype.removeLastListAttributeAtRange=function(e,n){var o;
	return null==n&&(n={}),o=this.blockList,this.eachBlockAtRange(e,function(e,i,r){var s;if((s=e.getLastAttribute())&&t.config.blockAttributes[s].listAttribute&&s!==n.exceptAttributeName)return o=o.editObjectAtIndex(r,function(){return e.removeAttribute(s)})}),new this.constructor(o)},u.prototype.firstBlockInRangeIsEntirelySelected=function(t){var e,o,i,r,s,a;return r=t=n(t),a=r[0],e=r[1],o=this.locationFromPosition(a),s=this.locationFromPosition(e),0===o.offset&&o.index<s.index?!0:o.index===s.index?(i=this.getBlockAtIndex(o.index).getLength(),0===o.offset&&s.offset===i):!1},u.prototype.expandRangeToLineBreaksAndSplitBlocks=function(t){var e,o,i,r,s,a,u,c,l;return a=t=n(t),l=a[0],r=a[1],c=this.locationFromPosition(l),i=this.locationFromPosition(r),e=this,u=e.getBlockAtIndex(c.index),null!=(c.offset=u.findLineBreakInDirectionFromPosition("backward",c.offset))&&(s=e.positionFromLocation(c),e=e.insertBlockBreakAtRange([s,s+1]),i.index+=1,i.offset-=e.getBlockAtIndex(c.index).getLength(),c.index+=1),c.offset=0,0===i.offset&&i.index>c.index?(i.index-=1,i.offset=e.getBlockAtIndex(i.index).getBlockBreakPosition()):(o=e.getBlockAtIndex(i.index),"\n"===o.text.getStringAtRange([i.offset-1,i.offset])?i.offset-=1:i.offset=o.findLineBreakInDirectionFromPosition("forward",i.offset),i.offset!==o.getBlockBreakPosition()&&(s=e.positionFromLocation(i),e=e.insertBlockBreakAtRange([s,s+1]))),l=e.positionFromLocation(c),r=e.positionFromLocation(i),t=n([l,r]),{document:e,range:t}},u.prototype.convertLineBreaksToBlockBreaksInRange=function(t){var e,o,i;return o=(t=n(t))[0],i=this.getStringAtRange(t).slice(0,-1),e=this,i.replace(/.*?\n/g,function(t){return o+=t.length,e=e.insertBlockBreakAtRange([o-1,o])}),{document:e,range:t}},u.prototype.consolidateBlocksAtRange=function(t){var e,o,i,r,s;return i=t=n(t),s=i[0],o=i[1],r=this.locationFromPosition(s).index,e=this.locationFromPosition(o).index,new this.constructor(this.blockList.consolidateFromIndexToIndex(r,e))},u.prototype.getDocumentAtRange=function(t){var e;return t=n(t),e=this.blockList.getSplittableListInRange(t).toArray(),new this.constructor(e)},u.prototype.getStringAtRange=function(t){return this.getDocumentAtRange(t).toString()},u.prototype.getBlockAtIndex=function(t){return this.blockList.getObjectAtIndex(t)},u.prototype.getBlockAtPosition=function(t){var e;return e=this.locationFromPosition(t).index,this.getBlockAtIndex(e)},u.prototype.getTextAtIndex=function(t){var e;return null!=(e=this.getBlockAtIndex(t))?e.text:void 0},u.prototype.getTextAtPosition=function(t){var e;return e=this.locationFromPosition(t).index,this.getTextAtIndex(e)},u.prototype.getPieceAtPosition=function(t){var e,n,o;return o=this.locationFromPosition(t),e=o.index,n=o.offset,this.getTextAtIndex(e).getPieceAtPosition(n)},u.prototype.getCharacterAtPosition=function(t){var e,n,o;return o=this.locationFromPosition(t),e=o.index,n=o.offset,this.getTextAtIndex(e).getStringAtRange([n,n+1])},u.prototype.getLength=function(){return this.blockList.getEndPosition()},u.prototype.getBlocks=function(){return this.blockList.toArray()},u.prototype.getBlockCount=function(){return this.blockList.length},u.prototype.getEditCount=function(){return this.editCount},u.prototype.eachBlock=function(t){return this.blockList.eachObject(t)},u.prototype.eachBlockAtRange=function(t,e){var o,i,r,s,a,u,c,l,h,p,d,f;if(u=t=n(t),d=u[0],r=u[1],p=this.locationFromPosition(d),i=this.locationFromPosition(r),p.index===i.index)return o=this.getBlockAtIndex(p.index),f=[p.offset,i.offset],e(o,f,p.index);for(h=[],a=s=c=p.index,l=i.index;l>=c?l>=s:s>=l;a=l>=c?++s:--s)(o=this.getBlockAtIndex(a))?(f=function(){switch(a){case p.index:return[p.offset,o.text.getLength()];case i.index:return[0,i.offset];default:return[0,o.text.getLength()]}}(),h.push(e(o,f,a))):h.push(void 0);return h},u.prototype.getCommonAttributesAtRange=function(e){var i,r,s;return r=(e=n(e))[0],o(e)?this.getCommonAttributesAtPosition(r):(s=[],i=[],this.eachBlockAtRange(e,function(t,e){return e[0]!==e[1]?(s.push(t.text.getCommonAttributesAtRange(e)),i.push(c(t))):void 0}),t.Hash.fromCommonAttributesOfObjects(s).merge(t.Hash.fromCommonAttributesOfObjects(i)).toObject())},u.prototype.getCommonAttributesAtPosition=function(e){var n,o,i,r,s,u,l,h,p,d;if(p=this.locationFromPosition(e),s=p.index,h=p.offset,i=this.getBlockAtIndex(s),!i)return{};r=c(i),n=i.text.getAttributesAtPosition(h),o=i.text.getAttributesAtPosition(h-1),u=function(){var e,n;e=t.config.textAttributes,n=[];for(l in e)d=e[l],d.inheritable&&n.push(l);return n}();for(l in o)d=o[l],(d===n[l]||a.call(u,l)>=0)&&(r[l]=d);return r},u.prototype.getRangeOfCommonAttributeAtPosition=function(t,e){var o,i,r,s,a,u,c,l,h;return a=this.locationFromPosition(e),r=a.index,s=a.offset,h=this.getTextAtIndex(r),u=h.getExpandedRangeForAttributeAtOffset(t,s),l=u[0],i=u[1],c=this.positionFromLocation({index:r,offset:l}),o=this.positionFromLocation({index:r,offset:i}),n([c,o])},u.prototype.getBaseBlockAttributes=function(){var t,e,n,o,i,r,s;for(t=this.getBlockAtIndex(0).getAttributes(),n=o=1,s=this.getBlockCount();s>=1?s>o:o>s;n=s>=1?++o:--o)e=this.getBlockAtIndex(n).getAttributes(),r=Math.min(t.length,e.length),t=function(){var n,o,s;for(s=[],i=n=0,o=r;(o>=0?o>n:n>o)&&e[i]===t[i];i=o>=0?++n:--n)s.push(e[i]);return s}();return t},c=function(t){var e,n;return n={},(e=t.getLastAttribute())&&(n[e]=!0),n},u.prototype.getAttachmentById=function(t){var e,n,o,i;for(i=this.getAttachments(),n=0,o=i.length;o>n;n++)if(e=i[n],e.id===t)return e},u.prototype.getAttachmentPieces=function(){var t;return t=[],this.blockList.eachObject(function(e){var n;return n=e.text,t=t.concat(n.getAttachmentPieces())}),t},u.prototype.getAttachments=function(){var t,e,n,o,i;for(o=this.getAttachmentPieces(),i=[],t=0,e=o.length;e>t;t++)n=o[t],i.push(n.attachment);return i},u.prototype.getRangeOfAttachment=function(t){var e,o,i,r,s,a,u;for(r=0,s=this.blockList.toArray(),o=e=0,i=s.length;i>e;o=++e){if(a=s[o].text,u=a.getRangeOfAttachment(t))return n([r+u[0],r+u[1]]);r+=a.getLength()}},u.prototype.getAttachmentPieceForAttachment=function(t){var e,n,o,i;for(i=this.getAttachmentPieces(),e=0,n=i.length;n>e;e++)if(o=i[e],o.attachment===t)return o},u.prototype.locationFromPosition=function(t){var e,n;return n=this.blockList.findIndexAndOffsetAtPosition(Math.max(0,t)),null!=n.index?n:(e=this.getBlocks(),{index:e.length-1,offset:e[e.length-1].getLength()})},u.prototype.positionFromLocation=function(t){return this.blockList.findPositionAtIndexAndOffset(t.index,t.offset)},u.prototype.locationRangeFromPosition=function(t){return n(this.locationFromPosition(t))},u.prototype.locationRangeFromRange=function(t){var e,o,i,r;if(t=n(t))return r=t[0],o=t[1],i=this.locationFromPosition(r),e=this.locationFromPosition(o),n([i,e])},u.prototype.rangeFromLocationRange=function(t){var e,i;return t=n(t),e=this.positionFromLocation(t[0]),o(t)||(i=this.positionFromLocation(t[1])),n([e,i])},u.prototype.isEqualTo=function(t){return this.blockList.isEqualTo(null!=t?t.blockList:void 0)},u.prototype.getTexts=function(){var t,e,n,o,i;for(o=this.getBlocks(),i=[],e=0,n=o.length;n>e;e++)t=o[e],i.push(t.text);return i},u.prototype.getPieces=function(){var t,e,n,o,i;for(n=[],o=this.getTexts(),t=0,e=o.length;e>t;t++)i=o[t],n.push.apply(n,i.getPieces());return n},u.prototype.getObjects=function(){return this.getBlocks().concat(this.getTexts()).concat(this.getPieces())},u.prototype.toSerializableDocument=function(){var t;return t=[],this.blockList.eachObject(function(e){return t.push(e.copyWithText(e.text.toSerializableText()))}),new this.constructor(t)},u.prototype.toString=function(){return this.blockList.toString()},u.prototype.toJSON=function(){return this.blockList.toJSON()},u.prototype.toConsole=function(){var t;return JSON.stringify(function(){var e,n,o,i;for(o=this.blockList.toArray(),i=[],e=0,n=o.length;n>e;e++)t=o[e],i.push(JSON.parse(t.text.toConsole()));return i}.call(this))},u}(t.Object)}.call(this),function(){var e,n,o,i,r,s=function(t,e){function n(){this.constructor=t}for(var o in e)a.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},a={}.hasOwnProperty;n=t.normalizeRange,i=t.rangesAreEqual,o=t.objectsAreEqual,r=t.summarizeArrayChange,e=t.extend,t.Composition=function(a){function u(){this.document=new t.Document,this.attachments=[],this.currentAttributes={},this.revision=0}var c;return s(u,a),u.prototype.setDocument=function(t){var e;return t.isEqualTo(this.document)?void 0:(this.document=t,this.refreshAttachments(),this.revision++,null!=(e=this.delegate)&&"function"==typeof e.compositionDidChangeDocument?e.compositionDidChangeDocument(t):void 0)},u.prototype.getSnapshot=function(){return{document:this.document,selectedRange:this.getSelectedRange()}},u.prototype.loadSnapshot=function(e){var n,o,i,r;return n=e.document,r=e.selectedRange,null!=(o=this.delegate)&&"function"==typeof o.compositionWillLoadSnapshot&&o.compositionWillLoadSnapshot(),this.setDocument(null!=n?n:new t.Document),this.setSelection(null!=r?r:[0,0]),null!=(i=this.delegate)&&"function"==typeof i.compositionDidLoadSnapshot?i.compositionDidLoadSnapshot():void 0},u.prototype.insertText=function(t,e){var n,o,i,r;return r=(null!=e?e:{updatePosition:!0}).updatePosition,o=this.getSelectedRange(),this.setDocument(this.document.insertTextAtRange(t,o)),i=o[0],n=i+t.getLength(),r&&this.setSelection(n),this.notifyDelegateOfInsertionAtRange([i,n])},u.prototype.insertBlock=function(e){var n;return null==e&&(e=new t.Block),n=new t.Document([e]),this.insertDocument(n)},u.prototype.insertDocument=function(e){var n,o,i;return null==e&&(e=new t.Document),o=this.getSelectedRange(),this.setDocument(this.document.insertDocumentAtRange(e,o)),i=o[0],n=i+e.getLength(),this.setSelection(n),this.notifyDelegateOfInsertionAtRange([i,n])},u.prototype.insertString=function(e,n){var o,i;return o=this.getCurrentTextAttributes(),i=t.Text.textForStringWithAttributes(e,o),this.insertText(i,n)},u.prototype.insertBlockBreak=function(){var t,e,n;return e=this.getSelectedRange(),this.setDocument(this.document.insertBlockBreakAtRange(e)),n=e[0],t=n+1,this.setSelection(t),this.notifyDelegateOfInsertionAtRange([n,t])},u.prototype.breakFormattedBlock=function(){var e,n,o,i,r,s,a,u;return s=this.getPosition(),a=[s-1,s],n=this.document,u=n.locationFromPosition(s),o=u.index,r=u.offset,e=n.getBlockAtIndex(o),e.getBlockBreakPosition()===r?(n=n.removeTextAtRange(a),a=[s,s]):"\n"===e.text.getStringAtRange([r,r+1])?a=[s-1,s+1]:r-1!==0&&(s+=1),i=new t.Document([e.removeLastAttribute().copyWithoutText()]),this.setDocument(n.insertDocumentAtRange(i,a)),this.setSelection(s)},u.prototype.insertLineBreak=function(){var e,n,o,i,r,s,a;return r=this.getSelectedRange(),a=r[0],i=r[1],s=this.document.locationFromPosition(a),o=this.document.locationFromPosition(i),e=this.document.getBlockAtIndex(o.index),e.hasAttributes()?e.isListItem()?e.isEmpty()?(this.decreaseListLevel(),this.setSelection(a)):0===s.offset?(n=new t.Document([e.copyWithoutText()]),this.insertDocument(n)):this.insertBlockBreak():e.isEmpty()?this.removeLastBlockAttribute():"\n"===e.text.getStringAtRange([o.offset-1,o.offset])?this.breakFormattedBlock():this.insertString("\n"):this.insertString("\n")},u.prototype.insertHTML=function(e){var n,o,i,r,s;return s=this.getPosition(),r=this.document.getLength(),n=t.Document.fromHTML(e),this.setDocument(this.document.mergeDocumentAtRange(n,this.getSelectedRange())),o=this.document.getLength(),i=s+(o-r),this.setSelection(i),this.notifyDelegateOfInsertionAtRange([i,i])},u.prototype.replaceHTML=function(e){var n,o,i;return n=t.Document.fromHTML(e).copyUsingObjectsFromDocument(this.document),o=this.getLocationRange({strict:!1}),i=this.document.rangeFromLocationRange(o),this.setDocument(n),this.setSelection(i)},u.prototype.insertFile=function(e){var n,o;return(null!=(o=this.delegate)?o.compositionShouldAcceptFile(e):void 0)?(n=t.Attachment.attachmentForFile(e),this.insertAttachment(n)):void 0},u.prototype.insertAttachment=function(e){var n;return n=t.Text.textForAttachmentWithAttributes(e,this.currentAttributes),this.insertText(n)},u.prototype.deleteInDirection=function(t){var e,n,o,i,r,s,a;if(r=this.getSelectedRange(),a=r[0],o=r[1],i=r,n=this.getBlock(),a===o){if(s=this.document.locationFromPosition(a),"backward"===t&&0===s.offset&&this.canDecreaseBlockAttributeLevel()&&(n.isListItem()?this.decreaseListLevel():this.decreaseBlockAttributeLevel(),this.setSelection(a),n.isEmpty()))return;i=this.getExpandedRangeInDirection(t),"backward"===t&&(e=this.getAttachmentAtRange(i))}return e?(this.editAttachment(e),!1):(this.setDocument(this.document.removeTextAtRange(i)),this.setSelection(i[0]),n.isListItem()?!1:void 0)},u.prototype.moveTextFromRange=function(t){var e;return e=this.getSelectedRange()[0],this.setDocument(this.document.moveTextFromRangeToPosition(t,e)),this.setSelection(e)},u.prototype.removeAttachment=function(t){var e;return(e=this.document.getRangeOfAttachment(t))?(this.stopEditingAttachment(),this.setDocument(this.document.removeTextAtRange(e)),this.setSelection(e[0])):void 0},u.prototype.removeLastBlockAttribute=function(){var t,e,n,o;return n=this.getSelectedRange(),o=n[0],e=n[1],t=this.document.getBlockAtPosition(e),this.removeCurrentAttribute(t.getLastAttribute()),this.setSelection(o)},c=" ",u.prototype.insertPlaceholder=function(){return this.placeholderPosition=this.getPosition(),this.insertString(c)},u.prototype.selectPlaceholder=function(){return null!=this.placeholderPosition?(this.setSelectedRange([this.placeholderPosition,this.placeholderPosition+c.length]),this.getSelectedRange()):void 0},u.prototype.forgetPlaceholder=function(){return this.placeholderPosition=null},u.prototype.hasCurrentAttribute=function(t){return null!=this.currentAttributes[t]},u.prototype.toggleCurrentAttribute=function(t){var e;return(e=!this.currentAttributes[t])?this.setCurrentAttribute(t,e):this.removeCurrentAttribute(t)},u.prototype.canSetCurrentAttribute=function(t){switch(t){case"href":return!this.selectionContainsAttachmentWithAttribute(t);default:return!0}},u.prototype.setCurrentAttribute=function(e,n){return t.config.blockAttributes[e]?this.setBlockAttribute(e,n):(this.setTextAttribute(e,n),this.currentAttributes[e]=n,this.notifyDelegateOfCurrentAttributesChange())},u.prototype.setTextAttribute=function(e,n){var o,i,r,s;if(i=this.getSelectedRange())return r=i[0],o=i[1],r!==o?this.setDocument(this.document.addAttributeAtRange(e,n,i)):"href"===e?(s=t.Text.textForStringWithAttributes(n,{href:n}),this.insertText(s)):void 0},u.prototype.setBlockAttribute=function(t,e){var n;if(n=this.getSelectedRange())return this.setDocument(this.document.applyBlockAttributeAtRange(t,e,n)),this.setSelection(n)},u.prototype.removeCurrentAttribute=function(e){return t.config.blockAttributes[e]?(this.removeBlockAttribute(e),this.updateCurrentAttributes()):(this.removeTextAttribute(e),delete this.currentAttributes[e],this.notifyDelegateOfCurrentAttributesChange())},u.prototype.removeTextAttribute=function(t){var e;if(e=this.getSelectedRange())return this.setDocument(this.document.removeAttributeAtRange(t,e))},u.prototype.removeBlockAttribute=function(t){var e;if(e=this.getSelectedRange())return this.setDocument(this.document.removeAttributeAtRange(t,e))},u.prototype.increaseBlockAttributeLevel=function(){var t,e;return(t=null!=(e=this.getBlock())?e.getLastAttribute():void 0)?this.setCurrentAttribute(t):void 0},u.prototype.decreaseBlockAttributeLevel=function(){var t,e;return(t=null!=(e=this.getBlock())?e.getLastAttribute():void 0)?this.removeCurrentAttribute(t):void 0},u.prototype.decreaseListLevel=function(){var t,e,n,o,i,r;for(r=this.getSelectedRange()[0],i=this.document.locationFromPosition(r).index,n=i,t=this.getBlock().getAttributeLevel();(e=this.document.getBlockAtIndex(n+1))&&e.isListItem()&&e.getAttributeLevel()>t;)n++;return r=this.document.positionFromLocation({index:i,offset:0}),o=this.document.positionFromLocation({index:n,offset:0}),this.setDocument(this.document.removeLastListAttributeAtRange([r,o]))},u.prototype.canIncreaseBlockAttributeLevel=function(){var t,e,n,o;if(t=this.getBlock())return n=t.getConfig("nestable"),null!=n?n:t.isListItem()&&(o=this.getPreviousBlock())?(e=t.getAttributeLevel(),o.getAttributeAtLevel(e)===t.getAttributeAtLevel(e)):void 0},u.prototype.canDecreaseBlockAttributeLevel=function(){var t;return(null!=(t=this.getBlock())?t.getAttributeLevel():void 0)>0},u.prototype.updateCurrentAttributes=function(){var t,e;return(e=this.getSelectedRange({ignoreLock:!0}))&&(t=this.document.getCommonAttributesAtRange(e),!o(t,this.currentAttributes))?(this.currentAttributes=t,this.notifyDelegateOfCurrentAttributesChange()):void 0},u.prototype.getCurrentAttributes=function(){return e.call({},this.currentAttributes)},u.prototype.getCurrentTextAttributes=function(){var e,n,o,i;e={},o=this.currentAttributes;for(n in o)i=o[n],t.config.textAttributes[n]&&(e[n]=i);return e},u.prototype.freezeSelection=function(){return this.setCurrentAttribute("frozen",!0)},u.prototype.thawSelection=function(){return this.removeCurrentAttribute("frozen")},u.prototype.hasFrozenSelection=function(){return this.hasCurrentAttribute("frozen")},u.proxyMethod("getSelectionManager().getPointRange"),u.proxyMethod("getSelectionManager().setLocationRangeFromPointRange"),u.proxyMethod("getSelectionManager().locationIsCursorTarget"),u.proxyMethod("getSelectionManager().selectionIsExpanded"),u.proxyMethod("delegate?.getSelectionManager"),u.prototype.setSelection=function(t){var e,n;return e=this.document.locationRangeFromRange(t),null!=(n=this.delegate)?n.compositionDidRequestChangingSelectionToLocationRange(e):void 0},u.prototype.getSelectedRange=function(){var t;return(t=this.getLocationRange())?this.document.rangeFromLocationRange(t):void 0},u.prototype.setSelectedRange=function(t){var e;return e=this.document.locationRangeFromRange(t),this.getSelectionManager().setLocationRange(e)},u.prototype.getPosition=function(){var t;return(t=this.getLocationRange())?this.document.positionFromLocation(t[0]):void 0},u.prototype.getLocationRange=function(t){var e;return null!=(e=this.getSelectionManager().getLocationRange(t))?e:n({index:0,offset:0})},u.prototype.getExpandedRangeInDirection=function(t){var e,o,i;return o=this.getSelectedRange(),i=o[0],e=o[1],"backward"===t?i=this.translateUTF16PositionFromOffset(i,-1):e=this.translateUTF16PositionFromOffset(e,1),n([i,e])},u.prototype.moveCursorInDirection=function(t){var e,n,o,r;return this.editingAttachment?o=this.document.getRangeOfAttachment(this.editingAttachment):(r=this.getSelectedRange(),o=this.getExpandedRangeInDirection(t),n=!i(r,o)),this.setSelectedRange("backward"===t?o[0]:o[1]),n&&(e=this.getAttachmentAtRange(o))?this.editAttachment(e):void 0},u.prototype.expandSelectionInDirection=function(t){var e;return e=this.getExpandedRangeInDirection(t),this.setSelectedRange(e)},u.prototype.expandSelectionForEditing=function(){return this.hasCurrentAttribute("href")?this.expandSelectionAroundCommonAttribute("href"):void 0},u.prototype.expandSelectionAroundCommonAttribute=function(t){var e,n;return e=this.getPosition(),n=this.document.getRangeOfCommonAttributeAtPosition(t,e),this.setSelectedRange(n)},u.prototype.selectionContainsAttachmentWithAttribute=function(t){var e,n,o,i,r;if(r=this.getSelectedRange()){for(i=this.document.getDocumentAtRange(r).getAttachments(),n=0,o=i.length;o>n;n++)if(e=i[n],e.hasAttribute(t))return!0;return!1}},u.prototype.selectionIsInCursorTarget=function(){return this.editingAttachment||this.positionIsCursorTarget(this.getPosition())},u.prototype.positionIsCursorTarget=function(t){var e;return(e=this.document.locationFromPosition(t))?this.locationIsCursorTarget(e):void 0},u.prototype.positionIsBlockBreak=function(t){var e;return null!=(e=this.document.getPieceAtPosition(t))?e.isBlockBreak():void 0},u.prototype.getSelectedDocument=function(){var t;return(t=this.getSelectedRange())?this.document.getDocumentAtRange(t):void 0},u.prototype.getAttachments=function(){return this.attachments.slice(0)},u.prototype.refreshAttachments=function(){var t,e,n,o,i,s,a,u,c,l,h;for(n=this.document.getAttachments(),u=r(this.attachments,n),t=u.added,h=u.removed,o=0,s=h.length;s>o;o++)e=h[o],e.delegate=null,null!=(c=this.delegate)&&"function"==typeof c.compositionDidRemoveAttachment&&c.compositionDidRemoveAttachment(e);for(i=0,a=t.length;a>i;i++)e=t[i],e.delegate=this,null!=(l=this.delegate)&&"function"==typeof l.compositionDidAddAttachment&&l.compositionDidAddAttachment(e);return this.attachments=n},u.prototype.attachmentDidChangeAttributes=function(t){var e;return this.revision++,null!=(e=this.delegate)&&"function"==typeof e.compositionDidEditAttachment?e.compositionDidEditAttachment(t):void 0},u.prototype.editAttachment=function(t){var e;if(t!==this.editingAttachment)return this.stopEditingAttachment(),this.editingAttachment=t,null!=(e=this.delegate)&&"function"==typeof e.compositionDidStartEditingAttachment?e.compositionDidStartEditingAttachment(this.editingAttachment):void 0},u.prototype.stopEditingAttachment=function(){var t;if(this.editingAttachment)return null!=(t=this.delegate)&&"function"==typeof t.compositionDidStopEditingAttachment&&t.compositionDidStopEditingAttachment(this.editingAttachment),this.editingAttachment=null},u.prototype.canEditAttachmentCaption=function(){var t;return null!=(t=this.editingAttachment)?t.isPreviewable():void 0},u.prototype.updateAttributesForAttachment=function(t,e){return this.setDocument(this.document.updateAttributesForAttachment(t,e))},u.prototype.removeAttributeForAttachment=function(t,e){return this.setDocument(this.document.removeAttributeForAttachment(t,e))},u.prototype.getPreviousBlock=function(){var t,e;return(e=this.getLocationRange())&&(t=e[0].index,t>0)?this.document.getBlockAtIndex(t-1):void 0},u.prototype.getBlock=function(){var t;return(t=this.getLocationRange())?this.document.getBlockAtIndex(t[0].index):void 0},u.prototype.getAttachmentAtRange=function(e){var n;return n=this.document.getDocumentAtRange(e),n.toString()===t.OBJECT_REPLACEMENT_CHARACTER+"\n"?n.getAttachments()[0]:void 0},u.prototype.notifyDelegateOfCurrentAttributesChange=function(){var t;return null!=(t=this.delegate)&&"function"==typeof t.compositionDidChangeCurrentAttributes?t.compositionDidChangeCurrentAttributes(this.currentAttributes):void 0},u.prototype.notifyDelegateOfInsertionAtRange=function(t){var e;return null!=(e=this.delegate)&&"function"==typeof e.compositionDidPerformInsertionAtRange?e.compositionDidPerformInsertionAtRange(t):void 0},u.prototype.translateUTF16PositionFromOffset=function(t,e){var n,o;return o=this.document.toUTF16String(),n=o.offsetFromUCS2Offset(t),o.offsetToUCS2Offset(n+e)},u}(t.BasicObject)}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.UndoManager=function(t){function n(t){this.composition=t,this.undoEntries=[],this.redoEntries=[]}var o;return e(n,t),n.prototype.recordUndoEntry=function(t,e){var n,i,r,s,a;return s=null!=e?e:{},i=s.context,n=s.consolidatable,r=this.undoEntries.slice(-1)[0],n&&o(r,t,i)?void 0:(a=this.createEntry({description:t,context:i}),this.undoEntries.push(a),this.redoEntries=[])},n.prototype.undo=function(){var t,e;return(e=this.undoEntries.pop())?(t=this.createEntry(e),this.redoEntries.push(t),this.composition.loadSnapshot(e.snapshot)):void 0},n.prototype.redo=function(){var t,e;return(t=this.redoEntries.pop())?(e=this.createEntry(t),this.undoEntries.push(e),this.composition.loadSnapshot(t.snapshot)):void 0},n.prototype.canUndo=function(){return this.undoEntries.length>0},n.prototype.canRedo=function(){return this.redoEntries.length>0},n.prototype.createEntry=function(t){var e,n,o;return o=null!=t?t:{},n=o.description,e=o.context,{description:null!=n?n.toString():void 0,context:JSON.stringify(e),snapshot:this.composition.getSnapshot()}},o=function(t,e,n){return(null!=t?t.description:void 0)===(null!=e?e.toString():void 0)&&(null!=t?t.context:void 0)===JSON.stringify(n)},n}(t.BasicObject)}.call(this),function(){t.Editor=function(){function e(e,n,o){this.composition=e,this.selectionManager=n,this.element=o,this.undoManager=new t.UndoManager(this.composition)}return e.prototype.loadDocument=function(t){return this.loadSnapshot({document:t,selectedRange:[0,0]})},e.prototype.loadHTML=function(e){return null==e&&(e=""),this.loadDocument(t.Document.fromHTML(e,{referenceElement:this.element}))},e.prototype.loadJSON=function(e){var n,o;return n=e.document,o=e.selectedRange,n=t.Document.fromJSON(n),this.loadSnapshot({document:n,selectedRange:o})},e.prototype.loadSnapshot=function(e){return this.undoManager=new t.UndoManager(this.composition),this.composition.loadSnapshot(e)},e.prototype.getDocument=function(){return this.composition.document},e.prototype.getSelectedDocument=function(){return this.composition.getSelectedDocument()},e.prototype.getSnapshot=function(){return this.composition.getSnapshot()},e.prototype.toJSON=function(){return this.getSnapshot()},e.prototype.deleteInDirection=function(t){return this.composition.deleteInDirection(t)},e.prototype.insertAttachment=function(t){return this.composition.insertAttachment(t)},e.prototype.insertDocument=function(t){return this.composition.insertDocument(t)},e.prototype.insertFile=function(t){return this.composition.insertFile(t)},e.prototype.insertHTML=function(t){return this.composition.insertHTML(t)},e.prototype.insertString=function(t){return this.composition.insertString(t)},e.prototype.insertText=function(t){return this.composition.insertText(t)},e.prototype.insertLineBreak=function(){return this.composition.insertLineBreak()},e.prototype.getSelectedRange=function(){return this.composition.getSelectedRange()},e.prototype.getPosition=function(){return this.composition.getPosition()},e.prototype.getClientRectAtPosition=function(t){var e;return e=this.getDocument().locationRangeFromRange([t,t+1]),this.selectionManager.getClientRectAtLocationRange(e)},e.prototype.expandSelectionInDirection=function(t){return this.composition.expandSelectionInDirection(t)},e.prototype.moveCursorInDirection=function(t){return this.composition.moveCursorInDirection(t)},e.prototype.setSelectedRange=function(t){return this.composition.setSelectedRange(t)},e.prototype.activateAttribute=function(t,e){return null==e&&(e=!0),this.composition.setCurrentAttribute(t,e)},e.prototype.attributeIsActive=function(t){return this.composition.hasCurrentAttribute(t)},e.prototype.canActivateAttribute=function(t){return this.composition.canSetCurrentAttribute(t)},e.prototype.deactivateAttribute=function(t){return this.composition.removeCurrentAttribute(t)},e.prototype.canDecreaseIndentationLevel=function(){return this.composition.canDecreaseBlockAttributeLevel()},e.prototype.canIncreaseIndentationLevel=function(){return this.composition.canIncreaseBlockAttributeLevel()},e.prototype.decreaseIndentationLevel=function(){return this.canDecreaseIndentationLevel()?this.composition.decreaseBlockAttributeLevel():void 0},e.prototype.increaseIndentationLevel=function(){return this.canIncreaseIndentationLevel()?this.composition.increaseBlockAttributeLevel():void 0},e.prototype.canRedo=function(){return this.undoManager.canRedo()},e.prototype.canUndo=function(){return this.undoManager.canUndo()},e.prototype.recordUndoEntry=function(t,e){var n,o,i;return i=null!=e?e:{},o=i.context,n=i.consolidatable,this.undoManager.recordUndoEntry(t,{context:o,consolidatable:n})},e.prototype.redo=function(){return this.canRedo()?this.undoManager.redo():void 0},e.prototype.undo=function(){return this.canUndo()?this.undoManager.undo():void 0},e}()}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.ManagedAttachment=function(t){function n(t,e){var n;this.attachmentManager=t,this.attachment=e,n=this.attachment,this.id=n.id,this.file=n.file}return e(n,t),n.prototype.remove=function(){return this.attachmentManager.requestRemovalOfAttachment(this.attachment)},n.proxyMethod("attachment.getAttribute"),n.proxyMethod("attachment.hasAttribute"),n.proxyMethod("attachment.setAttribute"),n.proxyMethod("attachment.getAttributes"),n.proxyMethod("attachment.setAttributes"),n.proxyMethod("attachment.isPending"),n.proxyMethod("attachment.isPreviewable"),n.proxyMethod("attachment.getURL"),n.proxyMethod("attachment.getHref"),n.proxyMethod("attachment.getFilename"),n.proxyMethod("attachment.getFilesize"),n.proxyMethod("attachment.getFormattedFilesize"),n.proxyMethod("attachment.getExtension"),n.proxyMethod("attachment.getContentType"),n.proxyMethod("attachment.getFile"),n.proxyMethod("attachment.setFile"),n.proxyMethod("attachment.releaseFile"),n.proxyMethod("attachment.getUploadProgress"),n.proxyMethod("attachment.setUploadProgress"),n}(t.BasicObject)}.call(this),function(){var e=function(t,e){function o(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t},n={}.hasOwnProperty;t.AttachmentManager=function(n){function o(t){var e,n,o;for(null==t&&(t=[]),this.managedAttachments={},n=0,o=t.length;o>n;n++)e=t[n],this.manageAttachment(e)}return e(o,n),o.prototype.getAttachments=function(){var t,e,n,o;n=this.managedAttachments,o=[];for(e in n)t=n[e],o.push(t);return o},o.prototype.manageAttachment=function(e){var n,o;return null!=(n=this.managedAttachments)[o=e.id]?n[o]:n[o]=new t.ManagedAttachment(this,e)},o.prototype.attachmentIsManaged=function(t){return t.id in this.managedAttachments},o.prototype.requestRemovalOfAttachment=function(t){var e;return this.attachmentIsManaged(t)&&null!=(e=this.delegate)&&"function"==typeof e.attachmentManagerDidRequestRemovalOfAttachment?e.attachmentManagerDidRequestRemovalOfAttachment(t):void 0},o.prototype.unmanageAttachment=function(t){var e;return e=this.managedAttachments[t.id],delete this.managedAttachments[t.id],e},o}(t.BasicObject)}.call(this),function(){var e,n,o,i,r,s,a,u,c,l,h,p,d;e=t.elementContainsNode,n=t.findChildIndexOfNode,o=t.findClosestElementFromNode,i=t.findNodeFromContainerAndOffset,a=t.nodeIsBlockStart,u=t.nodeIsBlockStartComment,s=t.nodeIsBlockContainer,c=t.nodeIsCursorTarget,l=t.nodeIsEmptyTextNode,h=t.nodeIsTextNode,r=t.nodeIsAttachmentElement,p=t.tagName,d=t.walkTree,t.LocationMapper=function(){function t(t){this.element=t}var o,i,f,g;return t.prototype.findLocationFromContainerAndOffset=function(t,o,r){var s,u,l,p,g,m,y;for(m=(null!=r?r:{strict:!0}).strict,u=0,l=!1,p={index:0,offset:0},(s=this.findAttachmentElementParentForNode(t))&&(t=s.parentNode,o=n(s)),y=d(this.element,{usingFilter:f});y.nextNode();){if(g=y.currentNode,g===t&&h(t)){c(g)||(p.offset+=o);break}if(g.parentNode===t){if(u++===o)break}else if(!e(t,g)&&u>0)break;a(g,{strict:m})?(l&&p.index++,p.offset=0,l=!0):p.offset+=i(g)}return p},t.prototype.findContainerAndOffsetFromLocation=function(t){var e,o,i,r,a,u;if(0===t.index&&0===t.offset){for(e=this.element,r=0;e.firstChild;)if(e=e.firstChild,s(e)){r=1;break}return[e,r]}if(a=this.findNodeAndOffsetFromLocation(t),o=a[0],i=a[1],o){if(h(o))e=o,u=o.textContent,r=t.offset-i;else{if(e=o.parentNode,!s(e))for(;o===e.lastChild&&(o=e,e=e.parentNode,!s(e)););r=n(o),0!==t.offset&&r++}return[e,r]}},t.prototype.findNodeAndOffsetFromLocation=function(t){var e,n,o,r,s,a,u,l;for(u=0,l=this.getSignificantNodesForIndex(t.index),n=0,o=l.length;o>n;n++){if(e=l[n],r=i(e),t.offset<=u+r)if(h(e)){if(s=e,a=u,t.offset===a&&c(s))break}else s||(s=e,a=u);if(u+=r,u>t.offset)break}return[s,a]},t.prototype.findAttachmentElementParentForNode=function(t){for(;t&&t!==this.element;){if(r(t))return t;t=t.parentNode}},t.prototype.getSignificantNodesForIndex=function(t){var e,n,i,r,s;for(i=[],s=d(this.element,{usingFilter:o}),r=!1;s.nextNode();)if(n=s.currentNode,u(n)){if("undefined"!=typeof e&&null!==e?e++:e=0,e===t)r=!0;else if(r)break}else r&&i.push(n);return i},i=function(t){var e;return t.nodeType===Node.TEXT_NODE?c(t)?0:(e=t.textContent,e.length):"br"===p(t)||r(t)?1:0},o=function(t){return g(t)===NodeFilter.FILTER_ACCEPT?f(t):NodeFilter.FILTER_REJECT},g=function(t){return l(t)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},f=function(t){return r(t.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},t}()}.call(this),function(){var e,n,o=[].slice;e=t.getDOMRange,n=t.setDOMRange,t.PointMapper=function(){function t(){}return t.prototype.createDOMRangeFromPoint=function(t){var o,i,r,s,a,u,c,l;if(c=t.x,l=t.y,document.caretPositionFromPoint)return a=document.caretPositionFromPoint(c,l),r=a.offsetNode,i=a.offset,o=document.createRange(),o.setStart(r,i),o;
	if(document.caretRangeFromPoint)return document.caretRangeFromPoint(c,l);if(document.body.createTextRange){s=e();try{u=document.body.createTextRange(),u.moveToPoint(c,l),u.select()}catch(h){}return o=e(),n(s),o}},t.prototype.getClientRectsForDOMRange=function(t){var e,n,i;return n=o.call(t.getClientRects()),i=n[0],e=n[n.length-1],[i,e]},t}()}.call(this),function(){var e,n=function(t,e){return function(){return t.apply(e,arguments)}},o=function(t,e){function n(){this.constructor=t}for(var o in e)i.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},i={}.hasOwnProperty,r=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1};e=t.getDOMRange,t.SelectionChangeObserver=function(t){function i(){this.run=n(this.run,this),this.update=n(this.update,this),this.selectionManagers=[]}var s;return o(i,t),i.prototype.start=function(){return this.started?void 0:(this.started=!0,"onselectionchange"in document?document.addEventListener("selectionchange",this.update,!0):this.run())},i.prototype.stop=function(){return this.started?(this.started=!1,document.removeEventListener("selectionchange",this.update,!0)):void 0},i.prototype.registerSelectionManager=function(t){return r.call(this.selectionManagers,t)<0?(this.selectionManagers.push(t),this.start()):void 0},i.prototype.unregisterSelectionManager=function(t){var e;return this.selectionManagers=function(){var n,o,i,r;for(i=this.selectionManagers,r=[],n=0,o=i.length;o>n;n++)e=i[n],e!==t&&r.push(e);return r}.call(this),0===this.selectionManagers.length?this.stop():void 0},i.prototype.notifySelectionManagersOfSelectionChange=function(){var t,e,n,o,i;for(n=this.selectionManagers,o=[],t=0,e=n.length;e>t;t++)i=n[t],o.push(i.selectionDidChange());return o},i.prototype.update=function(){var t;return t=e(),s(t,this.domRange)?void 0:(this.domRange=t,this.notifySelectionManagersOfSelectionChange())},i.prototype.reset=function(){return this.domRange=null,this.update()},i.prototype.run=function(){return this.started?(this.update(),requestAnimationFrame(this.run)):void 0},s=function(t,e){return(null!=t?t.startContainer:void 0)===(null!=e?e.startContainer:void 0)&&(null!=t?t.startOffset:void 0)===(null!=e?e.startOffset:void 0)&&(null!=t?t.endContainer:void 0)===(null!=e?e.endContainer:void 0)&&(null!=t?t.endOffset:void 0)===(null!=e?e.endOffset:void 0)},i}(t.BasicObject),null==t.selectionChangeObserver&&(t.selectionChangeObserver=new t.SelectionChangeObserver)}.call(this),function(){var e,n,o,i,r,s,a,u,c,l,h,p,d=function(t,e){return function(){return t.apply(e,arguments)}},f=function(t,e){function n(){this.constructor=t}for(var o in e)g.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},g={}.hasOwnProperty;i=t.getDOMSelection,o=t.getDOMRange,p=t.setDOMRange,e=t.defer,n=t.elementContainsNode,u=t.nodeIsCursorTarget,a=t.innerElementIsActive,r=t.handleEvent,s=t.handleEventOnce,c=t.normalizeRange,l=t.rangeIsCollapsed,h=t.rangesAreEqual,t.SelectionManager=function(e){function s(e){this.element=e,this.selectionDidChange=d(this.selectionDidChange,this),this.didMouseDown=d(this.didMouseDown,this),this.locationMapper=new t.LocationMapper(this.element),this.pointMapper=new t.PointMapper,this.lockCount=0,r("mousedown",{onElement:this.element,withCallback:this.didMouseDown})}return f(s,e),s.prototype.getLocationRange=function(t){var e,n;return null==t&&(t={}),e=t.strict===!1?this.createLocationRangeFromDOMRange(o(),{strict:!1}):t.ignoreLock?this.currentLocationRange:null!=(n=this.lockedLocationRange)?n:this.currentLocationRange},s.prototype.setLocationRange=function(t){var e;if(!this.lockedLocationRange)return t=c(t),(e=this.createDOMRangeFromLocationRange(t))?(p(e),this.updateCurrentLocationRange(t)):void 0},s.prototype.setLocationRangeFromPointRange=function(t){var e,n;return t=c(t),n=this.getLocationAtPoint(t[0]),e=this.getLocationAtPoint(t[1]),this.setLocationRange([n,e])},s.prototype.getClientRectAtLocationRange=function(t){var e;return(e=this.createDOMRangeFromLocationRange(t))?this.getClientRectsForDOMRange(e)[1]:void 0},s.prototype.locationIsCursorTarget=function(t){var e,n,o;return o=this.findNodeAndOffsetFromLocation(t),e=o[0],n=o[1],u(e)},s.prototype.lock=function(){return 0===this.lockCount++?(this.updateCurrentLocationRange(),this.lockedLocationRange=this.getLocationRange()):void 0},s.prototype.unlock=function(){var t;return 0===--this.lockCount&&(t=this.lockedLocationRange,this.lockedLocationRange=null,null!=t)?this.setLocationRange(t):void 0},s.prototype.clearSelection=function(){var t;return null!=(t=i())?t.removeAllRanges():void 0},s.prototype.selectionIsCollapsed=function(){var t;return(null!=(t=o())?t.collapsed:void 0)===!0},s.prototype.selectionIsExpanded=function(){return!this.selectionIsCollapsed()},s.proxyMethod("locationMapper.findLocationFromContainerAndOffset"),s.proxyMethod("locationMapper.findContainerAndOffsetFromLocation"),s.proxyMethod("locationMapper.findNodeAndOffsetFromLocation"),s.proxyMethod("pointMapper.createDOMRangeFromPoint"),s.proxyMethod("pointMapper.getClientRectsForDOMRange"),s.prototype.didMouseDown=function(){return this.pauseTemporarily()},s.prototype.pauseTemporarily=function(){var t,e,o,i;return this.paused=!0,e=function(t){return function(){var e,r,s;for(t.paused=!1,clearTimeout(i),r=0,s=o.length;s>r;r++)e=o[r],e.destroy();return n(document,t.element)?t.selectionDidChange():void 0}}(this),i=setTimeout(e,200),o=function(){var n,o,i,s;for(i=["mousemove","keydown"],s=[],n=0,o=i.length;o>n;n++)t=i[n],s.push(r(t,{onElement:document,withCallback:e}));return s}()},s.prototype.selectionDidChange=function(){return this.paused||a(this.element)?void 0:this.updateCurrentLocationRange()},s.prototype.updateCurrentLocationRange=function(t){var e;return(null!=t?t:t=this.createLocationRangeFromDOMRange(o()))&&!h(t,this.currentLocationRange)?(this.currentLocationRange=t,null!=(e=this.delegate)&&"function"==typeof e.locationRangeDidChange?e.locationRangeDidChange(this.currentLocationRange.slice(0)):void 0):void 0},s.prototype.createDOMRangeFromLocationRange=function(t){var e,n,o,i;return o=this.findContainerAndOffsetFromLocation(t[0]),n=l(t)?o:null!=(i=this.findContainerAndOffsetFromLocation(t[1]))?i:o,null!=o&&null!=n?(e=document.createRange(),e.setStart.apply(e,o),e.setEnd.apply(e,n),e):void 0},s.prototype.createLocationRangeFromDOMRange=function(t,e){var n,o;if(null!=t&&this.domRangeWithinElement(t)&&(o=this.findLocationFromContainerAndOffset(t.startContainer,t.startOffset,e)))return t.collapsed||(n=this.findLocationFromContainerAndOffset(t.endContainer,t.endOffset,e)),c([o,n])},s.prototype.getLocationAtPoint=function(t){var e,n;return(e=this.createDOMRangeFromPoint(t))&&null!=(n=this.createLocationRangeFromDOMRange(e))?n[0]:void 0},s.prototype.domRangeWithinElement=function(t){return t.collapsed?n(this.element,t.startContainer):n(this.element,t.startContainer)&&n(this.element,t.endContainer)},s}(t.BasicObject)}.call(this),function(){var e,n,o,i=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty,s=[].slice;n=t.rangeIsCollapsed,o=t.rangesAreEqual,e=t.objectsAreEqual,t.EditorController=function(r){function a(e){var n,o;this.editorElement=e.editorElement,n=e.document,o=e.html,this.selectionManager=new t.SelectionManager(this.editorElement),this.selectionManager.delegate=this,this.composition=new t.Composition,this.composition.delegate=this,this.attachmentManager=new t.AttachmentManager(this.composition.getAttachments()),this.attachmentManager.delegate=this,this.inputController=new t.InputController(this.editorElement),this.inputController.delegate=this,this.inputController.responder=this.composition,this.compositionController=new t.CompositionController(this.editorElement,this.composition),this.compositionController.delegate=this,this.toolbarController=new t.ToolbarController(this.editorElement.toolbarElement),this.toolbarController.delegate=this,this.editor=new t.Editor(this.composition,this.selectionManager,this.editorElement),null!=n?this.editor.loadDocument(n):this.editor.loadHTML(o)}return i(a,r),a.prototype.registerSelectionManager=function(){return t.selectionChangeObserver.registerSelectionManager(this.selectionManager)},a.prototype.unregisterSelectionManager=function(){return t.selectionChangeObserver.unregisterSelectionManager(this.selectionManager)},a.prototype.compositionDidChangeDocument=function(){return this.editorElement.notify("document-change"),this.handlingInput?void 0:this.render()},a.prototype.compositionDidChangeCurrentAttributes=function(t){return this.currentAttributes=t,this.toolbarController.updateAttributes(this.currentAttributes),this.updateCurrentActions(),this.editorElement.notify("attributes-change",{attributes:this.currentAttributes})},a.prototype.compositionDidPerformInsertionAtRange=function(t){return this.pasting?this.pastedRange=t:void 0},a.prototype.compositionShouldAcceptFile=function(t){return this.editorElement.notify("file-accept",{file:t})},a.prototype.compositionDidAddAttachment=function(t){var e;return e=this.attachmentManager.manageAttachment(t),this.editorElement.notify("attachment-add",{attachment:e})},a.prototype.compositionDidEditAttachment=function(t){var e;return this.compositionController.rerenderViewForObject(t),e=this.attachmentManager.manageAttachment(t),this.editorElement.notify("attachment-edit",{attachment:e}),this.editorElement.notify("change")},a.prototype.compositionDidRemoveAttachment=function(t){var e;return e=this.attachmentManager.unmanageAttachment(t),this.editorElement.notify("attachment-remove",{attachment:e})},a.prototype.compositionDidStartEditingAttachment=function(t){var e,n;return n=this.composition.document,e=n.getRangeOfAttachment(t),this.attachmentLocationRange=n.locationRangeFromRange(e),this.compositionController.installAttachmentEditorForAttachment(t),this.selectionManager.setLocationRange(this.attachmentLocationRange)},a.prototype.compositionDidStopEditingAttachment=function(){return this.compositionController.uninstallAttachmentEditor(),this.attachmentLocationRange=null},a.prototype.compositionDidRequestChangingSelectionToLocationRange=function(t){return!this.loadingSnapshot||this.isFocused()?(this.requestedLocationRange=t,this.documentWhenLocationRangeRequested=this.composition.document,this.handlingInput?void 0:this.render()):void 0},a.prototype.compositionWillLoadSnapshot=function(){return this.loadingSnapshot=!0},a.prototype.compositionDidLoadSnapshot=function(){return this.compositionController.refreshViewCache(),this.render(),this.loadingSnapshot=!1},a.prototype.getSelectionManager=function(){return this.selectionManager},a.proxyMethod("getSelectionManager().setLocationRange"),a.proxyMethod("getSelectionManager().getLocationRange"),a.prototype.attachmentManagerDidRequestRemovalOfAttachment=function(t){return this.removeAttachment(t)},a.prototype.compositionControllerWillSyncDocumentView=function(){return this.inputController.editorWillSyncDocumentView(),this.selectionManager.lock(),this.selectionManager.clearSelection()},a.prototype.compositionControllerDidSyncDocumentView=function(){return this.inputController.editorDidSyncDocumentView(),this.selectionManager.unlock(),this.updateCurrentActions(),this.editorElement.notify("sync")},a.prototype.compositionControllerDidRender=function(){return null!=this.requestedLocationRange&&(this.documentWhenLocationRangeRequested.isEqualTo(this.composition.document)&&this.selectionManager.setLocationRange(this.requestedLocationRange),this.composition.updateCurrentAttributes(),this.requestedLocationRange=null,this.documentWhenLocationRangeRequested=null),this.editorElement.notify("render")},a.prototype.compositionControllerDidFocus=function(){return this.toolbarController.hideDialog(),this.editorElement.notify("focus")},a.prototype.compositionControllerDidBlur=function(){return this.editorElement.notify("blur")},a.prototype.compositionControllerDidSelectAttachment=function(t){return this.composition.editAttachment(t)},a.prototype.compositionControllerDidRequestDeselectingAttachment=function(){return this.attachmentLocationRange?this.selectionManager.setLocationRange(this.attachmentLocationRange[1]):void 0},a.prototype.compositionControllerWillUpdateAttachment=function(t){return this.editor.recordUndoEntry("Edit Attachment",{context:t.id,consolidatable:!0})},a.prototype.compositionControllerDidRequestRemovalOfAttachment=function(t){return this.removeAttachment(t)},a.prototype.inputControllerWillHandleInput=function(){return this.handlingInput=!0,this.requestedRender=!1},a.prototype.inputControllerDidRequestRender=function(){return this.requestedRender=!0},a.prototype.inputControllerDidHandleInput=function(){return this.handlingInput=!1,this.requestedRender?(this.requestedRender=!1,this.render()):void 0},a.prototype.inputControllerDidRequestReparse=function(){return this.reparse()},a.prototype.inputControllerWillPerformTyping=function(){return this.recordTypingUndoEntry()},a.prototype.inputControllerWillCutText=function(){return this.editor.recordUndoEntry("Cut")},a.prototype.inputControllerWillPasteText=function(){return this.editor.recordUndoEntry("Paste"),this.pasting=!0},a.prototype.inputControllerDidPaste=function(t){var e;return e=this.pastedRange,this.pastedRange=null,this.pasting=null,this.editorElement.notify("paste",{pasteData:t,range:e}),this.render()},a.prototype.inputControllerWillMoveText=function(){return this.editor.recordUndoEntry("Move")},a.prototype.inputControllerWillAttachFiles=function(){return this.editor.recordUndoEntry("Drop Files")},a.prototype.inputControllerDidReceiveKeyboardCommand=function(t){return this.toolbarController.applyKeyboardCommand(t)},a.prototype.inputControllerDidStartDrag=function(){return this.locationRangeBeforeDrag=this.selectionManager.getLocationRange()},a.prototype.inputControllerDidReceiveDragOverPoint=function(t){return this.selectionManager.setLocationRangeFromPointRange(t)},a.prototype.inputControllerDidCancelDrag=function(){return this.selectionManager.setLocationRange(this.locationRangeBeforeDrag),this.locationRangeBeforeDrag=null},a.prototype.locationRangeDidChange=function(t){return this.composition.updateCurrentAttributes(),this.updateCurrentActions(),this.attachmentLocationRange&&!o(this.attachmentLocationRange,t)&&this.composition.stopEditingAttachment(),this.editorElement.notify("selection-change")},a.prototype.toolbarDidClickButton=function(){return this.getLocationRange()?void 0:this.setLocationRange({index:0,offset:0})},a.prototype.toolbarDidInvokeAction=function(t){return this.invokeAction(t)},a.prototype.toolbarDidToggleAttribute=function(t){return this.recordFormattingUndoEntry(),this.composition.toggleCurrentAttribute(t),this.render(),this.selectionFrozen?void 0:this.editorElement.focus()},a.prototype.toolbarDidUpdateAttribute=function(t,e){return this.recordFormattingUndoEntry(),this.composition.setCurrentAttribute(t,e),this.render(),this.selectionFrozen?void 0:this.editorElement.focus()},a.prototype.toolbarDidRemoveAttribute=function(t){return this.recordFormattingUndoEntry(),this.composition.removeCurrentAttribute(t),this.render(),this.selectionFrozen?void 0:this.editorElement.focus()},a.prototype.toolbarWillShowDialog=function(){return this.composition.expandSelectionForEditing(),this.freezeSelection()},a.prototype.toolbarDidShowDialog=function(t){return this.editorElement.notify("toolbar-dialog-show",{dialogName:t})},a.prototype.toolbarDidHideDialog=function(t){return this.thawSelection(),this.editorElement.focus(),this.editorElement.notify("toolbar-dialog-hide",{dialogName:t})},a.prototype.freezeSelection=function(){return this.selectionFrozen?void 0:(this.selectionManager.lock(),this.composition.freezeSelection(),this.selectionFrozen=!0,this.render())},a.prototype.thawSelection=function(){return this.selectionFrozen?(this.composition.thawSelection(),this.selectionManager.unlock(),this.selectionFrozen=!1,this.render()):void 0},a.prototype.actions={undo:{test:function(){return this.editor.canUndo()},perform:function(){return this.editor.undo()}},redo:{test:function(){return this.editor.canRedo()},perform:function(){return this.editor.redo()}},link:{test:function(){return this.editor.canActivateAttribute("href")}},increaseBlockLevel:{test:function(){return this.editor.canIncreaseIndentationLevel()},perform:function(){return this.editor.increaseIndentationLevel()&&this.render()}},decreaseBlockLevel:{test:function(){return this.editor.canDecreaseIndentationLevel()},perform:function(){return this.editor.decreaseIndentationLevel()&&this.render()}}},a.prototype.canInvokeAction=function(t){var e,n;return this.actionIsExternal(t)?!0:!!(null!=(e=this.actions[t])&&null!=(n=e.test)?n.call(this):void 0)},a.prototype.invokeAction=function(t){var e,n;return this.actionIsExternal(t)?this.editorElement.notify("action-invoke",{actionName:t}):null!=(e=this.actions[t])&&null!=(n=e.perform)?n.call(this):void 0},a.prototype.actionIsExternal=function(t){return/^x-./.test(t)},a.prototype.getCurrentActions=function(){var t,e;e={};for(t in this.actions)e[t]=this.canInvokeAction(t);return e},a.prototype.updateCurrentActions=function(){var t;return t=this.getCurrentActions(),e(t,this.currentActions)?void 0:(this.currentActions=t,this.toolbarController.updateActions(this.currentActions),this.editorElement.notify("actions-change",{actions:this.currentActions}))},a.prototype.reparse=function(){return this.composition.replaceHTML(this.editorElement.innerHTML)},a.prototype.render=function(){return this.compositionController.render()},a.prototype.removeAttachment=function(t){return this.editor.recordUndoEntry("Delete Attachment"),this.composition.removeAttachment(t),this.render()},a.prototype.recordFormattingUndoEntry=function(){var t;return t=this.selectionManager.getLocationRange(),n(t)?void 0:this.editor.recordUndoEntry("Formatting",{context:this.getUndoContext(),consolidatable:!0})},a.prototype.recordTypingUndoEntry=function(){return this.editor.recordUndoEntry("Typing",{context:this.getUndoContext(this.currentAttributes),consolidatable:!0})},a.prototype.getUndoContext=function(){var t;return t=1<=arguments.length?s.call(arguments,0):[],[this.getLocationContext(),this.getTimeContext()].concat(s.call(t))},a.prototype.getLocationContext=function(){var t;return t=this.selectionManager.getLocationRange(),n(t)?t[0].index:t},a.prototype.getTimeContext=function(){return t.config.undoInterval>0?Math.floor((new Date).getTime()/t.config.undoInterval):0},a.prototype.isFocused=function(){var t;return this.editorElement===(null!=(t=this.editorElement.ownerDocument)?t.activeElement:void 0)},a}(t.Controller)}.call(this),function(){var e,n,o,i,r,s,a;r=t.makeElement,s=t.selectionElements,a=t.triggerEvent,o=t.handleEvent,i=t.handleEventOnce,n=t.defer,e=t.AttachmentView.attachmentSelector,t.registerElement("trix-editor",function(){var n,u,c,l,h,p;return l=0,n=function(t){return!document.querySelector(":focus")&&t.hasAttribute("autofocus")&&document.querySelector("[autofocus]")===t?t.focus():void 0},h=function(t){return t.hasAttribute("contenteditable")?void 0:(t.setAttribute("contenteditable",""),i("focus",{onElement:t,withCallback:function(){return u(t)}}))},u=function(t){return c(t),p(t)},c=function(t){return("function"==typeof document.queryCommandSupported?document.queryCommandSupported("enableObjectResizing"):void 0)?(document.execCommand("enableObjectResizing",!1,!1),o("mscontrolselect",{onElement:t,preventDefault:!0})):void 0},p=function(){var e;return("function"==typeof document.queryCommandSupported?document.queryCommandSupported("DefaultParagraphSeparator"):void 0)&&(e=t.config.blockAttributes["default"].tagName,"div"===e||"p"===e)?document.execCommand("DefaultParagraphSeparator",!1,e):void 0},{defaultCSS:"%t:empty:not(:focus)::before {\n  content: attr(placeholder);\n  color: graytext;\n}\n\n%t a[contenteditable=false] {\n  cursor: text;\n}\n\n%t img {\n  max-width: 100%;\n  height: auto;\n}\n\n%t "+e+" figcaption textarea {\n  resize: none;\n}\n\n%t "+e+" figcaption textarea.trix-autoresize-clone {\n  position: absolute;\n  left: -9999px;\n  max-height: 0px;\n}\n\n%t "+e+'[data-trix-mutable] figcaption:empty::before {\n  content: "'+t.config.lang.captionPrompt+'";\n  color: graytext;\n}\n\n%t '+s.selector+" { "+s.cssText+" }",trixId:{get:function(){return this.hasAttribute("trix-id")?this.getAttribute("trix-id"):(this.setAttribute("trix-id",++l),this.trixId)}},toolbarElement:{get:function(){var t,e,n;return this.hasAttribute("toolbar")?null!=(e=this.ownerDocument)?e.getElementById(this.getAttribute("toolbar")):void 0:this.parentElement?(n="trix-toolbar-"+this.trixId,this.setAttribute("toolbar",n),t=r("trix-toolbar",{id:n}),this.parentElement.insertBefore(t,this),t):void 0}},inputElement:{get:function(){var t,e,n;return this.hasAttribute("input")?null!=(n=this.ownerDocument)?n.getElementById(this.getAttribute("input")):void 0:this.parentElement?(e="trix-input-"+this.trixId,this.setAttribute("input",e),t=r("input",{type:"hidden",id:e}),this.parentElement.insertBefore(t,this.nextElementSibling),t):void 0}},editor:{get:function(){var t;return null!=(t=this.editorController)?t.editor:void 0}},name:{get:function(){var t;return null!=(t=this.inputElement)?t.name:void 0}},value:{get:function(){var t;return null!=(t=this.inputElement)?t.value:void 0},set:function(t){var e;return this.defaultValue=t,null!=(e=this.editor)?e.loadHTML(this.defaultValue):void 0}},notify:function(e,n){var o;switch(e){case"document-change":this.documentChangedSinceLastRender=!0;break;case"render":this.documentChangedSinceLastRender&&(this.documentChangedSinceLastRender=!1,this.notify("change"));break;case"change":case"attachment-add":case"attachment-edit":case"attachment-remove":null!=(o=this.inputElement)&&(o.value=t.serializeToContentType(this,"text/html"))}return this.editorController?a("trix-"+e,{onElement:this,attributes:n}):void 0},createdCallback:function(){return h(this)},attachedCallback:function(){return this.hasAttribute("data-trix-internal")?void 0:(null==this.editorController&&(this.editorController=new t.EditorController({editorElement:this,html:this.defaultValue=this.value})),this.editorController.registerSelectionManager(),this.registerResetListener(),n(this),requestAnimationFrame(function(t){return function(){return t.notify("initialize")}}(this)))},detachedCallback:function(){var t;return null!=(t=this.editorController)&&t.unregisterSelectionManager(),this.unregisterResetListener()},registerResetListener:function(){return this.resetListener=this.resetBubbled.bind(this),window.addEventListener("reset",this.resetListener,!1)},unregisterResetListener:function(){return window.removeEventListener("reset",this.resetListener,!1)},resetBubbled:function(t){var e;return t.target!==(null!=(e=this.inputElement)?e.form:void 0)||t.defaultPrevented?void 0:this.reset()},reset:function(){return this.value=this.defaultValue}}}())}.call(this),function(){}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"=="function"&&__webpack_require__(43)&&!(__WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}.call(this);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41).setImmediate))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(42).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41).setImmediate, __webpack_require__(41).clearImmediate))

/***/ },
/* 42 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout.call(null, cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout.call(null, timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout.call(null, drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 43 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(45);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(47)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./app.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./app.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(46)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Roboto&subset=latin,latin-ext);", ""]);

	// module
	exports.push([module.id, "@charset \"UTF-8\";\n.align-right {\n  text-align: right; }\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box; }\n\nhtml {\n  height: 100%; }\n\n.body {\n  font-family: 'Roboto', sans-serif;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  margin: 0;\n  background-color: #FAFAFA;\n  color: #212121; }\n  .body.is-scrolling-disabled {\n    overflow: hidden; }\n\n.page-content {\n  position: relative;\n  flex: 1; }\n\n.header,\n.footer {\n  height: 50px;\n  background-color: #F5F5F5;\n  z-index: 1; }\n\n.card {\n  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);\n  background-color: #FFFFFF;\n  border-radius: 2px; }\n  .card .card__content {\n    padding: 24px 24px 16px; }\n  .card .card__actions {\n    padding: 8px; }\n\n.input-box {\n  padding: 16px 0 8px; }\n  .input-box .input-box__label {\n    font-size: 12px;\n    line-height: 16px;\n    color: #757575; }\n  .input-box .input-box__input {\n    font-size: 16px;\n    line-height: 16px;\n    min-width: 250px;\n    display: block;\n    padding: 0 0 7px;\n    margin: 8px 0;\n    outline: 0;\n    border-top: 0;\n    border-right: 0;\n    border-bottom: 1px solid #424242;\n    border-left: 0; }\n    .input-box .input-box__input:focus {\n      border-bottom: 1px solid #F44336; }\n  .input-box .input-box__message {\n    font-size: 12px;\n    line-height: 16px;\n    color: #757575; }\n    .input-box .input-box__message.is-error {\n      color: #F44336; }\n  .input-box .input-box__switch-input:checked + .input-box__switch-label {\n    background: #009688; }\n    .input-box .input-box__switch-input:checked + .input-box__switch-label::before {\n      left: 20px;\n      background: #009688; }\n    .input-box .input-box__switch-input:checked + .input-box__switch-label:active::before {\n      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.28), 0 0 0 20px rgba(0, 150, 136, 0.2); }\n  .input-box .input-box__switch-label {\n    display: inline-block;\n    position: relative;\n    width: 40px;\n    height: 16px;\n    border-radius: 8px;\n    background: black;\n    transition: background 0.28s cubic-bezier(0.4, 0, 0.2, 1);\n    vertical-align: middle;\n    cursor: pointer; }\n    .input-box .input-box__switch-label::before {\n      content: '';\n      position: absolute;\n      top: -4px;\n      left: -4px;\n      width: 24px;\n      height: 24px;\n      background: #fafafa;\n      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.28);\n      border-radius: 50%;\n      transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1); }\n    .input-box .input-box__switch-label:active::before {\n      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.28), 0 0 0 20px rgba(128, 128, 128, 0.1); }\n\n.button {\n  display: inline-block;\n  text-align: center;\n  text-transform: uppercase;\n  cursor: pointer;\n  font-size: 14px;\n  border-radius: 2px;\n  border: 0;\n  line-height: 14px;\n  padding: 10px 16px;\n  background-color: transparent; }\n  .button.button--dialog {\n    min-width: 64px;\n    padding: 10px 8px;\n    margin: 0 8px; }\n  .button.button--raised {\n    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3); }\n  .button.is-hidden {\n    display: none; }\n\n.navigation {\n  margin-top: 50px;\n  padding-left: 20px; }\n  .navigation .navigation__header {\n    font-weight: bold;\n    font-size: 20px;\n    color: #757575;\n    margin-top: 40px; }\n  .navigation .navigation__items {\n    margin-top: 10px; }\n  .navigation .navigation__item {\n    padding: 5px;\n    color: #212121; }\n\n.sidebar {\n  position: absolute;\n  top: 0;\n  right: auto;\n  bottom: 0;\n  left: 0;\n  background-color: #F5F5F5;\n  width: 250px;\n  box-shadow: 2px 0 16px 0 rgba(0, 0, 0, 0.1); }\n\n.fab {\n  height: 50px;\n  width: 50px;\n  border-radius: 25px;\n  font-size: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.modal-container {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.3);\n  display: none;\n  align-items: center;\n  justify-content: center; }\n  .modal-container.is-shown {\n    display: flex; }\n\n.modal {\n  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);\n  background-color: #FFFFFF;\n  border-radius: 2px; }\n  .modal .modal__content {\n    padding: 24px 24px 16px; }\n  .modal .modal__actions {\n    text-align: right;\n    padding: 8px; }\n\n.card-list {\n  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);\n  background-color: #FFFFFF;\n  border-radius: 2px;\n  margin: 24px 24px 0;\n  overflow: hidden; }\n  .card-list .card-list__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    min-height: 40px; }\n    .theme-0 .card-list .card-list__header {\n      background-color: #2196F3;\n      color: #FFFFFF; }\n    .theme-0 .card-list .card-list__header {\n      background-color: #2196F3;\n      color: #FFFFFF; }\n  .card-list .card-list__header-actions {\n    padding: 0 16px; }\n  .card-list .card-list__title {\n    padding: 0 16px; }\n\n.header {\n  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3); }\n\n.modal-dialog-container {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.3);\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\n.modal-dialog {\n  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);\n  background-color: #FFFFFF;\n  border-radius: 2px; }\n  .modal-dialog .modal-dialog__header {\n    padding: 24px 24px 20px; }\n  .modal-dialog .modal-dialog__content {\n    padding: 24px 24px 16px; }\n  .modal-dialog .modal-dialog__actions {\n    text-align: right;\n    padding: 8px; }\n\ntrix-editor {\n  border-radius: 2px;\n  border: 1px solid #E0E0E0;\n  min-height: 80px;\n  max-height: 300px;\n  overflow: auto;\n  padding: 4px 8px;\n  outline: none; }\n\ntrix-toolbar .button_group {\n  display: inline-block;\n  margin: 0 8px 0 0;\n  overflow: hidden; }\n  trix-toolbar .button_group:last-of-type {\n    margin-right: 0; }\n\ntrix-toolbar button,\ntrix-toolbar input[type=button] {\n  background-color: #FFFFFF;\n  border: 0;\n  position: relative;\n  font-size: 0;\n  margin: 0;\n  height: 28px;\n  width: 40px; }\n  trix-toolbar button::before,\n  trix-toolbar input[type=button]::before {\n    display: inline-block;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background-position: center;\n    background-repeat: no-repeat;\n    opacity: 0.6;\n    content: \"\"; }\n  trix-toolbar button.active,\n  trix-toolbar input[type=button].active {\n    background-color: #E0E0E0; }\n    trix-toolbar button.active::before,\n    trix-toolbar input[type=button].active::before {\n      opacity: 1; }\n  trix-toolbar button:disabled::before,\n  trix-toolbar input[type=button]:disabled::before {\n    opacity: 0.125; }\n  trix-toolbar button.bold::before,\n  trix-toolbar input[type=button].bold::before {\n    background-image: url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%2224%22%20width%3D%2224%22%3E%3Cpath%20d%3D%22M15.6%2011.8c1-.7%201.6-1.8%201.6-2.8a4%204%200%200%200-4-4H7v14h7c2%200%203.7-1.7%203.7-3.8%200-1.5-.8-2.8-2-3.4zM10%207.5h3a1.5%201.5%200%200%201%200%203h-3v-3zm3.5%209H10v-3h3.5a1.5%201.5%200%200%201%200%203z%22%2F%3E%3C%2Fsvg%3E\"); }\n  trix-toolbar button.italic::before,\n  trix-toolbar input[type=button].italic::before {\n    background-image: url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%2224%22%20width%3D%2224%22%3E%3Cpath%20d%3D%22M10%205v3h2.2l-3.4%208H6v3h8v-3h-2.2l3.4-8H18V5h-8z%22%2F%3E%3C%2Fsvg%3E\"); }\n  trix-toolbar button.link::before,\n  trix-toolbar input[type=button].link::before {\n    background-image: url(\"data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M9.88%2013.7a4.3%204.3%200%200%201%200-6.07l3.37-3.37a4.26%204.26%200%200%201%206.07%200%204.3%204.3%200%200%201%200%206.06l-1.96%201.72a.9.9%200%200%201-1.3-1.3l1.97-1.7a2.46%202.46%200%200%200-3.48-3.5l-3.38%203.38a2.46%202.46%200%200%200%200%203.48.9.9%200%200%201-1.3%201.3z%22%2F%3E%3Cpath%20d%3D%22M4.25%2019.46a4.3%204.3%200%200%201%200-6.07l1.93-1.9a.9.9%200%200%201%201.3%201.27l-1.93%201.9a2.46%202.46%200%200%200%203.48%203.5l3.37-3.4c.96-.95.96-2.5%200-3.47a.9.9%200%200%201%201.3-1.28%204.3%204.3%200%200%201%200%206.06l-3.38%203.38a4.26%204.26%200%200%201-6.07%200z%22%2F%3E%3C%2Fsvg%3E\"); }\n  trix-toolbar button.strike::before,\n  trix-toolbar input[type=button].strike::before {\n    background-image: url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%2224%22%20width%3D%2224%22%3E%3Cpath%20d%3D%22M12.73%2014l.28.14c.3.15.5.3.6.44.1.14.2.3.2.5%200%20.3-.1.56-.4.75-.3.2-.75.3-1.4.3a13.52%2013.52%200%200%201-5-1.18v3.38a10.64%2010.64%200%200%200%204.86.88%209.5%209.5%200%200%200%203.28-.5c.93-.34%201.64-.9%202.14-1.54s.74-1.45.74-2.32c0-.25%200-.5-.05-.74h-5.2zm-5.5-4c-.08-.34-.12-.7-.12-1.1%200-1.3.6-2.3%201.6-3.02a7.75%207.75%200%200%201%204.4-1.08c1.6%200%203.3.34%205%201l-1.3%202.93c-1.47-.6-2.73-.9-3.8-.9-.55%200-.96.08-1.2.26a.7.7%200%200%200-.38.6c0%20.2.16.5.48.7.18.1.54.3%201.06.5h-5.7zM3%2013h18v-2H3v2z%22%2F%3E%3C%2Fsvg%3E\"); }\n  trix-toolbar button.quote::before,\n  trix-toolbar input[type=button].quote::before {\n    background-image: url(\"data:image/svg+xml,%3Csvg%20version%3D%221%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M6%2017h3l2-4V7H5v6h3zm8%200h3l2-4V7h-6v6h3z%22%2F%3E%3C%2Fsvg%3E\"); }\n  trix-toolbar button.code::before,\n  trix-toolbar input[type=button].code::before {\n    background-image: url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M18.2%2012L15%2015.2l1.4%201.4L21%2012l-4.6-4.6L15%208.8l3.2%203.2zM5.8%2012L9%208.8%207.6%207.4%203%2012l4.6%204.6L9%2015.2%205.8%2012z%22%2F%3E%3C%2Fsvg%3E\"); }\n  trix-toolbar button.bullets::before,\n  trix-toolbar input[type=button].bullets::before {\n    background-image: url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%2224%22%20width%3D%2224%22%20version%3D%221%22%3E%3Cpath%20d%3D%22M4%204a2%202%200%201%200%200%204%202%202%200%200%200%200-4zm0%206a2%202%200%201%200%200%204%202%202%200%200%200%200-4zm0%206a2%202%200%201%200%200%204%202%202%200%200%200%200-4zm4%203h14v-2H8v2zm0-6h14v-2H8v2zm0-8v2h14V5H8z%22%2F%3E%3C%2Fsvg%3E\"); }\n  trix-toolbar button.numbers::before,\n  trix-toolbar input[type=button].numbers::before {\n    background-image: url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M2%2017h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1%203h1.8L2%2013v1h3v-1H3.2L5%2011v-1H2v1zm5-6v2h14V5H7zm0%2014h14v-2H7v2zm0-6h14v-2H7v2z%22%2F%3E%3C%2Fsvg%3E\"); }\n  trix-toolbar button.block-level.decrease::before,\n  trix-toolbar input[type=button].block-level.decrease::before {\n    background-image: url(\"data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M3%2019h19v-2H3v2zm7-6h12v-2H10v2zm-8.3-.3l2.8%203L6%2014l-2.3-2%202-2-1.3-1.5L1%2012l.7.7zM3%205v2h19V5H3z%22%2F%3E%3C%2Fsvg%3E\"); }\n  trix-toolbar button.block-level.increase::before,\n  trix-toolbar input[type=button].block-level.increase::before {\n    background-image: url(\"data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M3%2019h19v-2H3v2zm7-6h12v-2H10v2zm-7-1l-2%202.2%201.4%201.4L6%2012l-.8-.7-2.8-2.8L1%2010l2%202zm0-7v2h19V5H3z%22%2F%3E%3C%2Fsvg%3E\"); }\n  trix-toolbar button.undo::before,\n  trix-toolbar input[type=button].undo::before {\n    background-image: url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M12.5%208c-2.6%200-5%201-7%202.6L2%207v9h9l-3.6-3.6A8%208%200%200%201%2020%2016l2.4-.8a10.5%2010.5%200%200%200-10-7.2z%22%2F%3E%3C%2Fsvg%3E\"); }\n  trix-toolbar button.redo::before,\n  trix-toolbar input[type=button].redo::before {\n    background-image: url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M18.4%2010.6a10.5%2010.5%200%200%200-17%204.6L4%2016a8%208%200%200%201%2012.6-3.6L13%2016h9V7l-3.6%203.6z%22%2F%3E%3C%2Fsvg%3E\"); }\n\ntrix-toolbar .dialog {\n  padding: 12px 0;\n  line-height: 12px;\n  background-color: #FFFFFF; }\n  trix-toolbar .dialog input[type=button] {\n    font-size: 12px;\n    height: 24px;\n    min-width: 50px;\n    padding: 1px 8px 0 8px;\n    opacity: 0.6;\n    -webkit-appearance: none;\n    -webkit-border-radius: 0; }\n  trix-toolbar .dialog,\n  trix-toolbar .dialog input[type=url],\n  trix-toolbar .dialog input[type=text] {\n    flex: 1;\n    font-size: 12px;\n    padding: 0 8px;\n    margin: 0 8px 0 0;\n    border: 0;\n    border-bottom: 1px solid #E0E0E0;\n    background-color: #FFFFFF;\n    box-shadow: none;\n    outline: 0;\n    -webkit-appearance: none;\n    -moz-appearance: none; }\n  trix-toolbar .dialog .link_url_fields {\n    display: flex;\n    padding: 8px 0; }\n  trix-toolbar .dialog.link_dialog {\n    min-width: 300px;\n    max-width: 600px; }\n\ntrix-toolbar .dialogs .dialog input[type=url].validate:invalid, trix-toolbar .dialogs .dialog input[type=text].validate:invalid {\n  box-shadow: #F00 0px 0px 1.5px 1px; }\n\ntrix-toolbar .dialogs .dialog.link_dialog .button_group {\n  max-width: 110px; }\n\ntrix-editor [data-trix-mutable=true] {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\ntrix-editor [data-trix-mutable=true] img {\n  box-shadow: 0 0 0 2px highlight; }\n\ntrix-editor .attachment .remove {\n  display: block;\n  position: absolute;\n  top: -12px;\n  right: -12px;\n  width: 24px;\n  height: 24px;\n  border-radius: 24px;\n  line-height: 22px;\n  font-size: 0;\n  color: black;\n  text-align: center;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid #bbb;\n  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1); }\n\ntrix-editor .attachment .remove:after {\n  content: '\\D7';\n  font-size: 18px;\n  font-weight: bold;\n  opacity: 0.6; }\n\ntrix-editor .attachment .remove:hover:after {\n  opacity: 1; }\n\ntrix-editor .attachment .caption.caption-editing textarea {\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  font-size: 13px;\n  line-height: 13px;\n  text-align: center;\n  border: none;\n  outline: none;\n  -webkit-appearance: none;\n  -moz-appearance: none; }\n\n.trix-content blockquote {\n  margin: 0 0 0 5px;\n  padding: 0 0 0 10px;\n  border-left: 5px solid #ccc; }\n\n.trix-content pre {\n  font-family: monospace;\n  font-size: 12px;\n  margin: 0;\n  padding: 10px;\n  white-space: pre-wrap;\n  background-color: #eee; }\n\n.trix-content ul, .trix-content ol, .trix-content li {\n  margin: 0;\n  padding: 0; }\n\n.trix-content ul li, .trix-content ol li, .trix-content li li {\n  margin-left: 20px; }\n\n.trix-content img {\n  max-width: 100%;\n  height: auto; }\n\n.trix-content a[data-trix-attachment] {\n  color: inherit;\n  text-decoration: none; }\n\n.trix-content a[data-trix-attachment]:hover, .trix-content a[data-trix-attachment]:visited:hover {\n  color: inherit; }\n\n.trix-content .attachment {\n  position: relative;\n  display: inline-block;\n  max-width: 100%;\n  margin: 0;\n  padding: 0;\n  color: #666;\n  font-size: 13px; }\n\n.trix-content .attachment.attachment-file {\n  color: #333;\n  line-height: 30px;\n  padding: 0 16px;\n  border: 1px solid #bbb;\n  border-radius: 5px; }\n\n.trix-content .attachment .caption {\n  display: block;\n  margin: 4px auto 0 auto;\n  padding: 0;\n  text-align: center; }\n\n.trix-content .attachment .caption .size:before {\n  content: ' \\B7   '; }\n\n.switch {\n  display: inline-block;\n  position: relative;\n  width: 40px;\n  height: 16px;\n  border-radius: 8px;\n  background: black;\n  transition: background 0.28s cubic-bezier(0.4, 0, 0.2, 1);\n  vertical-align: middle;\n  cursor: pointer; }\n  .switch::before {\n    content: '';\n    position: absolute;\n    top: -4px;\n    left: -4px;\n    width: 24px;\n    height: 24px;\n    background: #fafafa;\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.28);\n    border-radius: 50%;\n    transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1); }\n  .switch:active::before {\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.28), 0 0 0 20px rgba(128, 128, 128, 0.1); }\n\ninput:checked + .switch {\n  background: #009688; }\n  input:checked + .switch::before {\n    left: 20px;\n    background: #009688; }\n  input:checked + .switch:active::before {\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.28), 0 0 0 20px rgba(0, 150, 136, 0.2); }\n\n.color-select .color-select__item {\n  width: 40px;\n  height: 40px;\n  border-radius: 20px;\n  display: inline-block;\n  margin: 10px;\n  cursor: pointer;\n  outline: 0;\n  -webkit-appearance: none; }\n  .color-select .color-select__item:checked {\n    border: 3px solid black; }\n\n.register-page {\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.login-page {\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.verify-page {\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.first-steps-photo-page {\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n  .first-steps-photo-page .select-photo-container {\n    display: flex;\n    min-height: 250px; }\n    .first-steps-photo-page .select-photo-container .image-preview-container {\n      display: none; }\n    .first-steps-photo-page .select-photo-container.has-photo .dropzone-container {\n      display: none; }\n    .first-steps-photo-page .select-photo-container.has-photo .image-preview-container {\n      display: block; }\n  .first-steps-photo-page .dropzone-container {\n    border: 5px dashed black;\n    width: 250px; }\n  .first-steps-photo-page .image-preview-container {\n    width: 250px; }\n    .first-steps-photo-page .image-preview-container .image-preview {\n      height: 100%;\n      background-repeat: no-repeat;\n      background-position: center center;\n      background-size: cover; }\n\n.content-wrapper {\n  height: 100%; }\n\n.wrapped-page-content {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 250px;\n  overflow: auto; }\n\n.forum-page {\n  height: 100%; }\n\n.new-thread-button {\n  position: absolute;\n  bottom: 20px;\n  right: 20px;\n  background-color: #757575;\n  color: #FFFFFF; }\n\n.forum .forum__heading {\n  min-height: 64px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center; }\n  .theme-0 .forum .forum__heading {\n    background-color: #2196F3;\n    color: #FFFFFF; }\n  .theme-0 .forum .forum__heading {\n    background-color: #2196F3;\n    color: #FFFFFF; }\n\n.forum .forum__title {\n  font-size: 24px;\n  padding: 0 16px;\n  color: #FFFFFF; }\n\n.forum .forum__actions {\n  padding: 0 16px; }\n\n.forum .forum__action {\n  cursor: pointer; }\n\n.thread-page {\n  height: 100%; }\n  .thread-page .thread .thread-page .thread__header {\n    background-color: #757575;\n    color: #FFFFFF; }\n  .thread-page .thread .thread-page .thread__title {\n    font-size: 40px;\n    padding: 20px 20px 30px; }\n  .thread-page .thread .thread-page .thread__content {\n    padding: 20px; }\n  .thread-page .thread .thread-page .thread__additional-info {\n    display: flex;\n    align-items: center;\n    padding: 20px 20px 30px; }\n  .thread-page .thread .thread-page .thread__owner-photo {\n    display: inline-block;\n    width: 50px;\n    height: 50px;\n    border-radius: 25px;\n    margin-right: 10px;\n    background-repeat: no-repeat;\n    background-position: center center;\n    background-size: cover; }\n  .thread-page .thread .thread-page .thread__owner-info {\n    display: inline-block;\n    line-height: 25px; }\n  .thread-page .thread .thread-page .thread__owner-username {\n    display: inline-block; }\n  .thread-page .thread .thread-page .thread__date {\n    font-size: 14px; }\n  .thread-page .thread .thread-page .thread__new-comment-container {\n    padding: 20px;\n    margin-top: 10px; }\n  .thread-page .comment {\n    position: relative;\n    margin: 30px 30px 0; }\n    .thread-page .comment::before {\n      position: absolute;\n      top: -30px;\n      bottom: 0px;\n      left: 25px;\n      right: auto;\n      content: '';\n      width: 1px;\n      background-color: rgba(0, 0, 0, 0.1); }\n    .thread-page .comment:last-child::before {\n      bottom: auto;\n      height: 50px; }\n    .thread-page .comment .thread-page .comment__image {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 50px;\n      height: 50px;\n      border-radius: 25px;\n      margin-right: 10px;\n      background-repeat: no-repeat;\n      background-position: center center;\n      background-size: cover; }\n    .thread-page .comment .thread-page .comment__card {\n      background-color: #FFFFFF;\n      padding: 20px 30px;\n      margin-left: 78px;\n      box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3); }\n    .thread-page .comment .thread-page .comment__info {\n      font-size: 14px; }\n    .thread-page .comment .thread-page .comment__content {\n      margin-top: 10px; }\n\n.loading {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.3);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000; }\n  .loading .loading__icon {\n    width: 50px;\n    height: 50px;\n    background-image: url(\"/public/images/loader.svg\");\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: contain; }\n", ""]);

	// exports


/***/ },
/* 46 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(8);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _template = __webpack_require__(49);

	var _template2 = _interopRequireDefault(_template);

	var _main = __webpack_require__(4);

	var _session = __webpack_require__(1);

	var _session2 = _interopRequireDefault(_session);

	var _component = __webpack_require__(50);

	var _component2 = _interopRequireDefault(_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.View.extend({

	  template: _template2.default,

	  tagName: 'article',

	  className: 'content-wrapper',

	  regions: {
	    sidebar: {
	      el: '#sidebar',
	      replaceEl: true
	    },
	    content: {
	      el: '#page-content'
	    }
	  },

	  onBeforeAttach: function onBeforeAttach() {
	    this.showChildView('sidebar', new _component2.default());
	  },
	  navigate: function navigate(event) {
	    var page = event.target.dataset.page;
	    _main.router.navigate(page, true);
	  },
	  logout: function logout() {
	    _session2.default.logout();
	  }
	});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(13);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<aside id=\"sidebar\">\n\n</aside>\n\n<article class=\"wrapped-page-content\" id=\"page-content\">\n\n</article>\n";
	},"useData":true});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(8);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _template = __webpack_require__(51);

	var _template2 = _interopRequireDefault(_template);

	var _main = __webpack_require__(4);

	var _session = __webpack_require__(1);

	var _session2 = _interopRequireDefault(_session);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.View.extend({

	  template: _template2.default,

	  tagName: 'aside',

	  className: 'sidebar',

	  attributes: {
	    id: 'sidebar'
	  },

	  ui: {
	    logoutButton: '.js-logout'
	  },

	  events: {
	    'click @ui.logoutButton': 'logout',
	    'click .js-navigate': 'navigate'
	  },

	  templateContext: function templateContext() {
	    return {
	      sidebarItems: [{
	        label: this.currentUser.username,
	        link: 'profile/' + this.currentUser.id
	      }, {
	        label: 'dashboard',
	        link: 'dashboard'
	      }, {
	        label: 'forum',
	        link: 'forum'
	      }]
	    };
	  },
	  initialize: function initialize() {
	    this.currentUser = _session2.default.getCurrentUser();
	  },
	  navigate: function navigate(event) {
	    var page = event.target.dataset.page;
	    _main.router.navigate(page, true);
	  },
	  logout: function logout() {
	    _session2.default.logout();
	  }
	});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(13);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

	  return "    <div class=\"navigation__header js-navigate\" data-page=\""
	    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
	    + "\">\n      "
	    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
	    + "\n    </div>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

	  return "<section class=\"navigation\">\n"
	    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.sidebarItems : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "  <!-- <div class=\"navigation__header js-navigate\" data-page=\"profile/"
	    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentUser : depth0)) != null ? stack1.id : stack1), depth0))
	    + "\">\n    "
	    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentUser : depth0)) != null ? stack1.username : stack1), depth0))
	    + "\n  </div>\n  <div class=\"navigation__header js-navigate\" data-page=\"dashboard\">\n    DASHBOARD\n  </div>\n  <div class=\"navigation__header js-navigate\" data-page=\"forum\">\n    FORUM\n  </div>\n  <div class=\"navigation__items\">\n    <div class=\"navigation__item\">\n      Aktualno\n    </div>\n    <div class=\"navigation__item\">\n      Moje teme\n    </div>\n    <div class=\"navigation__item\">\n      Jos nesto\n    </div>\n  </div> -->\n  <div class=\"navigation__header js-logout\">\n    LOGOUT\n  </div>\n</section>\n";
	},"useData":true});

/***/ }
/******/ ]);