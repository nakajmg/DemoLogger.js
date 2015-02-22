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