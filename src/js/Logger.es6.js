import Elem from './Elem'
import Label from './Label'
import Log from './Log'

export default class Logger extends Elem {
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
