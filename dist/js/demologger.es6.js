var replacelog = (el) => {
  console.log = (...args) => {
    var logs = [];
    args.forEach((log) => {
        if (typeof log == 'object') {
          logs.push((JSON && JSON.stringify ? JSON.stringify(log) : log));
        }
        else {
          logs.push(log);
        }
        el.innerHTML += logs.join(' ') + '<br>';
      }
    );
  }
};

var PRE = 'dl-';
class Elem {
  constructor(opt = {}) {
    opt.el = opt.el ? `${PRE}${opt.el}` : `${PRE}div`;
    this.opt = opt;
    this.style = opt.style || {};
    this.events = opt.events || {};
    this._initialize();
  }
  _initialize() {
    this._setElement();
    this._eventify();
    this.applyStyle();
  }
  _setElement() {
    this.el = document.createElement(this.opt.el);
    this.el.textContent = this.opt.text || '';
    this.el.id = this.opt.id || '';
    this.el.style.display = 'block';
  }
  mount(selector) {
    document.querySelector(selector).appendChild(this.el);
  }
  applyStyle() {
    for(var key in this.style) {
      if (this.style.hasOwnProperty(key)) {
        this.el.style[key] = this.style[key];
      }
    }
  }
  _eventify() {
    for(var eventName in this.events) {
      if (this.events.hasOwnProperty(eventName)) {
        this.addEvent(eventName, this.events[eventName]);
      }
    }
  }
  addEvent(eventName, cb) {
    this.el.addEventListener(eventName, cb, false);
  }
  add(els) {
    if (els.length) {
      for(var i = 0, leng = els.length; i < leng; i++) {
        this.el.appendChild(els[i].el);
      }
    }
    else {
      this.el.appendChild(els.el);
    }
  }
}

class Frame extends Elem {
  constructor(opt = {}) {
    opt.el = 'frame'
    opt.style = {
      // border: '1px solid #333',
      backgroundColor: '#eee',
      padding: '5px',
      borderRadius: '1px',
      boxShadow: 'inset 1px 1px 0 rgba(0,0,0,.2)'
    };
    
    super(opt);
  }
}

class Btn extends Elem {
  constructor(opt = {}) {
    opt.el = 'button';
    opt.style = {
      textAlign: 'center',
      color: '#fff',
      display: 'inline-block',
      backgroundColor: '#333',
      border: '1px solid #222',
      borderRadius: '1px',
      padding: '0 10px',
      lineHeight: '26px',
      fontSize: '14px',
      webkitAppearance: 'none',
      boxShadow: 'inset 0 -1px 0 0 rgba(255,255,255,.2)',
      margin: '3px 3px 0 0'
    };
    
    super(opt);
  }
}

class Label extends Elem {
  constructor(opt = {}) {
    opt.text = opt.text || 'label';
    opt.el = 'label';
    opt.style = {
      fontSize: '10px',
      color: '#9f9f9f',
      borderBottom: '1px solid #9f9f9f',
      textShadow: '-1px -1px rgba(255,255,255, .2)',
      margin: '8px 0 5px'
    };
    
    super(opt);
  }
}

class Logger extends Elem {
  constructor(opt = {}) {
    opt.el = 'log';
    opt.style = {
      color: '#15df30',
      padding: '5px 7px',
      backgroundColor: '#333',
      lineHeight: '1.5',
      fontSize: '13px',
      fontFamily: '"Ubuntu Mono", sans-serif',
      border: '1px solid #000',
      borderRadius: '2px',
      margin: '0'
    };
    
    super(opt);
    replacelog(this.el);
  }
}

class DemoLogger {
  constructor(config = {}, mount) {
    this.config = config;
    this._initialize(mount);
  }
  _initialize(mount) {
    this._setElement();
    this._createBtns(this.config);
    if (!mount) {
      this.mount('body');
    }
  }
  _setElement() {
    this.frame = new Frame();
    this.btns = new Elem({ el: 'btns'});
    this.label = new Label({ text: 'console.log'});
    this.logger = new Logger();
    this.frame.add([this.btns, this.label, this.logger]);
  }
  mount(selector) {
    document.querySelector(selector).appendChild(this.frame.el);
  }
  set(config) {
    this._createBtns(config);
  }
  _createBtns(config) {
    for(var fn in config) {
      if (config.hasOwnProperty(fn)) {
        this.btns.add(
          new Btn({
            text: fn,
            events: {
              click: config[fn]
            }
          })
        );
      }
    }
  }
}

window.demoLogger = new DemoLogger();
