var PRE = 'dl-';
class ConsoleToHtml {
  constructor(opt = {}) {
    opt.color = opt.color || {};
    
    this.types = ['log', 'warn', 'error'];
    
    this.el = opt.el || document.body;
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
