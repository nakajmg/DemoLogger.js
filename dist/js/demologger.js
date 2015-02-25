(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DemoLogger = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Elem = _interopRequire(require("./Elem"));

var Frame = _interopRequire(require("./Frame"));

var Logger = _interopRequire(require("./Logger"));

var Func = _interopRequire(require("./Func"));

var DemoLogger = (function () {
  function DemoLogger() {
    var config = arguments[0] === undefined ? {} : arguments[0];
    var opt = arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, DemoLogger);

    this.config = config;
    this.opt = opt;
    this._initialize();
  }

  _prototypeProperties(DemoLogger, null, {
    _initialize: {
      value: function _initialize() {
        this._setElement();
        this._setFunc(this.opt.func);
        this.mount(this.opt.mount);
      },
      writable: true,
      configurable: true
    },
    _setElement: {
      value: function _setElement() {
        this.frame = new Frame();
        this.fns = new Elem({ el: "funcs" });
        this.logger = new Logger(this.config);
        this.frame.add([this.fns, this.logger]);
      },
      writable: true,
      configurable: true
    },
    mount: {
      value: function mount() {
        var selector = arguments[0] === undefined ? "body" : arguments[0];

        if (selector.nodeType) {
          this.mountTo(slector);
        } else {
          this.mountTo(document.querySelector(selector));
        }
      },
      writable: true,
      configurable: true
    },
    mountTo: {
      value: function mountTo(el) {
        el.appendChild(this.frame.el);
      },
      writable: true,
      configurable: true
    },
    set: {
      value: function set(config) {
        this._setFunc(config);
      },
      writable: true,
      configurable: true
    },
    _setFunc: {
      value: function _setFunc(config) {
        for (var fn in config) {
          if (config.hasOwnProperty(fn)) {
            this.fns.add([new Func({
              text: fn,
              fn: config[fn]
            })]);
          }
        }
      },
      writable: true,
      configurable: true
    }
  });

  return DemoLogger;
})();

module.exports = DemoLogger;

},{"./Elem":7,"./Frame":8,"./Func":9,"./Logger":13}],2:[function(require,module,exports){
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Elem = _interopRequire(require("./Elem"));

var Btn = (function (Elem) {
  function Btn() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Btn);

    opt.el = "button";
    opt.text = opt.text || "run";
    opt.style = {
      textAlign: "center",
      color: "#fff",
      display: "inline-block",
      // backgroundColor: '#C7243A',
      backgroundColor: "rgb(51, 51, 51)",
      border: "none",
      borderRadius: "1px",
      padding: "0 10px",
      lineHeight: "26px",
      fontSize: "14px",
      webkitAppearance: "none",
      boxShadow: "inset 0 -1px 0 0 rgba(255,255,255,.2)",
      margin: "0",
      cursor: "pointer"
    };

    _get(Object.getPrototypeOf(Btn.prototype), "constructor", this).call(this, opt);
  }

  _inherits(Btn, Elem);

  return Btn;
})(Elem);

module.exports = Btn;

},{"./Elem":7}],3:[function(require,module,exports){
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Elem = _interopRequire(require("./Elem"));

var CodeCloseBtn = _interopRequire(require("./CodeCloseBtn"));

var Code = (function (Elem) {
  function Code() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Code);

    opt.el = "code";
    opt.style = {
      display: "block",
      padding: "5px",
      backgroundColor: "rgb(226, 241, 224)",
      color: "rgb(30, 30, 30)",
      margin: "0",
      whiteSpace: "pre",
      overflowX: "scroll",
      fontSize: "12px",
      fontFamily: "monospace",
      letterSpacing: "0.1em",
      position: "relative"
    };
    _get(Object.getPrototypeOf(Code.prototype), "constructor", this).call(this, opt);
    this._initElement();
  }

  _inherits(Code, Elem);

  _prototypeProperties(Code, null, {
    _initElement: {
      value: function _initElement() {
        this.close = new CodeCloseBtn({
          fn: this.hide.bind(this)
        });
        this.add([this.close]);
      },
      writable: true,
      configurable: true
    },
    show: {
      value: function show() {
        this.el.style.display = "block";
      },
      writable: true,
      configurable: true
    },
    hide: {
      value: function hide() {
        this.el.style.display = "none";
      },
      writable: true,
      configurable: true
    },
    isShow: {
      value: function isShow() {
        return this.el.style.display == "block";
      },
      writable: true,
      configurable: true
    },
    toggle: {
      value: function toggle() {
        this.isShow() ? this.hide() : this.show();
      },
      writable: true,
      configurable: true
    }
  });

  return Code;
})(Elem);

