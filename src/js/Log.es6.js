import Elem from './Elem'
import ConsoleToHtml from './ConsoleToHtml'

export default class Log extends Elem {
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
