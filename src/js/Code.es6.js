import Elem from './Elem'
import CodeCloseBtn from './CodeCloseBtn'

export default class Code extends Elem {
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