module.exports = Code;

},{"./CodeCloseBtn":5,"./Elem":7}],4:[function(require,module,exports){
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Btn = _interopRequire(require("./Btn"));

var CodeBtn = (function (Btn) {
  function CodeBtn() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, CodeBtn);

    opt.el = "codebutton";
    opt.text = "code";
    _get(Object.getPrototypeOf(CodeBtn.prototype), "constructor", this).call(this, opt);
    this.style = {
      backgroundColor: "#23AC0E"
    };
    this.applyStyle();
  }

  _inherits(CodeBtn, Btn);

  return CodeBtn;
})(Btn);

module.exports = CodeBtn;

},{"./Btn":2}],5:[function(require,module,exports){
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Btn = _interopRequire(require("./Btn"));

var CodeCloseBtn = (function (Btn) {
  function CodeCloseBtn() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, CodeCloseBtn);

    opt.el = "codeclosebutton";
    opt.text = "close";

    _get(Object.getPrototypeOf(CodeCloseBtn.prototype), "constructor", this).call(this, opt);
    this.fn = opt.fn;

    this.style = {
      backgroundColor: "rgb(17, 108, 0)",
      position: "absolute",
      right: "0px",
      top: "0px",
      fontSize: "10px",
      opacity: "0.5",
      padding: "0 5px",
      lineHeight: "20px"
    };
    this.applyStyle();
    this._addEvent();
  }

  _inherits(CodeCloseBtn, Btn);

  _prototypeProperties(CodeCloseBtn, null, {
    _addEvent: {
      value: function _addEvent() {
        var _this = this;

        this.el.addEventListener("click", function () {
          _this.fn();
        });
      },
      writable: true,
      configurable: true
    }
  });

  return CodeCloseBtn;
})(Btn);

module.exports = CodeCloseBtn;

},{"./Btn":2}],6:[function(require,module,exports){
var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var PRE = "dl-";

var ConsoleToHtml = (function () {
  function ConsoleToHtml() {
    var _this = this;

    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ConsoleToHtml);

    opt.color = opt.color || {};

    this.types = ["log", "warn", "error"];
    this.el = opt.output || document.body;
    this.enables = {
      log: true,
      warn: true,
      error: true
    };

    this.colors = {
      log: "",
      warn: "rgb(245, 228, 38)",
      error: "rgb(255, 52, 52)"
    };

    this.types.forEach(function (type) {
      _this.enables[type] = opt[type] !== undefined ? opt[type] : _this.enables[type];
    });

    this.types.forEach(function (type) {
      _this.colors[type] = opt.color[type] ? opt.color[type] : _this.colors[type];
    });

    this._initialize();
  }

  _prototypeProperties(ConsoleToHtml, null, {
    _initialize: {
      value: function _initialize() {
        var _this = this;

        this.types.forEach(function (type) {
          if (_this.enables[type]) {
            _this._interrupt(type);
          }
        });
      },
      writable: true,
      configurable: true
    },
    _interrupt: {
      value: function _interrupt(type) {
        var _this = this;

        var _original = console[type];

        console[type] = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _original.apply(console, args);

          var wrapElement = document.createElement("" + PRE + "" + type);
          wrapElement.style.color = _this.colors[type];

          args.forEach((function (message) {
            wrapElement.appendChild(_this._convert(message));
          }).bind(_this));

          _this.el.appendChild(wrapElement);
        };
      },
      writable: true,
      configurable: true
    },
    _convert: {
      value: function _convert(message) {
        if (typeof message === "object") {
          return document.createTextNode(JSON.stringify(message, null, 2) + "\n");
        } else if (typeof message === "undefined") {
          return document.createTextNode("undefined\n");
        } else {
          return document.createTextNode("" + message + "\n");
        }
      },
      writable: true,
      configurable: true
    }
  });

  return ConsoleToHtml;
})();

