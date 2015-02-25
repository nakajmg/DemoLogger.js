var PRE = 'dl-';
class ConsoleToHtml {
  constructor(opt = {}) {
    opt.color = opt.color || {};
    
    this.types = ['log', 'warn', 'error'];
    this.el = opt.output || document.body;
    this.enables = {
      log:   true,
      warn:  true,
      error: true
    };
    
    this.colors = {
      log:   '',
      warn:  'rgb(245, 228, 38)',
      error: 'rgb(255, 52, 52)'
    };
    
    this.types.forEach( (type) => {
      this.enables[type] = opt[type] !== undefined ? opt[type] : this.enables[type];
    });
    
    this.types.forEach( (type) => {
      this.colors[type] = opt.color[type] ? opt.color[type] : this.colors[type];
    });

    this._initialize();
  }
  
  _initialize() {
    this.types.forEach( (type) => {
      if (this.enables[type]) {
        this._interrupt(type);
      }
    });
  }
  
  _interrupt(type) {
    var _original = console[type];
    
    console[type] = (...args) => {
      _original.apply(console, args);
      
      var wrapElement = document.createElement(`${PRE}${type}`);
      wrapElement.style.color = this.colors[type];
      
      args.forEach( (message) => {
          wrapElement.appendChild( this._convert(message) );
        }.bind(this)
      );
      
      this.el.appendChild(wrapElement);
    }
  }
  
  _convert(message) {
    if (typeof message === 'object') {
      return document.createTextNode( JSON.stringify(message, null, 2) + '\n' );
    }
    else if (typeof message === 'undefined') {
      return document.createTextNode('undefined\n');
    }
    else {
      return document.createTextNode(`${message}\n`);
    }
  }
}

var PRE = 'dl-';
class Elem {
  constructor(opt = {}) {
    opt.el = opt.el ? `${PRE}${opt.el}` : `${PRE}div`;
    this.opt = opt;
    this.name = opt.name || '';
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
    this.el.addEventListener(eventName, () => {
      console.log(`> run ${this.name}`);
      try {
        cb();
      }
      catch(err) {
        console.log(err.message);
      }
    }, false);
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
      backgroundColor: '#f9faf9',
      padding: '5px',
      borderRadius: '1px',
      boxShadow: 'inset 1px 1px 0 rgba(0,0,0,.2)',
      marginTop: '10px'
    };
    
    super(opt);
  }
}

class Func extends Elem {
  constructor(opt = {}) {
    this.fn = opt.fn;
    this.text = opt.text;
    opt.el = 'func';
    opt.text = '';
    opt.style = {
      boxShadow: 'none',
      borderBottom: '1px dashed rgba(0,0,0,.2)',
      padding: '5px'
    }
    super(opt);
    this._initElement();
  }
  _initElement() {
    this.btn = new CodeBtn();
    this.code = new Code({
      text: this._toString()
    });
    
    this.add([
      new FuncLabel({
        text: this.text
      }),
      new Btn({
        name: this.text,
        events: {
          click: this.fn
        }
      }),
      this.btn,
      this.code
    ]);
    this.btn.el.addEventListener('click', () => {
      this.code.show();
    }.bind(this));
  }
  _toString() {
    var codestring = this.fn.toString().split('\n');
    codestring.splice(-1, 1);
    codestring.splice(0, 1);
    var firstIndent = codestring[0].match(/^\s*/)[0];
    var reg = new RegExp(`\^${firstIndent}`);
    for(var i = 0, leng = codestring.length; i < leng; i++) {
      codestring[0] = codestring[0].replace(reg, '');
    }
    
    return codestring.join('\n');
  }
}

class Code extends Elem {
  constructor(opt = {}) {
    opt.el = 'code';
    opt.style = {
      display: 'block',
      padding: '5px',
      backgroundColor: 'rgb(226, 241, 224)',
      color: 'rgb(30, 30, 30)',
      margin: '0',
      whiteSpace: 'pre',
      overflowX: 'scroll',
      fontSize: '12px',
      fontFamily: 'monospace',
      letterSpacing: '0.1em',
      position: 'relative'
    }
    super(opt);
    this._initElement();
  }
  _initElement() {
    this.close = new CodeCloseBtn({
      fn: this.hide.bind(this)
    });
    this.add([this.close]);
  }
  show() {
    this.el.style.display = 'block';
  }
  hide() {
    this.el.style.display = 'none';
  }
  isShow() {
    return this.el.style.display == 'block';
  }
  toggle() {
    this.isShow() ? this.hide() : this.show();
  }
}

