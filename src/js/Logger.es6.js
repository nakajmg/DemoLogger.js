class Logger extends Elem {
  constructor(opt = {}) {
    opt.el = 'logger';
    opt.style = {
      padding: '5px'
    }
    
    super(opt);
    this._initElement();
  }
  _initElement() {
    this.label = new Label({text: 'console.log'});
    this.log = new Log();
    this.add([this.label, new Log()]);
  }
}