module.exports = ConsoleToHtml;

},{}],7:[function(require,module,exports){
var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var PRE = "dl-";

var Elem = (function () {
  function Elem() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Elem);

    opt.el = opt.el ? "" + PRE + "" + opt.el : "" + PRE + "div";
    this.opt = opt;
    this.name = opt.name || "";
    this.style = opt.style || {};
    this.events = opt.events || {};
    this._initialize();
  }

  _prototypeProperties(Elem, null, {
    _initialize: {
      value: function _initialize() {
        this._setElement();
        this._eventify();
        this.applyStyle();
      },
      writable: true,
      configurable: true
    },
    _setElement: {
      value: function _setElement() {
        this.el = document.createElement(this.opt.el);
        this.el.textContent = this.opt.text || "";
        this.el.style.display = "block";
      },
      writable: true,
      configurable: true
    },
    mount: {
      value: function mount(selector) {
        document.querySelector(selector).appendChild(this.el);
      },
      writable: true,
      configurable: true
    },
    applyStyle: {
      value: function applyStyle() {
        for (var key in this.style) {
          if (this.style.hasOwnProperty(key)) {
            this.el.style[key] = this.style[key];
          }
        }
      },
      writable: true,
      configurable: true
    },
    _eventify: {
      value: function _eventify() {
        for (var eventName in this.events) {
          if (this.events.hasOwnProperty(eventName)) {
            this.addEvent(eventName, this.events[eventName]);
          }
        }
      },
      writable: true,
      configurable: true
    },
    addEvent: {
      value: function addEvent(eventName, cb) {
        var _this = this;

        this.el.addEventListener(eventName, function () {
          console.log("> run " + _this.name);
          try {
            cb();
          } catch (err) {
            console.log(err.message);
          }
        }, false);
      },
      writable: true,
      configurable: true
    },
    add: {
      value: function add(els) {
        if (els.length) {
          for (var i = 0, leng = els.length; i < leng; i++) {
            this.el.appendChild(els[i].el);
          }
        } else {
          this.el.appendChild(els.el);
        }
      },
      writable: true,
      configurable: true
    }
  });

  return Elem;
})();

module.exports = Elem;

},{}],8:[function(require,module,exports){
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Elem = _interopRequire(require("./Elem"));

var Frame = (function (Elem) {
  function Frame() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Frame);

    opt.el = "frame";
    opt.style = {
      backgroundColor: "#f9faf9",
      padding: "5px",
      borderRadius: "1px",
      boxShadow: "inset 1px 1px 0 rgba(0,0,0,.2)",
      marginTop: "10px"
    };

    _get(Object.getPrototypeOf(Frame.prototype), "constructor", this).call(this, opt);
  }

  _inherits(Frame, Elem);

  return Frame;
})(Elem);

module.exports = Frame;

},{"./Elem":7}],9:[function(require,module,exports){
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Elem = _interopRequire(require("./Elem"));

var CodeBtn = _interopRequire(require("./CodeBtn"));

var Code = _interopRequire(require("./Code"));

var FuncLabel = _interopRequire(require("./FuncLabel"));

var Btn = _interopRequire(require("./Btn"));

var Func = (function (Elem) {
  function Func() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Func);

    this.fn = opt.fn;
    this.text = opt.text;
    opt.el = "func";
    opt.text = "";
    opt.style = {
      boxShadow: "none",
      borderBottom: "1px dashed rgba(0,0,0,.2)",
      padding: "5px"
    };
    _get(Object.getPrototypeOf(Func.prototype), "constructor", this).call(this, opt);
    this._initElement();
  }

  _inherits(Func, Elem);

  _prototypeProperties(Func, null, {
    _initElement: {
      value: function _initElement() {
        var _this = this;

        this.btn = new CodeBtn();
        this.code = new Code({
          text: this._toString()
        });

        this.add([new FuncLabel({
          text: this.text
        }), new Btn({
          name: this.text,
          events: {
            click: this.fn
          }
        }), this.btn, this.code]);
        this.btn.el.addEventListener("click", (function () {
          _this.code.show();
        }).bind(this));
      },
      writable: true,
      configurable: true
    },
    _toString: {
      value: function _toString() {
        var codestring = this.fn.toString().split("\n");
        codestring.splice(-1, 1);
        codestring.splice(0, 1);
        var firstIndent = codestring[0].match(/^\s*/)[0];
        var reg = new RegExp("^" + firstIndent);
        for (var i = 0, leng = codestring.length; i < leng; i++) {
          codestring[0] = codestring[0].replace(reg, "");
        }

        return codestring.join("\n");
      },
      writable: true,
      configurable: true
    }
  });

  return Func;
})(Elem);

