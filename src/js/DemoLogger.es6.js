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
