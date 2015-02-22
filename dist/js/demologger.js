(function() {
var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var replacelog = function (el) {
  console.log = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var logs = [];
    args.forEach(function (log) {
      if (typeof log == "object") {
        logs.push(JSON && JSON.stringify ? JSON.stringify(log) : log);
      } else {
        logs.push(log);
      }
      el.innerHTML += logs.join(" ") + "<br>";
    });
  };
};

var PRE = "dl-";

var Elem = (function () {
  function Elem() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Elem);

    opt.el = opt.el ? "" + PRE + "" + opt.el : "" + PRE + "div";
    this.opt = opt;
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
        this.el.id = this.opt.id || "";
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
        this.el.addEventListener(eventName, cb, false);
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
      // border: '1px solid #333',
      backgroundColor: "#eee",
      padding: "5px",
      borderRadius: "1px",
      boxShadow: "inset 1px 1px 0 rgba(0,0,0,.2)"
    };

    _get(Object.getPrototypeOf(Frame.prototype), "constructor", this).call(this, opt);
  }

  _inherits(Frame, Elem);

  return Frame;
})(Elem);

var Btn = (function (Elem) {
  function Btn() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Btn);

    opt.el = "button";
    opt.style = {
      textAlign: "center",
      color: "#fff",
      display: "inline-block",
      backgroundColor: "#333",
      border: "1px solid #222",
      borderRadius: "1px",
      padding: "0 10px",
      lineHeight: "26px",
      fontSize: "14px",
      webkitAppearance: "none",
      boxShadow: "inset 0 -1px 0 0 rgba(255,255,255,.2)",
      margin: "3px 3px 0 0"
    };

    _get(Object.getPrototypeOf(Btn.prototype), "constructor", this).call(this, opt);
  }

  _inherits(Btn, Elem);

  return Btn;
})(Elem);

var Label = (function (Elem) {
  function Label() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Label);

    opt.text = opt.text || "label";
    opt.el = "label";
    opt.style = {
      fontSize: "10px",
      color: "#9f9f9f",
      borderBottom: "1px solid #9f9f9f",
      textShadow: "-1px -1px rgba(255,255,255, .2)",
      margin: "8px 0 5px"
    };

    _get(Object.getPrototypeOf(Label.prototype), "constructor", this).call(this, opt);
  }

  _inherits(Label, Elem);

  return Label;
})(Elem);

var Logger = (function (Elem) {
  function Logger() {
    var opt = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Logger);

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
      margin: "0"
    };

    _get(Object.getPrototypeOf(Logger.prototype), "constructor", this).call(this, opt);
    replacelog(this.el);
  }

  _inherits(Logger, Elem);

  return Logger;
})(Elem);

var DemoLogger = (function () {
  function DemoLogger(_x, mount) {
    var config = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, DemoLogger);

    this.config = config;
    this._initialize(mount);
  }

  _prototypeProperties(DemoLogger, null, {
    _initialize: {
      value: function _initialize(mount) {
        this._setElement();
        this._createBtns(this.config);
        if (!mount) {
          this.mount("body");
        }
      },
      writable: true,
      configurable: true
    },
    _setElement: {
      value: function _setElement() {
        this.frame = new Frame();
        this.btns = new Elem({ el: "btns" });
        this.label = new Label({ text: "console.log" });
        this.logger = new Logger();
        this.frame.add([this.btns, this.label, this.logger]);
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
        this._createBtns(config);
      },
      writable: true,
      configurable: true
    },
    _createBtns: {
      value: function _createBtns(config) {
        for (var fn in config) {
          if (config.hasOwnProperty(fn)) {
            this.btns.add(new Btn({
              text: fn,
              events: {
                click: config[fn]
              }
            }));
          }
        }
      },
      writable: true,
      configurable: true
    }
  });

  return DemoLogger;
})();

window.demoLogger = new DemoLogger();
})();