module.exports = Func;

},{"./Btn":2,"./Code":3,"./CodeBtn":4,"./Elem":7,"./FuncLabel":10}],10:[function(require,module,exports){
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Label = _interopRequire(require("./Label"));

var FuncLabel = (function (Label) {
  function FuncLabel() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, FuncLabel);

    _get(Object.getPrototypeOf(FuncLabel.prototype), "constructor", this).call(this, opt);
    this.style = {
      margin: "0 0 5px",
      fontSize: "12px",
      color: "rgb(51, 51, 51)"
    };
    this.applyStyle();
  }

  _inherits(FuncLabel, Label);

  return FuncLabel;
})(Label);

module.exports = FuncLabel;

},{"./Label":11}],11:[function(require,module,exports){
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Elem = _interopRequire(require("./Elem"));

var Label = (function (Elem) {
  function Label() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Label);

    opt.text = opt.text || "label";
    opt.el = "label";
    opt.style = {
      fontSize: "12px",
      color: "#9f9f9f",
      textShadow: "-1px -1px rgba(255,255,255, .2)",
      margin: "8px 0 5px"
    };

    _get(Object.getPrototypeOf(Label.prototype), "constructor", this).call(this, opt);
  }

  _inherits(Label, Elem);

  return Label;
})(Elem);

module.exports = Label;

},{"./Elem":7}],12:[function(require,module,exports){
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Elem = _interopRequire(require("./Elem"));

var ConsoleToHtml = _interopRequire(require("./ConsoleToHtml"));

var Log = (function (Elem) {
  function Log(config) {
    _classCallCheck(this, Log);

    this.config = config;
    var opt = {};
    opt.el = "console";
    opt.style = {
      color: "#15df30",
      padding: "5px 7px",
      backgroundColor: "#333",
      lineHeight: "1.5",
      fontSize: "12px",
      fontFamily: "\"Ubuntu Mono\", sans-serif",
      border: "1px solid #000",
      borderRadius: "2px",
      margin: "0",
      minHeight: "19px",
      whiteSpace: "pre",
      letterSpacing: "0.1em"
    };

    _get(Object.getPrototypeOf(Log.prototype), "constructor", this).call(this, opt);
    this._consolify();
  }

  _inherits(Log, Elem);

  _prototypeProperties(Log, null, {
    _consolify: {
      value: function _consolify() {
        this.config.output = this.config.output || this.el;
        new ConsoleToHtml(this.config);
      },
      writable: true,
      configurable: true
    }
  });

  return Log;
})(Elem);

module.exports = Log;

},{"./ConsoleToHtml":6,"./Elem":7}],13:[function(require,module,exports){
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Elem = _interopRequire(require("./Elem"));

var Label = _interopRequire(require("./Label"));

var Log = _interopRequire(require("./Log"));

var Logger = (function (Elem) {
  function Logger(config) {
    var opt = arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Logger);

    this.config = config;
    opt.el = "logger";
    opt.style = {
      padding: "5px"
    };
    _get(Object.getPrototypeOf(Logger.prototype), "constructor", this).call(this, opt);

    if (this.config.logging === false || this.config.output !== undefined) {
      this.el.style.display = "none";
    }
    this._initElement();
  }

  _inherits(Logger, Elem);

  _prototypeProperties(Logger, null, {
    _initElement: {
      value: function _initElement() {
        this.label = new Label({ text: "console" });
        this.log = new Log(this.config);
        this.add([this.label, this.log]);
      },
      writable: true,
      configurable: true
    }
  });

  return Logger;
})(Elem);

module.exports = Logger;

},{"./Elem":7,"./Label":11,"./Log":12}]},{},[1])(1)
});