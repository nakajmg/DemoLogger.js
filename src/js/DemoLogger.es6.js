class DemoLogger {
  constructor(config = {}, opt = {}) {
    this.config = config;
    this.opt = opt;
    this._initialize();
  }
  _initialize(opt) {
    this._setElement();
    this._setFunc(this.config);
    if (!this.opt.mount) {
      this.mount('body');
    }
  }
  _setElement() {
    this.frame = new Frame();
    this.fns = new Elem({el: 'funcs'});
    this.logger = new Logger();
    this.frame.add([this.fns, this.logger]);
  }
  mount(selector) {
    document.querySelector(selector).appendChild(this.frame.el);
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
