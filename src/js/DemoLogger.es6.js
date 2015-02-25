import Elem from './Elem'
import Frame from './Frame'
import Logger from './Logger'
import Func from './Func'

export default class DemoLogger {
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
