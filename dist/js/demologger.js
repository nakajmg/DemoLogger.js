var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var replacelog = function (el) {
  var _log = console.log;
  console.log = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _log.apply(console, args);
    var logs = [];
    for (var i = 0, leng = args.length; i < leng; i++) {
      if (typeof args[i] == "object") {
        logs.push(JSON && JSON.stringify ? JSON.stringify(args[i]) : args[i]);
      } else {
        logs.push(args[i]);
      }
    }
    el.innerHTML += logs.join(" ") + "<br>";
  };
};

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

var Frame = (function (Elem) {
  function Frame() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Frame);

    opt.el = "frame";
    opt.style = {
      backgroundColor: "#f9faf9",
      padding: "5px",
      borderRadius: "1px",
      boxShadow: "inset 1px 1px 0 rgba(0,0,0,.2)"
    };

    _get(Object.getPrototypeOf(Frame.prototype), "constructor", this).call(this, opt);
  }

  _inherits(Frame, Elem);

  return Frame;
})(Elem);

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

var Log = (function (Elem) {
  function Log() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Log);

    opt.el = "log";
    opt.style = {
      color: "#15df30",
      padding: "5px 7px",
      backgroundColor: "#333",
      lineHeight: "1.5",
      fontSize: "13px",
      fontFamily: "\"Ubuntu Mono\", sans-serif",
      border: "1px solid #000",
      borderRadius: "2px",
      margin: "0",
      minHeight: "19px"
    };

    _get(Object.getPrototypeOf(Log.prototype), "constructor", this).call(this, opt);
    replacelog(this.el);
  }

  _inherits(Log, Elem);

  return Log;
})(Elem);

var Logger = (function (Elem) {
  function Logger() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Logger);

    opt.el = "logger";
    opt.style = {
      padding: "5px"
    };

    _get(Object.getPrototypeOf(Logger.prototype), "constructor", this).call(this, opt);
    this._initElement();
  }

  _inherits(Logger, Elem);

  _prototypeProperties(Logger, null, {
    _initElement: {
      value: function _initElement() {
        this.label = new Label({ text: "console.log" });
        this.log = new Log();
        this.add([this.label, new Log()]);
      },
      writable: true,
      configurable: true
    }
  });

  return Logger;
})(Elem);

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
      value: function _initialize(opt) {
        this._setElement();
        this._setFunc(this.config);
        if (!this.opt.mount) {
          this.mount("body");
        }
      },
      writable: true,
      configurable: true
    },
    _setElement: {
      value: function _setElement() {
        this.frame = new Frame();
        this.fns = new Elem({ el: "funcs" });
        this.logger = new Logger();
        this.frame.add([this.fns, this.logger]);
      },
      writable: true,
      configurable: true
    },
    mount: {
      value: function mount(selector) {
        document.querySelector(selector).appendChild(this.frame.el);
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

window.DemoLogger = DemoLogger;