class Btn extends Elem {
  constructor(opt = {}) {
    opt.el = 'button';
    opt.text = opt.text || 'run';
    opt.style = {
      textAlign: 'center',
      color: '#fff',
      display: 'inline-block',
      // backgroundColor: '#C7243A',
      backgroundColor: 'rgb(51, 51, 51)',
      border: 'none',
      borderRadius: '1px',
      padding: '0 10px',
      lineHeight: '26px',
      fontSize: '14px',
      webkitAppearance: 'none',
      boxShadow: 'inset 0 -1px 0 0 rgba(255,255,255,.2)',
      margin: '0',
      cursor: 'pointer'
    };
    
    super(opt);
  }
}

class CodeBtn extends Btn {
  constructor(opt = {}) {
    opt.el = 'codebutton';
    opt.text = 'code';
    super(opt);
    this.style = {
      backgroundColor: '#23AC0E'
    };
    this.applyStyle();
  }
}

class CodeCloseBtn extends Btn {
  constructor(opt = {}) {
    opt.el = 'codeclosebutton';
    opt.text = 'close';
    
    super(opt);
    this.fn = opt.fn;
    
    this.style = {
      backgroundColor: 'rgb(17, 108, 0)',
      position: 'absolute',
      right: '0px',
      top: '0px',
      fontSize: '10px',
      opacity: '0.5',
      padding: '0 5px',
      lineHeight: '20px'
    };
    this.applyStyle();
    this._addEvent();
  }
  _addEvent() {
    this.el.addEventListener('click', () =>{
      this.fn();
    })
  }
}

class Label extends Elem {
  constructor(opt = {}) {
    opt.text = opt.text || 'label';
    opt.el = 'label';
    opt.style = {
      fontSize: '12px',
      color: '#9f9f9f',
      textShadow: '-1px -1px rgba(255,255,255, .2)',
      margin: '8px 0 5px'
    };
    
    super(opt);
  }
}

class FuncLabel extends Label {
  constructor(opt = {}) {
    super(opt);
    this.style = {
      margin: '0 0 5px',
      fontSize: '12px',
      color: 'rgb(51, 51, 51)'
    };
    this.applyStyle();
  }
}

class Log extends Elem {
  constructor(config) {
    this.config = config;
    var opt = {};
    opt.el = 'console';
    opt.style = {
      color: '#15df30',
      padding: '5px 7px',
      backgroundColor: '#333',
      lineHeight: '1.5',
      fontSize: '12px',
      fontFamily: '"Ubuntu Mono", sans-serif',
      border: '1px solid #000',
      borderRadius: '2px',
      margin: '0',
      minHeight: '19px',
      whiteSpace: 'pre',
      letterSpacing: '0.1em'
    };
    
    super(opt);
    this._consolify();
  }
  
  _consolify() {
    this.config.output = this.config.output || this.el;
    new ConsoleToHtml(this.config);
  }
}

class Logger extends Elem {
  constructor(config, opt = {}) {
    this.config = config;
    opt.el = 'logger';
    opt.style = {
      padding: '5px'
    }
    super(opt);
    
    if (this.config.logging === false || this.config.output !== undefined) {
      this.el.style.display = 'none';
    }
    this._initElement();

  }
  _initElement() {
    this.label = new Label({text: 'console'});
    this.log = new Log(this.config);
    this.add([this.label, this.log]);
  }
}

class DemoLogger {
  constructor(config = {}, opt = {}) {
    this.config = config;
    this.opt = opt;
    this._initialize();
  }
  _initialize() {
    this._setElement();
    this._setFunc(this.opt.func);
    this.mount(this.opt.mount);
  }
  _setElement() {
    this.frame = new Frame();
    this.fns = new Elem({el: 'funcs'});
    this.logger = new Logger(this.config);
    this.frame.add([this.fns, this.logger]);
  }
  mount(selector = 'body') {
    if (selector.nodeType) {
      this.mountTo(slector);
    }
    else{
      this.mountTo(document.querySelector(selector));
    }
  }
  mountTo(el) {
    el.appendChild(this.frame.el);
  }
  set(config) {
    this._setFunc(config);
  }
  _setFunc(config) {
    for(var fn in config) {
      if (config.hasOwnProperty(fn)) {
        this.fns.add([
          new Func({
            text: fn,
            fn: config[fn]
          })
        ]);
      }
    }
  }
}

window.DemoLogger = DemoLogger;
